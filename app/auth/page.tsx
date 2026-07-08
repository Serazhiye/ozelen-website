"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/admin/AdminProvider";

/**
 * /auth simply opens the global admin overlay and returns to the home page,
 * so the panel "pops up" over the site (same overlay as the hidden footer button).
 */
export default function AuthPage() {
  const { openAdmin } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    openAdmin();
    router.replace("/");
  }, [openAdmin, router]);

  return null;
}
