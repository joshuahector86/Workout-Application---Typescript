import { workouts } from "@/data/workouts";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const getDayData = (day: PossibleDays): DayData => {
  return dayData[day];
};

const DayDisplay = () => {
  const [selectedDay, setSelectedDay] = useState<PossibleDays>("sunday");
  const currentData = getDayData(selectedDay);

  const DayDropDownMenu = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="font-bold text-2xl hover:bg-accent underline">
          {selectedDay.toLocaleUpperCase() || "Select a day"}
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {Object.keys(dayData).map((day) => (
            <DropdownMenuItem
              className="font-bold"
              key={day}
              onClick={() => setSelectedDay(day as PossibleDays)}
            >
              {day.toLocaleUpperCase()}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <DayDropDownMenu />
        <h2 className="text-xl font-semibold">{currentData.title}</h2>
        <p className="text-sm opacity-90 mb-4">{currentData.description}</p>
        {currentData.content.map((exercise) => (
          <div
            key={exercise.id}
            className=" bg-opacity-50 bg-zinc-900 rounded-2xl p-4 "
          >
            <div className="flex items-start gap-4">
              <img
                src={exercise.imageUrl}
                className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                onError={(e) => {
                  // Fallback for broken images
                  e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxjaXJjbGUgY3g9IjI2IiBjeT0iMjYiIHI9IjIiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTIwIDM2TDI4IDI4TDM2IDM2TDQ0IDI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K";
                }}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-1">{exercise.name}</h4>
                <p className="text-md opacity-90">{exercise.description}</p>
                <p className="text-xs opacity-70 mt-1">
                  4 Sets of 8 - 12 Reps | Rest 60 - 90 seconds
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayDisplay;
