import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, GlassCard } from "@/components/SiteShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Negocio — Your Business Advisor" },
      { name: "description", content: "An AI business advisor that gives underserved small business owners — and early-stage founders — access to professional infrastructure that used to require a lawyer, accountant, and grant writer." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell variant="night">
      <section className="grid gap-10 py-10 md:grid-cols-5 md:py-20">
        <div className="md:col-span-3">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary" style={{ fontFamily: "var(--font-mono-disp)" }}>
            rolling hills · brush horizon
          </p>
          <h1 className="text-5xl leading-[1.05] md:text-7xl" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Negocio
            <span className="block font-script text-3xl text-primary md:text-4xl" style={{ fontFamily: "var(--font-script)" }}>
              your business advisor
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
            Grants, taxes, contracts, operations — for the small business owners and early-stage
            founders the system wasn't built for. Every claim sourced. Every action transparent.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/onboarding" className="rounded-full bg-primary px-7 py-3 text-sm uppercase tracking-[0.25em] text-primary-foreground transition hover:opacity-90" style={{ fontFamily: "var(--font-mono-disp)" }}>
              Get started
            </Link>
            <Link to="/login" className="rounded-full border border-border/70 px-7 py-3 text-sm uppercase tracking-[0.25em] text-foreground/90 transition hover:bg-card/40" style={{ fontFamily: "var(--font-mono-disp)" }}>
              Sign in
            </Link>
          </div>
        </div>

        <div className="md:col-span-2">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>palette</p>
            <div className="mt-3 flex h-10 overflow-hidden rounded-md">
              <div className="flex-1" style={{ background: "#1a1340" }} />
              <div className="flex-1" style={{ background: "#3a2e72" }} />
              <div className="flex-1" style={{ background: "#7c6fc4" }} />
              <div className="flex-1" style={{ background: "#b9b1e6" }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground italic">Blues · purples — dominant</p>
            <div className="mt-4 flex h-8 overflow-hidden rounded-md">
              <div className="flex-1" style={{ background: "var(--maroon)" }} />
              <div className="flex-1" style={{ background: "var(--pink)" }} />
              <div className="flex-1" style={{ background: "var(--tangerine)" }} />
              <div className="flex-1" style={{ background: "var(--sage)" }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground italic">Maroon · pink · orange · sage — accent</p>
          </GlassCard>

          <GlassCard className="mt-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>art inspo</p>
            <ul className="mt-3 space-y-3">
              {[
                ["Matisse · cut-outs", "Bold organic shapes, joyful abstraction"],
                ["Turner · watercolour skies", "Soft rolling colour, light dissolving into haze"],
                ["Hokusai · flat planes", "Layered silhouettes, horizon depth"],
                ["Kandinsky · rhythm", "Colour as emotion, shapes with feeling"],
              ].map(([t, d]) => (
                <li key={t} className="border-l-2 border-primary/60 pl-3">
                  <p className="text-base">{t}</p>
                  <p className="text-xs text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { t: "Grants & funding", d: "Live discovery from SBA, Grants.gov, CalOSBA. Eligibility reasoning. Source links. Drafted from your profile." },
          { t: "Tax & compliance", d: "IRS Pubs 334, 535, 946, 15 · CDTFA · FTB · EDD. Plain language. Cited. Not legal advice." },
          { t: "Contracts & operations", d: "Upload a lease or supplier agreement. Flag unusual clauses against UCC and California Civil Code. Free legal aid surfaced contextually." },
        ].map((f) => (
          <GlassCard key={f.t}>
            <h3 className="text-xl">{f.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{f.d}</p>
          </GlassCard>
        ))}
      </section>
    </SiteShell>
  );
}
