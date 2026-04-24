"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "64px",
        background: "rgba(9,9,14,0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-mono)", fontSize: "13px",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--accent)", textDecoration: "none",
        }}
      >
        TD<span style={{ color: "var(--muted)" }}> Quotes</span>
      </Link>

      <div style={{ display: "flex" }}>
        {[
          { label: "Home", href: "/" },
          { label: "Browse", href: "/browse" },
          { label: "About", href: "/about" },
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "10px",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: path === href ? "var(--accent)" : "var(--muted)",
              textDecoration: "none", padding: "8px 18px", borderRadius: "2px",
              transition: "color 0.2s",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
