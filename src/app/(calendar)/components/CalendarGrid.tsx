import { ReactNode } from 'react';

interface CalendarGridProps {
  calendarCells: ReactNode[];
}

export default function CalendarGrid({ calendarCells }: CalendarGridProps) {
  return (
    <div
      className="mt-2 grid h-[95%] grid-cols-7 gap-1"
      style={{
        gridTemplateRows: `repeat(${Math.ceil(calendarCells.length / 7)}, minmax(0, 1fr))`,
      }}
    >
      {calendarCells}
    </div>
  );
}
