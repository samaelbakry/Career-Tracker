"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  ExternalLink,
  Lightbulb,
  Newspaper,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const articles = [
  {
    category: "HIRING RESEARCH",
    date: "September 30, 2026",
    title: "AI is making candidate evaluation harder",
    description:
      "A new WGU report explores why employers are finding it harder to assess candidates' real-world skills as AI changes the hiring process.",
    source: "WGU",
    href: "https://www.wgu.edu/newsroom/press-release/2026/09/ai-has-made-real-skills-harder-to-evaluate.html",
    icon: BrainCircuit,
    color: "violet",
  },
  {
    category: "SKILLS & TRENDS",
    date: "June 25, 2026",
    title: "The skills employers want in the age of AI",
    description:
      "GMAC's 2026 research highlights growing demand for technology, AI and data skills alongside communication and problem-solving.",
    source: "GMAC",
    href: "https://www.gmac.com/why-gmac/gmac-news/gmac-press-releases/age-of-ai-employers-say-human-skills-matter-more-than-ever",
    icon: TrendingUp,
    color: "blue",
  },
];

const tips = [
  {
    icon: Target,
    title: "Define what success looks like",
    description:
      "List the outcomes and skills a candidate needs instead of relying only on a long list of requirements.",
  },
  {
    icon: Lightbulb,
    title: "Evaluate skills with evidence",
    description:
      "Use structured interviews, practical tasks and consistent criteria to assess candidates fairly.",
  },
];

export default function EmployerHiringBrief() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative mb-10 overflow-hidden mt-3 rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-700/10" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-700/10" />

      <div className="relative p-5 sm:p-7 lg:p-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
              <Newspaper className="size-5" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                  The Hiring Brief
                </h2>

                <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
                  <Sparkles className="size-3" />
                  Editor&apos;s picks
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Research, hiring trends and practical insights for recruiters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <TrendingUp className="size-4 text-emerald-500" />
            <span>Research-backed insights</span>
          </div>
        </div>

        <a
          href={articles[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mb-4 block overflow-hidden rounded-2xl bg-[#19152F] p-5 transition-all duration-300 hover:shadow-xl hover:shadow-violet-950/10 sm:p-7"
        >
          <div className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full border border-white/10 transition-transform duration-500 group-hover:scale-110" />
          <div className="pointer-events-none absolute -right-2 -top-12 size-44 rounded-full border border-white/10" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-violet-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-300">
                  Featured research
                </span>
                <span className="text-xs text-slate-400">
                  {articles[0].date}
                </span>
              </div>

              <h3 className="max-w-xl text-2xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-violet-200 sm:text-3xl">
                AI changed hiring. Can you still identify the right talent?
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                {articles[0].description}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
                Read the research
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>

            <div className="hidden size-24 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-violet-300 sm:flex">
              <BrainCircuit className="size-12" strokeWidth={1.3} />
            </div>
          </div>
        </a>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {articles.map((article) => {
            const Icon = article.icon;
            const isViolet = article.color === "violet";

            return (
              <Link
                key={article.source}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-violet-400/30 dark:hover:shadow-black/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl ${
                      isViolet
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>

                  <span className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    {article.source}
                  </span>
                </div>

                <p className="mt-4 text-[10px] font-bold tracking-[0.14em] text-violet-600 dark:text-violet-400">
                  {article.category}
                </p>

                <h3 className="mt-2 text-base font-bold leading-6 text-slate-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300">
                  {article.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {article.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                  <span className="text-xs text-slate-400">
                    {article.date}
                  </span>
                  <ExternalLink className="size-4 text-slate-400 transition-colors group-hover:text-violet-500" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-4 sm:p-5 dark:border-amber-400/15 dark:bg-amber-400/5">
          <button
            type="button"
            onClick={() => setExpanded((previous) => !previous)}
            aria-expanded={expanded}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                <Lightbulb className="size-5" />
              </span>

              <span>
                <span className="block text-sm font-bold text-slate-900 dark:text-white">
                  Recruiter&apos;s corner
                </span>
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  Two practical ideas to improve your hiring process.
                </span>
              </span>
            </span>

            <ArrowDownRight
              className={`size-5 shrink-0 text-slate-500 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {expanded && (
            <div className="mt-4 grid gap-3 border-t border-amber-200/70 pt-4 sm:grid-cols-2 dark:border-amber-400/15">
              {tips.map((tip) => {
                const Icon = tip.icon;

                return (
                  <div
                    key={tip.title}
                    className="rounded-xl border border-amber-200/50 bg-white/80 p-4 dark:border-amber-400/10 dark:bg-slate-900/70"
                  >
                    <Icon className="size-5 text-amber-600 dark:text-amber-300" />
                    <h4 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                      {tip.title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                      {tip.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}