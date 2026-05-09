import { Link, useRouterState } from "@tanstack/react-router";
import { AbstractBackdrop } from "./AbstractBackdrop";

const nav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/advisors/grant", label: "Advisors" },
  { to: "/grants", label: "Grants" },
  { to: "/applications", label: "Applications" },
  { to: "/settings", label: "Settings" },
];

export function SiteShell({ children, variant }: { children: React.ReactNode; variant?: "night" | "calm" | "burst" }) {
  const { location } = useRouterState();
  return (
    <div className="relative min-h-screen text-foreground">
      <AbstractBackdrop variant={variant ?? "night"} />
      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-poiret text-2xl tracking-[0.25em]" style={{ fontFamily: "var(--font-poiret)" }}>NEGOCIO</span>
            <span className="font-script text-sm text-primary">advisor</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {nav.map((n) => {
              const active = location.pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`text-sm uppercase tracking-[0.2em] transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  style={{ fontFamily: "var(--font-mono-disp)" }}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>
        not legal · tax · or financial advice — every claim sourced
      </footer>
    </div>
  );
}

export function GlassCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border border-border/50 bg-card/60 p-6 shadow-2xl backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}
