"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { HOME_GOALS, homeGoal, type HomeGoal } from "@/lib/home-journey";

const goalChange = "tgpi:home-goal";
const GoalContext = createContext<HomeGoal>("study");

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(goalChange, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(goalChange, callback);
  };
}

function snapshot() {
  return homeGoal(new URLSearchParams(window.location.search).get("goal"));
}

export function setHomeGoal(goal: HomeGoal) {
  const url = new URL(window.location.href);
  url.searchParams.set("goal", goal);
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(goalChange));
}

export function HomeGoalProvider({ initialGoal, children }: { initialGoal: HomeGoal; children: ReactNode }) {
  const goal = useSyncExternalStore(subscribe, snapshot, () => initialGoal);
  return <GoalContext.Provider value={goal}>{children}</GoalContext.Provider>;
}

export function useHomeGoal() {
  const goal = useContext(GoalContext);
  return HOME_GOALS.find(item => item.id === goal) ?? HOME_GOALS[0];
}
