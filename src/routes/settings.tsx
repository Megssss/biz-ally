import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, GlassCard } from "@/components/SiteShell";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Negocio" }, { name: "description", content: "Edit your business profile, language, and Google Calendar connection." }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [connected, setConnected] = useState(false);
  return (
    <SiteShell variant="paper">
      <h1 className="text-4xl md:text-5xl">Settings</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <GlassCard>
          <h2 className="text-2xl">Business profile</h2>
          <div className="mt-4 grid gap-3">
            <Field label="Business name" defaultValue="Maria's Tacos" />
            <Field label="Industry" defaultValue="Food service" />
            <Field label="Location" defaultValue="Logan Heights, San Diego" />
            <Field label="Stage" defaultValue="Early operating" />
          </div>
          <button className="mt-5 rounded-full bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>save</button>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <h2 className="text-2xl">Language</h2>
            <p className="mt-1 text-sm text-muted-foreground">Spanish is calibrated to Latin American professional register.</p>
            <div className="mt-4 inline-flex rounded-full border border-border/60 p-1">
              {(["en", "es"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  style={{ fontFamily: "var(--font-mono-disp)" }}
                >
                  {l === "en" ? "English" : "Español"}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-2xl">Google Calendar</h2>
            <p className="mt-1 text-sm text-muted-foreground">Required for deadline reminders. Events are previewed before adding.</p>
            <button
              onClick={() => setConnected((c) => !c)}
              className={`mt-4 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] ${connected ? "border border-[var(--sage)]/70 text-[color:var(--sage)]" : "bg-primary text-primary-foreground"}`}
              style={{ fontFamily: "var(--font-mono-disp)" }}
            >
              {connected ? "connected ✓" : "connect google calendar"}
            </button>
          </GlassCard>

          <GlassCard>
            <h2 className="text-2xl">What this product does not do</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>— No advice on active IRS audits, disputes, or prior-year amendments.</li>
              <li>— No legal representation or licensed professional opinion.</li>
              <li>— No advice on healthcare billing, financial services, or food manufacturing.</li>
              <li>— Grant data is live-searched at time of search, not guaranteed at submission.</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.25em] text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>{label}</span>
      <input defaultValue={defaultValue} className="mt-2 w-full rounded-md border border-border/60 bg-input/60 px-4 py-2.5 outline-none focus:border-primary" />
    </label>
  );
}
