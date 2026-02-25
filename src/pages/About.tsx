import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Target, Users, Wrench, Eye, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 py-20 md:py-32 px-4">
        <div className="container-rev max-w-4xl space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-primary text-sm font-medium uppercase tracking-widest inline-block">
              About THEREVVAULT
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              BUILT BY <span className="text-primary">ENTHUSIASTS</span>
            </h1>
            <h2 className="font-display text-2xl md:text-3xl text-muted-foreground">
              FOR ENTHUSIASTS.
            </h2>
          </div>

          {/* Origin Story */}
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                THEREVVAULT wasn't created in a warehouse. It started in a garage — through late-night research, first installs, trial and error, and the constant urge to build something better.
              </p>
              <p className="text-xl md:text-2xl font-display text-foreground">
                We're not just sellers. We're enthusiasts who live the process.
              </p>
            </div>

            <div className="bg-secondary/30 border border-border rounded-xl p-8 space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                What began as a personal journey of refining a performance build exposed a clear gap in the market — too much hype, too little honesty. Too many universal claims, not enough real-world clarity.
              </p>
              <p className="text-primary text-xl md:text-2xl font-display italic">
                "So we built what we wished existed."
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              THEREVVAULT exists for those who see their car as more than transportation. For the ones who care about brake feel, stance precision, intake flow, throttle response and the details most overlook.
            </p>
          </div>

          {/* What We Do */}
          <div className="space-y-8">
            <h2 className="font-display text-3xl md:text-4xl text-foreground text-center">
              WHAT WE <span className="text-primary">DO</span>
            </h2>
            <div className="space-y-6 text-center">
              <p className="text-muted-foreground text-lg leading-relaxed">
                We curate performance-driven upgrades and aesthetic enhancements that we would confidently run on our own builds.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From subtle refinements to serious hardware upgrades, every product passes one filter:
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-8">
                <p className="text-foreground text-2xl font-display italic">
                  "Would we install this on our own car?"
                </p>
                <p className="text-muted-foreground text-lg mt-4">
                  If the answer isn't a strong yes — it doesn't enter the Vault.
                </p>
              </div>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="space-y-10">
            <h2 className="font-display text-3xl md:text-4xl text-foreground text-center">
              WHAT MAKES US <span className="text-primary">DIFFERENT</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Shield, text: "No overhyped catalog dumping" },
                { icon: Eye, text: "No misleading performance claims" },
                { icon: Target, text: "No compromise on quality" },
                { icon: Heart, text: "Community-first growth" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-xl bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-foreground text-lg font-display text-center">WE PRIORITIZE:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-center">
                {[
                  { label: "PRECISION", vs: "over promotion" },
                  { label: "TRANSPARENCY", vs: "over trend-chasing" },
                  { label: "LONG-TERM RELATIONSHIPS", vs: "over one-time transactions" },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-secondary/20 border border-border">
                    <span className="text-primary font-display text-lg block">{item.label}</span>
                    <span className="text-muted-foreground text-sm">{item.vs}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground text-lg text-center leading-relaxed bg-secondary/20 p-6 rounded-xl border border-border">
              Every recommendation is made like we're advising our own build — not clearing inventory.
            </p>
          </div>

          {/* Who We're Built For */}
          <div className="space-y-8">
            <h2 className="font-display text-3xl md:text-4xl text-foreground text-center">
              WHO WE'RE <span className="text-primary">BUILT FOR</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Daily drivers evolving into proper builds",
                "Tuned cars — from mild setups to serious performance machines",
                "Aesthetic-first modders with attention to detail",
                "Highway pull regulars",
                "Track-day curious drivers",
                "Owners who believe their car carries identity",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20 border border-border hover:border-primary/50 transition-colors"
                >
                  <Wrench className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-base">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-foreground text-2xl font-display text-center">
              If you obsess over the details — you're one of us.
            </p>
          </div>

          {/* The Vision */}
          <div className="space-y-8 pb-8">
            <h2 className="font-display text-3xl md:text-4xl text-foreground text-center">
              THE <span className="text-primary">VISION</span>
            </h2>

            <div className="space-y-6 text-center">
              <p className="text-muted-foreground text-lg">
                THEREVVAULT is more than a store.
              </p>
              <p className="text-foreground text-2xl font-display leading-relaxed bg-primary/5 border border-primary/20 p-8 rounded-xl">
                It is a premium automotive house for curated builds — your trusted garage in the digital world.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Just like a family doctor understands your history, we aim to understand your platform, your setup, and your long-term goals.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Because serious builds require direction — not random upgrades.
              </p>

              <div className="bg-secondary/30 border border-border rounded-xl p-8 space-y-3">
                <p className="text-primary text-2xl font-display">
                  We're here to grow with your car.
                </p>
                <p className="text-muted-foreground text-lg">
                  Stage by stage. Mod by mod.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
