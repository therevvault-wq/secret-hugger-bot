import { Shield, Target, Users, Wrench, Eye, Heart } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/20">
      <div className="container-rev">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            About THEREVVAULT
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-2">
            BUILT BY <span className="text-primary">ENTHUSIASTS</span>. FOR ENTHUSIASTS.
          </h2>
        </div>

        {/* Origin Story */}
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-6 text-center">
            <p className="text-muted-foreground text-lg leading-relaxed">
              THEREVVAULT wasn't created in a warehouse. It started in a garage - through late-night research, first installs, trial and error, and the constant urge to build something better.
            </p>
            <p className="text-foreground text-xl font-display">
              We're not just sellers. We're enthusiasts who live the process.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              What began as a personal journey of refining a performance build exposed a clear gap in the market - too much hype, too little honesty. Too many universal claims, not enough real-world clarity.
            </p>
            <p className="text-primary text-xl font-display">
              So we built what we wished existed.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              THEREVVAULT exists for those who see their car as more than transportation. For the ones who care about brake feel, stance precision, intake flow, throttle response and the details most overlook.
            </p>
          </div>

          {/* What We Do */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-8">
              WHAT WE <span className="text-primary">DO</span>
            </h3>
            <div className="space-y-6 text-center">
              <p className="text-muted-foreground text-lg leading-relaxed">
                We curate performance-driven upgrades and aesthetic enhancements that we would confidently run on our own builds.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From subtle refinements to serious hardware upgrades, every product passes one filter:
              </p>
              <p className="text-foreground text-2xl font-display italic">
                "Would we install this on our own car?"
              </p>
              <p className="text-muted-foreground text-lg">
                If the answer isn't a strong yes - it doesn't enter the Vault.
              </p>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-10">
              WHAT MAKES US <span className="text-primary">DIFFERENT</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                { icon: Shield, text: "No overhyped catalog dumping" },
                { icon: Eye, text: "No misleading performance claims" },
                { icon: Target, text: "No compromise on quality" },
                { icon: Heart, text: "Community-first growth" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { label: "Precision", vs: "over promotion" },
                { label: "Transparency", vs: "over trend-chasing" },
                { label: "Long-term relationships", vs: "over one-time transactions" },
              ].map((item, i) => (
                <div key={i} className="text-center p-4">
                  <span className="text-primary font-display text-lg">{item.label}</span>
                  <span className="text-muted-foreground text-sm ml-2">{item.vs}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground text-lg text-center mt-8 leading-relaxed">
              Every recommendation is made like we're advising our own build - not clearing inventory.
            </p>
          </div>

          {/* Who We're Built For */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-10">
              WHO WE'RE <span className="text-primary">BUILT FOR</span>
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Daily drivers evolving into proper builds",
                "Tuned cars - from mild setups to serious performance machines",
                "Aesthetic-first modders with attention to detail",
                "Highway pull regulars",
                "Track-day curious drivers",
                "Owners who believe their car carries identity",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
                >
                  <Wrench className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-foreground text-xl font-display text-center mt-8">
              If you obsess over the details - you're one of us.
            </p>
          </div>

          {/* The Vision */}
          <div className="text-center space-y-6 pb-4">
            <h3 className="font-display text-2xl md:text-3xl text-foreground">
              THE <span className="text-primary">VISION</span>
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed">
              THEREVVAULT is more than a store.
            </p>
            <p className="text-foreground text-xl font-display leading-relaxed">
              It is a premium automotive house for curated builds - your trusted garage in the digital world.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Just like a family doctor understands your history, we aim to understand your platform, your setup, and your long-term goals.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Because serious builds require direction - not random upgrades.
            </p>

            <div className="pt-4">
              <p className="text-primary text-xl font-display">
                We're here to grow with your car.
              </p>
              <p className="text-muted-foreground text-lg mt-2">
                Stage by stage. Mod by mod.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
