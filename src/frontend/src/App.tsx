import { Heart, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type ThemeId = "dark-gold";

// ─── Theme configs ──────────────────────────────────────────────────────────────
const THEME = {
  id: "dark-gold" as ThemeId,
  orbs: ["orb-gold", "orb-teal", "orb-amber"] as [string, string, string],
  gradientClass: "heading-gradient",
  accentColor: "oklch(0.82 0.16 82)",
};

const SITE_NAME = "Kumar Ayush";
const TAGLINE = "A little corner of the internet, made just for you.";
const BADGE_TEXT = "Welcome";

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [orb1Class, orb2Class, orb3Class] = THEME.orbs;

  // Tagline: split on last word for emphasis styling
  const taglineParts = TAGLINE.split(/\s+/);
  const taglineBody = taglineParts.slice(0, -1).join(" ");
  const taglineLast = taglineParts[taglineParts.length - 1];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-body flex flex-col">
      {/* ─── Navigation ─────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 nav-glass"
      >
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">
          <div className="flex items-center gap-2.5 select-none">
            <Sparkles className="w-4 h-4 text-gold-glow" />
            <span className="font-display font-black text-[1.1rem] text-white tracking-tight">
              {SITE_NAME}
            </span>
            <Sparkles className="w-4 h-4 text-gold-glow" />
          </div>
        </div>
      </motion.header>

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center relative min-h-screen">
        {/* Deep dark base */}
        <div className="absolute inset-0 bg-hero-base" />

        {/* Layered glowing orbs */}
        <AnimatePresence mode="wait">
          <motion.div
            key="dark-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className={`absolute rounded-full ${orb1Class}`}
              style={{
                width: "55vw",
                height: "55vw",
                top: "-15%",
                left: "-10%",
              }}
            />
            <div
              className={`absolute rounded-full ${orb2Class}`}
              style={{
                width: "45vw",
                height: "45vw",
                bottom: "-10%",
                right: "-8%",
              }}
            />
            <div
              className={`absolute rounded-full ${orb3Class}`}
              style={{
                width: "30vw",
                height: "30vw",
                top: "30%",
                right: "10%",
              }}
            />
            {/* Subtle noise grain overlay */}
            <div className="absolute inset-0 noise-overlay" />
          </motion.div>
        </AnimatePresence>

        {/* Star field dots */}
        <div
          className="absolute inset-0 star-field pointer-events-none"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center py-32">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
            className="mb-8"
          >
            <span className="eyebrow-badge">
              <Sparkles className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              {BADGE_TEXT}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-display font-black leading-[0.9] tracking-tight mb-8"
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl text-white mb-3">
              Welcome to
            </span>
            <span
              className={`block text-6xl md:text-8xl lg:text-[6.5rem] ${THEME.gradientClass}`}
            >
              {SITE_NAME}
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-white/80 mt-3">
              Website
            </span>
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
            className="mx-auto mb-8 divider-line"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
            className="font-body text-lg md:text-2xl text-white/60 max-w-lg mx-auto leading-relaxed"
          >
            {taglineBody && <>{taglineBody} </>}
            <span className="text-white/90 font-semibold">{taglineLast}</span>
          </motion.p>

          {/* Floating decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 flex justify-center gap-8"
          >
            {(
              [
                { key: "star-left", char: "✦" },
                { key: "diamond-center", char: "◆" },
                { key: "star-right", char: "✦" },
              ] as const
            ).map((item, i) => (
              <motion.span
                key={item.key}
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2.4,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
                className="text-gold-glow text-sm"
              >
                {item.char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </main>

      {/* ─── Footer ────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-glow" />
              <span className="font-display font-black text-lg text-white tracking-tight">
                {SITE_NAME}
              </span>
            </div>

            <p className="font-body text-sm text-white/40 text-center md:text-right">
              &copy; {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                Built with{" "}
                <Heart className="w-3.5 h-3.5 inline text-amber-400" /> using
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
