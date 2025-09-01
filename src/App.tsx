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
    <motion.div 
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-yellow-500/20 blur-3xl" 
    />
    <motion.div 
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
      className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" 
    />
    <motion.div 
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
      className="absolute top-1/4 right-1/4 h-40 w-40 rounded-full bg-yellow-400/10 blur-2xl" 
    />
    <motion.div 
      animate={{
        y: [0, 40, 0],
        x: [0, -30, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3
      }}
      className="absolute bottom-1/4 left-1/4 h-60 w-60 rounded-full bg-orange-400/15 blur-2xl" 
    />
  </div>
);

const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className, children }) => (
  <section id={id} className={`mx-auto max-w-6xl px-6 py-20 ${className || ""}`}>{children}</section>
);

const Feature: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <motion.div 
    className="flex items-start gap-3"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{ 
      y: -5,
      transition: { duration: 0.3 }
    }}
  >
    <motion.div 
      className="mt-1 rounded-full p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
      animate={{ 
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <Check className="h-4 w-4 text-yellow-400" />
    </motion.div>
    <div>
      <h4 className="font-semibold text-white/90">{title}</h4>
      <p className="text-sm text-white/70">{desc}</p>
    </div>
  </motion.div>
);

const PriceCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}> = ({ title, price, features, cta, href, highlight }) => (
  <motion.div
    whileHover={{ 
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <Card className={`relative overflow-hidden rounded-2xl border-yellow-500/30 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl ${highlight ? "ring-2 ring-yellow-400/70 shadow-2xl shadow-yellow-500/20" : "ring-1 ring-yellow-500/20"}`}>
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full opacity-60"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-60"
        />
      </div>
      
      <CardContent className="p-6 relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
          >
            {price}
            <span className="ml-1 text-sm font-normal text-white/60">/ one-time</span>
          </motion.div>
        </div>
        <ul className="mb-6 space-y-2">
          {features.map((f, i) => (
            <motion.li 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-white/80"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Check className="mt-1 h-4 w-4 flex-none text-yellow-400" />
              </motion.div>
              <span>{f}</span>
            </motion.li>
          ))}
        </ul>
        <motion.a 
          href={href} 
          target="_blank" 
          rel="noreferrer" 
          className="block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="w-full rounded-xl py-6 text-base bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-gray-900 font-bold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300">
            <CreditCard className="mr-2 h-4 w-4" />
            {cta}
          </Button>
        </motion.a>
        <p className="mt-3 text-center text-xs text-yellow-400/80">Secure checkout via Square</p>
      </CardContent>
    </Card>
  </motion.div>
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
                         <h1 className="bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">
               Welcome, Millionaire
             </h1>
             <p className="mt-4 text-lg text-white/80">
               The exclusive academy for high-net-worth individuals and aspiring millionaires. Master advanced wealth-building strategies, elite investment frameworks, and the mindset of the ultra-successful.
             </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#pricing">
                               <Button size="lg" className="rounded-2xl px-6 py-6 text-base bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-gray-900 font-bold">
                 Join the Elite <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
              </a>
              <a href="#preview" className="text-white/80 hover:text-white">
                <Button variant="secondary" className="rounded-2xl border-white/20 bg-white/10 px-6 py-6 text-base">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Preview
                </Button>
              </a>
            </div>
                         <p className="mt-3 text-xs text-yellow-400/80">
               ⚡ Elite members only. High-performance strategies for serious wealth builders.
             </p>
          </div>
        </motion.div>
      </Section>

             {/* FEATURES */}
       <Section className="grid gap-8 md:grid-cols-3 relative">
         {/* Floating background elements */}
         <motion.div
           animate={{
             y: [0, -20, 0],
             rotate: [0, 5, 0],
           }}
           transition={{
             duration: 6,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-xl"
         />
         <motion.div
           animate={{
             y: [0, 30, 0],
             rotate: [0, -10, 0],
           }}
           transition={{
             duration: 8,
             repeat: Infinity,
             ease: "easeInOut",
             delay: 2
           }}
           className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-br from-orange-500/15 to-yellow-500/15 rounded-full blur-xl"
         />
         <Feature title="Elite Investment Strategies" desc="Advanced portfolio management, hedge fund techniques, and institutional-grade trading systems." />
         <Feature title="Wealth Acceleration" desc="High-yield investment vehicles, tax optimization strategies, and passive income generation." />
         <Feature title="Millionaire Mindset" desc="Psychology of wealth, networking with high-net-worth individuals, and scaling to 8+ figures." />
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
       <Section id="pricing" className="relative">
         {/* Floating elements around pricing */}
         <motion.div
           animate={{
             y: [0, -40, 0],
             x: [0, 20, 0],
             rotate: [0, 180, 360],
           }}
           transition={{
             duration: 12,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="absolute -top-20 -left-20 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-lg"
         />
         <motion.div
           animate={{
             y: [0, 50, 0],
             x: [0, -30, 0],
             scale: [1, 1.2, 1],
           }}
           transition={{
             duration: 15,
             repeat: Infinity,
             ease: "easeInOut",
             delay: 3
           }}
           className="absolute -bottom-20 -right-20 w-16 h-16 bg-gradient-to-br from-orange-500/25 to-yellow-500/25 rounded-full blur-lg"
         />
         <motion.h2 
           className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
           animate={{ 
             backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
           }}
           transition={{
             duration: 3,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         >
           Elite Membership Tiers
         </motion.h2>
         <p className="mt-2 text-white/70">Exclusive access for high-net-worth individuals. Limited enrollment.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <PriceCard
            title="Starter"
            price="$197"
            features={["Complete curriculum access", "Elite networking events", "Private wealth community"]}
            cta="Join Starter"
            href="https://square.link/u/04ZtWm1z"
          />
          <PriceCard
            title="Pro"
            price="$497"
            features={["Everything in Starter", "1:1 wealth coaching", "Exclusive investment opportunities", "VIP networking"]}
            cta="Join Pro"
            href="#"
            highlight
          />
          <PriceCard
            title="Millionaire Club"
            price="$600"
            features={["Everything in Pro", "Direct access to mentors", "Private deal flow", "Luxury retreat access"]}
            cta="Join Club"
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
               src="https://www.youtube.com/embed/8bUQ0e6t5VY?rel=0"
               title="Course Preview"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               allowFullScreen
             />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-yellow-400">Inside the Elite Academy</h3>
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
         <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Ready to Join the Elite?</h2>
         <p className="mt-2 text-white/80">Choose your membership tier and unlock the path to millionaire status.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#pricing">
                           <Button size="lg" className="rounded-2xl px-6 py-6 text-base bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-gray-900 font-bold">
                 Join the Elite <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
          </a>
          <a href="mailto:support@yoursite.com" className="text-white/80 hover:text-white text-sm">Questions? Contact support</a>
        </div>
      </Section>

             <footer className="border-t border-white/10 py-10 text-center text-xs text-white/60">
         <p>© {new Date().getFullYear()} ProfitU Academy. All rights reserved.</p>
         <p className="mt-2">Elite education for high-net-worth individuals. Results may vary.</p>
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
                         <span className="text-sm font-semibold tracking-wide text-white/90">ProfitU Academy</span>
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
