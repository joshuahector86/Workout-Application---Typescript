import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PageLayout, { type Accent } from "@/components/page-layout";

export type PossibleDays =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface ProgramExercise {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface ProgramDayData {
  title: string;
  description: string;
  content: ProgramExercise[];
}

interface DetailStat {
  label: string;
  value: string;
}

interface ProgramPageProps {
  pageTitle: string;
  accent: Accent;
  subtitle: string;
  homePath: string;
  basePath: string;
  detailBasePath: string;
  cardLabel: string;
  cardBadges: string[];
  detailSectionLabel: string;
  detailSourceLabel?: string;
  dayData: Record<PossibleDays, ProgramDayData>;
  notFoundMessage: string;
  getYoutubeUrl?: (exerciseName: string) => string | undefined;
  getDetailStats: (dayTitle: string, selectedDate: string) => DetailStat[];
}

const DAY_INDEX: PossibleDays[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const FALLBACK_IMG =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiMyNzI3MjciLz48cGF0aCBkPSJNMjUgMjVINTVWNTVIMjVWMjVaIiBzdHJva2U9IiM1MjUyNTIiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMzIiBjeT0iMzMiIHI9IjMiIGZpbGw9IiM1MjUyNTIiLz48cGF0aCBkPSJNMjUgNDVMMzUgMzVMNDUgNDVMNTUgMzUiIHN0cm9rZT0iIzUyNTI1MiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9zdmc+";

const DEFAULT_YOUTUBE_URL = "https://www.youtube.com/watch?v=2mkR5LPhOC4";

const accentStyles: Record<
  Accent,
  {
    dayChip: string;
    selectorHover: string;
    inputBorder: string;
    inputRing: string;
    todayBadge: string;
    headingText: string;
    detailAction: string;
    detailActionHover: string;
    openLink: string;
  }
> = {
  red: {
    dayChip: "text-red-300 border-red-500/60 bg-red-500/10",
    selectorHover: "hover:border-red-500/50",
    inputBorder: "focus:border-red-500/60",
    inputRing: "focus:ring-red-500/30",
    todayBadge: "bg-red-500/10 text-red-400 border-red-500/20",
    headingText: "text-red-300/80",
    detailAction:
      "border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20",
    detailActionHover: "hover:text-red-200",
    openLink: "text-red-300 hover:text-red-200",
  },
  cyan: {
    dayChip: "text-cyan-300 border-cyan-500/60 bg-cyan-500/10",
    selectorHover: "hover:border-cyan-500/50",
    inputBorder: "focus:border-cyan-500/60",
    inputRing: "focus:ring-cyan-500/30",
    todayBadge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    headingText: "text-cyan-300/80",
    detailAction:
      "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20",
    detailActionHover: "hover:text-cyan-200",
    openLink: "text-cyan-300 hover:text-cyan-200",
  },
  purple: {
    dayChip: "text-purple-300 border-purple-500/60 bg-purple-500/10",
    selectorHover: "hover:border-purple-500/50",
    inputBorder: "focus:border-purple-500/60",
    inputRing: "focus:ring-purple-500/30",
    todayBadge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    headingText: "text-purple-300/80",
    detailAction:
      "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20",
    detailActionHover: "hover:text-purple-200",
    openLink: "text-purple-300 hover:text-purple-200",
  },
  none: {
    dayChip: "text-white border-zinc-700 bg-white/5",
    selectorHover: "hover:border-white/40",
    inputBorder: "focus:border-white/40",
    inputRing: "focus:ring-white/20",
    todayBadge: "bg-white/10 text-white border-white/20",
    headingText: "text-zinc-300",
    detailAction: "border-white/20 bg-white/10 text-white hover:bg-white/15",
    detailActionHover: "hover:text-white",
    openLink: "text-white hover:text-zinc-200",
  },
};

const toISODate = (date: Date): string => date.toISOString().split("T")[0];

const isValidISODate = (value: string | null): value is string =>
  Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));

const toYoutubeEmbedUrl = (youtubeUrl: string, fallbackQuery: string) => {
  try {
    const parsedUrl = new URL(youtubeUrl);
    const videoId =
      parsedUrl.searchParams.get("v") ||
      (parsedUrl.hostname === "youtu.be"
        ? parsedUrl.pathname.replace("/", "")
        : null);

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    const query = parsedUrl.searchParams.get("search_query");

    if (query) {
      const encodedQuery = encodeURIComponent(query);
      return `https://www.youtube.com/embed?listType=search&list=${encodedQuery}`;
    }
  } catch {
    return DEFAULT_YOUTUBE_URL.replace("watch?v=", "embed/");
  }

  const encodedQuery = encodeURIComponent(fallbackQuery);
  return `https://www.youtube.com/embed?listType=search&list=${encodedQuery}`;
};

const shiftISODateByDays = (dateISO: string, days: number): string => {
  const date = new Date(dateISO + "T12:00:00");
  date.setDate(date.getDate() + days);
  return toISODate(date);
};

const todayISO = toISODate(new Date());

const ProgramPage = ({
  pageTitle,
  accent,
  subtitle,
  homePath,
  basePath,
  detailBasePath,
  cardLabel,
  cardBadges,
  detailSectionLabel,
  detailSourceLabel = "Source: YouTube exercise search",
  dayData,
  notFoundMessage,
  getYoutubeUrl,
  getDetailStats,
}: ProgramPageProps) => {
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const styles = accentStyles[accent];

  const selectedDate = isValidISODate(searchParams.get("date"))
    ? (searchParams.get("date") as string)
    : todayISO;

  const dayIndex = new Date(selectedDate + "T12:00:00").getDay();
  const dayKey = DAY_INDEX[dayIndex];
  const currentData = dayData[dayKey];
  const isToday = selectedDate === todayISO;

  const allDays = Object.entries(dayData) as Array<
    [PossibleDays, ProgramDayData]
  >;
  const selectedExerciseId = exerciseId ? Number(exerciseId) : null;
  const selectedExerciseEntry = selectedExerciseId
    ? (allDays
        .map(([entryDayKey, entryDayData]) => {
          const exercise = entryDayData.content.find(
            (item) => item.id === selectedExerciseId,
          );

          if (!exercise) {
            return null;
          }

          return {
            exercise,
            dayKey: entryDayKey,
            dayTitle: entryDayData.title,
          };
        })
        .find(Boolean) ?? null)
    : null;

  const setDateInUrl = (nextDate: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("date", nextDate);
    setSearchParams(nextParams, { replace: true });
  };

  const openExerciseDetail = (id: number) => {
    navigate(`${detailBasePath}/${id}?date=${selectedDate}`);
  };

  const closeExerciseDetail = () => {
    navigate(`${basePath}?date=${selectedDate}`);
  };

  useEffect(() => {
    setVideoLoaded(false);
    setVideoFailed(false);

    if (!selectedExerciseEntry) {
      return;
    }

    const timer = window.setTimeout(() => {
      setVideoFailed(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [selectedExerciseEntry?.exercise.id]);

  if (exerciseId && !selectedExerciseEntry) {
    return (
      <PageLayout
        title="Exercise Not Found"
        accent={accent}
        onBack={() => navigate(`${basePath}?date=${selectedDate}`)}
        subtitle="Exercise Detail"
      >
        <div className="border border-zinc-800 bg-zinc-900/80 p-5">
          <p className="text-sm leading-relaxed text-zinc-300">
            {notFoundMessage}
          </p>
        </div>
      </PageLayout>
    );
  }

  if (selectedExerciseEntry) {
    const { exercise, dayTitle } = selectedExerciseEntry;
    const youtubeUrl = getYoutubeUrl?.(exercise.name) ?? DEFAULT_YOUTUBE_URL;
    const youtubeEmbedUrl = toYoutubeEmbedUrl(
      youtubeUrl,
      `${exercise.name} exercise tutorial`,
    );
    const shouldShowImageFallback = videoFailed && !videoLoaded;
    const detailStats = getDetailStats(dayTitle, selectedDate);

    return (
      <PageLayout
        title={exercise.name}
        accent={accent}
        onBack={closeExerciseDetail}
        subtitle="Exercise Detail"
      >
        <div className="space-y-5">
          <div className="border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5">
            <p
              className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] ${styles.headingText}`}
            >
              Session Metadata
            </p>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[164px_minmax(0,1fr)] lg:items-start">
              <div className="border border-zinc-800 bg-zinc-950/60 p-2">
                <div className="relative aspect-square overflow-hidden border border-zinc-800 bg-black">
                  <img
                    src={exercise.imageUrl || FALLBACK_IMG}
                    alt={exercise.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-200/80">
                      Exercise Photo
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                {detailStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-zinc-800 bg-zinc-950/60 px-3 py-2"
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-zinc-100">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              {exercise.description}
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-900/80 p-3 sm:p-4">
            <p
              className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] ${styles.headingText}`}
            >
              Video Walkthrough
            </p>
            <div className="relative aspect-video w-full overflow-hidden border border-zinc-800 bg-black">
              {shouldShowImageFallback ? (
                <div className="absolute inset-0">
                  <img
                    src={exercise.imageUrl || FALLBACK_IMG}
                    alt={exercise.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p
                      className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${styles.headingText}`}
                    >
                      Video unavailable
                    </p>
                    <p className="mb-4 max-w-md text-sm text-zinc-200">
                      The embedded tutorial did not load, so the exercise image
                      is shown instead.
                    </p>
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center rounded-sm border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${styles.detailAction}`}
                    >
                      Open on YouTube
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  src={youtubeEmbedUrl}
                  title={`${exercise.name} video tutorial`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onLoad={() => setVideoLoaded(true)}
                  onError={() => setVideoFailed(true)}
                />
              )}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-zinc-500">{detailSourceLabel}</p>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className={`text-xs font-semibold uppercase tracking-[0.16em] ${styles.openLink}`}
              >
                Open search result
              </a>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={pageTitle}
      accent={accent}
      onBack={() => navigate(homePath)}
      subtitle={subtitle}
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDateInUrl(shiftISODateByDays(selectedDate, -1))}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 transition-colors hover:text-white ${styles.selectorHover}`}
            aria-label="Go to previous day"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setDateInUrl(shiftISODateByDays(selectedDate, 1))}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 transition-colors hover:text-white ${styles.selectorHover}`}
            aria-label="Go to next day"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="relative flex-1">
          <CalendarDays
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && setDateInUrl(e.target.value)}
            className={`w-full rounded-xl border border-zinc-700 bg-zinc-900 py-2.5 pl-9 pr-4 text-sm text-white transition-colors [color-scheme:dark] focus:outline-none focus:ring-1 ${styles.inputBorder} ${styles.inputRing}`}
          />
        </div>
        {!isToday && (
          <button
            onClick={() => setDateInUrl(todayISO)}
            className={`whitespace-nowrap rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors ${styles.todayBadge}`}
          >
            Back to Today
          </button>
        )}
        {isToday && (
          <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-semibold ${styles.todayBadge}`}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            Today
          </span>
        )}
      </div>

      <div className="sticky top-[77px] z-10 mb-6 border-y border-zinc-800 bg-zinc-950/85 py-2 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2">
          {DAY_INDEX.map((day) => {
            const selected = day === dayKey;
            const dayDate = shiftISODateByDays(
              selectedDate,
              DAY_INDEX.indexOf(day) - dayIndex,
            );

            return (
              <button
                key={day}
                type="button"
                onClick={() => setDateInUrl(dayDate)}
                className={`rounded-sm border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  selected
                    ? styles.dayChip
                    : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                {day.slice(0, 3)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6 border-b border-zinc-800 pb-4">
        <p
          className={`mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] ${styles.headingText}`}
        >
          {isToday
            ? "Today"
            : new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
        </p>
        <h2 className="display-font text-5xl leading-none text-white">
          {currentData.title}
        </h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-zinc-400">
          {currentData.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {currentData.content.map((exercise, index) => (
          <button
            key={exercise.id}
            type="button"
            onClick={() => openExerciseDetail(exercise.id)}
            className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-zinc-800 bg-zinc-900 text-left"
          >
            <img
              src={exercise.imageUrl}
              alt={exercise.name}
              className="h-full w-full bg-zinc-800 object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMG;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p
                className={`mb-1 text-[9px] uppercase tracking-[0.25em] ${styles.headingText}`}
              >
                {String(index + 1).padStart(2, "0")} · {cardLabel}
              </p>
              <h4 className="display-font text-[1.7rem] leading-none text-white">
                {exercise.name}
              </h4>
              <p className="mt-2 max-h-0 overflow-hidden text-[11px] leading-relaxed text-zinc-300/90 transition-all duration-300 group-hover:max-h-20">
                {exercise.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cardBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-sm border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] tracking-wide text-zinc-100"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                {detailSectionLabel}
              </p>
            </div>
          </button>
        ))}
      </div>
    </PageLayout>
  );
};

export default ProgramPage;
