"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input, Label } from "@/components/ui/Field";
import { DEFAULT_PASSWORD, verifyPassword } from "@/lib/admin";
import { PositionsTab, TeamTab, ProjectsTab, PressTab, PasswordTab } from "./Tabs";

const ease = [0.16, 1, 0.3, 1] as const;

const SECTIONS = [
  { id: "projects", label: "Проекты", icon: "🏗️", hint: "Добавить, изменить, удалить проекты и фото" },
  { id: "team", label: "Команда", icon: "👥", hint: "Сотрудники, должности и портреты" },
  { id: "press", label: "Пресса", icon: "📰", hint: "Публикации СМИ и обложки" },
  { id: "positions", label: "Вакансии", icon: "💼", hint: "Открытые вакансии" },
  { id: "password", label: "Пароль", icon: "🔑", hint: "Сменить пароль входа" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];
type View = "menu" | SectionId;

export function AdminPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [view, setView] = useState<View>("menu");

  // Reset state whenever the panel closes.
  useEffect(() => {
    if (!open) {
      setAuthed(false);
      setPw("");
      setError(false);
      setView("menu");
    }
  }, [open]);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the panel (allowed exit #1).
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
      setView("menu");
    } else {
      setError(true);
    }
  };

  const activeSection = SECTIONS.find((s) => s.id === view);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Панель администратора"
        >
          {/* Backdrop — does NOT close on click (exit only via Esc or the ✕). */}
          <div className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm" aria-hidden="true" />

          <motion.div
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-4xl bg-paper shadow-lift"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
          >
            {/* Header — always visible (never scrolls away) */}
            <div className="flex shrink-0 items-center justify-between border-b border-forest-900/8 bg-forest-950 px-5 py-4 text-sand-50 sm:px-7">
              <div className="flex min-w-0 items-center gap-3">
                {authed && view !== "menu" ? (
                  <button
                    type="button"
                    onClick={() => setView("menu")}
                    aria-label="Назад в меню"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sand-100/80 transition-colors hover:bg-white/10 hover:text-sand-50"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <span className="text-lg" role="img" aria-hidden="true">🔐</span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {activeSection ? activeSection.label : "Панель администратора"}
                  </p>
                  <p className="truncate text-xs text-sand-100/50">
                    {activeSection ? "Nord Botanic · раздел" : "Nord Botanic"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть панель"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sand-100/70 transition-colors hover:bg-white/10 hover:text-sand-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              {!authed ? (
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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, x: view === "menu" ? -12 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: view === "menu" ? 12 : -12 }}
                    transition={{ duration: 0.22, ease }}
                    className="p-6 sm:p-8"
                  >
                    {view === "menu" ? (
                      /* Main admin menu */
                      <div>
                        <p className="text-sm text-ink/55">Выберите раздел для редактирования.</p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {SECTIONS.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setView(s.id)}
                              className="group flex items-center gap-4 rounded-3xl border border-forest-900/8 bg-mist p-5 text-left shadow-subtle transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-forest-900/15 hover:shadow-lift"
                            >
                              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-paper text-2xl shadow-subtle transition-transform duration-500 ease-out-expo group-hover:scale-105" role="img" aria-hidden="true">
                                {s.icon}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-base font-semibold text-ink">{s.label}</span>
                                <span className="mt-0.5 block text-xs leading-snug text-ink/50">{s.hint}</span>
                              </span>
                              <svg className="ml-auto h-4 w-4 shrink-0 text-forest-600 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setAuthed(false)}
                          className="mt-6 text-sm font-medium text-ink/50 transition-colors hover:text-ink"
                        >
                          Заблокировать панель
                        </button>
                      </div>
                    ) : (
                      <>
                        {view === "projects" && <ProjectsTab />}
                        {view === "team" && <TeamTab />}
                        {view === "press" && <PressTab />}
                        {view === "positions" && <PositionsTab />}
                        {view === "password" && <PasswordTab />}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
