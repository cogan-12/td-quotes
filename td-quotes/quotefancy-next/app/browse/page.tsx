"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QUOTES, CATEGORIES, getSubcategoriesByCategory } from "@/lib/quotes";
import QuoteCard from "@/components/QuoteCard";

function BrowseContent() {
  const params = useSearchParams();
  const [activeCat, setActiveCat] = useState<string | null>(params.get("cat"));
  const [activeSub, setActiveSub] = useState<string | null>(params.get("sub"));
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(24);

  const filtered = useMemo(() => {
    return QUOTES.filter(q => {
      const matchCat = !activeCat || q.cat === activeCat;
      const matchSub = !activeSub || q.sub === activeSub;
      const q2 = search.toLowerCase();
      const matchSearch = !q2 || q.text.toLowerCase().includes(q2) || q.author.toLowerCase().includes(q2) || q.sub.toLowerCase().includes(q2) || q.cat.toLowerCase().includes(q2);
      return matchCat && matchSub && matchSearch;
    });
  }, [activeCat, activeSub, search]);

  const heading = activeSub ? activeSub : activeCat ? `${activeCat} Quotes` : "All Quotes";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh", paddingTop: "64px" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        borderRight: "1px solid var(--border)",
        position: "sticky", top: "64px", height: "calc(100vh - 64px)",
        overflowY: "auto", padding: "28px 20px",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "18px" }}>
          Filter Quotes
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "24px" }}>
          <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: "13px", pointerEvents: "none" }}>⌕</span>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => { setSearch(e.target.value); setVisible(24); }}
            style={{
              width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
              borderRadius: "2px", padding: "9px 12px 9px 32px",
              fontFamily: "var(--font-cormorant)", fontSize: "0.95rem",
              color: "var(--text)", outline: "none",
            }}
          />
        </div>

        {/* Category tree */}
        {CATEGORIES.map(cat => {
          const subs = getSubcategoriesByCategory(cat);
          const isActive = activeCat === cat;
          return (
            <div key={cat} style={{ marginBottom: "4px" }}>
              <button
                onClick={() => {
                  setActiveCat(isActive ? null : cat);
                  setActiveSub(null);
                  setVisible(24);
                }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 12px", borderRadius: "2px",
                  background: isActive ? "var(--tag-bg)" : "transparent",
                  border: "none", cursor: "pointer",
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: isActive ? "var(--accent)" : "var(--muted)",
                  textAlign: "left",
                }}
              >
                <span>{cat}</span>
                <span style={{ fontSize: "9px", opacity: 0.6 }}>{QUOTES.filter(q => q.cat === cat).length}</span>
              </button>

              {isActive && (
                <div style={{ paddingLeft: "8px", marginTop: "2px" }}>
                  {subs.map(sub => {
                    const isSubActive = activeSub === sub;
                    return (
                      <button
                        key={sub}
                        onClick={() => { setActiveSub(isSubActive ? null : sub); setVisible(24); }}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "7px 12px", borderRadius: "2px",
                          background: isSubActive ? "rgba(200,169,110,0.06)" : "transparent",
                          border: "none", cursor: "pointer",
                          fontFamily: "var(--font-cormorant)", fontSize: "0.9rem", fontStyle: "italic",
                          color: isSubActive ? "var(--accent)" : "var(--muted2)",
                          textAlign: "left",
                        }}
                      >
                        <span>{sub}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", opacity: 0.5, fontStyle: "normal" }}>{QUOTES.filter(q => q.sub === sub).length}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={() => { setActiveCat(null); setActiveSub(null); setSearch(""); setVisible(24); }}
          style={{
            width: "100%", marginTop: "20px", padding: "9px",
            fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em",
            textTransform: "uppercase", color: "var(--muted)",
            background: "transparent", border: "1px solid var(--border)",
            borderRadius: "2px", cursor: "pointer",
          }}
        >
          Clear Filters
        </button>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ padding: "40px 48px" }}>
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          marginBottom: "32px", paddingBottom: "20px", borderBottom: "1px solid var(--border)",
          flexWrap: "wrap", gap: "12px",
        }}>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 400 }}>
            {activeSub
              ? <><em style={{ fontStyle: "italic", color: "var(--accent)" }}>{activeSub}</em></>
              : activeCat
              ? <>{activeCat} <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Quotes</em></>
              : <>All <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Quotes</em></>}
          </h1>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>
            {filtered.length} quote{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: "40px", opacity: 0.15, marginBottom: "16px" }}>◎</div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", color: "var(--muted)", fontStyle: "italic" }}>
              No quotes found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: "1px", background: "var(--border)" }}>
              {filtered.slice(0, visible).map((q, i) => (
                <QuoteCard key={`${q.sub}-${i}`} quote={q} />
              ))}
            </div>
            {filtered.length > visible && (
              <div style={{ textAlign: "center", paddingTop: "48px" }}>
                <button
                  onClick={() => setVisible(v => v + 24)}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "var(--accent)",
                    background: "transparent", border: "1px solid var(--tag-border)",
                    padding: "12px 28px", borderRadius: "2px", cursor: "pointer",
                  }}
                >
                  Load More Quotes
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: "64px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em" }}>Loading...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
