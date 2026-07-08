"use client";

import { useCallback, useRef, useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";

/**
 * Interactive before/after comparison slider.
 * Drag or use the keyboard (arrow keys) to wipe between states.
 */
export function BeforeAfter({
  beforeLabel = "До — исходный участок",
  afterLabel = "После — готово",
  beforeImage,
  afterImage,
}: {
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: string;
  afterImage?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-4xl"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* After (full width, base layer) */}
      <Placeholder label={afterLabel} src={afterImage} ratio="ultrawide" rounded="rounded-4xl" />

      {/* Before (clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
        aria-hidden="true"
      >
        <div
          className="h-full"
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}
        >
          <Placeholder label={beforeLabel} src={beforeImage} ratio="ultrawide" dark rounded="rounded-none" className="h-full" />
        </div>
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 flex w-0 items-center justify-center"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 w-px bg-sand-50/90" />
        <button
          type="button"
          role="slider"
          aria-label="Comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="relative flex h-12 w-12 cursor-ew-resize items-center justify-center rounded-full border border-forest-900/10 bg-sand-50 text-forest-900 shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M7 6l-3 4 3 4M13 6l3 4-3 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Corner labels */}
      <span className="pointer-events-none absolute left-5 top-5 z-10 rounded-full bg-forest-950/70 px-3 py-1 text-xs font-medium text-sand-50">
        До
      </span>
      <span className="pointer-events-none absolute right-5 top-5 z-10 rounded-full bg-sand-50/90 px-3 py-1 text-xs font-medium text-forest-900">
        После
      </span>
    </div>
  );
}
