"use client";

export const PROGRESS_SYNC_EVENT = "tgpi:progress-saved";
export const PROGRESS_SYNC_CHANNEL = "tgpi-progress-v2";
export function announceProgressSaved() {
  window.dispatchEvent(new Event(PROGRESS_SYNC_EVENT));
  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel(PROGRESS_SYNC_CHANNEL);
    channel.postMessage("refresh");
    channel.close();
  }
}
