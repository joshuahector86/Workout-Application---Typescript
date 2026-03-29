import ProgramPage, {
  type PossibleDays,
  type ProgramDayData,
} from "@/components/program-page";
import { mobilityPrograms } from "@/data/mobility";

const mobilityDayData: Record<PossibleDays, ProgramDayData> = {
  sunday: {
    title: "Hip",
    description:
      "Open the hips, clean up rotational control, and restore range where stiffness tends to hide. This session is built to make squats, lunges, and daily movement feel smoother.",
    content: mobilityPrograms.hip,
  },
  monday: {
    title: "Ankle",
    description:
      "Give the ankles the range and control they need for stronger lower-body mechanics. Better ankle motion makes every squat, landing, and stride cleaner.",
    content: mobilityPrograms.ankle,
  },
  tuesday: {
    title: "Shoulders",
    description:
      "Improve overhead freedom, scapular control, and upper-body posture with drills designed to reduce tightness and build smoother shoulder motion.",
    content: mobilityPrograms.shoulders,
  },
  wednesday: {
    title: "Leg Extension",
    description:
      "A ballet-style extension day focused on lines, turnout, control, and active flexibility. The goal is clean, elegant range instead of passive stretching alone.",
    content: mobilityPrograms.legExtension,
  },
  thursday: {
    title: "Hip Mobility Part 2",
    description:
      "A second hip-focused session that builds on your base with deeper adductor work, rotational control, and stronger end-range positions.",
    content: mobilityPrograms.hipPartTwo,
  },
  friday: {
    title: "Ankle Mobility Part 2",
    description:
      "A second ankle session that blends strength, range, and control so the lower leg can support more stable and powerful movement.",
    content: mobilityPrograms.anklePartTwo,
  },
  saturday: {
    title: "Hip Mobility Part 3",
    description:
      "Finish the week with a third hip session aimed at active flexibility, balance, and stronger control through wide ranges of motion.",
    content: mobilityPrograms.hipPartThree,
  },
};

const Mobility = () => {
  return (
    <ProgramPage
      pageTitle="Mobility"
      accent="cyan"
      subtitle="Recovery + Range"
      homePath="/"
      basePath="/mobility"
      detailBasePath="/mobility/exercise"
      cardLabel="Flow"
      cardBadges={["45-60s", "2-3 Rounds", "Controlled Tempo"]}
      detailSectionLabel="Tap to open"
      dayData={mobilityDayData}
      notFoundMessage="The requested mobility exercise URL does not match an exercise in this program."
      getDetailStats={(dayTitle, selectedDate) => [
        { label: "Mobility Focus", value: dayTitle },
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
        { label: "Time", value: "45-60 seconds" },
        { label: "Rounds", value: "2-3 rounds" },
      ]}
    />
  );
};

export default Mobility;
