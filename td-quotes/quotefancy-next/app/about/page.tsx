import Link from "next/link";
import { QUOTES, CATEGORIES } from "@/lib/quotes";

const subs = [...new Set(QUOTES.map(q => q.sub))];
const authors = new Set(QUOTES.map(q => q.author));

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <div style={{ padding: "100px 48px 80px", maxWidth: "860px", borderBottom: "1px solid var(--border)", paddingTop: "calc(100px + 64px)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "32px", height: "1px", background: "var(--accent2)", opacity: 0.4, display: "block" }} />
          About TD Quotes
        </div>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "28px" }}>
          Words have the power<br />to <em style={{ fontStyle: "italic", color: "var(--accent)" }}>change everything.</em>
        </h1>
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem,2vw,1.35rem)", fontWeight: 300, color: "var(--muted)", lineHeight: 1.8, maxWidth: "640px" }}>
          TD Quotes is a curated collection of the world&apos;s most powerful quotes — organized, searchable, and presented beautifully to inspire your daily life, work, and growth.
        </p>
      </div>

      {/* ── FOUR PILLARS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--border)" }}>
        {[
          { n: "01", title: "Our Mission", body: "We believe that the right words at the right moment can shift a mindset, spark a breakthrough, or simply remind you of what matters most. Our mission is to make those words easy to find, beautiful to experience, and impossible to forget." },
          { n: "02", title: "Curated with Care", body: "Every quote in our collection is hand-selected and organized into meaningful categories and subcategories — from Motivational Monday quotes to Christian Inspirational wisdom — so you can always find exactly what you need, when you need it." },
          { n: "03", title: "Built for Everyone", body: "Whether you're an entrepreneur seeking a spark of courage, a woman looking for empowering words, or someone searching for morning motivation, our library has something for you. We cover life, love, success, faith, fitness, and everything in between." },
          { n: "04", title: "Always Growing", body: "This is just the beginning. Our current collection spans two core categories — Inspirational and Motivational — with over 280 quotes across 29 subcategories. We continue to expand the library with new voices and perspectives." },
        ].map(({ n, title, body }, i) => (
          <div key={n} style={{
            padding: "60px 48px",
            borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
            borderBottom: i < 2 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{ fontFamily: "var(--font-playfair)", fontSize: "3.5rem", fontWeight: 700, color: "var(--accent)", opacity: 0.12, lineHeight: 1, marginBottom: "14px" }}>{n}</div>
            <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "14px" }}>{title}</div>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", fontWeight: 300, color: "var(--muted)", lineHeight: 1.8 }}>{body}</p>
          </div>
        ))}
      </div>

      {/* ── STATS ── */}
      <div style={{ padding: "80px 48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "48px", display: "flex", alignItems: "center", gap: "16px" }}>
          By the Numbers
          <span style={{ flex: 1, height: "1px", background: "var(--border)", display: "block" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
          {[
            { num: "280", label: "Curated Quotes" },
            { num: "29", label: "Subcategories" },
            { num: String(CATEGORIES.length), label: "Main Categories" },
            { num: `${authors.size}+`, label: "Unique Authors" },
          ].map(({ num, label }) => (
            <div key={label} style={{ background: "var(--bg)", padding: "36px 32px" }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: "2.8rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1, marginBottom: "8px" }}>{num}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ALL SUBCATEGORIES ── */}
      <div style={{ padding: "80px 48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "40px", display: "flex", alignItems: "center", gap: "16px" }}>
          All Subcategories
          <span style={{ flex: 1, height: "1px", background: "var(--border)", display: "block" }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {subs.map(sub => {
            const cat = QUOTES.find(q => q.sub === sub)!.cat;
            return (
              <Link
                key={sub}
                href={`/browse?cat=${encodeURIComponent(cat)}&sub=${encodeURIComponent(sub)}`}
                style={{
                  fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", fontStyle: "italic",
                  color: "var(--muted)", background: "var(--surface)",
                  border: "1px solid var(--border)", borderRadius: "2px",
                  padding: "6px 16px", textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseEnter={undefined}
              >
                {sub}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── FEATURED QUOTE + CTA ── */}
      <div style={{ padding: "80px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: "var(--font-playfair)", fontSize: "100px", lineHeight: 0, color: "var(--accent)", opacity: 0.08, position: "absolute", top: "30px", left: "-16px" }}>&ldquo;</div>
          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.2rem,2vw,1.6rem)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.65, color: "var(--text)", marginBottom: "24px" }}>
            &ldquo;The two most important days in your life are the day you are born and the day you find out why.&rdquo;
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)" }}>
            — Mark Twain
          </p>
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 400, marginBottom: "16px" }}>
            Ready to find your <em style={{ fontStyle: "italic", color: "var(--accent)" }}>quote?</em>
          </h2>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", fontWeight: 300, color: "var(--muted)", lineHeight: 1.75, marginBottom: "32px" }}>
            Browse our full library of 280 curated quotes. Filter by category, subcategory, or search for a specific author or theme.
          </p>
          <Link
            href="/browse"
            style={{
              display: "inline-block", fontFamily: "var(--font-mono)",
              fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--bg)", background: "var(--accent)",
              padding: "14px 32px", borderRadius: "2px", textDecoration: "none",
            }}
          >
            Browse All Quotes →
          </Link>
        </div>
      </div>
    </>
  );
}
