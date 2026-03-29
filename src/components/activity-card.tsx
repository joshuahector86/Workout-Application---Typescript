import { cva, type VariantProps } from "class-variance-authority";
import { Dumbbell, PersonStanding, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  // Base styles
  "group relative flex flex-col gap-5 rounded-md border p-7 cursor-pointer transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] select-none overflow-hidden",
  {
    variants: {
      variant: {
        weightTraining: [
          "bg-zinc-900 border-zinc-800",
          "hover:border-red-500/40 hover:shadow-[0_0_32px_-4px_rgba(239,68,68,0.25)]",
        ],
        mobility: [
          "bg-zinc-900 border-zinc-800",
          "hover:border-cyan-500/40 hover:shadow-[0_0_32px_-4px_rgba(6,182,212,0.25)]",
        ],
        other: [
          "bg-zinc-900 border-zinc-800",
          "hover:border-purple-500/40 hover:shadow-[0_0_32px_-4px_rgba(168,85,247,0.25)]",
        ],
      },
    },
    defaultVariants: {
      variant: "weightTraining",
    },
  },
);

const iconWrapVariants = cva(
  "flex items-center justify-center w-14 h-14 rounded-xl mb-1",
  {
    variants: {
      variant: {
        weightTraining: "bg-red-500/10 text-red-400 group-hover:bg-red-500/20",
        mobility: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20",
        other: "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20",
      },
    },
    defaultVariants: {
      variant: "weightTraining",
    },
  },
);

const headingVariants = cva("text-xl font-bold tracking-tight", {
  variants: {
    variant: {
      weightTraining:
        "display-font text-3xl text-white group-hover:text-red-400",
      mobility: "display-font text-3xl text-white group-hover:text-cyan-400",
      other: "display-font text-3xl text-white group-hover:text-purple-400",
    },
  },
  defaultVariants: {
    variant: "weightTraining",
  },
});

const arrowVariants = cva(
  "absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2 text-xl font-light",
  {
    variants: {
      variant: {
        weightTraining: "text-red-400",
        mobility: "text-cyan-400",
        other: "text-purple-400",
      },
    },
    defaultVariants: {
      variant: "weightTraining",
    },
  },
);

const CARD_CONTENT = {
  weightTraining: {
    Icon: Dumbbell,
    heading: "Weight Training",
    description:
      "Build strength and muscle with weekly split routines targeting all major muscle groups.",
  },
  mobility: {
    Icon: PersonStanding,
    heading: "Mobility",
    description:
      "Improve flexibility, range of motion, and joint health through focused mobility work.",
  },
  other: {
    Icon: Zap,
    heading: "Other Activities",
    description:
      "Cardio, recreation, and anything else that keeps you moving and feeling great.",
  },
} as const;

type ActivityCardVariant = VariantProps<typeof cardVariants>["variant"];

interface ActivityCardProps {
  variant: NonNullable<ActivityCardVariant>;
  onClick: () => void;
  className?: string;
}

const ActivityCard = ({ variant, onClick, className }: ActivityCardProps) => {
  const { Icon, heading, description } = CARD_CONTENT[variant];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={cn(cardVariants({ variant }), className)}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      <div className={iconWrapVariants({ variant })}>
        <Icon size={26} strokeWidth={2} />
      </div>
      <div className="pr-8">
        <h2 className={headingVariants({ variant })}>{heading}</h2>
        <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
      <span className={arrowVariants({ variant })}>→</span>
    </div>
  );
};

export default ActivityCard;
