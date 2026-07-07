"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input, Label, Select } from "@/components/ui/Field";
import {
  DEFAULT_PASSWORD,
  getPositions,
  savePositions,
  resetPositions,
  setPassword as persistPassword,
  verifyPassword,
  type Position,
} from "@/lib/admin";

const departments = [
  "Проектирование",
  "Инженерия",
  "Строительство",
  "Обслуживание",
  "Устойчивое развитие",
  "Коммерция",
  "Теплица",
];

const ease = [0.16, 1, 0.3, 1] as const;

export function AdminPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const [positions, setPositions] = useState<Position[]>([]);
  const [draft, setDraft] = useState<Position>({
    title: "",
    department: departments[0],
    location: "Кокшетау",
    type: "Полная занятость",
  });

  const [newPassword, setNewPassword] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  // Reset auth each time the panel closes (hidden admin should re-login).
  useEffect(() => {
    if (!open) {
      setAuthed(false);
      setPw("");
      setError(false);
      setNewPassword("");
      setPwSaved(false);
    } else {
      setPositions(getPositions());
    }
  }, [open]);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
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
      setPositions(getPositions());
    } else {
      setError(true);
    }
  };

  const addPosition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    const next = [...positions, draft];
    setPositions(next);
    savePositions(next);
    setDraft({ title: "", department: departments[0], location: "Кокшетау", type: "Полная занятость" });
  };

  const removePosition = (index: number) => {
    const next = positions.filter((_, i) => i !== index);
    setPositions(next);
    savePositions(next);
  };

  const restoreDefaults = () => {
    resetPositions();
    setPositions(getPositions());
  };

  const savePw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    persistPassword(newPassword.trim());
    setNewPassword("");
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2500);
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
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-4xl bg-paper shadow-lift"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-forest-900/8 bg-forest-950 px-8 py-5 text-sand-50">
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

            <div className="max-h-[70vh] overflow-y-auto p-8">
              {!authed ? (
                /* Login */
                <form onSubmit={login} className="mx-auto max-w-sm py-6 text-center">
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
                      onChange={(e) => {
                        setPw(e.target.value);
                        setError(false);
                      }}
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
                /* Management */
                <div className="space-y-10">
                  {/* Vacancies */}
                  <section>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold tracking-tight text-ink">Вакансии</h2>
                      <button
                        type="button"
                        onClick={restoreDefaults}
                        className="text-xs font-medium text-forest-700 link-underline"
                      >
                        Сбросить к исходным
                      </button>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {positions.length === 0 && (
                        <li className="rounded-2xl border border-dashed border-forest-900/15 px-4 py-6 text-center text-sm text-ink/45">
                          Вакансий пока нет.
                        </li>
                      )}
                      {positions.map((p, i) => (
                        <li
                          key={`${p.title}-${i}`}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-forest-900/8 bg-mist px-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-ink">{p.title}</p>
                            <p className="truncate text-xs text-ink/50">
                              {p.department} · {p.location} · {p.type}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removePosition(i)}
                            aria-label={`Удалить вакансию ${p.title}`}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-red-50 hover:text-red-500"
                          >
                            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                              <path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Add form */}
                    <form onSubmit={addPosition} className="mt-5 rounded-3xl border border-forest-900/8 p-5">
                      <p className="text-sm font-medium text-ink">Добавить вакансию</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <Label htmlFor="v-title">Должность</Label>
                          <Input
                            id="v-title"
                            value={draft.title}
                            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                            placeholder="напр. Ландшафтный архитектор"
                          />
                        </div>
                        <div>
                          <Label htmlFor="v-dep">Отдел</Label>
                          <Select
                            id="v-dep"
                            value={draft.department}
                            onChange={(e) => setDraft({ ...draft, department: e.target.value })}
                          >
                            {departments.map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="v-loc">Локация</Label>
                          <Input
                            id="v-loc"
                            value={draft.location}
                            onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                            placeholder="Кокшетау"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="v-type">Тип занятости</Label>
                          <Input
                            id="v-type"
                            value={draft.type}
                            onChange={(e) => setDraft({ ...draft, type: e.target.value })}
                            placeholder="Полная занятость"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest-900 px-5 py-2.5 text-sm font-medium text-sand-50 transition-colors hover:bg-forest-800"
                      >
                        <span className="text-base leading-none">＋</span> Добавить
                      </button>
                    </form>
                  </section>

                  {/* Password */}
                  <section className="border-t border-forest-900/8 pt-8">
                    <h2 className="text-lg font-semibold tracking-tight text-ink">Сменить пароль</h2>
                    <form onSubmit={savePw} className="mt-4 flex flex-wrap items-end gap-3">
                      <div className="min-w-[12rem] flex-1">
                        <Label htmlFor="new-pw">Новый пароль</Label>
                        <Input
                          id="new-pw"
                          type="text"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Новый пароль"
                        />
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-full border border-forest-900/15 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-forest-900/40 hover:bg-forest-50"
                      >
                        Сохранить пароль
                      </button>
                      {pwSaved && <span className="text-sm font-medium text-forest-600">✓ Сохранено</span>}
                    </form>
                    <p className="mt-3 text-xs text-ink/40">
                      Пароль хранится в этом браузере (localStorage). Это демо-панель без сервера.
                    </p>
                  </section>

                  <div className="flex justify-end border-t border-forest-900/8 pt-6">
                    <button
                      type="button"
                      onClick={() => setAuthed(false)}
                      className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
