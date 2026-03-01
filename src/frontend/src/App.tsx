import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Brain,
  ChevronDown,
  Dumbbell,
  Flame,
  Globe,
  Heart,
  Laugh,
  Shuffle,
  Smile,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useGetAllJokes } from "./hooks/useQueries";
import type { Quote } from "./hooks/useQueries";

// ─── Fun Facts Data ────────────────────────────────────────────────────────────
const funFacts = [
  {
    icon: Globe,
    title: "The Internet Is Heavy",
    fact: "The internet weighs about the same as a strawberry — all those electrons flying around add up to roughly 50 grams. So yes, you're carrying the world in your pocket.",
    color: "bg-[oklch(0.85_0.18_230)]",
    shadow: "shadow-fun-mint",
    badge: "Mind-blowing",
    badgeColor:
      "bg-[oklch(0.72_0.16_162)] text-[oklch(0.18_0.05_270)] border-none",
  },
  {
    icon: Dumbbell,
    title: "Muscles for Smiling",
    fact: "It takes 12 muscles to smile but 11 to frown — so smiling is actually more work. Your face is basically a tiny gym. Exercise responsibly.",
    color: "bg-[oklch(0.88_0.2_88)]",
    shadow: "shadow-fun-yellow",
    badge: "Body Facts",
    badgeColor:
      "bg-[oklch(0.82_0.18_88)] text-[oklch(0.18_0.05_270)] border-none",
  },
  {
    icon: Brain,
    title: "Dreams Are Weird",
    fact: "Your brain generates about 70,000 thoughts per day, yet somehow forgets where you put your keys every single morning. Priorities unclear.",
    color: "bg-[oklch(0.88_0.16_350)]",
    shadow: "shadow-fun-coral",
    badge: "Brain Stuff",
    badgeColor: "bg-[oklch(0.68_0.22_28)] text-white border-none",
  },
  {
    icon: Star,
    title: "Honey Never Expires",
    fact: "Archaeologists found 3,000-year-old honey in Egyptian tombs and it was still perfectly edible. Bees basically invented the world's first food preservation technology.",
    color: "bg-[oklch(0.85_0.14_280)]",
    shadow: "shadow-[4px_4px_0px_oklch(0.52_0.2_280)]",
    badge: "Ancient Wisdom",
    badgeColor: "bg-[oklch(0.62_0.2_280)] text-white border-none",
  },
];

// ─── Floating Bubbles ──────────────────────────────────────────────────────────
const bubbles = [
  {
    id: "b1",
    size: 60,
    color: "oklch(0.88 0.2 88 / 0.5)",
    top: "15%",
    left: "5%",
    class: "bubble-1",
  },
  {
    id: "b2",
    size: 40,
    color: "oklch(0.68 0.22 28 / 0.4)",
    top: "25%",
    left: "85%",
    class: "bubble-2",
  },
  {
    id: "b3",
    size: 80,
    color: "oklch(0.72 0.16 162 / 0.4)",
    top: "60%",
    left: "8%",
    class: "bubble-3",
  },
  {
    id: "b4",
    size: 50,
    color: "oklch(0.65 0.18 280 / 0.4)",
    top: "70%",
    left: "90%",
    class: "bubble-4",
  },
  {
    id: "b5",
    size: 35,
    color: "oklch(0.68 0.18 230 / 0.5)",
    top: "40%",
    left: "92%",
    class: "bubble-5",
  },
  {
    id: "b6",
    size: 55,
    color: "oklch(0.88 0.2 88 / 0.35)",
    top: "80%",
    left: "3%",
    class: "bubble-6",
  },
];

// ─── Joke Card ─────────────────────────────────────────────────────────────────
function JokeCard({
  joke,
  isHighlighted,
  index,
}: {
  joke: Quote;
  isHighlighted: boolean;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const cardColors = [
    {
      bg: "bg-white",
      border: "border-2 border-[oklch(0.88_0.2_88)]",
      shadow: "shadow-fun-yellow",
      badge: "bg-[oklch(0.88_0.2_88)] text-[oklch(0.18_0.05_270)] border-none",
    },
    {
      bg: "bg-white",
      border: "border-2 border-[oklch(0.68_0.22_28)]",
      shadow: "shadow-fun-coral",
      badge: "bg-[oklch(0.68_0.22_28)] text-white border-none",
    },
    {
      bg: "bg-white",
      border: "border-2 border-[oklch(0.72_0.16_162)]",
      shadow: "shadow-fun-mint",
      badge:
        "bg-[oklch(0.72_0.16_162)] text-[oklch(0.18_0.05_270)] border-none",
    },
    {
      bg: "bg-white",
      border: "border-2 border-[oklch(0.62_0.2_280)]",
      shadow: "shadow-[4px_4px_0px_oklch(0.52_0.2_280)]",
      badge: "bg-[oklch(0.62_0.2_280)] text-white border-none",
    },
  ];

  const style = cardColors[index % cardColors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08, ease: "easeOut" }}
    >
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            key="highlight-ring"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-0 rounded-2xl ring-4 ring-[oklch(0.82_0.18_88)] ring-offset-2 pointer-events-none z-10"
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={
          isHighlighted
            ? { scale: [1, 1.03, 1], rotate: [0, -1, 1, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative h-full"
      >
        <Card
          className={`h-full relative overflow-hidden rounded-2xl ${style.bg} ${style.border} ${style.shadow} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
        >
          {isHighlighted && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[oklch(0.82_0.18_88)] via-[oklch(0.68_0.22_28)] to-[oklch(0.72_0.16_162)]" />
          )}
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-start justify-between gap-2">
              <Laugh className="w-7 h-7 shrink-0 mt-0.5 text-[oklch(0.5_0.15_270)]" />
              {isHighlighted && (
                <Badge className="bg-[oklch(0.82_0.18_88)] text-[oklch(0.18_0.05_270)] border-none text-xs font-semibold animate-pop">
                  ✨ Surprise Pick!
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-3">
            <p className="text-[oklch(0.22_0.05_270)] font-body text-base leading-relaxed font-medium">
              "{joke.text}"
            </p>
          </CardContent>
          {joke.author && (
            <CardFooter className="px-5 pb-5">
              <Badge className={`text-xs font-semibold ${style.badge}`}>
                — {joke.author}
              </Badge>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}

// ─── Skeleton Cards ────────────────────────────────────────────────────────────
function JokeSkeleton() {
  return (
    <div className="h-full">
      <Card className="h-full rounded-2xl border-2 border-[oklch(0.88_0.04_90)] overflow-hidden">
        <CardHeader className="pb-2 pt-5 px-5">
          <Skeleton className="w-8 h-8 rounded-full" />
        </CardHeader>
        <CardContent className="px-5 pb-3 space-y-2">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-4/5 rounded-full" />
          <Skeleton className="h-4 w-3/5 rounded-full" />
        </CardContent>
        <CardFooter className="px-5 pb-5">
          <Skeleton className="h-6 w-24 rounded-full" />
        </CardFooter>
      </Card>
    </div>
  );
}

// ─── Section Heading ───────────────────────────────────────────────────────────
function SectionHeading({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-12"
    >
      <div className="inline-block text-5xl mb-4 animate-bounce-subtle">
        {emoji}
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-black text-[oklch(0.18_0.05_270)] mb-3 tracking-tight">
        {title}
      </h2>
      <p className="text-[oklch(0.45_0.04_270)] font-body text-lg max-w-xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [highlightedId, setHighlightedId] = useState<bigint | null>(null);
  const highlightedRef = useRef<HTMLDivElement>(null);
  const jokesSectionRef = useRef<HTMLElement>(null);

  const { data: jokes, isLoading: jokesLoading } = useGetAllJokes();

  const scrollToJokes = () => {
    jokesSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const surpriseMe = () => {
    if (!jokes || jokes.length === 0) return;
    const random = jokes[Math.floor(Math.random() * jokes.length)];
    setHighlightedId(random.id);

    // Scroll to the highlighted card
    setTimeout(() => {
      const el = document.getElementById(`joke-${random.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);

    // Clear highlight after 4s
    setTimeout(() => setHighlightedId(null), 4000);
  };

  // Use void to avoid unused ref warning
  void highlightedRef;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-body">
      {/* ─── Navigation ─────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.97_0.012_90/0.9)] backdrop-blur-md border-b border-[oklch(0.88_0.04_90)]"
      >
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <span className="font-display font-black text-xl text-[oklch(0.18_0.05_270)] tracking-tight">
              Kumar Ayush
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "About", href: "#about" },
              { label: "Jokes", href: "#jokes" },
              { label: "Fun Facts", href: "#facts" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm font-semibold text-[oklch(0.35_0.05_270)] hover:text-[oklch(0.18_0.05_270)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button
            onClick={scrollToJokes}
            className="bg-[oklch(0.88_0.2_88)] hover:bg-[oklch(0.82_0.18_88)] text-[oklch(0.18_0.05_270)] font-bold border-2 border-[oklch(0.62_0.15_88)] shadow-fun-yellow hover:-translate-y-0.5 transition-all duration-150 rounded-xl"
          >
            <Laugh className="w-4 h-4 mr-1.5" />
            Get Jokes
          </Button>
        </div>
      </motion.header>

      <main>
        {/* ─── Hero ──────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, oklch(0.88 0.2 88 / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.68 0.22 28 / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.72 0.16 162 / 0.35) 0%, transparent 40%)",
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.18 0.05 270) 1px, transparent 1px), linear-gradient(90deg, oklch(0.18 0.05 270) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Floating bubbles */}
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className={`absolute rounded-full animate-float ${bubble.class} pointer-events-none`}
              style={{
                width: bubble.size,
                height: bubble.size,
                background: bubble.color,
                top: bubble.top,
                left: bubble.left,
              }}
            />
          ))}

          {/* Confetti image */}
          <img
            src="/assets/generated/confetti-burst-transparent.dim_600x400.png"
            alt=""
            aria-hidden="true"
            className="absolute top-10 right-10 w-64 md:w-80 opacity-60 pointer-events-none select-none"
          />

          <div className="relative container max-w-5xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
            >
              <Badge className="mb-6 bg-[oklch(0.68_0.22_28)] text-white border-none text-sm font-bold px-4 py-1.5 rounded-full inline-flex gap-1.5 items-center shadow-fun-coral">
                <Sparkles className="w-3.5 h-3.5" />
                Your corner of the internet
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-[oklch(0.18_0.05_270)] leading-[0.95] tracking-tight mb-6"
            >
              Welcome to{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[oklch(0.55_0.22_28)]">
                  Kumar
                </span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-4 bg-[oklch(0.88_0.2_88)] -z-0 -rotate-1 rounded"
                  style={{ transform: "rotate(-1.5deg) scaleX(1.05)" }}
                />
              </span>{" "}
              <span className="text-[oklch(0.55_0.17_162)]">Ayush</span>
              <span className="inline-block ml-2 animate-bounce-subtle">
                🎊
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="font-body text-xl md:text-2xl text-[oklch(0.38_0.05_270)] max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              The one place on the internet where you're{" "}
              <em className="not-italic font-bold text-[oklch(0.55_0.22_28)]">
                guaranteed
              </em>{" "}
              to smile. No cap. Pinky promise. 🤙
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={scrollToJokes}
                size="lg"
                className="bg-[oklch(0.55_0.22_28)] hover:bg-[oklch(0.5_0.22_28)] text-white font-bold text-lg px-8 py-6 rounded-2xl border-2 border-[oklch(0.42_0.2_28)] shadow-fun-coral hover:-translate-y-1 transition-all duration-150 animate-pulse-glow"
              >
                <Laugh className="w-5 h-5 mr-2" />
                Show Me The Fun!
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              <a href="#facts">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold text-lg px-8 py-6 rounded-2xl border-2 border-[oklch(0.62_0.15_270)] text-[oklch(0.28_0.06_270)] hover:bg-[oklch(0.92_0.04_270)] hover:-translate-y-1 transition-all duration-150"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Fun Facts
                </Button>
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 flex justify-center"
            >
              <div className="flex flex-col items-center gap-1 text-[oklch(0.55_0.04_270)] text-sm font-body">
                <span>Scroll down</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── About ─────────────────────────────────────────────── */}
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[oklch(0.22_0.05_270)]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 50%, oklch(0.88 0.2 88 / 0.5) 0%, transparent 60%), radial-gradient(circle at 90% 50%, oklch(0.68 0.22 28 / 0.4) 0%, transparent 60%)",
            }}
          />

          <div className="relative container max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Badge className="mb-4 bg-[oklch(0.88_0.2_88)] text-[oklch(0.18_0.05_270)] border-none font-bold">
                  About This Place
                </Badge>
                <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                  Just a cozy corner
                  <br />
                  <span className="text-[oklch(0.88_0.2_88)]">
                    to smile & laugh
                  </span>
                </h2>
                <p className="font-body text-lg text-[oklch(0.75_0.04_270)] leading-relaxed mb-6">
                  The internet can be a wild place. Deadlines, news, drama — it
                  never stops. Kumar Ayush is the antidote: a tiny slice of the
                  web dedicated to making you chuckle, wonder, and feel good.
                </p>
                <p className="font-body text-lg text-[oklch(0.75_0.04_270)] leading-relaxed">
                  No ads, no rage-bait, no algorithm. Just jokes, fun facts, and
                  the pure uncut joy of wasting five minutes productively. 🌈
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  {
                    icon: Laugh,
                    label: "Jokes & Wit",
                    color: "oklch(0.88 0.2 88)",
                    text: "oklch(0.18 0.05 270)",
                  },
                  {
                    icon: Flame,
                    label: "Hot Takes",
                    color: "oklch(0.68 0.22 28)",
                    text: "white",
                  },
                  {
                    icon: Brain,
                    label: "Fun Facts",
                    color: "oklch(0.72 0.16 162)",
                    text: "oklch(0.18 0.05 270)",
                  },
                  {
                    icon: Heart,
                    label: "Good Vibes",
                    color: "oklch(0.62 0.2 280)",
                    text: "white",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -4, rotate: [-1, 1][i % 2] }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="rounded-2xl p-5 border-2 border-[oklch(1_0_0/0.1)] cursor-default"
                    style={{ background: `${item.color}22` }}
                  >
                    <item.icon
                      className="w-8 h-8 mb-3"
                      style={{ color: item.color }}
                    />
                    <p
                      className="font-display font-bold text-base"
                      style={{ color: "white" }}
                    >
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Jokes Section ─────────────────────────────────────── */}
        <section id="jokes" ref={jokesSectionRef} className="py-24 relative">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.88 0.2 88 / 0.2) 0%, transparent 70%)",
            }}
          />

          <div className="relative container max-w-6xl mx-auto px-4">
            <SectionHeading
              emoji="😂"
              title="Jokes & Quips"
              subtitle="Hand-picked for maximum chuckle. Every single one is tested on real humans (mostly me)."
            />

            {/* Surprise Me Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="flex justify-center mb-12"
            >
              <Button
                onClick={surpriseMe}
                disabled={jokesLoading || !jokes?.length}
                size="lg"
                className="bg-[oklch(0.55_0.22_28)] hover:bg-[oklch(0.5_0.22_28)] text-white font-bold text-base px-8 py-5 rounded-2xl border-2 border-[oklch(0.42_0.2_28)] shadow-fun-coral hover:-translate-y-1 transition-all duration-150 group"
              >
                <Shuffle className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
                Surprise Me!
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Jokes Grid */}
            {jokesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((sk) => (
                  <JokeSkeleton key={sk} />
                ))}
              </div>
            ) : jokes && jokes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {jokes.map((joke, i) => (
                  <div
                    key={joke.id.toString()}
                    id={`joke-${joke.id}`}
                    className="relative"
                  >
                    <JokeCard
                      joke={joke}
                      isHighlighted={highlightedId === joke.id}
                      index={i}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🤔</div>
                <p className="font-display text-2xl font-bold text-[oklch(0.35_0.05_270)] mb-2">
                  No jokes loaded yet
                </p>
                <p className="font-body text-[oklch(0.5_0.04_270)]">
                  Hang tight — the comedian is warming up...
                </p>
              </div>
            )}

            {jokes && jokes.length > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8 font-body text-sm text-[oklch(0.55_0.04_270)] font-medium"
              >
                <Zap className="inline w-3.5 h-3.5 mr-1" />
                {jokes.length} jokes loaded • Try the Surprise Me button!
              </motion.p>
            )}
          </div>
        </section>

        {/* ─── Fun Facts ─────────────────────────────────────────── */}
        <section id="facts" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[oklch(0.94_0.02_90)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, oklch(0.88 0.2 88 / 0.3) 0px, transparent 1px, transparent 20px, oklch(0.88 0.2 88 / 0.3) 21px)",
            }}
          />

          <div className="relative container max-w-6xl mx-auto px-4">
            <SectionHeading
              emoji="🤯"
              title="Did You Know?"
              subtitle="Completely true facts that will make you go 'huh, neat' and immediately tell someone else."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {funFacts.map((fact, i) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
                >
                  <Card
                    className={`h-full rounded-2xl border-2 border-[oklch(0.85_0.04_90)] ${fact.shadow} overflow-hidden`}
                  >
                    <CardHeader className={`${fact.color} pb-4 pt-6 px-6`}>
                      <div className="flex items-center justify-between">
                        <fact.icon className="w-8 h-8 text-[oklch(0.2_0.06_270)]" />
                        <Badge
                          className={`text-xs font-bold ${fact.badgeColor}`}
                        >
                          {fact.badge}
                        </Badge>
                      </div>
                      <h3 className="font-display text-xl font-black text-[oklch(0.18_0.05_270)] mt-3">
                        {fact.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="px-6 py-5">
                      <p className="font-body text-[oklch(0.3_0.04_270)] leading-relaxed">
                        {fact.fact}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Decorative "more coming soon" note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-10"
            >
              <Badge className="bg-[oklch(0.62_0.2_280)] text-white border-none font-semibold px-4 py-2 text-sm rounded-full">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
                More facts coming soon™
              </Badge>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA Banner ────────────────────────────────────────── */}
        <section className="py-20 bg-[oklch(0.88_0.2_88)] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 0%, transparent 40%), radial-gradient(circle at 80% 50%, oklch(0.68 0.22 28) 0%, transparent 40%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative container max-w-4xl mx-auto px-4 text-center"
          >
            <div className="text-5xl mb-4 animate-wiggle inline-block">😄</div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[oklch(0.18_0.05_270)] mb-4 tracking-tight">
              Feeling better already?
            </h2>
            <p className="font-body text-lg text-[oklch(0.28_0.06_270)] mb-8 max-w-xl mx-auto">
              Bookmark this page and return whenever the world gets too serious.
              We'll always be here with a fresh batch of chuckles. 🌟
            </p>
            <Button
              onClick={scrollToJokes}
              size="lg"
              className="bg-[oklch(0.18_0.05_270)] hover:bg-[oklch(0.28_0.06_270)] text-white font-bold text-lg px-10 py-6 rounded-2xl border-2 border-[oklch(0.12_0.04_270)] shadow-fun hover:-translate-y-1 transition-all duration-150"
            >
              <Smile className="w-5 h-5 mr-2" />
              More Jokes Please!
            </Button>
          </motion.div>
        </section>
      </main>

      {/* ─── Footer ────────────────────────────────────────────────── */}
      <footer className="bg-[oklch(0.18_0.05_270)] text-white py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <p className="font-display font-black text-xl tracking-tight">
                  Kumar Ayush
                </p>
                <p className="font-body text-sm text-[oklch(0.65_0.04_270)]">
                  Made for fun. No other agenda.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {[
                { href: "#about", label: "About" },
                { href: "#jokes", label: "Jokes" },
                { href: "#facts", label: "Facts" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-[oklch(0.65_0.04_270)] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="text-center md:text-right">
              <p className="font-body text-sm text-[oklch(0.55_0.04_270)]">
                © {new Date().getFullYear()}.{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[oklch(0.88_0.2_88)] transition-colors"
                >
                  Built with{" "}
                  <Heart className="w-3.5 h-3.5 inline text-[oklch(0.68_0.22_28)]" />{" "}
                  using caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
