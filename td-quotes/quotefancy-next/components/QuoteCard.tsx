"use client";
import { useState } from "react";
import type { Quote } from "@/lib/quotes";

export default function QuoteCard({ quote }: { quote: Quote }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{
        background: "var(--bg)", padding: "32px 28px",
        display: "flex", flexDirection: "column",
        transition: "background 0.2s", cursor: "default",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")}
      onMouseLeave={e => (e.currentTarget.style.background = "var(--bg)")}
      className="quote-card-hover"
    >
      {/* Tags */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.15em",
          textTransform: "uppercase", padding: "3px 8px", borderRadius: "1px",
          color: "var(--accent2)", background: "rgba(126,184,212,0.08)",
          border: "1px solid rgba(126,184,212,0.18)",
        }}>{quote.cat}</span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.15em",
          textTransform: "uppercase", padding: "3px 8px", borderRadius: "1px",
          color: "var(--accent)", background: "var(--tag-bg)",
          border: "1px solid var(--tag-border)",
        }}>{quote.sub}</span>
      </div>

      {/* Quote text */}
      <p style={{
        fontFamily: "var(--font-playfair)", fontSize: "1.05rem",
        fontStyle: "italic", fontWeight: 400, lineHeight: 1.65,
        color: "var(--text)", flex: 1, marginBottom: "20px",
      }}>
        &ldquo;{quote.text}&rdquo;
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "10px",
          letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)",
        }}>
          — {quote.author}
        </span>
        <button
          onClick={handleCopy}
          title="Copy quote"
          style={{
            width: "30px", height: "30px", borderRadius: "2px",
            border: `1px solid ${copied ? "#6dbf8c" : "var(--border)"}`,
            background: "transparent",
            color: copied ? "#6dbf8c" : "var(--muted)",
            cursor: "pointer", fontSize: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          {copied ? "✓" : "⎘"}
        </button>
      </div>
    </div>
  );
}
