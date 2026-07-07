"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";

const inquiryTypes = [
  "Новый проект / тендер",
  "Партнёрство",
  "Договор на обслуживание",
  "Пресса и СМИ",
  "Общий вопрос",
];

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="rounded-4xl border border-forest-900/8 bg-paper p-8 shadow-subtle lg:p-10">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-10 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-900 text-sand-50">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12.5l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Сообщение отправлено</h3>
            <p className="mx-auto mt-3 max-w-md text-ink/60">
              Спасибо за обращение. Наша команда ответит в течение одного рабочего дня.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-8 text-sm font-medium text-forest-700 link-underline"
            >
              Отправить ещё одно сообщение
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="grid gap-6 sm:grid-cols-2"
          >
            <div>
              <Label htmlFor="name">Имя и фамилия</Label>
              <Input id="name" name="name" required autoComplete="name" placeholder="Иван Иванов" />
            </div>
            <div>
              <Label htmlFor="organisation">Организация</Label>
              <Input id="organisation" name="organisation" autoComplete="organization" placeholder="Название компании…" />
            </div>
            <div>
              <Label htmlFor="c-email">Эл. почта</Label>
              <Input id="c-email" name="email" type="email" required autoComplete="email" placeholder="ivan@email.com" />
            </div>
            <div>
              <Label htmlFor="c-phone">Телефон</Label>
              <Input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="+7 (777) 000-00-00" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="type">Тип обращения</Label>
              <Select id="type" name="type" defaultValue="" required>
                <option value="" disabled>
                  Выберите тему
                </option>
                {inquiryTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="c-message">Чем можем помочь?</Label>
              <Textarea id="c-message" name="message" required placeholder="Расскажите о вашем участке, задании и сроках." />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between gap-4">
              <p className="text-xs text-ink/45">Обычное время ответа: 1 рабочий день.</p>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-forest-900 px-7 py-3.5 text-sm font-medium text-sand-50 transition-all duration-500 ease-out-expo hover:bg-forest-800 hover:shadow-lift"
              >
                Отправить сообщение
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
