import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const DayDropdown = () => {
  const [currentDay, setCurrentDay] = useState<string>("");
  const days = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">{currentDay || "Select a day"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {days.map((day) => (
          <DropdownMenuItem
            key={day.id}
            onClick={() => setCurrentDay(day.name)}
          >
            {day.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DayDropdown;
