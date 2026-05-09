import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteShell, GlassCard } from "@/components/SiteShell";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — Negocio" }, { name: "description", content: "Set up your business profile so every advisor answer is tailored to you." }] }),
  component: Onboarding,
});

const stages = [
  { id: "idea", t: "Idea / Pre-MVP", d: "Concept exists, nothing built yet" },
  { id: "mvp", t: "MVP built, not operating", d: "Product exists, no revenue" },
  { id: "early", t: "Early operating", d: "Under 2 years · under $50k revenue" },
  { id: "established", t: "Established", d: "2+ years · $50k+ revenue" },
];

function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<string>("");

  return (
    <SiteShell variant="paper">
      <div className="mx-auto max-w-2xl py-6">
        <p className="text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: "var(--font-mono-disp)" }}>
          step {step + 1} / 3
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl">Tell us about your business</h1>

        <div className="mt-8 space-y-6">
          {step === 0 && (
            <GlassCard>
              <h2 className="text-2xl">Business stage</h2>
              <p className="mt-1 text-sm text-muted-foreground">Everything downstream adapts to where you are right now.</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {stages.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStage(s.id)}
                    className={`rounded-xl border p-4 text-left transition ${stage === s.id ? "border-primary bg-primary/15" : "border-border/50 bg-card/40 hover:border-primary/60"}`}
                  >
                    <p className="text-base">{s.t}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
                  </button>
                ))}
              </div>
            </GlassCard>
          )}
          {step === 1 && (
            <GlassCard>
              <h2 className="text-2xl">Profile</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Business name" />
                <Field label="Industry" placeholder="e.g. Food service" />
                <Field label="City / county" placeholder="e.g. Logan Heights, San Diego" />
                <Field label="Years operating" placeholder="0" />
                <Field label="Annual revenue" placeholder="$0 – $50k" />
                <Field label="Entity type" placeholder="Sole prop · LLC · …" />
              </div>
            </GlassCard>
          )}
          {step === 2 && (
            <GlassCard>
              <h2 className="text-2xl">Owner demographics</h2>
              <p className="mt-1 text-sm text-muted-foreground">Used to surface grants you actually qualify for. Optional.</p>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {["Woman-owned", "Minority-owned", "Veteran-owned", "Immigrant-owned", "Low-income community", "LGBTQ+-owned"].map((d) => (
                  <label key={d} className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3">
                    <input type="checkbox" className="h-4 w-4 accent-[var(--primary)]" />
                    <span className="text-sm">{d}</span>
                  </label>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-full border border-border/60 px-6 py-2.5 text-xs uppercase tracking-[0.25em] disabled:opacity-40"
            style={{ fontFamily: "var(--font-mono-disp)" }}
          >
            back
          </button>
          <button
            onClick={() => (step < 2 ? setStep(step + 1) : nav({ to: "/dashboard" }))}
            className="rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-primary-foreground"
            style={{ fontFamily: "var(--font-mono-disp)" }}
          >
            {step < 2 ? "continue" : "finish"}
          </button>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.25em] text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>{label}</span>
      <input placeholder={placeholder} className="mt-2 w-full rounded-md border border-border/60 bg-input/60 px-4 py-2.5 outline-none focus:border-primary" />
    </label>
  );
}
