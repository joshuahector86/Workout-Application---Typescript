import { workouts } from "@/data/workouts";
import { useEffect, useState } from "react";
import PageLayout from "@/components/page-layout";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

type PossibleDays =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

interface Exercise {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface DayData {
  title: string;
  description: string;
  content: Exercise[];
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

const dayData: Record<PossibleDays, DayData> = {
  sunday: {
    title: "Chest & Back",
    description:
      "Your body is capable of incredible things when you push past the voice that says I can't. Every rep, every step, every drop of sweat is proof that you're stronger than your excuses. The only workout you'll regret is the one you didn't do.",
    content: [...workouts.chest, ...workouts.back],
  },
  monday: {
    title: "Quads & Calves",
    description:
      "Champions aren't made in the comfort zone—they're forged in the fire of challenge and perseverance. When your muscles burn and your lungs scream, that's your body adapting and growing stronger. Embrace the discomfort because it's temporary, but the strength you build is permanent.",
    content: [...workouts.quads, ...workouts.calves],
  },
  tuesday: {
    title: "Mobility, Extensions & Abs",
    description:
      "Progress isn't always visible in the mirror, but it's happening in ways you can't see. Your heart gets stronger, your bones get denser, and your mind gets tougher with every workout. Trust the process and celebrate showing up, even when motivation is nowhere to be found.",
    content: [...workouts.abs, ...workouts.mobility],
  },
  wednesday: {
    title: "Triceps & Biceps",
    description:
      "The hardest part of any workout is starting, but once you begin, momentum carries you forward. Your future self is counting on the decisions you make today in this moment. Make them proud by choosing movement over stillness, action over hesitation.",
    content: [...workouts.triceps, ...workouts.biceps],
  },
  thursday: {
    title: "Hamstrings & Glutes",
    description:
      "Every expert was once a beginner who refused to give up. Your current limitations are not your permanent reality—they're just your starting point. Focus on being 1% better than yesterday, and watch how those small improvements compound into extraordinary results.",
    content: [...workouts.hamstrings, ...workouts.booty],
  },
  friday: {
    title: "Shoulders",
    description:
      "Your body will go where your mind leads it, so fill your thoughts with determination and possibility. When the weight feels heavy, remember that you're not just lifting iron—you're lifting your confidence, discipline, and self-respect. The strongest muscle you can develop is the one between your ears.",
    content: [...workouts.shoulders],
  },
  saturday: {
    title: "REST DAY",
    description:
      "Soreness is your body's way of saying thank you for pushing it to grow. Each workout is an investment in a stronger, healthier, more resilient version of yourself. You don't have to be perfect—you just have to be consistent and willing to begin again each day.",
    content: [...workouts.rest],
  },
};

const FALLBACK_IMG =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiMyNzI3MjciLz48cGF0aCBkPSJNMjUgMjVINTVWNTVIMjVWMjVaIiBzdHJva2U9IiM1MjUyNTIiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMzIiBjeT0iMzMiIHI9IjMiIGZpbGw9IiM1MjUyNTIiLz48cGF0aCBkPSJNMjUgNDVMMzUgMzVMNDUgNDVMNTUgMzUiIHN0cm9rZT0iIzUyNTI1MiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9zdmc+";

const toISODate = (date: Date): string => date.toISOString().split("T")[0];

const isValidISODate = (value: string | null): value is string =>
  Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));

const toPrettyDate = (dateISO: string): string =>
  new Date(dateISO + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const EXERCISE_VIDEO_SEARCH_URLS: Record<string, string> = {
  "Cable Chest Press":
    "https://www.youtube.com/results?search_query=cable+chest+press+how+to+form+tutorial",
  "Machine Chest Fly":
    "https://www.youtube.com/results?search_query=machine+chest+fly+how+to+form+tutorial",
  "Machine Overhead Press":
    "https://www.youtube.com/results?search_query=machine+overhead+press+how+to+form+tutorial",
  "Lat Pulldown":
    "https://www.youtube.com/results?search_query=lat+pulldown+how+to+form+tutorial",
  "Seated Row":
    "https://www.youtube.com/results?search_query=seated+cable+row+how+to+form+tutorial",
  "Lower Back Extension":
    "https://www.youtube.com/results?search_query=lower+back+extension+hyperextension+how+to+form+tutorial",
  "Oblique Twists":
    "https://www.youtube.com/results?search_query=oblique+twists+core+exercise+how+to+tutorial",
  "Tricep Pushdowns":
    "https://www.youtube.com/results?search_query=tricep+pushdowns+cable+how+to+form+tutorial",
  "Tricep Extensions With Dumbbells":
    "https://www.youtube.com/results?search_query=tricep+extensions+dumbbells+how+to+form+tutorial",
  "Tricep Push Down Machine":
    "https://www.youtube.com/results?search_query=tricep+pushdown+machine+how+to+form+tutorial",
  "Lateral Dumbbell Curls":
    "https://www.youtube.com/results?search_query=dumbbell+bicep+curl+how+to+form+tutorial",
  "Barbell Curls":
    "https://www.youtube.com/results?search_query=barbell+bicep+curl+how+to+form+tutorial",
  "Single Arm Dumbbell Over Bench Curls":
    "https://www.youtube.com/results?search_query=single+arm+dumbbell+preacher+curl+bench+how+to+tutorial",
  "Lateral Raises":
    "https://www.youtube.com/results?search_query=lateral+raises+dumbbell+shoulder+how+to+form+tutorial",
  "Overhead Shoulder Press With Dumbbells":
    "https://www.youtube.com/results?search_query=overhead+dumbbell+shoulder+press+how+to+form+tutorial",
  "Shoulder Shrugs":
    "https://www.youtube.com/results?search_query=shoulder+shrugs+dumbbell+trapezius+how+to+form+tutorial",
  "Reverse Flys With Dumbbells":
    "https://www.youtube.com/results?search_query=reverse+fly+dumbbell+rear+delt+how+to+form+tutorial",
  "Leg Press":
    "https://www.youtube.com/results?search_query=leg+press+machine+how+to+form+tutorial",
  "Quad Extensions":
    "https://www.youtube.com/results?search_query=quad+leg+extension+machine+how+to+form+tutorial",
  "Bulgarian Split Squat":
    "https://www.youtube.com/results?search_query=bulgarian+split+squat+how+to+form+tutorial",
  "Sumo Deadlift":
    "https://www.youtube.com/results?search_query=sumo+deadlift+how+to+form+tutorial",
  "Hamstring Curls":
    "https://www.youtube.com/results?search_query=hamstring+curl+machine+lying+how+to+form+tutorial",
  "Hamstring Lift With Forward Fold":
    "https://www.youtube.com/results?search_query=hamstring+lift+forward+fold+hip+hinge+how+to+tutorial",
  "Cossack Squats":
    "https://www.youtube.com/results?search_query=cossack+squat+how+to+form+tutorial",
  "Glute Bridge Machine":
    "https://www.youtube.com/results?search_query=glute+bridge+machine+hip+extension+how+to+tutorial",
  "Hip Thrusts":
    "https://www.youtube.com/results?search_query=hip+thrusts+barbell+glutes+how+to+form+tutorial",
  "Dumbbell Calf Raises":
    "https://www.youtube.com/results?search_query=dumbbell+calf+raises+standing+how+to+form+tutorial",
  "Machine Calf Press":
    "https://www.youtube.com/results?search_query=machine+calf+press+leg+press+toes+how+to+tutorial",
  "Rest Day":
    "https://www.youtube.com/results?search_query=rest+day+recovery+tips+workout",
  "5 Minute Abs Sequence":
    "https://www.youtube.com/results?search_query=5+minute+ab+workout+sequence+core+tutorial",
  "Middle Splits Mobility":
    "https://www.youtube.com/results?search_query=middle+splits+mobility+flexibility+routine+tutorial",
  "Ballet Floor Barre For Extensions":
    "https://www.youtube.com/results?search_query=ballet+floor+barre+leg+extensions+flexibility+tutorial",
};

const getYoutubeSearchUrl = (exerciseName: string): string =>
  EXERCISE_VIDEO_SEARCH_URLS[exerciseName] ??
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${exerciseName} exercise tutorial`)}`;

const toYoutubeEmbedUrl = (exerciseName: string): string => {
  const searchUrl = getYoutubeSearchUrl(exerciseName);
  const query = new URL(searchUrl).searchParams.get("search_query");
  const encodedQuery = encodeURIComponent(
    query ?? `${exerciseName} exercise tutorial`,
  );
  return `https://www.youtube.com/embed?listType=search&list=${encodedQuery}`;
};

const shiftISODateByDays = (dateISO: string, days: number): string => {
  const date = new Date(dateISO + "T12:00:00");
  date.setDate(date.getDate() + days);
  return toISODate(date);
};

const todayISO = toISODate(new Date());

const WeightTraining = () => {
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const selectedDate = isValidISODate(searchParams.get("date"))
    ? (searchParams.get("date") as string)
    : todayISO;

  const dayIndex = new Date(selectedDate + "T12:00:00").getDay();
  const dayKey = DAY_INDEX[dayIndex];
  const currentData = dayData[dayKey];
  const isToday = selectedDate === todayISO;

  const allDays = Object.entries(dayData) as Array<[PossibleDays, DayData]>;
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
    navigate(`/weight-training/exercise/${id}?date=${selectedDate}`);
  };

  const closeExerciseDetail = () => {
    navigate(`/weight-training?date=${selectedDate}`);
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
        accent="red"
        onBack={() => navigate(`/weight-training?date=${selectedDate}`)}
        subtitle="Exercise Detail"
      >
        <div className="border border-zinc-800 bg-zinc-900/80 p-5">
          <p className="text-sm text-zinc-300 leading-relaxed">
            The requested exercise URL does not match an exercise in this
            program.
          </p>
        </div>
      </PageLayout>
    );
  }

  if (selectedExerciseEntry) {
    const { exercise, dayTitle } = selectedExerciseEntry;
    const youtubeSearchUrl = getYoutubeSearchUrl(exercise.name);
    const youtubeEmbedUrl = toYoutubeEmbedUrl(exercise.name);
    const shouldShowImageFallback = videoFailed && !videoLoaded;

    return (
      <PageLayout
        title={exercise.name}
        accent="red"
        onBack={closeExerciseDetail}
        subtitle="Exercise Detail"
      >
        <div className="space-y-5">
          <div className="border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-red-300/80 mb-2">
              Session Metadata
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="border border-zinc-800 bg-zinc-950/60 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Program Day
                </p>
                <p className="text-zinc-100 mt-1">{dayTitle}</p>
              </div>
              <div className="border border-zinc-800 bg-zinc-950/60 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Scheduled Date
                </p>
                <p className="text-zinc-100 mt-1">
                  {toPrettyDate(selectedDate)}
                </p>
              </div>
              <div className="border border-zinc-800 bg-zinc-950/60 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Sets + Reps
                </p>
                <p className="text-zinc-100 mt-1">4 sets x 8-12 reps</p>
              </div>
              <div className="border border-zinc-800 bg-zinc-950/60 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Rest
                </p>
                <p className="text-zinc-100 mt-1">60-90 seconds</p>
              </div>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed mt-4">
              {exercise.description}
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-900/80 p-3 sm:p-4">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-red-300/80 mb-3">
              Video Walkthrough
            </p>
            <div className="relative w-full overflow-hidden border border-zinc-800 bg-black aspect-video">
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
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-red-300/80 mb-2">
                      Video unavailable
                    </p>
                    <p className="text-sm text-zinc-200 mb-4 max-w-md">
                      The embedded tutorial did not load, so the exercise image
                      is shown instead.
                    </p>
                    <a
                      href={youtubeSearchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-sm border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-300 hover:bg-red-500/20 transition-colors"
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
              <p className="text-xs text-zinc-500">
                Source: YouTube exercise search
              </p>
              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-red-300 hover:text-red-200"
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
      title="Weight Training"
      accent="red"
      onBack={() => navigate("/")}
      subtitle="Weekly Split"
    >
      {/* Date selector row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDateInUrl(shiftISODateByDays(selectedDate, -1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-red-500/50 transition-colors"
            aria-label="Go to previous day"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setDateInUrl(shiftISODateByDays(selectedDate, 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-red-500/50 transition-colors"
            aria-label="Go to next day"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="relative flex-1">
          <CalendarDays
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && setDateInUrl(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 transition-colors [color-scheme:dark]"
          />
        </div>
        {!isToday && (
          <button
            onClick={() => setDateInUrl(todayISO)}
            className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors whitespace-nowrap"
          >
            Back to Today
          </button>
        )}
        {isToday && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Today
          </span>
        )}
      </div>

      <div className="sticky top-[77px] z-10 bg-zinc-950/85 backdrop-blur-sm py-2 mb-6 border-y border-zinc-800">
        <div className="flex flex-wrap gap-2">
          {DAY_INDEX.map((day) => {
            const selected = day === dayKey;
            return (
              <span
                key={day}
                className={`text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border rounded-sm ${
                  selected
                    ? "text-red-300 border-red-500/60 bg-red-500/10"
                    : "text-zinc-500 border-zinc-800"
                }`}
              >
                {day.slice(0, 3)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Day label */}
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-red-300/80 mb-1">
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
        <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-prose">
          {currentData.description}
        </p>
      </div>

      {/* Exercise cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {currentData.content.map((exercise, index) => (
          <button
            key={exercise.id}
            type="button"
            onClick={() => openExerciseDetail(exercise.id)}
            className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-zinc-800 text-left cursor-pointer"
          >
            <img
              src={exercise.imageUrl}
              alt={exercise.name}
              className="w-full h-full object-cover bg-zinc-800 transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMG;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-[9px] uppercase tracking-[0.25em] text-red-300 mb-1">
                {String(index + 1).padStart(2, "0")} · Session
              </p>
              <h4 className="display-font text-[1.7rem] leading-none text-white">
                {exercise.name}
              </h4>
              <p className="text-[11px] text-zinc-300/90 leading-relaxed mt-2 max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-20">
                {exercise.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="text-[10px] tracking-wide px-2 py-0.5 rounded-sm bg-black/50 text-zinc-100 border border-white/10">
                  4 Sets
                </span>
                <span className="text-[10px] tracking-wide px-2 py-0.5 rounded-sm bg-black/50 text-zinc-100 border border-white/10">
                  8–12 Reps
                </span>
                <span className="text-[10px] tracking-wide px-2 py-0.5 rounded-sm bg-black/50 text-zinc-100 border border-white/10">
                  60–90s Rest
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-300 mt-3">
                Tap to open
              </p>
            </div>
          </button>
        ))}
      </div>
    </PageLayout>
  );
};

export default WeightTraining;
