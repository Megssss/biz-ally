import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { SiteShell, GlassCard } from "@/components/SiteShell";
import { useState } from "react";

export const Route = createFileRoute("/advisors/$domain")({
  head: ({ params }) => {
    const titles: Record<string, string> = {
      grant: "Grant advisor",
      tax: "Tax & compliance advisor",
      contract: "Contract advisor",
      operations: "Operations advisor",
    };
    const t = titles[params.domain] ?? "Advisor";
    return { meta: [{ title: `${t} — Negocio` }, { name: "description", content: `${t} chat for your business — every claim sourced.` }] };
  },
  component: AdvisorPage,
});

const meta: Record<string, { t: string; sub: string; placeholder: string; sources: string[] }> = {
  grant: {
    t: "Grant advisor",
    sub: "Live discovery from SBA, Grants.gov, CalOSBA, SBDC, California Competes.",
    placeholder: "Find grants for a Latina-owned food truck in San Diego, 3 yrs operating…",
    sources: ["sba.gov", "grants.gov", "calosba.ca.gov"],
  },
  tax: {
    t: "Tax & compliance",
    sub: "IRS Pubs 334, 535, 946, 15 · CDTFA · FTB · Labor Commissioner · EDD.",
    placeholder: "¿Qué gastos puedo deducir? — vehicle mileage for a food truck",
    sources: ["irs.gov", "cdtfa.ca.gov", "ftb.ca.gov"],
  },
  contract: {
    t: "Contract advisor",
    sub: "Upload a lease, supplier, ToS, or contractor agreement. Flags unusual clauses against UCC and California Civil Code.",
    placeholder: "Paste contract text or upload a PDF…",
    sources: ["UCC", "Cal. Civil Code", "selfhelp.courts.ca.gov"],
  },
  operations: {
    t: "Operations advisor",
    sub: "Day-to-day. Hiring · health inspection · supplier disputes · review responses.",
    placeholder: "I just got a 1-star Yelp review — how do I respond?",
    sources: ["Cal. Labor Comm.", "CalOSHA", "SD County DEH"],
  },
};

function AdvisorPage() {
  const { domain } = useParams({ from: "/advisors/$domain" });
  const m = meta[domain] ?? meta.grant;
  const [msg, setMsg] = useState("");

  return (
    <SiteShell variant="brush">
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(meta).map(([id, v]) => (
          <Link
            key={id}
            to="/advisors/$domain"
            params={{ domain: id }}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition ${id === domain ? "border-primary bg-primary/15 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/60"}`}
            style={{ fontFamily: "var(--font-mono-disp)" }}
          >
            {v.t.split(" ")[0]}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: "var(--font-mono-disp)" }}>{domain}</p>
          <h1 className="mt-1 text-4xl">{m.t}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{m.sub}</p>

          <div className="mt-6 space-y-4">
            <ChatBubble who="advisor">
              <p>How can I help today? I'll cite every authoritative source and keep softer reasoning clearly labeled.</p>
            </ChatBubble>
          </div>

          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setMsg("");
            }}
          >
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={m.placeholder}
              className="flex-1 rounded-full border border-border/60 bg-input/60 px-5 py-3 outline-none focus:border-primary"
            />
            <button className="rounded-full bg-primary px-6 text-xs uppercase tracking-[0.2em] text-primary-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>send</button>
          </form>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>authority sources</p>
            <ul className="mt-3 space-y-2 text-sm">
              {m.sources.map((s) => (
                <li key={s} className="border-l-2 border-primary/60 pl-3">{s}</li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>scope limits</p>
            <p className="mt-3 text-sm text-muted-foreground">No active IRS audits. No legal representation. Multi-state and complex specialist regulation routed to SCORE, legal aid, or local SBDC.</p>
          </GlassCard>
        </div>
      </div>
    </SiteShell>
  );
}

function ChatBubble({ who, children }: { who: "advisor" | "you"; children: React.ReactNode }) {
  return (
    <div className={`flex ${who === "you" ? "justify-end" : ""}`}>
      <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${who === "advisor" ? "bg-card/60 border border-border/40" : "bg-primary text-primary-foreground"}`}>
        {children}
      </div>
    </div>
  );
}
