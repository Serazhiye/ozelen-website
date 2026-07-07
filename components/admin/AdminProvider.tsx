"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AdminPanel } from "./AdminPanel";

type AdminContextValue = { openAdmin: () => void; closeAdmin: () => void };

const AdminContext = createContext<AdminContextValue>({
  openAdmin: () => {},
  closeAdmin: () => {},
});

export function useAdmin(): AdminContextValue {
  return useContext(AdminContext);
}

/**
 * Provides the global admin overlay. Wrap the app once (in the root layout).
 * The panel can be opened from the hidden footer trigger or the /auth route.
 */
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({ openAdmin: () => setOpen(true), closeAdmin: () => setOpen(false) }),
    [],
  );

  const close = useCallback(() => setOpen(false), []);

  return (
    <AdminContext.Provider value={value}>
      {children}
      <AdminPanel open={open} onClose={close} />
    </AdminContext.Provider>
  );
}
