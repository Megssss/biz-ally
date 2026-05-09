import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, GlassCard } from "@/components/SiteShell";
import { useState } from "react";

export const Route = createFileRoute("/applications")({
  head: () => ({ meta: [{ title: "Applications — Negocio" }, { name: "description", content: "Track active grant applications, decomposed tasks, and unified deadlines." }] }),
  component: ApplicationsPage,
});

const apps = [
  {
    name: "California Dream Fund",
    amt: "$10,000",
    deadline: "Jul 12",
    tasks: [
      { t: "Gather: tax returns 2022–2024 (also feeds SBA Navigator)", k: "soft", d: "Jun 14" },
      { t: "Draft business narrative", k: "soft", d: "Jun 22" },
      { t: "Financial summary", k: "soft", d: "Jun 28" },
      { t: "SBDC training certificate upload", k: "soft", d: "Jul 02" },
      { t: "Final review", k: "soft", d: "Jul 08" },
      { t: "Submit (3-day buffer)", k: "hard", d: "Jul 09" },
    ],
  },
  {
    name: "SBA Community Navigator",
    amt: "$5,000",
    deadline: "Jun 28",
    tasks: [
      { t: "Gather: tax returns 2022–2024 (shared)", k: "soft", d: "Jun 14" },
      { t: "Letter of support — local SBDC", k: "soft", d: "Jun 18" },
      { t: "Submit (3-day buffer)", k: "hard", d: "Jun 25" },
    ],
  },
];

function ApplicationsPage() {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <SiteShell variant="panels">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl">Applications</h1>
          <p className="mt-2 text-sm text-muted-foreground">Cross-grant tasks are batched. Hard deadlines red. Soft deadlines amber.</p>
        </div>
        <button onClick={() => setShowPreview(true)} className="rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>preview calendar push</button>
      </div>

      <div className="mt-6 space-y-6">
        {apps.map((a) => (
          <GlassCard key={a.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl">{a.name}</h2>
              <span className="text-sm text-muted-foreground">{a.amt} · final due {a.deadline}</span>
            </div>
            <ul className="mt-4 divide-y divide-border/40">
              {a.tasks.map((t) => (
                <li key={t.t} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <span className={`h-2.5 w-2.5 rounded-full ${t.k === "hard" ? "bg-[var(--maroon)]" : "bg-[var(--tangerine)]"}`} />
                    <p>{t.t}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>{t.d}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-30 grid place-items-center bg-background/70 p-4 backdrop-blur">
          <GlassCard className="w-full max-w-lg">
            <h3 className="text-2xl">Calendar push preview</h3>
            <p className="mt-1 text-sm text-muted-foreground">Nothing is added until you confirm.</p>
            <ul className="mt-4 max-h-72 space-y-2 overflow-auto">
              {apps.flatMap((a) => a.tasks.map((t) => (
                <li key={a.name + t.t} className="flex items-center justify-between rounded-lg border border-border/40 bg-card/30 px-3 py-2 text-sm">
                  <span className="flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${t.k === "hard" ? "bg-[var(--maroon)]" : "bg-[var(--tangerine)]"}`} />{t.t}</span>
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>{t.d}</span>
                </li>
              )))}
            </ul>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setShowPreview(false)} className="rounded-full border border-border/60 px-5 py-2 text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono-disp)" }}>cancel</button>
              <button onClick={() => setShowPreview(false)} className="rounded-full bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>confirm & add</button>
            </div>
          </GlassCard>
        </div>
      )}
    </SiteShell>
  );
}
