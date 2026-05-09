import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell, GlassCard } from "@/components/SiteShell";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Negocio" }, { name: "description", content: "Sign in to your Negocio business advisor account." }] }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  return (
    <SiteShell variant="calm">
      <div className="mx-auto max-w-md py-10">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: "var(--font-mono-disp)" }}>
            {mode === "signin" ? "welcome back" : "create account"}
          </p>
          <h1 className="mt-2 text-4xl">{mode === "signin" ? "Sign in" : "Sign up"}</h1>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: mode === "signup" ? "/onboarding" : "/dashboard" });
            }}
          >
            <Field label="Email" type="email" />
            <Field label="Password" type="password" />
            <button className="mt-2 w-full rounded-full bg-primary py-3 text-sm uppercase tracking-[0.25em] text-primary-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>
              {mode === "signin" ? "sign in" : "continue"}
            </button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="underline">Back to home</Link>
          </p>
        </GlassCard>
      </div>
    </SiteShell>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.25em] text-muted-foreground" style={{ fontFamily: "var(--font-mono-disp)" }}>{label}</span>
      <input type={type} className="mt-2 w-full rounded-md border border-border/60 bg-input/60 px-4 py-2.5 outline-none focus:border-primary" />
    </label>
  );
}
