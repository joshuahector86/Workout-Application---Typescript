const images = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (path: string): string => images[`../assets/${path}`] ?? "";

const sideSplitsImage = getImage("weight-lifting-photos/side-splits.jpg");
const balletFloorBarreImage = getImage(
  "weight-lifting-photos/ballet-floor-barre.jpg",
);

export interface MobilityExercise {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export const mobilityPrograms = {
  hip: [
    {
      id: 101,
      name: "90/90 Hip Rotations",
      description:
        "A seated hip mobility drill that rotates between internal and external hip positions to improve rotational control and joint range.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 102,
      name: "Frog Stretch Rocks",
      description:
        "A groin and hip opener performed in a wide-knee position with gentle rocking to build adductor flexibility and hip comfort.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 103,
      name: "Deep Squat Pry",
      description:
        "A deep bodyweight squat hold with small shifts and elbow pressure to open the hips and improve squat depth.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 104,
      name: "Lunge Hip Flexor Reach",
      description:
        "A half-kneeling lunge stretch with overhead reach that opens the front of the hip while encouraging upright posture.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 105,
      name: "Figure Four Glute Opener",
      description:
        "A glute and outer-hip stretch that improves hip external rotation and reduces stiffness around the piriformis.",
      imageUrl: sideSplitsImage,
    },
  ],
  ankle: [
    {
      id: 106,
      name: "Knee Over Toe Rocks",
      description:
        "An ankle dorsiflexion drill that drives the knee forward over the toes to improve ankle bend and squat mechanics.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 107,
      name: "Standing Calf Stretch Pulses",
      description:
        "A dynamic calf stretch using short pulses to lengthen the calf muscles and improve ankle range.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 108,
      name: "Ankle Circles Against Wall",
      description:
        "A controlled ankle articulation drill that moves the foot through full circles to improve joint awareness and mobility.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 109,
      name: "Toe Raise Tibialis Lift",
      description:
        "A front-shin strengthening drill that improves ankle control and balances the lower leg for better movement quality.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 110,
      name: "Heel Sit Ankle Stretch",
      description:
        "A kneeling stretch that targets the fronts of the ankles and feet to reduce stiffness in plantar-flexed positions.",
      imageUrl: sideSplitsImage,
    },
  ],
  shoulders: [
    {
      id: 111,
      name: "Wall Slides",
      description:
        "A shoulder blade control exercise performed against a wall to improve overhead motion and posture.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 112,
      name: "Thread The Needle Reach",
      description:
        "A thoracic and shoulder mobility drill that rotates the upper body and opens the back of the shoulders.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 113,
      name: "PVC Pass Throughs",
      description:
        "A shoulder opener using a stick or band to improve overhead range and chest flexibility through controlled arcs.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 114,
      name: "Scapular CARs",
      description:
        "Controlled articular rotations for the shoulder blades that develop awareness, stability, and full scapular motion.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 115,
      name: "Doorway Pec Opener",
      description:
        "A chest and front-shoulder stretch performed in a doorway to reduce tightness and improve shoulder positioning.",
      imageUrl: sideSplitsImage,
    },
  ],
  legExtension: [
    {
      id: 116,
      name: "Floor Barre Developpe Front",
      description:
        "A ballet-inspired floor drill that builds active hip flexion, turnout control, and smooth front-leg extension.",
      imageUrl: balletFloorBarreImage,
    },
    {
      id: 117,
      name: "Side Developpe Sweep",
      description:
        "A side-leg extension pattern that improves turnout strength, side hip control, and graceful extension mechanics.",
      imageUrl: balletFloorBarreImage,
    },
    {
      id: 118,
      name: "Arabesque Lift Pulses",
      description:
        "A small-range ballet pulse emphasizing glute engagement and posterior-chain control for cleaner back-leg lines.",
      imageUrl: balletFloorBarreImage,
    },
    {
      id: 119,
      name: "Seated Point And Flex Kicks",
      description:
        "A seated drill that coordinates foot articulation and leg extension to improve control through the full line of the leg.",
      imageUrl: balletFloorBarreImage,
    },
    {
      id: 120,
      name: "Turnout Extension Hold",
      description:
        "An isometric ballet-style hold that challenges turnout strength, quad endurance, and pelvic stability.",
      imageUrl: balletFloorBarreImage,
    },
  ],
  hipPartTwo: [
    {
      id: 121,
      name: "Pigeon Fold Breathing",
      description:
        "A deep glute and outer-hip opener using slow breathing to relax tension and improve hip external rotation.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 122,
      name: "Cossack Shift Flow",
      description:
        "A side-to-side squat flow that improves adductor length, lateral hip strength, and frontal-plane mobility.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 123,
      name: "Shin Box Switches",
      description:
        "A rotational hip drill transitioning between seated positions to improve control and end-range hip strength.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 124,
      name: "Standing Hip CARs",
      description:
        "Controlled hip circles performed standing to build strength and precision through the full hip capsule.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 125,
      name: "Adductor Rock Backs",
      description:
        "A kneeling groin mobility drill that lengthens the inner thigh while maintaining spinal neutrality.",
      imageUrl: sideSplitsImage,
    },
  ],
  anklePartTwo: [
    {
      id: 126,
      name: "Split Stance Soleus Drive",
      description:
        "A bent-knee ankle drill that targets the soleus and improves dorsiflexion needed for lunges and squats.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 127,
      name: "Banded Ankle Dorsiflexion",
      description:
        "A band-assisted ankle mobility exercise that helps the joint glide while improving forward knee travel.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 128,
      name: "Single Leg Balance Reach",
      description:
        "A stability drill that improves foot and ankle control by challenging balance and range at the same time.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 129,
      name: "Seated Ankle Point Flex",
      description:
        "A seated mobility exercise alternating point and flex positions to improve ankle articulation and lower leg control.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 130,
      name: "Calf Raise Tempo Stretch",
      description:
        "A slow calf raise sequence that pairs strengthening with an extended heel-lowered stretch for ankle capacity.",
      imageUrl: sideSplitsImage,
    },
  ],
  hipPartThree: [
    {
      id: 131,
      name: "Half Kneeling Adductor Opener",
      description:
        "A lunge-based inner thigh mobility drill that improves hip opening and control near end range.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 132,
      name: "Happy Baby Rock",
      description:
        "A floor-based hip opener that gently rocks the hips and lower back while opening the inner thighs.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 133,
      name: "Lateral Leg Swings",
      description:
        "A dynamic warm-up movement that improves hip freedom and coordination through repeated side-to-side leg motion.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 134,
      name: "Pancake Forward Fold",
      description:
        "A wide-seated forward fold that targets the hamstrings and adductors while improving compression strength.",
      imageUrl: sideSplitsImage,
    },
    {
      id: 135,
      name: "Hip Airplane Holds",
      description:
        "A balance-based hip stability drill that trains rotation control, glute strength, and joint awareness.",
      imageUrl: sideSplitsImage,
    },
  ],
};
