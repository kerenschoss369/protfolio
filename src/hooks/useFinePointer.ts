"use client";

import { useSyncExternalStore } from "react";

import { getFinePointerMediaQuery } from "@/lib/motion";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia(getFinePointerMediaQuery());
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(getFinePointerMediaQuery()).matches;
}

function getServerSnapshot() {
  return false;
}

export function useFinePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
