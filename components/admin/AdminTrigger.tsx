"use client";

import { useAdmin } from "./AdminProvider";

/**
 * Discreet admin launcher for the footer. Renders as a small, low-contrast
 * dot that most visitors will never notice — clicking it opens the login panel.
 */
export function AdminTrigger() {
  const { openAdmin } = useAdmin();
  return (
    <button
      type="button"
      onClick={openAdmin}
      aria-label="Панель администратора"
      title="Admin"
      className="h-2.5 w-2.5 rounded-full bg-sand-100/20 transition-all duration-300 hover:scale-125 hover:bg-sand-100/60"
    />
  );
}
