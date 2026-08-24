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
  const mutationQueue = useRef<Promise<unknown>>(Promise.resolve());

  useEffect(() => {
    let active = true;

    if (!isLoaded) return () => undefined;

    if (!userId) {
      return () => undefined;
    }

    fetchActivationProgress()
      .then((next) => {
        if (!active) return;
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
    const request = mutationQueue.current.then(
      () => mutateActivationProgress(mutation),
      () => mutateActivationProgress(mutation),
    );
    const handledRequest = request.then(
      (next) => {
        setProgress(next);
        setError("");
        return next;
      },
      (caught: unknown) => {
        const message =
          caught instanceof ActivationApiError
            ? caught.message
            : "Unable to update your TGPI progress.";
        setError(message);
        throw caught;
      },
    );

    mutationQueue.current = handledRequest.catch(() => undefined);
    return handledRequest;
  }, []);

  const value = useMemo(
    () => ({
      error,
      isAuthenticated: Boolean(userId),
      isLoading: !isLoaded || Boolean(userId && loadedUserId !== userId),
      mutate,
      progress: userId ? progress : EMPTY_PROGRESS,
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
