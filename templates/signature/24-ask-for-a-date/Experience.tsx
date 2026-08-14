"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ConfettiBurst } from "@/templates/_shared/components/ConfettiBurst";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { themeStyle } from "@/templates/_shared/theme";
import type { DateQuizOption, TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

const DEFAULT_QUESTIONS = [
  {
    prompt: "What's your ideal date vibe?",
    options: [
      { label: "Cozy café", emoji: "☕" },
      { label: "Sunset walk", emoji: "🌅" },
      { label: "Fancy dinner", emoji: "🍽" },
      { label: "Movie night", emoji: "🎬" },
    ],
  },
  {
    prompt: "When feels perfect to you?",
    options: [
      { label: "Brunch morning", emoji: "🌤" },
      { label: "Golden hour", emoji: "🌇" },
      { label: "After dark", emoji: "🌙" },
      { label: "Whenever you're free", emoji: "💫" },
    ],
  },
  {
    prompt: "What's your food mood?",
    options: [
      { label: "Something sweet", emoji: "🍰" },
      { label: "Sushi night", emoji: "🍣" },
      { label: "Italian comfort", emoji: "🍝" },
      { label: "Surprise me", emoji: "✨" },
    ],
  },
  {
    prompt: "Pick the soundtrack",
    options: [
      { label: "Soft jazz", emoji: "🎷" },
      { label: "Our playlist", emoji: "🎵" },
      { label: "City sounds", emoji: "🌃" },
      { label: "Just us talking", emoji: "💬" },
    ],
  },
  {
    prompt: "Dress code?",
    options: [
      { label: "Casual & cute", emoji: "👟" },
      { label: "Dress to impress", emoji: "👗" },
      { label: "Come as you are", emoji: "🧢" },
      { label: "Matching colors", emoji: "💕" },
    ],
  },
];

type Phase = "intro" | "quiz" | "summary" | "ask" | "yes";

function ProgressDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <motion.span
          key={i}
          className="h-2 rounded-full"
          style={{
            background:
              i <= current ? "var(--hw-primary)" : "var(--hw-border)",
          }}
          animate={{
            width: i === current ? 28 : 8,
            opacity: i <= current ? 1 : 0.45,
          }}
          transition={{ duration: 0.45, ease: soft }}
        />
      ))}
    </div>
  );
}

function OptionCard({
  option,
  index,
  onPick,
}: {
  option: DateQuizOption;
  index: number;
  onPick: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onPick}
      className="group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left shadow-sm transition-colors"
      style={{
        background: "rgba(255,255,255,0.9)",
        borderColor: "var(--hw-border)",
      }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08 + index * 0.07, duration: 0.55, ease: soft }}
      whileHover={
        reduce
          ? undefined
          : {
              scale: 1.02,
              borderColor: "var(--hw-primary)",
              boxShadow: "0 12px 32px rgba(227,138,168,0.18)",
            }
      }
      whileTap={{ scale: 0.98 }}
    >
      {option.emoji ? (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl" style={{ background: "var(--hw-accent)" }}>
          {option.emoji}
        </span>
      ) : null}
      <span className="text-lg" style={{ color: "var(--hw-text)" }}>
        {option.label}
      </span>
    </motion.button>
  );
}

function SummaryCard({
  picks,
  headline,
  firstName,
}: {
  picks: DateQuizOption[];
  headline: string;
  firstName: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="w-full max-w-md rounded-[1.75rem] border px-8 py-10 text-center shadow-lg"
      style={{
        background: "rgba(255,255,255,0.92)",
        borderColor: "var(--hw-border)",
      }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: soft }}
    >
      <p
        className="text-[11px] tracking-[0.35em] uppercase"
        style={{ color: "var(--hw-muted)" }}
      >
        {firstName}&apos;s perfect date
      </p>
      <h2
        className="mt-4 font-[family-name:var(--font-display)] text-4xl"
        style={{ color: "var(--hw-primary)" }}
      >
        {headline}
      </h2>
      <ul className="mt-8 space-y-3 text-left">
        {picks.map((pick, i) => (
          <motion.li
            key={`${pick.label}-${i}`}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "rgba(246,193,208,0.25)" }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: soft }}
          >
            <span className="text-xl">{pick.emoji ?? "♥"}</span>
            <span style={{ color: "var(--hw-text)" }}>{pick.label}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function DateAccepted({
  data,
  firstName,
  from,
  picks,
}: {
  data: TemplateData;
  firstName: string;
  from: string;
  picks: DateQuizOption[];
}) {
  const reduce = useReducedMotion();
  const quiz = data.extras.dateQuiz;
  const letter = data.extras.letter;
  const photo = data.media.photos[0];
  const vibe = picks[0]?.label?.toLowerCase() ?? "perfect";

  return (
    <motion.section
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-20 text-center"
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: soft }}
    >
      {!reduce ? (
        <div className="pointer-events-none fixed inset-0 z-[8]">
          <ConfettiBurst
            colors={["#7EB8DA", "#F6C1D0", "#FFFFFF", "#5A8FB8"]}
            count={90}
            variant="sparkle"
          />
        </div>
      ) : null}

      <motion.div
        className="relative z-10 mb-6 text-5xl"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        💐
      </motion.div>

      <motion.h1
        className="relative z-10 max-w-lg font-[family-name:var(--font-display)] text-5xl sm:text-6xl"
        style={{ color: "var(--hw-primary)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.85, ease: soft }}
      >
        {quiz?.yesMessage ?? "It's a date!"}
      </motion.h1>

      <motion.p
        className="relative z-10 mt-4 max-w-md text-lg leading-8"
        style={{ color: "var(--hw-text)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        {data.copy.message.replace("{name}", firstName).replace("{vibe}", vibe)}
      </motion.p>

      {data.event ? (
        <motion.div
          className="relative z-10 mt-8 rounded-2xl border px-6 py-5 text-left shadow-sm"
          style={{
            background: "rgba(255,255,255,0.9)",
            borderColor: "var(--hw-border)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          {data.event.timeLabel ? (
            <p className="text-sm tracking-[0.2em] uppercase" style={{ color: "var(--hw-muted)" }}>
              When
            </p>
          ) : null}
          {data.event.timeLabel ? (
            <p className="mt-1 text-xl" style={{ color: "var(--hw-secondary)" }}>
              {data.event.timeLabel}
            </p>
          ) : null}
          {data.event.place ? (
            <>
              <p className="mt-4 text-sm tracking-[0.2em] uppercase" style={{ color: "var(--hw-muted)" }}>
                Where
              </p>
              <PlaceLink place={data.event.place} className="mt-1 text-xl" />
            </>
          ) : null}
        </motion.div>
      ) : null}

      {photo ? (
        <motion.div
          className="relative z-10 mt-10 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] border shadow-xl"
          style={{ borderColor: "var(--hw-border)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.85, ease: soft }}
        >
          <Image src={photo.src} alt={photo.alt} fill sizes="320px" className="object-cover" />
        </motion.div>
      ) : null}

      <motion.p
        className="relative z-10 mt-10 font-[family-name:var(--font-display)] text-3xl"
        style={{ color: "var(--hw-secondary)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        {letter?.signature ?? from}
      </motion.p>
    </motion.section>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const quiz = data.extras.dateQuiz;
  const questions = quiz?.questions?.length ? quiz.questions : DEFAULT_QUESTIONS;

  const to =
    data.people.find((p) => p.role === "To")?.name ?? data.people[0]?.name ?? "";
  const from =
    data.people.find((p) => p.role === "From")?.name ??
    data.people[1]?.name ??
    "";
  const firstName = to.split(" ")[0] ?? to;

  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DateQuizOption[]>([]);
  const [noAttempts, setNoAttempts] = useState(0);

  const currentQuestion = questions[questionIndex];
  const summaryHeadline =
    quiz?.summaryHeadline ?? "I think I know your dream date";

  const askHeadline =
    quiz?.askHeadline ?? `${firstName}, will you go on a date with me?`;

  function pickOption(option: DateQuizOption) {
    const next = [...answers, option];
    setAnswers(next);
    if (questionIndex >= questions.length - 1) {
      setPhase("summary");
      return;
    }
    setQuestionIndex((i) => i + 1);
  }

  const floatingEmoji = useMemo(
    () => ["☕", "🌹", "✨", "💫", "🌙", "💐"],
    [],
  );

  return (
    <main
      className="relative min-h-svh overflow-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 20%, rgba(126,184,218,0.28) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(246,193,208,0.25) 0%, transparent 50%), linear-gradient(180deg, #FAFCFF, #FFF8FA)",
        }}
      />
      <ParticleField
        variant="bokeh"
        count={10}
        colors={["rgba(126,184,218,0.35)", "rgba(246,193,208,0.4)"]}
        className="fixed inset-0 -z-[5] opacity-55"
      />
      <TextureOverlay variant="grain" opacity={0.04} className="fixed inset-0" />

      {!reduce ? (
        <div className="pointer-events-none fixed inset-0 z-[3] overflow-hidden opacity-40" aria-hidden>
          {floatingEmoji.map((emoji, i) => (
            <motion.span
              key={emoji}
              className="absolute text-2xl"
              style={{ left: `${12 + i * 14}%`, top: "-4%" }}
              animate={{ y: ["0vh", "105vh"], opacity: [0, 0.8, 0.8, 0] }}
              transition={{
                duration: 8 + (i % 3),
                delay: i * 0.9,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.section
            key="intro"
            className="flex min-h-svh flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.65, ease: soft }}
          >
            <motion.p
              className="text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "var(--hw-muted)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {data.copy.subhead ?? "Before I ask…"}
            </motion.p>
            <motion.h1
              className="mt-6 max-w-xl font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl"
              style={{ color: "var(--hw-primary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: soft }}
            >
              {data.copy.headline}
            </motion.h1>
            <motion.p
              className="mt-5 max-w-md text-lg leading-8"
              style={{ color: "var(--hw-text)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {quiz?.intro ??
                `Hey ${firstName}, ${from || "I"} want to plan something special — answer a few quick questions first.`}
            </motion.p>
            <motion.button
              type="button"
              onClick={() => setPhase("quiz")}
              className="mt-12 rounded-full px-10 py-4 text-sm font-medium tracking-[0.16em] uppercase text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7EB8DA, #5A8FB8)",
                boxShadow: "0 12px 32px rgba(90,143,184,0.4)",
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {data.copy.cta ?? "Let's go"}
            </motion.button>
          </motion.section>
        ) : null}

        {phase === "quiz" && currentQuestion ? (
          <motion.section
            key={`q-${questionIndex}`}
            className="flex min-h-svh flex-col items-center justify-center px-6 py-16"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
            transition={{ duration: 0.55, ease: soft }}
          >
            <p
              className="mb-3 text-[11px] tracking-[0.35em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              Question {questionIndex + 1} of {questions.length}
            </p>
            <ProgressDots total={questions.length} current={questionIndex} />

            <motion.h2
              className="mt-10 max-w-lg text-center font-[family-name:var(--font-display)] text-4xl sm:text-5xl"
              style={{ color: "var(--hw-primary)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: soft }}
            >
              {currentQuestion.prompt}
            </motion.h2>

            <div className="mt-10 flex w-full max-w-md flex-col gap-3">
              {currentQuestion.options.map((option, i) => (
                <OptionCard
                  key={option.label}
                  option={option}
                  index={i}
                  onPick={() => pickOption(option)}
                />
              ))}
            </div>
          </motion.section>
        ) : null}

        {phase === "summary" ? (
          <motion.section
            key="summary"
            className="flex min-h-svh flex-col items-center justify-center px-6 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, ease: soft }}
          >
            <SummaryCard
              picks={answers}
              headline={summaryHeadline}
              firstName={firstName}
            />
            <motion.button
              type="button"
              onClick={() => setPhase("ask")}
              className="mt-10 rounded-full px-10 py-4 text-sm font-medium tracking-[0.16em] uppercase text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, #E38AA8, #C96B8A)",
                boxShadow: "0 12px 32px rgba(227,138,168,0.4)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Continue
            </motion.button>
          </motion.section>
        ) : null}

        {phase === "ask" ? (
          <motion.section
            key="ask"
            className="flex min-h-svh flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: soft }}
          >
            <motion.h1
              className="max-w-xl font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl"
              style={{ color: "var(--hw-primary)" }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: soft }}
            >
              {askHeadline}
            </motion.h1>
            <motion.p
              className="mt-4 text-sm"
              style={{ color: "var(--hw-muted)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {from ? `${from} has been planning this…` : "Choose your answer"}
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <motion.button
                type="button"
                onClick={() => setPhase("yes")}
                className="rounded-full px-10 py-4 text-sm font-medium tracking-[0.16em] uppercase text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #7EB8DA, #5A8FB8)",
                  boxShadow: "0 12px 32px rgba(90,143,184,0.45)",
                }}
                whileHover={reduce ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
                transition={{
                  scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {quiz?.yesLabel ?? "Yes, I'd love to"}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => {
                  setNoAttempts((n) => n + 1);
                  if (noAttempts >= 2) setPhase("yes");
                }}
                className="rounded-full border px-8 py-3.5 text-sm tracking-[0.14em] uppercase"
                style={{
                  borderColor: "var(--hw-border)",
                  background: "rgba(255,255,255,0.85)",
                  color: "var(--hw-muted)",
                }}
                animate={
                  reduce
                    ? undefined
                    : {
                        x: noAttempts % 2 === 0 ? [0, 24, -20, 0] : [0, -18, 22, 0],
                      }
                }
                transition={{ duration: 0.45 }}
                whileTap={{ scale: 0.96 }}
              >
                No
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {noAttempts > 0 ? (
                <motion.p
                  key={noAttempts}
                  className="mt-8 max-w-sm text-sm italic"
                  style={{ color: "var(--hw-primary)" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {quiz?.noHint ??
                    (noAttempts >= 2
                      ? "Okay okay — I'll count that as a yes 😊"
                      : "Wrong answer. Try the other button.")}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.section>
        ) : null}

        {phase === "yes" ? (
          <DateAccepted
            key="yes"
            data={data}
            firstName={firstName}
            from={from}
            picks={answers}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
