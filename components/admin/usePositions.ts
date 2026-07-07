"use client";

import { useEffect, useState } from "react";
import { defaultPositions, getPositions, POSITIONS_EVENT, type Position } from "@/lib/admin";

/**
 * Reads the live job-openings list (localStorage override or defaults),
 * and stays in sync when the admin panel edits them.
 * Initialised with defaults so SSR and first client render match.
 */
export function usePositions(): Position[] {
  const [positions, setPositions] = useState<Position[]>(defaultPositions);

  useEffect(() => {
    const sync = () => setPositions(getPositions());
    sync();
    window.addEventListener(POSITIONS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(POSITIONS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return positions;
}
