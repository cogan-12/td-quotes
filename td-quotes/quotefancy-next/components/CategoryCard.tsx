"use client";
import Link from "next/link";
import { useState } from "react";

interface CategoryCardProps {
  cat: string;
  icon: string;
  count: number;
  subCount: number;
  sampleText: string;
}

export default function CategoryCard({ cat, icon, count, subCount, sampleText }: CategoryCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/browse?cat=${encodeURIComponent(cat)}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "var(--surface2)" : "var(--bg)",
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "background 0.2s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", color: "var(--accent)", opacity: 0.35, marginBottom: "14px" }}>
          {icon}
        </div>
        <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text)", marginBottom: "8px" }}>
          {cat}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "18px" }}>
          {count} quotes · {subCount} subcategories
        </div>
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", fontStyle: "italic", fontWeight: 300, color: "var(--muted)", lineHeight: 1.6, flex: 1 }}>
          &ldquo;{sampleText}&rdquo;
        </p>
        <div style={{
          marginTop: "22px",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: "var(--accent)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-6px)",
          transition: "opacity 0.2s, transform 0.2s",
        }}>
          Browse {cat} →
        </div>
      </div>
    </Link>
  );
}
