"use client";

import { useEffect, useState } from "react";
import {
  STORE_EVENT,
  defaultTeam,
  defaultProjects,
  defaultPress,
  defaultServices,
  getTeam,
  getProjects,
  getPress,
  getServices,
  getStaticImages,
  type TeamDoc,
  type ProjectDoc,
  type PressDoc,
  type ServiceDoc,
} from "@/lib/store";

function useCollection<T>(getter: () => T[], seed: T[]): T[] {
  // Seed with defaults so SSR and first client render match (no hydration jump).
  const [items, setItems] = useState<T[]>(seed);
  useEffect(() => {
    const sync = () => setItems(getter());
    sync();
    window.addEventListener(STORE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STORE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return items;
}

export const useTeam = () => useCollection<TeamDoc>(getTeam, defaultTeam);
export const useProjects = () => useCollection<ProjectDoc>(getProjects, defaultProjects);
export const usePress = () => useCollection<PressDoc>(getPress, defaultPress);
export const useServices = () => useCollection<ServiceDoc>(getServices, defaultServices);

export function useStaticImages(): Record<string, string> {
  const [map, setMap] = useState<Record<string, string>>({});
  useEffect(() => {
    const sync = () => setMap(getStaticImages());
    sync();
    window.addEventListener(STORE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STORE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return map;
}
