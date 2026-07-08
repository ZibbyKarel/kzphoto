"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Focal-length zoom axis: a fixed vertical scale on the left edge that mimics
 * the focal-length markings on a camera zoom lens (16–200 mm). As the page
 * scrolls, the whole scale glides past a fixed center index; ticks crossing the
 * index magnify smoothly (a fisheye "zoom"), and a live readout shows the
 * current focal length — a tactile scroll-progress indicator.
 *
 * - Visible only on 2xl+ (≥1536px), where the centered content leaves a wide
 *   enough left gutter for the axis to sit beside it instead of over it.
 * - Per-frame work is transform + opacity only (no layout thrash) for smoothness.
 * - Reduced-motion: the scale is shown static at the top, no ScrollTrigger.
 */
const FOCALS = [16, 24, 35, 50, 70, 105, 135, 200];
const MINORS_PER_GAP = 3;

// Build the tick list: each major, with minor ticks filling the gaps.
type Tick = { value: number | null; major: boolean };
const TICKS: Tick[] = (() => {
  const out: Tick[] = [];
  FOCALS.forEach((value, i) => {
    out.push({ value, major: true });
    if (i < FOCALS.length - 1) {
      for (let m = 0; m < MINORS_PER_GAP; m++) out.push({ value: null, major: false });
    }
  });
  return out;
})();
const LAST = TICKS.length - 1;

/** Exported for unit testing — pure, side-effect-free. */
export function focalAt(progress: number): number {
  const x = progress * (FOCALS.length - 1);
  const i = Math.min(FOCALS.length - 2, Math.floor(x));
  const frac = x - i;
  return Math.round(FOCALS[i] + (FOCALS[i + 1] - FOCALS[i]) * frac);
}

export function FocalAxis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const container = containerRef.current;
      const readout = readoutRef.current;
      if (!container || !readout) return;

      // Lay out every tick + magnify it based on distance from the center index.
      const place = (progress: number) => {
        const H = container.clientHeight;
        const center = H / 2;
        const spread = H * 1.9; // full scale spans ~1.9 viewports → ~15 ticks visible
        const falloff = H * 0.2; // fisheye half-width

        for (let i = 0; i <= LAST; i++) {
          const row = rowRefs.current[i];
          const mark = markRefs.current[i];
          if (!row || !mark) continue;

          const t = i / LAST;
          const y = center + (t - progress) * spread;
          const d = y - center;

          // Cull anything well outside the viewport.
          if (y < -40 || y > H + 40) {
            row.style.opacity = "0";
            row.style.willChange = "auto";
            continue;
          }

          const mag = 1 / (1 + (d / falloff) ** 2); // 1 at index → 0 far away
          // Center the row on y (the second translate is % of the row's own height)
          // so a major tick's mark lands on the index/caret instead of below it.
          row.style.transform = `translateY(${y}px) translateY(-50%)`;
          row.style.opacity = "1";
          row.style.willChange = "transform";

          const markScale = 0.5 + mag * 1.1;
          mark.style.transform = `scaleX(${markScale})`;
          mark.style.opacity = String(0.22 + mag * 0.78);

          const label = labelRefs.current[i];
          if (label) {
            const labelScale = 0.8 + mag * 0.7;
            // Hole around the index keeps a major label from colliding with the readout.
            const hole = Math.min(1, Math.abs(d) / 46);
            label.style.transform = `scale(${labelScale})`;
            label.style.opacity = String(mag * mag * hole); // fade off-center and at the index
          }
        }
        readout.textContent = String(focalAt(progress));
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1536px) and (prefers-reduced-motion: no-preference)", () => {
        const state = { p: 0 };
        place(0);
        gsap.to(state, {
          p: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.6, invalidateOnRefresh: true },
          onUpdate: () => place(state.p),
          onRefresh: () => place(state.p),
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => place(0));

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-3 z-30 hidden h-screen w-24 2xl:block"
    >
      {/* faint vertical guide the ticks hang from */}
      <div
        className="bg-border-strong absolute top-0 h-full w-px"
        style={{ left: "18px" }}
      />

      {/* center index: accent line + caret + live focal-length readout */}
      <div className="absolute top-1/2 left-0 flex w-full -translate-y-1/2 items-center">
        <div className="bg-accent h-px w-12" />
        <div
          className="border-l-accent ml-[-1px] h-0 w-0 border-y-4 border-l-[6px] border-y-transparent"
          style={{ borderLeftColor: "var(--color-accent)" }}
        />
        <span
          ref={readoutRef}
          className="text-accent-strong font-sans ml-1 text-lg leading-none font-semibold tabular-nums"
        >
          16
        </span>
        <span className="text-accent-strong/70 ml-0.5 text-[10px] leading-none">mm</span>
      </div>

      {/* the moving scale */}
      {TICKS.map((tick, i) => (
        <div
          key={i}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 flex w-full items-center"
          style={{ opacity: 0 }}
        >
          <div
            ref={(el) => {
              markRefs.current[i] = el;
            }}
            className="bg-foreground origin-left"
            style={{
              marginLeft: "18px",
              height: tick.major ? "2px" : "1px",
              width: tick.major ? "22px" : "12px",
            }}
          />
          {tick.major && (
            <span
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="text-muted font-sans ml-4 origin-left text-[11px] leading-none tabular-nums"
              style={{ opacity: 0 }}
            >
              {tick.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
