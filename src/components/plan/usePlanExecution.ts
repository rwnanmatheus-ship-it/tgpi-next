'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { localPlanDate, type PlanExecution, type PlanExecutionMutation } from '@/lib/plan-execution';

function subscribeDate(listener: () => void) {
  const interval = window.setInterval(listener, 60_000);
  window.addEventListener('focus', listener);
  return () => { window.clearInterval(interval); window.removeEventListener('focus', listener); };
}

const endpoint = '/api/plan/execution';
type Feedback = 'saved' | 'conflict' | 'authentication' | 'storage' | 'input' | 'limit' | 'ready';

export function usePlanExecution(initial: PlanExecution | null, initialDate: string) {
  const [state, setState] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>();
  const inFlight = useRef(false);
  const today = useSyncExternalStore(subscribeDate, localPlanDate, () => initialDate);
  async function request(mutation?: PlanExecutionMutation) {
    if (inFlight.current) return false;
    inFlight.current = true;
    setBusy(true);
    setFeedback(undefined);
    try {
      const response = await fetch(endpoint, mutation && {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mutation),
      });
      if (response.status === 401) { setFeedback('authentication'); return false; }
      if (response.status === 422) { setFeedback('limit'); return false; }
      if (response.status === 400 || response.status === 413) { setFeedback('input'); return false; }
      if (!response.ok && response.status !== 409) { setFeedback('storage'); return false; }

      const { state: updated } = await response.json() as { state: PlanExecution };
      setState(updated);
      setFeedback(response.status === 409 ? 'conflict' : mutation ? 'saved' : 'ready');
      return response.ok;
    } catch {
      setFeedback('storage');
      return false;
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }
  return { state, today, busy, feedback, request };
}
