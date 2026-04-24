import Link from "next/link";
import { QUOTES, CATEGORIES, getSubcategoriesByCategory } from "@/lib/quotes";
import Slideshow from "@/components/Slideshow";
import CategoryCard from "@/components/CategoryCard";

const featured = QUOTES.filter((_, i) => i % 10 === 0);
const catIcons: Record<string, string> = { Inspirational: "✦", Motivational: "◈" };

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateRows: "1fr auto", paddingTop: "64px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 48px 60px", textAlign: "center" }}>
          <div
            className="animate-fade-up"
            style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px" }}
          >
            <span style={{ display: "block", width: "40px", height: "1px", background: "var(--accent2)", opacity: 0.4 }} />
            Words that move the world
            <span style={{ display: "block", width: "40px", height: "1px", background: "var(--accent2)", opacity: 0.4 }} />
          </div>

          <h1
            className="animate-fade-up"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 400, lineHeight: 1.05, marginBottom: "24px" }}
          >
            Find Your Daily{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Inspiration</em>
          </h1>

          <p
            className="animate-fade-up-1"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem,2vw,1.35rem)", fontWeight: 300, color: "var(--muted)", maxWidth: "520px", lineHeight: 1.75, marginBottom: "48px" }}
          >
            280 curated quotes across 29 subcategories — from Inspirational to Motivational — beautifully presented to spark your day.
          </p>

          <div className="animate-fade-up-2" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="#slideshow"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--bg)", background: "var(--accent)", border: "none", padding: "14px 32px", borderRadius: "2px", cursor: "pointer", textDecoration: "none", display: "inline-block" }}
            >
              View Slideshow
            </a>
            <Link
              href="/browse"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", background: "transparent", border: "1px solid var(--tag-border)", padding: "14px 32px", borderRadius: "2px", textDecoration: "none", display: "inline-block" }}
            >
              Browse All Quotes
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid var(--border)" }}>
          {[
            { num: "280", label: "Curated Quotes" },
            { num: "29", label: "Subcategories" },
            { num: "2", label: "Main Categories" },
          ].map(({ num, label }, i) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: "2.2rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginTop: "6px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SLIDESHOW ── */}
      <section id="slideshow" style={{ padding: "100px 48px", borderTop: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "64px", display: "flex", alignItems: "center", gap: "16px" }}>
          Featured Quotes
          <span style={{ flex: 1, height: "1px", background: "var(--border)", display: "block" }} />
        </div>
        <Slideshow quotes={featured} />
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: "100px 48px", borderTop: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "48px", display: "flex", alignItems: "center", gap: "16px" }}>
          Browse by Category
          <span style={{ flex: 1, height: "1px", background: "var(--border)", display: "block" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
          {CATEGORIES.map(cat => {
            const subs = getSubcategoriesByCategory(cat);
            const count = QUOTES.filter(q => q.cat === cat).length;
            const sample = QUOTES.find(q => q.cat === cat)!;
            return (
              <CategoryCard
                key={cat}
                cat={cat}
                icon={catIcons[cat] || "◎"}
                count={count}
                subCount={subs.length}
                sampleText={sample.text.slice(0, 85) + "..."}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
