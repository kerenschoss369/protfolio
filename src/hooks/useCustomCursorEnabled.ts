"use client";

import { useSyncExternalStore } from "react";

import { getCustomCursorMediaQuery } from "@/lib/motion";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia(getCustomCursorMediaQuery());
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(getCustomCursorMediaQuery()).matches;
}

function getServerSnapshot() {
  return false;
}

export function useCustomCursorEnabled(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
