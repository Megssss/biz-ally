import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, GlassCard } from "@/components/SiteShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Negocio" }, { name: "description", content: "Your unified view: upcoming deadlines, active grant applications, and quick links to each advisor." }] }),
  component: Dashboard,
});

const deadlines = [
  { d: "Jun 14", t: "California Dream Fund — narrative draft", k: "soft", src: "calosba.ca.gov" },
  { d: "Jun 17", t: "Q2 Estimated Tax (1040-ES)", k: "hard", src: "irs.gov" },
  { d: "Jun 20", t: "Sales tax filing — CDTFA", k: "hard", src: "cdtfa.ca.gov" },
  { d: "Jun 28", t: "SBA Restaurant Revitalization — submit", k: "hard", src: "sba.gov" },
  { d: "Jul 02", t: "Gather: 2 yrs tax returns (3 grants)", k: "soft", src: "—" },
];

const apps = [
  { name: "California Dream Fund", amt: "$10,000", deadline: "Jul 12", status: "Drafting narrative", pct: 40 },
  { name: "SBA Community Navigator", amt: "$5,000", deadline: "Jun 28", status: "Documents 80%", pct: 80 },
  { name: "Comerica Hatch Detroit-style local grant", amt: "$25,000", deadline: "Aug 03", status: "Eligibility review", pct: 15 },
];

function Dashboard() {
  return (
    <SiteShell variant="night">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: "var(--font-mono-disp)" }}>welcome back</p>
        <h1 className="mt-2 text-4xl md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
          Today's <span className="font-script text-primary" style={{ fontFamily: "var(--font-script)" }}>quiet plan</span>
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Upcoming deadlines</h2>
            <Link to="/applications" className="text-xs uppercase tracking-[0.25em] text-primary" style={{ fontFamily: "var(--font-mono-disp)" }}>view all</Link>
          </div>
          <ul className="mt-5 divide-y divide-border/40">
            {deadlines.map((d) => (
              <li key={d.t} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <span className={`h-2.5 w-2.5 rounded-full ${d.k === "hard" ? "bg-[var(--maroon)]" : "bg-[var(--tangerine)]"}`} />
                  <div>
                    <p className="text-base">{d.t}</p>
                    <p className="text-xs text-muted-foreground">source · {d.src}</p>
                  </div>
                </div>
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>{d.d}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl">Advisors</h2>
          <ul className="mt-4 space-y-2">
            {[
              ["grant", "Grant"],
              ["tax", "Tax & compliance"],
              ["contract", "Contracts"],
              ["operations", "Operations"],
            ].map(([id, label]) => (
              <li key={id}>
                <Link
                  to="/advisors/$domain"
                  params={{ domain: id }}
                  className="flex items-center justify-between rounded-lg border border-border/40 bg-card/30 px-4 py-3 hover:border-primary/60"
                >
                  <span>{label}</span>
                  <span className="text-primary">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <div className="mt-8">
        <GlassCard>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Active grant applications</h2>
            <Link to="/grants" className="text-xs uppercase tracking-[0.25em] text-primary" style={{ fontFamily: "var(--font-mono-disp)" }}>find more</Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {apps.map((a) => (
              <div key={a.name} className="rounded-xl border border-border/40 bg-card/30 p-4">
                <p className="text-base">{a.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.amt} · due {a.deadline}</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary/60">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${a.pct}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{a.status}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SiteShell>
  );
}
