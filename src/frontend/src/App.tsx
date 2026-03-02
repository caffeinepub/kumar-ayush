import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, RotateCcw, Settings, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type ThemeId = "dark-gold" | "deep-purple" | "midnight-teal";

interface SiteSettings {
  siteName: string;
  tagline: string;
  badgeText: string;
  theme: ThemeId;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Kumar Ayush",
  tagline: "A little corner of the internet, made just for you.",
  badgeText: "Welcome",
  theme: "dark-gold",
};

const STORAGE_KEY = "kumar-ayush-settings";

// ─── Theme configs ──────────────────────────────────────────────────────────────
const THEMES: {
  id: ThemeId;
  label: string;
  swatchClass: string;
  orbs: [string, string, string];
  gradientClass: string;
  accentColor: string;
}[] = [
  {
    id: "dark-gold",
    label: "Dark Gold",
    swatchClass: "theme-swatch-gold",
    orbs: ["orb-gold", "orb-teal", "orb-amber"],
    gradientClass: "heading-gradient",
    accentColor: "oklch(0.82 0.16 82)",
  },
  {
    id: "deep-purple",
    label: "Deep Purple",
    swatchClass: "theme-swatch-purple",
    orbs: ["orb-purple-primary", "orb-purple-secondary", "orb-purple-accent"],
    gradientClass: "heading-gradient-purple",
    accentColor: "oklch(0.75 0.22 280)",
  },
  {
    id: "midnight-teal",
    label: "Midnight Teal",
    swatchClass: "theme-swatch-cyan",
    orbs: ["orb-cyan-primary", "orb-cyan-secondary", "orb-cyan-accent"],
    gradientClass: "heading-gradient-cyan",
    accentColor: "oklch(0.72 0.18 185)",
  },
];

// ─── Settings Panel ─────────────────────────────────────────────────────────────
function SettingsPanel({
  settings,
  onChange,
  onReset,
}: {
  settings: SiteSettings;
  onChange: (updates: Partial<SiteSettings>) => void;
  onReset: () => void;
}) {
  const activeTheme = THEMES.find((t) => t.id === settings.theme)!;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <SheetHeader className="pb-4">
        <SheetTitle
          className="font-display font-black text-2xl tracking-tight"
          style={{ color: activeTheme.accentColor }}
        >
          Customise Site
        </SheetTitle>
        <p
          className="font-body text-sm"
          style={{ color: "oklch(0.60 0.04 268)" }}
        >
          Changes save instantly and persist across visits.
        </p>
      </SheetHeader>

      <Separator
        className="mb-6"
        style={{ background: "oklch(0.28 0.04 268 / 0.6)" }}
      />

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-1">
        {/* Site Name */}
        <div className="flex flex-col gap-2">
          <Label
            className="font-body text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.55 0.04 268)" }}
          >
            Site Name
          </Label>
          <input
            className="settings-input font-body"
            value={settings.siteName}
            placeholder="Your Name"
            onChange={(e) => onChange({ siteName: e.target.value })}
          />
        </div>

        {/* Badge Text */}
        <div className="flex flex-col gap-2">
          <Label
            className="font-body text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.55 0.04 268)" }}
          >
            Badge Text
          </Label>
          <input
            className="settings-input font-body"
            value={settings.badgeText}
            placeholder="Welcome"
            onChange={(e) => onChange({ badgeText: e.target.value })}
          />
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.45 0.04 268)" }}
          >
            The small pill label above your name.
          </p>
        </div>

        {/* Tagline */}
        <div className="flex flex-col gap-2">
          <Label
            className="font-body text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.55 0.04 268)" }}
          >
            Tagline
          </Label>
          <textarea
            className="settings-input font-body resize-none"
            rows={3}
            value={settings.tagline}
            placeholder="Your personal tagline..."
            onChange={(e) => onChange({ tagline: e.target.value })}
            style={{ lineHeight: "1.5" }}
          />
        </div>

        <Separator style={{ background: "oklch(0.22 0.04 268 / 0.5)" }} />

        {/* Color Theme */}
        <div className="flex flex-col gap-3">
          <Label
            className="font-body text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.55 0.04 268)" }}
          >
            Colour Theme
          </Label>
          <div className="flex gap-4 items-center">
            {THEMES.map((theme) => (
              <button
                type="button"
                key={theme.id}
                onClick={() => onChange({ theme: theme.id })}
                title={theme.label}
                className={`theme-swatch ${theme.swatchClass} ${settings.theme === theme.id ? "active" : ""}`}
                aria-label={`Select ${theme.label} theme`}
                aria-pressed={settings.theme === theme.id}
              />
            ))}
          </div>
          <p
            className="font-body text-sm font-medium"
            style={{ color: activeTheme.accentColor }}
          >
            {activeTheme.label}
          </p>
          <div className="flex gap-2">
            {THEMES.map((theme) => (
              <button
                type="button"
                key={theme.id}
                onClick={() => onChange({ theme: theme.id })}
                className="font-body text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  background:
                    settings.theme === theme.id
                      ? `${activeTheme.accentColor}22`
                      : "oklch(0.20 0.04 268)",
                  border: `1px solid ${settings.theme === theme.id ? `${activeTheme.accentColor}55` : "oklch(0.28 0.04 268 / 0.5)"}`,
                  color:
                    settings.theme === theme.id
                      ? activeTheme.accentColor
                      : "oklch(0.60 0.04 268)",
                }}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reset button */}
      <div className="pt-6 mt-auto">
        <Separator
          className="mb-4"
          style={{ background: "oklch(0.22 0.04 268 / 0.5)" }}
        />
        <button
          type="button"
          onClick={onReset}
          className="font-body text-sm flex items-center gap-2 px-4 py-2.5 rounded-lg w-full justify-center transition-all duration-200"
          style={{
            background: "oklch(0.20 0.04 268)",
            border: "1px solid oklch(0.30 0.04 268 / 0.6)",
            color: "oklch(0.60 0.04 268)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "oklch(0.80 0.04 268)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "oklch(0.40 0.04 268 / 0.8)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "oklch(0.60 0.04 268)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "oklch(0.30 0.04 268 / 0.6)";
          }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to defaults
        </button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const activeTheme = THEMES.find((t) => t.id === settings.theme)!;
  const [orb1Class, orb2Class, orb3Class] = activeTheme.orbs;

  // Tagline: split on last word for emphasis styling
  const taglineParts = settings.tagline.split(/\s+/);
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
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-gold-glow" />
            <span className="font-display font-black text-[1.1rem] text-white tracking-tight">
              {settings.siteName}
            </span>
            <Sparkles className="w-4 h-4 text-gold-glow" />
          </div>

          {/* Settings trigger */}
          <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="settings-gear-btn p-2 rounded-lg"
                aria-label="Open settings"
                style={{
                  background: "oklch(0.18 0.04 268 / 0.6)",
                  border: "1px solid oklch(0.30 0.04 268 / 0.5)",
                }}
              >
                <Settings className="w-4 h-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="settings-panel w-80 sm:w-96 flex flex-col p-6"
              style={{ background: "oklch(0.13 0.04 268)" }}
            >
              <SettingsPanel
                settings={settings}
                onChange={updateSettings}
                onReset={resetSettings}
              />
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center relative min-h-screen">
        {/* Deep dark base */}
        <div className="absolute inset-0 bg-hero-base" />

        {/* Layered glowing orbs — react to theme */}
        <AnimatePresence mode="wait">
          <motion.div
            key={settings.theme}
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
              {settings.badgeText}
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
              className={`block text-6xl md:text-8xl lg:text-[6.5rem] ${activeTheme.gradientClass}`}
            >
              {settings.siteName}
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
            {!taglineBody && null}
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
                {settings.siteName}
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
