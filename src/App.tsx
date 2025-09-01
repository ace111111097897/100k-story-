import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, PlayCircle, CreditCard } from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { SignUpForm } from "./SignUpForm";
import { Toaster } from "sonner";

// 3D background via Spline embed (simpler than hand-writing Three.js).
const SplineEmbed: React.FC = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <iframe
      title="3D Background"
      src={"https://my.spline.design/interactivelibraryroom-1b3c782c6d5af35d1384853d35a85638/"} // e.g., https://my.spline.design/your-scene/
      className="w-full h-full opacity-60"
      allow="autoplay; fullscreen"
      style={{ filter: "blur(1px) hue-rotate(10deg)", transform: "scale(1.02)" }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/80" />
  </div>
);

const Glow: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none absolute inset-0 -z-10 ${className || ""}`}>
    <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
    <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
  </div>
);

const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className, children }) => (
  <section id={id} className={`mx-auto max-w-6xl px-6 py-20 ${className || ""}`}>{children}</section>
);

const Feature: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 rounded-full p-2 bg-white/10">
      <Check className="h-4 w-4" />
    </div>
    <div>
      <h4 className="font-semibold text-white/90">{title}</h4>
      <p className="text-sm text-white/70">{desc}</p>
    </div>
  </div>
);

const PriceCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}> = ({ title, price, features, cta, href, highlight }) => (
  <Card className={`relative overflow-hidden rounded-2xl border-white/10 bg-white/5 backdrop-blur-md ${highlight ? "ring-2 ring-indigo-400/70" : ""}`}>
    <CardContent className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className="text-3xl font-bold text-white">
          {price}
          <span className="ml-1 text-sm font-normal text-white/60">/ one-time</span>
        </div>
      </div>
      <ul className="mb-6 space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-white/80">
            <Check className="mt-1 h-4 w-4 flex-none" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a href={href} target="_blank" rel="noreferrer" className="block">
        <Button className="w-full rounded-xl py-6 text-base">
          <CreditCard className="mr-2 h-4 w-4" />
          {cta}
        </Button>
      </a>
      <p className="mt-3 text-center text-xs text-white/60">Secure checkout via Square</p>
    </CardContent>
  </Card>
);

const Testimonial: React.FC<{ quote: string; name: string; tag: string }> = ({ quote, name, tag }) => (
  <Card className="rounded-2xl border-white/10 bg-white/5">
    <CardContent className="p-6">
      <p className="italic text-white/90">“{quote}”</p>
      <div className="mt-4 text-sm text-white/70">— {name}, {tag}</div>
    </CardContent>
  </Card>
);

const AuthContent: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = React.useState<any>(null);

  React.useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      {/* HERO */}
      <Section>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">
              Welcome, {loggedInUser?.email ?? "friend"}!
            </h1>
            <p className="mt-4 text-lg text-white/80">
              A single, complete program combining stock investing fundamentals, real estate wholesaling playbooks, and a realistic roadmap to aggressive income goals. No fluff—just systems, templates, and execution.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#pricing">
                <Button size="lg" className="rounded-2xl px-6 py-6 text-base">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#preview" className="text-white/80 hover:text-white">
                <Button variant="secondary" className="rounded-2xl border-white/20 bg-white/10 px-6 py-6 text-base">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Preview
                </Button>
              </a>
            </div>
            <p className="mt-3 text-xs text-white/60">
              Important: Investing &amp; real estate carry risk. No guaranteed results. Education only.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* FEATURES */}
      <Section className="grid gap-8 md:grid-cols-3">
        <Feature title="Stock Systems" desc="Entries, risk, journaling, and risk-reward modeling you can actually follow." />
        <Feature title="Wholesaling Pipeline" desc="Deal sourcing, scripts, contracts, dispo, and cash buyer CRM templates." />
        <Feature title="Execution Roadmaps" desc="90-day plans, KPIs, and accountability trackers to move fast—safely." />
      </Section>

      {/* CURRICULUM */}
      <Section id="curriculum">
        <h2 className="text-2xl font-bold">What You’ll Learn</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card className="rounded-2xl border-white/10 bg-white/5">
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-semibold">Module 1 — Foundations</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>Mindset, risk, and ethics</li>
                <li>Choosing your lane &amp; time blocks</li>
                <li>Legal basics &amp; disclosures</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-white/10 bg-white/5">
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-semibold">Module 2 — Stock Investing</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>Setups &amp; position sizing</li>
                <li>Risk management and journaling</li>
                <li>Backtesting and review cadence</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-white/10 bg-white/5">
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-semibold">Module 3 — Wholesaling</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>Lead gen &amp; comping</li>
                <li>Seller calls &amp; contracts</li>
                <li>Dispo &amp; cash buyers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <h2 className="text-2xl font-bold">Choose Your Access</h2>
        <p className="mt-2 text-white/70">One-time payment. Instant access. 14-day refund policy.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <PriceCard
            title="Starter"
            price="$197"
            features={["Core modules (1–3)", "Downloadable templates", "Private student chat"]}
            cta="Buy Starter"
            href="https://square.link/u/04ZtWm1z"
          />
          <PriceCard
            title="Pro"
            price="$497"
            features={["Everything in Starter", "6 Live Q&A calls", "Deal analysis reviews", "Stock trade journal pack"]}
            cta="Buy Pro"
            href="#"
            highlight
          />
          <PriceCard
            title="Elite"
            price="$1,497"
            features={["Everything in Pro", "1:1 onboarding call", "Buyer list accelerator", "Advanced case studies"]}
            cta="Buy Elite"
            href="#"
          />
        </div>
      </Section>

      {/* PREVIEW */}
      <Section id="preview" className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
              title="Course Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Inside the Program</h3>
          <p className="mt-2 text-white/80">
            Get high-production video lessons, printable playbooks, and practical scripts. You’ll ship real outcomes: a tracked watchlist, a wholesaling pipeline, and a risk-first plan.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Testimonial quote="Crystal clear frameworks I actually used to close my first deal." name="A. Hernandez" tag="Student" />
            <Testimonial quote="Best breakdown of risk I’ve seen in a course." name="J. Patel" tag="Student" />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-6 grid gap-4">
          <Card className="rounded-2xl border-white/10 bg-white/5">
            <CardContent className="p-6">
              <h4 className="font-semibold">Is this financial advice?</h4>
              <p className="mt-2 text-white/80 text-sm">No. This is education. Trading and real estate carry risk and may not be suitable for everyone. There are no guarantees of profit.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-white/10 bg-white/5">
            <CardContent className="p-6">
              <h4 className="font-semibold">How do I get access after payment?</h4>
              <p className="mt-2 text-white/80 text-sm">After checkout, you’ll be redirected to a success page. We verify the payment and grant course access automatically.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-white/10 bg-white/5">
            <CardContent className="p-6">
              <h4 className="font-semibold">Refund policy</h4>
              <p className="mt-2 text-white/80 text-sm">14 days, no questions asked. If you don’t find value, email support.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta" className="text-center">
        <h2 className="text-3xl font-extrabold">Ready to build your pipeline &amp; portfolio?</h2>
        <p className="mt-2 text-white/80">Pick a plan and get instant access. Your future self will thank you.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#pricing">
            <Button size="lg" className="rounded-2xl px-6 py-6 text-base">
              Choose a Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="mailto:support@yoursite.com" className="text-white/80 hover:text-white text-sm">Questions? Contact support</a>
        </div>
      </Section>

      <footer className="border-t border-white/10 py-10 text-center text-xs text-white/60">
        <p>© {new Date().getFullYear()} Quantum Course. All rights reserved.</p>
        <p className="mt-2">Education only. No promises of income. Past performance is not indicative of future results.</p>
      </footer>
    </>
  );
};

export default function FuturisticCourse() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if user is authenticated from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setIsAuthenticated(user.isAuthenticated);
    }
    setIsLoading(false);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <main className="relative min-h-screen bg-black text-white">
      <SplineEmbed />
      <Glow />
      <Toaster />

      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500" />
            <span className="text-sm font-semibold tracking-wide text-white/90">Quantum Course</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <a href="#curriculum" className="hover:text-white">Curriculum</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            {isAuthenticated && (
              <button
                onClick={handleSignOut}
                className="text-white/70 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {!isAuthenticated && !isLoading && (
          <motion.div
            key="auth-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="w-full max-w-md p-8">
              <SignUpForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isAuthenticated && <AuthContent />}
    </main>
  );
}
