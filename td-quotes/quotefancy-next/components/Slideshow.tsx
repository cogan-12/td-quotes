"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import type { Quote } from "@/lib/quotes";

interface SlideshowProps {
  quotes: Quote[];
}

export default function Slideshow({ quotes }: SlideshowProps) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const INTERVAL = 6000;

  const goTo = useCallback((i: number) => {
    setFading(true);
    setTimeout(() => {
      setIdx(i);
      setFading(false);
      setProgress(0);
    }, 350);
  }, []);

  const next = useCallback(() => {
    goTo((idx + 1) % quotes.length);
  }, [idx, quotes.length, goTo]);

  const prev = useCallback(() => {
    goTo((idx - 1 + quotes.length) % quotes.length);
  }, [idx, quotes.length, goTo]);

  // Auto-play
  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(next, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, next, idx]);

  // Progress bar
  useEffect(() => {
    if (!playing) return;
    setProgress(0);
    const start = Date.now();
    progRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
    }, 50);
    return () => { if (progRef.current) clearInterval(progRef.current); };
  }, [playing, idx]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "p" || e.key === "P") setPlaying(p => !p);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const q = quotes[idx];

  return (
    <div style={{ position: "relative" }}>
      {/* Quote */}
      <div
        style={{
          maxWidth: "780px", margin: "0 auto",
          textAlign: "center", minHeight: "240px",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(10px)" : "translateY(0)",
        }}
      >
        {/* Decorative top line */}
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, transparent, var(--accent))", opacity: 0.4, marginBottom: "28px" }} />

        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.25em",
          textTransform: "uppercase", color: "var(--accent2)",
          background: "rgba(126,184,212,0.08)", border: "1px solid rgba(126,184,212,0.2)",
          padding: "5px 14px", borderRadius: "2px", marginBottom: "10px", display: "inline-block",
        }}>{q.cat}</span>

        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "var(--accent)",
          background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
          padding: "4px 10px", borderRadius: "2px", marginBottom: "36px", display: "inline-block",
        }}>{q.sub}</span>

        <p style={{
          fontFamily: "var(--font-playfair)", fontSize: "clamp(1.3rem,2.2vw,1.85rem)",
          fontStyle: "italic", fontWeight: 400, lineHeight: 1.65,
          color: "var(--text)", marginBottom: "24px",
        }}>
          &ldquo;{q.text}&rdquo;
        </p>

        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "var(--accent)",
        }}>
          — {q.author}
        </p>

        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to top, transparent, var(--accent))", opacity: 0.4, marginTop: "28px" }} />
      </div>

      {/* Progress bar */}
      <div style={{ height: "1px", background: "var(--border)", marginTop: "32px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          background: "linear-gradient(to right, var(--accent), var(--accent2))",
          width: `${progress}%`, opacity: 0.7,
          transition: playing ? "none" : "none",
        }} />
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "36px" }}>
        <button onClick={prev} style={ctrlBtn}>‹</button>

        {/* Dots */}
        <div style={{ display: "flex", gap: "6px" }}>
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === idx ? "18px" : "6px", height: "6px",
                borderRadius: "3px", border: "none",
                background: i === idx ? "var(--accent)" : "var(--border2)",
                cursor: "pointer", transition: "all 0.3s ease", padding: 0,
              }}
            />
          ))}
        </div>

        <button onClick={next} style={ctrlBtn}>›</button>

        <button
          onClick={() => setPlaying(p => !p)}
          style={{
            ...ctrlBtn,
            marginLeft: "8px",
            fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em",
            textTransform: "uppercase", width: "auto", padding: "0 14px",
            color: playing ? "var(--accent)" : "var(--muted)",
            borderColor: playing ? "var(--tag-border)" : "var(--border)",
            background: playing ? "var(--tag-bg)" : "transparent",
          }}
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>
    </div>
  );
}

const ctrlBtn: React.CSSProperties = {
  width: "44px", height: "44px", borderRadius: "2px",
  border: "1px solid var(--border2)", background: "transparent",
  color: "var(--muted)", cursor: "pointer", fontSize: "22px",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "all 0.2s",
};
