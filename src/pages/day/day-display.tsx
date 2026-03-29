import ProgramPage, {
  type PossibleDays,
  type ProgramDayData,
} from "@/components/program-page";
import { workouts } from "@/data/workouts";

const dayData: Record<PossibleDays, ProgramDayData> = {
  sunday: {
    title: "Chest & Back",
    description:
      "Your body is capable of incredible things when you push past the voice that says I can't. Every rep, every step, every drop of sweat is proof that you're stronger than your excuses. The only workout you'll regret is the one you didn't do.",
    content: [...workouts.chest, ...workouts.back],
  },
  monday: {
    title: "Quads & Calves",
    description:
      "Champions aren't made in the comfort zone-they're forged in the fire of challenge and perseverance. When your muscles burn and your lungs scream, that's your body adapting and growing stronger. Embrace the discomfort because it's temporary, but the strength you build is permanent.",
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
      "Every expert was once a beginner who refused to give up. Your current limitations are not your permanent reality-they're just your starting point. Focus on being 1% better than yesterday, and watch how those small improvements compound into extraordinary results.",
    content: [...workouts.hamstrings, ...workouts.booty],
  },
  friday: {
    title: "Shoulders",
    description:
      "Your body will go where your mind leads it, so fill your thoughts with determination and possibility. When the weight feels heavy, remember that you're not just lifting iron-you're lifting your confidence, discipline, and self-respect. The strongest muscle you can develop is the one between your ears.",
    content: [...workouts.shoulders],
  },
  saturday: {
    title: "REST DAY",
    description:
      "Soreness is your body's way of saying thank you for pushing it to grow. Each workout is an investment in a stronger, healthier, more resilient version of yourself. You don't have to be perfect-you just have to be consistent and willing to begin again each day.",
    content: [...workouts.rest],
  },
};

const WeightTraining = () => {
  return (
    <ProgramPage
      pageTitle="Weight Training"
      accent="red"
      subtitle="Weekly Split"
      homePath="/"
      basePath="/weight-training"
      detailBasePath="/weight-training/exercise"
      cardLabel="Session"
      cardBadges={["4 Sets", "8-12 Reps", "60-90s Rest"]}
      detailSectionLabel="Tap to open"
      dayData={dayData}
      notFoundMessage="The requested exercise URL does not match an exercise in this program."
      getDetailStats={(dayTitle, selectedDate) => [
        { label: "Program Day", value: dayTitle },
        {
          label: "Scheduled Date",
          value: new Date(selectedDate + "T12:00:00").toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          ),
        },
        { label: "Sets + Reps", value: "4 sets x 8-12 reps" },
        { label: "Rest", value: "60-90 seconds" },
      ]}
    />
  );
};

export default WeightTraining;
