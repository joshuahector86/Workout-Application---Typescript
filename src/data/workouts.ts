//----------------------------------------------------- CHEST ---------------------------------------------------------------//
const chestWorkouts = [
  {
    id: 1,
    name: "Push-Ups",
    description:
      "A bodyweight exercise that targets the chest, shoulders, and triceps.",
    imageUrl: "https://example.com/push-ups.jpg",
  },
  {
    id: 2,
    name: "Bench Press",
    description:
      "A weightlifting exercise that primarily targets the chest muscles.",
    imageUrl: "https://example.com/bench-press.jpg",
  },
];

//----------------------------------------------------- BACK ----------------------------------------------------------------//
const backWorkouts = [
  {
    id: 1,
    name: "Pull-Ups",
    description:
      "A bodyweight exercise that targets the back, biceps, and shoulders.",
    imageUrl: "https://example.com/pull-ups.jpg",
  },
  {
    id: 2,
    name: "Bent Over Rows",
    description:
      "A weightlifting exercise that primarily targets the upper back muscles.",
    imageUrl: "https://example.com/bent-over-rows.jpg",
  },
];
//----------------------------------------------------- TRICEPS -------------------------------------------------------------//

const tricepsWorkouts = [
  {
    id: 1,
    name: "Tricep Dips",
    description:
      "A bodyweight exercise that targets the triceps, shoulders, and chest.",
    imageUrl: "https://example.com/tricep-dips.jpg",
  },
  {
    id: 2,
    name: "Skull Crushers",
    description: "A weightlifting exercise that primarily targets the triceps.",
    imageUrl: "https://example.com/skull-crushers.jpg",
  },
];

//----------------------------------------------------- BICEPS --------------------------------------------------------------//
const bicepsWorkouts = [
  {
    id: 1,
    name: "Bicep Curls",
    description: "A weightlifting exercise that primarily targets the biceps.",
    imageUrl: "https://example.com/bicep-curls.jpg",
  },
  {
    id: 2,
    name: "Hammer Curls",
    description:
      "A variation of bicep curls that targets the brachialis muscle.",
    imageUrl: "https://example.com/hammer-curls.jpg",
  },
];

//----------------------------------------------------- SHOULDERS -----------------------------------------------------------//
const shouldersWorkouts = [
  {
    id: 1,
    name: "Overhead Press",
    description:
      "A weightlifting exercise that primarily targets the shoulder muscles.",
    imageUrl: "https://example.com/overhead-press.jpg",
  },
  {
    id: 2,
    name: "Lateral Raises",
    description:
      "An isolation exercise that targets the lateral deltoid muscles.",
    imageUrl: "https://example.com/lateral-raises.jpg",
  },
];

//----------------------------------------------------- QUADS ---------------------------------------------------------------//

const quadsWorkouts = [
  {
    id: 1,
    name: "Squats",
    description:
      "A compound exercise that targets the quadriceps, hamstrings, and glutes.",
    imageUrl: "https://example.com/squats.jpg",
  },
  {
    id: 2,
    name: "Lunges",
    description:
      "A unilateral exercise that targets the quadriceps, hamstrings, and glutes.",
    imageUrl: "https://example.com/lunges.jpg",
  },
];

//----------------------------------------------------- HAMSTRINGS ----------------------------------------------------------//
const hamstringsWorkouts = [
  {
    id: 1,
    name: "Deadlifts",
    description:
      "A weightlifting exercise that primarily targets the hamstrings, glutes, and lower back.",
    imageUrl: "https://example.com/deadlifts.jpg",
  },
];

//----------------------------------------------------- BOOTY ---------------------------------------------------------------//
const bootyWorkouts = [
  {
    id: 1,
    name: "Glute Bridges",
    description: "An exercise that targets the glute muscles.",
    imageUrl: "https://example.com/glute-bridges.jpg",
  },
  {
    id: 2,
    name: "Hip Thrusts",
    description:
      "A weightlifting exercise that primarily targets the glute muscles.",
    imageUrl: "https://example.com/hip-thrusts.jpg",
  },
];

//----------------------------------------------------- CALVES --------------------------------------------------------------//
const calvesWorkouts = [
  {
    id: 1,
    name: "Calf Raises",
    description: "An exercise that targets the calf muscles.",
    imageUrl: "https://example.com/calf-raises.jpg",
  },
  {
    id: 2,
    name: "Seated Calf Raises",
    description:
      "A variation of calf raises performed while seated to target the soleus muscle.",
    imageUrl: "https://example.com/seated-calf-raises.jpg",
  },
];

//----------------------------------------------------- REST ---------------------------------------------------------------//
const restWorkouts = [
  {
    id: 1,
    name: "Rest Day",
    description: "Take a break and allow your body to recover.",
    imageUrl: "https://example.com/rest-day.jpg",
  },
];

//----------------------------------------------------- ABS ----------------------------------------------------------------//
const absWorkouts = [
  {
    id: 1,
    name: "Plank",
    description: "An isometric exercise that targets the core muscles.",
    imageUrl: "https://example.com/plank.jpg",
  },
  {
    id: 2,
    name: "Bicycle Crunches",
    description:
      "A dynamic exercise that targets the rectus abdominis and obliques.",
    imageUrl: "https://example.com/bicycle-crunches.jpg",
  },
];

//----------------------------------------------------- MOBILITY -----------------------------------------------------------//
const mobilityWorkouts = [
  {
    id: 1,
    name: "Dynamic Stretching",
    description:
      "A series of movements that improve flexibility and range of motion.",
    imageUrl: "https://example.com/dynamic-stretching.jpg",
  },
  {
    id: 2,
    name: "Foam Rolling",
    description:
      "A self-myofascial release technique that helps relieve muscle tightness.",
    imageUrl: "https://example.com/foam-rolling.jpg",
  },
];
export const workouts = {
  chest: chestWorkouts,
  back: backWorkouts,
  quads: quadsWorkouts,
  hamstrings: hamstringsWorkouts,
  triceps: tricepsWorkouts,
  biceps: bicepsWorkouts,
  shoulders: shouldersWorkouts,
  calves: calvesWorkouts,
  booty: bootyWorkouts,
  rest: restWorkouts,
  abs: absWorkouts,
  mobility: mobilityWorkouts,
};
