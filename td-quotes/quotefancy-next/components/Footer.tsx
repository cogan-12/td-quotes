import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid var(--border)",
        padding: "40px 48px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
      }}
    >
      <div>
        <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", color: "var(--text)" }}>
          TD Quotes
        </div>
        <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "var(--muted)", fontStyle: "italic", marginTop: "4px" }}>
          Turning inspiring quotes into beautiful experiences.
        </div>
      </div>
      <div style={{ display: "flex", gap: "24px" }}>
        {[
          { label: "Home", href: "/" },
          { label: "Browse", href: "/browse" },
          { label: "About", href: "/about" },
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "9px",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "var(--muted)", textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
