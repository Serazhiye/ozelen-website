"use client";

import { useEffect } from "react";
import { pullContent } from "@/lib/sync";

/** Pulls server content into the client store once on load. */
export function ContentSync() {
  useEffect(() => {
    pullContent();
  }, []);
  return null;
}
