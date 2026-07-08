"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input, Label } from "@/components/ui/Field";
import { DEFAULT_PASSWORD, verifyPassword } from "@/lib/admin";
import { PositionsTab, TeamTab, ProjectsTab, PressTab, PasswordTab } from "./Tabs";

const ease = [0.16, 1, 0.3, 1] as const;

const TABS = [
  { id: "projects", label: "Проекты", icon: "🏗️" },
  { id: "team", label: "Команда", icon: "👥" },
  { id: "press", label: "Пресса", icon: "📰" },
  { id: "positions", label: "Вакансии", icon: "💼" },
  { id: "password", label: "Пароль", icon: "🔑" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<TabId>("projects");

  useEffect(() => {
    if (!open) {
      setAuthed(false);
      setPw("");
      setError(false);
      setTab("projects");
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword(pw)) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-forest-950/60 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Панель администратора"
        >
          <motion.div
            className="relative my-auto w-full max-w-3xl overflow-hidden rounded-4xl bg-paper shadow-lift"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-forest-900/8 bg-forest-950 px-6 py-4 text-sand-50 sm:px-8">
              <div className="flex items-center gap-2.5">
                <span className="text-lg" role="img" aria-hidden="true">🔐</span>
                <div>
                  <p className="text-sm font-semibold">Панель администратора</p>
                  <p className="text-xs text-sand-100/50">Nord Botanic</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="flex h-9 w-9 items-center justify-center rounded-full text-sand-100/70 transition-colors hover:bg-white/10 hover:text-sand-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {!authed ? (
              /* Login */
              <form onSubmit={login} className="mx-auto max-w-sm p-8 py-12 text-center">
                <span className="text-4xl" role="img" aria-hidden="true">🌿</span>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Вход в панель</h2>
                <p className="mt-2 text-sm text-ink/55">Введите пароль администратора.</p>
                <div className="mt-6 text-left">
                  <Label htmlFor="admin-pw">Пароль</Label>
                  <Input
                    id="admin-pw"
                    type="password"
                    value={pw}
                    autoFocus
                    onChange={(e) => { setPw(e.target.value); setError(false); }}
                    placeholder="••••"
                    className={error ? "border-red-400 focus:border-red-400" : ""}
                  />
                  {error && <p className="mt-2 text-sm text-red-500">Неверный пароль. Попробуйте ещё раз.</p>}
                </div>
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-forest-900 px-6 py-3.5 text-sm font-medium text-sand-50 transition-all duration-500 ease-out-expo hover:bg-forest-800"
                >
                  Войти
                </button>
                <p className="mt-4 text-xs text-ink/40">Пароль по умолчанию: {DEFAULT_PASSWORD}</p>
              </form>
            ) : (
              <>
                {/* Section tab bar */}
                <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-b border-forest-900/8 bg-mist px-4 py-3 sm:px-6">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        tab === t.id
                          ? "bg-forest-900 text-sand-50"
                          : "text-ink/60 hover:bg-forest-900/5 hover:text-ink"
                      }`}
                    >
                      <span aria-hidden="true">{t.icon}</span>
                      {t.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAuthed(false)}
                    className="ml-auto shrink-0 rounded-full px-4 py-2 text-sm font-medium text-ink/50 transition-colors hover:text-ink"
                  >
                    Выйти
                  </button>
                </div>

                {/* Active section */}
                <div className="max-h-[68vh] overflow-y-auto p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease }}
                    >
                      {tab === "projects" && <ProjectsTab />}
                      {tab === "team" && <TeamTab />}
                      {tab === "press" && <PressTab />}
                      {tab === "positions" && <PositionsTab />}
                      {tab === "password" && <PasswordTab />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
