const images = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (path: string): string => images[`../assets/${path}`] ?? "";

//----------------------------------------------------- CHEST ---------------------------------------------------------------//
const chestWorkouts = [
  {
    id: 1,
    name: "Cable Chest Press",
    description:
      "A cable machine exercise that targets the chest muscles by pressing handles forward from chest level. Provides constant tension throughout the movement for effective pectoral development.",
    imageUrl: getImage("weight-lifting-photos/cable-chest-press.jpg"),
  },
  {
    id: 2,
    name: "Machine Chest Fly",
    description:
      "An isolation exercise performed on a fly machine that targets the chest muscles through a wide arcing motion. Focuses on chest muscle stretch and contraction with controlled resistance.",
    imageUrl: getImage("weight-lifting-photos/machine-chest-fly.jpg"),
  },
  {
    id: 3,
    name: "Machine Overhead Press",
    description:
      "A shoulder-focused exercise performed on a seated press machine that targets the deltoids and triceps. Provides stable support while pressing weight overhead for shoulder development.",
    imageUrl: getImage("weight-lifting-photos/overhead-press.jpg"),
  },
];

//----------------------------------------------------- BACK ----------------------------------------------------------------//
const backWorkouts = [
  {
    id: 4,
    name: "Lat Pulldown",
    description:
      "A cable machine exercise that targets the latissimus dorsi by pulling a bar down to chest level. Builds back width and improves pulling strength.",
    imageUrl: getImage("weight-lifting-photos/lat-pulldown.jpg"),
  },
  {
    id: 5,
    name: "Seated Row",
    description:
      "A rowing exercise performed seated that targets the middle back, rhomboids, and rear deltoids. Focuses on pulling resistance toward the torso to build back thickness.",
    imageUrl: getImage("weight-lifting-photos/seated-row.jpg"),
  },
  {
    id: 6,
    name: "Lower Back Extension",
    description:
      "An exercise that strengthens the lower back muscles and spinal erectors through controlled back extension movements. Helps improve posture and lower back stability.",
    imageUrl: getImage("weight-lifting-photos/low-back-extension.jpg"),
  },
  {
    id: 7,
    name: "Oblique Twists",
    description:
      "A core exercise that targets the oblique muscles through rotational movements of the torso. Strengthens the sides of the abdomen and improves rotational stability.",
    imageUrl: getImage("weight-lifting-photos/oblique-twist.jpg"),
  },
];
//----------------------------------------------------- TRICEPS -------------------------------------------------------------//

const tricepsWorkouts = [
  {
    id: 8,
    name: "Tricep Pushdowns",
    description:
      "A cable exercise that targets the triceps by pushing a bar or rope attachment downward from chest level. Isolates the back of the arms for strength and definition.",
    imageUrl: getImage("weight-lifting-photos/tricep-pushdown.jpg"),
  },
  {
    id: 9,
    name: "Tricep Extensions With Dumbbells",
    description:
      "An isolation exercise using dumbbells to target the triceps through overhead or lying extension movements. Focuses on lengthening and contracting the tricep muscles under control.",
    imageUrl: getImage("weight-lifting-photos/tricep-extension.jpg"),
  },
  {
    id: 10,
    name: "Tricep Push Down Machine",
    description:
      "A machine-based tricep exercise that targets the back of the arms through controlled pushing movements. Provides stable resistance for tricep isolation and muscle development.",
    imageUrl: getImage("weight-lifting-photos/tricept-pushdown-machine.jpg"),
  },
];

//----------------------------------------------------- BICEPS --------------------------------------------------------------//
const bicepsWorkouts = [
  {
    id: 11,
    name: "Lateral Dumbbell Curls",
    description:
      "A bicep exercise performed with dumbbells at the sides, curling weights up toward the shoulders. Targets the biceps while maintaining neutral grip positioning for arm development.",
    imageUrl: getImage("weight-lifting-photos/lateral-dumbell-curl.jpg"),
  },
  {
    id: 12,
    name: "Barbell Curls",
    description:
      "A classic bicep exercise using a barbell to curl weight from hip level to chest level. Builds overall bicep mass and strength through controlled lifting motion.",
    imageUrl: getImage("weight-lifting-photos/barbell-curl.jpg"),
  },
  {
    id: 13,
    name: "Single Arm Dumbbell Over Bench Curls",
    description:
      "An isolation bicep exercise performed with one arm supported over a bench for stability. Provides focused bicep contraction with enhanced range of motion and control.",
    imageUrl: getImage("weight-lifting-photos/single-arm-barbell-curl.jpg"),
  },
];

//----------------------------------------------------- SHOULDERS -----------------------------------------------------------//
const shouldersWorkouts = [
  {
    id: 14,
    name: "Lateral Raises",
    description:
      "A shoulder isolation exercise that targets the lateral deltoids by lifting weights out to the sides. Builds shoulder width and improves shoulder stability through controlled lateral movement.",
    imageUrl: getImage("weight-lifting-photos/lateral-raise.jpg"),
  },
  {
    id: 15,
    name: "Overhead Shoulder Press With Dumbbells",
    description:
      "A compound shoulder exercise using dumbbells to press weight overhead from shoulder level. Targets all three heads of the deltoids along with triceps for overall shoulder development.",
    imageUrl: getImage("weight-lifting-photos/overhead-shoulder-press.jpg"),
  },
  {
    id: 16,
    name: "Shoulder Shrugs",
    description:
      "An exercise that targets the trapezius muscles by lifting the shoulders up toward the ears. Builds upper back and neck strength through simple vertical shoulder movement.",
    imageUrl: getImage("weight-lifting-photos/shoulder-shrug.jpg"),
  },
  {
    id: 17,
    name: "Reverse Flys With Dumbbells",
    description:
      "A rear deltoid exercise performed by lifting dumbbells out to the sides while bent forward. Targets the posterior deltoids and improves posture by strengthening the back of the shoulders.",
    imageUrl: getImage("weight-lifting-photos/reverse-dumbell-fly.jpg"),
  },
];

//----------------------------------------------------- QUADS ---------------------------------------------------------------//

const quadsWorkouts = [
  {
    id: 18,
    name: "Leg Press",
    description:
      "A machine-based exercise that targets the quadriceps, glutes, and hamstrings by pressing weight with the legs. Provides a safe way to load the lower body with heavy resistance.",
    imageUrl: getImage("weight-lifting-photos/leg-press.jpg"),
  },
  {
    id: 19,
    name: "Quad Extensions",
    description:
      "An isolation exercise performed on a leg extension machine that specifically targets the quadriceps muscles. Focuses on knee extension movement to build front thigh strength.",
    imageUrl: getImage("weight-lifting-photos/quad-extension.jpg"),
  },
  {
    id: 20,
    name: "Bulgarian Split Squat",
    description:
      "A single-leg exercise performed with the rear foot elevated that targets the quadriceps, glutes, and stabilizing muscles. Improves unilateral leg strength and balance.",
    imageUrl: getImage("weight-lifting-photos/bulgarian-split-squat.jpg"),
  },
];

//----------------------------------------------------- HAMSTRINGS ----------------------------------------------------------//
const hamstringsWorkouts = [
  {
    id: 21,
    name: "Sumo Deadlift",
    description:
      "A deadlift variation with a wide stance that targets the glutes, hamstrings, and inner thighs. Emphasizes hip hinge movement with feet positioned wider than shoulder-width apart.",
    imageUrl: getImage("weight-lifting-photos/sumo-deadlift.jpg"),
  },
  {
    id: 22,
    name: "Hamstring Curls",
    description:
      "An isolation exercise that targets the hamstring muscles by curling the heels toward the glutes. Can be performed on a machine or with resistance bands for posterior thigh development.",
    imageUrl: getImage("weight-lifting-photos/hamstring-curl.jpg"),
  },
  {
    id: 23,
    name: "Hamstring Lift With Forward Fold",
    description:
      "A hamstring exercise combining hip hinge movement with forward folding to target the back of the thighs. Improves hamstring flexibility while building strength through controlled movement.",
    imageUrl: getImage(
      "weight-lifting-photos/hamstring-lift-with-forward-fold.jpg",
    ),
  },
];

//----------------------------------------------------- BOOTY ---------------------------------------------------------------//
const bootyWorkouts = [
  {
    id: 24,
    name: "Cossack Squats",
    description:
      "A lateral squat movement that targets the glutes, quads, and hip mobility by shifting weight to one leg while the other extends. Improves single-leg strength and lateral flexibility.",
    imageUrl: getImage("weight-lifting-photos/crossack-squat.jpg"),
  },
  {
    id: 25,
    name: "Glute Bridge Machine",
    description:
      "A glute-focused exercise performed on a machine or floor that targets the gluteus maximus through hip extension. Builds posterior chain strength and improves hip stability.",
    imageUrl: getImage("weight-lifting-photos/glute-bridge-machine.jpg"),
  },
  {
    id: 26,
    name: "Hip Thrusts",
    description:
      "A weightlifting exercise that primarily targets the glute muscles.",
    imageUrl: getImage("weight-lifting-photos/hip-thrust.jpg"),
  },
];

//----------------------------------------------------- CALVES --------------------------------------------------------------//
const calvesWorkouts = [
  {
    id: 27,
    name: "Dumbbell Calf Raises",
    description:
      "A calf exercise performed holding dumbbells while rising up on the toes to target the gastrocnemius and soleus muscles. Builds lower leg strength and definition through plantar flexion movement.",
    imageUrl: getImage("weight-lifting-photos/dumbell-calf-raise.jpg"),
  },
  {
    id: 28,
    name: "Machine Calf Press",
    description:
      "A calf exercise performed on a leg press or dedicated calf machine that targets the calf muscles through pressing with the toes. Provides controlled resistance for calf muscle development.",
    imageUrl: getImage("weight-lifting-photos/machine-calf-press.jpg"),
  },
];

//----------------------------------------------------- REST ---------------------------------------------------------------//
const restWorkouts = [
  {
    id: 29,
    name: "Rest Day",
    description: "Take a break and allow your body to recover.",
    imageUrl: getImage("weight-lifting-photos/rest-day.jpg"),
  },
];

//----------------------------------------------------- ABS ----------------------------------------------------------------//
const absWorkouts = [
  {
    id: 30,
    name: "5 Minute Abs Sequence",
    description:
      "A quick abdominal workout routine that targets all core muscles through a series of exercises. Combines multiple movements to strengthen and tone the entire midsection efficiently.",
    imageUrl: getImage("weight-lifting-photos/5-minute-abs.jpg"),
  },
];

//----------------------------------------------------- MOBILITY -----------------------------------------------------------//
const mobilityWorkouts = [
  {
    id: 31,
    name: "Middle Splits Mobility",
    description:
      "A flexibility routine focused on improving hip mobility and achieving middle splits position. Targets hip flexors, adductors, and hamstrings to increase lateral leg flexibility.",
    imageUrl: getImage("weight-lifting-photos/side-splits.jpg"),
  },
  {
    id: 32,
    name: "Ballet Floor Barre For Extensions",
    description:
      "A ballet-inspired floor routine that focuses on leg extensions and flexibility using barre techniques. Improves leg height, control, and graceful movement patterns.",
    imageUrl: getImage("weight-lifting-photos/ballet-floor-barre.jpg"),
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
