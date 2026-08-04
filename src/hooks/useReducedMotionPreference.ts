"use client";

import { useSyncExternalStore } from "react";

import {
  getReducedMotionSnapshot,
  getServerReducedMotionSnapshot,
  subscribeReducedMotion,
} from "@/lib/motion";

export function useReducedMotionPreference(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}
