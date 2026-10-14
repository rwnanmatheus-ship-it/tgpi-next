"use client";

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
  const { isLoaded, userId } = useAuth();
  const [progress, setProgress] = useState(createEmptyActivationProgress);
  const [loadedUserId, setLoadedUserId] = useState("");
  const [error, setError] = useState("");
  const activeUserId = useRef(userId);
  useEffect(() => { activeUserId.current = userId; }, [userId]);
  const revision = useRef(0);
  const mutationQueue = useRef<Promise<unknown>>(Promise.resolve());

  useEffect(() => {
    let active = true;

    if (!isLoaded) return () => undefined;

    if (!userId) {
      return () => undefined;
    }

    const requestRevision = revision.current;
    fetchActivationProgress(userId)
      .then((next) => {
        if (!active) return;
        if (revision.current !== requestRevision) return;
        setProgress(next);
        setError("");
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
        if (active) setLoadedUserId(userId);
      });

    return () => {
      active = false;
    };
  }, [isLoaded, userId]);

  const mutate = useCallback((mutation: ActivationMutation) => {
    const requestUserId = userId;
    if (!requestUserId) return Promise.reject(new ActivationApiError("Sign in to save your learning progress.", 401));
    revision.current += 1;
    const execute = () => {
      if (activeUserId.current !== requestUserId) throw new ActivationApiError("Your session changed. Reload before saving.", 401);
      return mutateActivationProgress(mutation);
    };
    const request = mutationQueue.current.then(
      execute,
      execute,
    );
    const handledRequest = request.then(
      (next) => {
        if (activeUserId.current !== requestUserId) throw new ActivationApiError("Your session changed. Reload before saving.", 401);
        setLoadedUserId(requestUserId);
        setProgress(next);
        setError("");
        return next;
      },
      (caught: unknown) => {
        const message =
          caught instanceof ActivationApiError
            ? caught.message
            : "Unable to update your TGPI progress.";
        if (activeUserId.current === requestUserId) setError(message);
        throw caught;
      },
    );

    mutationQueue.current = handledRequest.catch(() => undefined);
    return handledRequest;
  }, [userId]);

  const value = useMemo(
    () => ({
      error,
      isAuthenticated: Boolean(userId),
      isLoading: !isLoaded || Boolean(userId && loadedUserId !== userId),
      mutate,
      progress: userId && loadedUserId === userId ? progress : EMPTY_PROGRESS,
    }),
    [error, isLoaded, loadedUserId, mutate, progress, userId],
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
