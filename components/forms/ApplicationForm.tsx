"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import { openPositions } from "@/lib/data/company";

export function ApplicationForm({ defaultRole }: { defaultRole?: string }) {
  const [submitted, setSubmitted] = useState(false);

  // Front-end only: this is a static marketing site, so we simulate submission.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="rounded-4xl border border-forest-900/8 bg-mist p-8 lg:p-12">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-900 text-sand-50">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12.5l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Application received</h3>
            <p className="mx-auto mt-3 max-w-md text-ink/60">
              Thank you for your interest in GreenSphere. Our talent team will review your application and be in touch shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-8 text-sm font-medium text-forest-700 link-underline"
            >
              Submit another application
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
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" name="firstName" required autoComplete="given-name" placeholder="Jane" />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" required autoComplete="family-name" placeholder="Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@email.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+7 (777) 000-00-00" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="role">Position</Label>
              <Select id="role" name="role" defaultValue={defaultRole ?? ""} required>
                <option value="" disabled>
                  Select a position
                </option>
                {openPositions.map((p) => (
                  <option key={p.title} value={p.title}>
                    {p.title} — {p.location}
                  </option>
                ))}
                <option value="Speculative">Speculative application</option>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Tell us about your experience and why you'd like to join GreenSphere." />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between gap-4">
              <p className="text-xs text-ink/45">We&apos;ll only use your details to process your application.</p>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-forest-900 px-7 py-3.5 text-sm font-medium text-sand-50 transition-all duration-500 ease-out-expo hover:bg-forest-800 hover:shadow-lift"
              >
                Submit application
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
