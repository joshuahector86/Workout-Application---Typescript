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
  content: Exercise[];
}

const dayData: Record<PossibleDays, DayData> = {
  sunday: {
    title: "Sunday Recovery",
    content: [...workouts.chest, ...workouts.back],
  },

  monday: {
    title: "Monday - Legs",
    content: [...workouts.quads, ...workouts.calves],
  },
  tuesday: {
    title: "Tuesday - Push",
    content: [...workouts.abs, ...workouts.mobility],
  },
  wednesday: {
    title: "Wednesday - Pull",
    content: [...workouts.triceps, ...workouts.biceps],
  },
  thursday: {
    title: "Thursday - Core",
    content: [...workouts.hamstrings, ...workouts.booty],
  },
  friday: {
    title: "Friday - Full Body",
    content: [...workouts.shoulders],
  },
  saturday: {
    title: "Saturday - Active Recovery",
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
        <DropdownMenuTrigger className="font-bold text-2xl hover:bg-accent">
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
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <DayDropDownMenu />
        <div>
          <p>
            Push through an intense upper body strength session focusing on
            chest, shoulders, and triceps with compound movements that will
            challenge your limits. Complete 4 sets of each exercise with 60-90
            seconds rest between sets to maximize muscle growth and endurance.
          </p>
        </div>
        <div>
          <p>
            Warm-up: Begin with 5 minutes of dynamic stretching and light cardio
            to prepare your muscles and joints for today's training session.
          </p>
        </div>

        {currentData.content.map((exercise) => (
          <div key={exercise.id} className=" bg-opacity-50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                onError={(e) => {
                  // Fallback for broken images
                  e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxjaXJjbGUgY3g9IjI2IiBjeT0iMjYiIHI9IjIiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTIwIDM2TDI4IDI4TDM2IDM2TDQ0IDI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K";
                }}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-1">{exercise.name}</h4>
                <p className="text-sm opacity-90">{exercise.description}</p>
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
