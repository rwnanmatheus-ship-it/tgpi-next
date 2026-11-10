"use client";

import { PROGRESS_SYNC_CHANNEL, PROGRESS_SYNC_EVENT } from "@/lib/progress-sync";
import { useLocale } from "@/components/localization/LocaleProvider";
import { activationReadOnlyCopy } from "@/lib/localization/progress-copy";
import { useAuth } from "@clerk/nextjs";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ActivationApiError,
  fetchActivationProgress,
  mutateActivationProgress,
} from "@/lib/activation-client";
import {
  createEmptyActivationProgress,
  type ActivationMutation,
  type TgpiActivationProgress,
} from "@/lib/activation-progress";

type ActivationProgressContextValue = {
  error: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  mutate: (mutation: ActivationMutation) => Promise<TgpiActivationProgress>;
  progress: TgpiActivationProgress;
};

const ActivationProgressContext = createContext<
  ActivationProgressContextValue | undefined
>(undefined);
const EMPTY_PROGRESS = createEmptyActivationProgress();

export default function ActivationProgressProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoaded, sessionId } = useAuth();
  return <ActivationProgressSession key={sessionId ?? "anonymous"} sessionId={sessionId ?? null} isLoaded={isLoaded}>{children}</ActivationProgressSession>;
}

function ActivationProgressSession({ children, sessionId, isLoaded }: { children: ReactNode; sessionId: string | null; isLoaded: boolean }) {
  const { locale } = useLocale();
  const [progress, setProgress] = useState(createEmptyActivationProgress);
  const [loadedSessionId, setLoadedSessionId] = useState("");
  const [error, setError] = useState("");
  const mounted = useRef(false);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const revision = useRef(0);
  const confirmed = useRef(false);
  const mutationQueue = useRef<Promise<unknown>>(Promise.resolve());

  const applySnapshot = useCallback(({ progress, readOnly }: Awaited<ReturnType<typeof fetchActivationProgress>>) => {
    if (!readOnly || !confirmed.current) setProgress(progress);
    if (!readOnly) confirmed.current = true;
    setError(readOnly ? activationReadOnlyCopy.en : "");
  }, []);

  useEffect(() => {
    let active = true;

    if (!isLoaded) return () => undefined;

    if (!sessionId) {
      return () => undefined;
    }

    const requestRevision = revision.current;
    fetchActivationProgress(sessionId)
      .then((next) => {
        if (!active) return;
        if (revision.current !== requestRevision) return;
        applySnapshot(next);
      })
      .catch((caught: unknown) => {
        if (!active) return;
        setError(
          caught instanceof Error
            ? caught.message
            : "Unable to load your TGPI progress.",
        );
      })
      .finally(() => {
        if (active) setLoadedSessionId(sessionId);
      });

    return () => {
      active = false;
    };
  }, [applySnapshot, isLoaded, sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    let active = true;
    const refresh = () => {
      if (document.visibilityState !== "visible" || !navigator.onLine) return;
      const requestRevision = revision.current;
      fetchActivationProgress(sessionId).then(next => {
        if (!active || !mounted.current || requestRevision !== revision.current) return;
        applySnapshot(next);
        setLoadedSessionId(sessionId);
      }).catch(() => { /* Keep the last confirmed snapshot during a transient failure. */ });
    };
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(PROGRESS_SYNC_CHANNEL) : null;
    if (channel) channel.onmessage = refresh;
    window.addEventListener("focus", refresh);
    window.addEventListener(PROGRESS_SYNC_EVENT, refresh);
    window.addEventListener("online", refresh);
    document.addEventListener("visibilitychange", refresh);
    const interval = window.setInterval(refresh, 60_000);
    return () => { active = false; channel?.close(); window.removeEventListener("focus", refresh); window.removeEventListener(PROGRESS_SYNC_EVENT, refresh); window.removeEventListener("online", refresh); document.removeEventListener("visibilitychange", refresh); clearInterval(interval); };
  }, [applySnapshot, sessionId]);

  const mutate = useCallback((mutation: ActivationMutation) => {
    const requestSessionId = sessionId;
    if (!requestSessionId) return Promise.reject(new ActivationApiError("Sign in to save your learning progress.", 401));
    revision.current += 1;
    const execute = () => {
      if (!mounted.current) throw new ActivationApiError("Your session changed. Reload before saving.", 401);
      return mutateActivationProgress(mutation, requestSessionId);
    };
    const request = mutationQueue.current.then(
      execute,
      execute,
    );
    const handledRequest = request.then(
      (next) => {
        if (!mounted.current) throw new ActivationApiError("Your session changed. Reload before saving.", 401);
        revision.current += 1;
        confirmed.current = true;
        setLoadedSessionId(requestSessionId);
        setProgress(next);
        setError("");
        return next;
      },
      (caught: unknown) => {
        const message =
          caught instanceof ActivationApiError
            ? caught.message
            : "Unable to update your TGPI progress.";
        if (mounted.current) setError(message);
        throw caught;
      },
    );

    mutationQueue.current = handledRequest.catch(() => undefined);
    return handledRequest;
  }, [sessionId]);

  const value = useMemo(
    () => ({
      error: error === activationReadOnlyCopy.en ? activationReadOnlyCopy[locale] : error,
      isAuthenticated: Boolean(sessionId),
      isLoading: !isLoaded || Boolean(sessionId && loadedSessionId !== sessionId),
      mutate,
      progress: sessionId && loadedSessionId === sessionId ? progress : EMPTY_PROGRESS,
    }),
    [error, isLoaded, loadedSessionId, locale, mutate, progress, sessionId],
  );

  return (
    <ActivationProgressContext.Provider value={value}>
      {children}
    </ActivationProgressContext.Provider>
  );
}

export function useActivationProgress() {
  const context = useContext(ActivationProgressContext);

  if (!context) {
    throw new Error(
      "useActivationProgress must be used inside ActivationProgressProvider.",
    );
  }

  return context;
}
