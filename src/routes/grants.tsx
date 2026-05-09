import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, GlassCard } from "@/components/SiteShell";
import { useState } from "react";

export const Route = createFileRoute("/grants")({
  head: () => ({ meta: [{ title: "Grant discovery — Negocio" }, { name: "description", content: "Live grant discovery against authoritative sources. Every result links to its primary source." }] }),
  component: GrantsPage,
});

const sample = [
  {
    name: "California Dream Fund",
    amt: "$10,000",
    deadline: "Jul 12, 2025",
    elig: "Microbusiness · CA · pre-revenue or under $50k · completed SBDC training",
    src: "calosba.ca.gov",
  },
  {
    name: "SBA Community Navigator Pilot",
    amt: "$5,000",
    deadline: "Jun 28, 2025",
    elig: "Underserved community · sole prop or LLC · less than 10 employees",
    src: "sba.gov",
  },
  {
    name: "California Competes Tax Credit",
    amt: "Up to $25,000",
    deadline: "Aug 03, 2025",
    elig: "Plans to grow employment in CA · all sizes considered",
    src: "calcompetes.ca.gov",
  },
];

function GrantsPage() {
  const [query, setQuery] = useState("");
  return (
    <SiteShell variant="geometry">
      <h1 className="text-4xl md:text-5xl">Grant <span className="font-script text-primary" style={{ fontFamily: "var(--font-script)" }}>discovery</span></h1>
      <p className="mt-2 text-sm text-muted-foreground">Live search — never a static database. If a page is down or a deadline has passed, we say so.</p>

      <GlassCard className="mt-6">
        <form className="flex flex-wrap gap-3" onSubmit={(e) => e.preventDefault()}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Industry, location, demographic — anything in your profile auto-applies" className="flex-1 min-w-[260px] rounded-full border border-border/60 bg-input/60 px-5 py-3 outline-none focus:border-primary" />
          <button className="rounded-full bg-primary px-7 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>search</button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {["sba.gov", "grants.gov", "calosba.ca.gov", "California Competes", "SBDC"].map((s) => (
            <span key={s} className="rounded-full border border-border/40 px-3 py-1 text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>{s}</span>
          ))}
        </div>
      </GlassCard>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sample.map((g) => (
          <GlassCard key={g.name}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl">{g.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{g.amt} · due {g.deadline}</p>
              </div>
              <span className="rounded-full border border-[var(--sage)]/60 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[color:var(--sage)]" style={{ fontFamily: "var(--font-mono-disp)" }}>eligible</span>
            </div>
            <p className="mt-3 text-sm">{g.elig}</p>
            <div className="mt-4 flex items-center justify-between">
              <a className="text-xs underline text-muted-foreground" href="#">{g.src} ↗</a>
              <button className="rounded-full bg-primary px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>track this grant</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </SiteShell>
  );
}
