interface CalendarDayProps {
  day: number;
}

export default function CalendarDay({ day }: CalendarDayProps) {
  return (
    <div className="flex h-48 items-start justify-end border border-gray-300 p-2 text-sm">
      {day}
    </div>
  );
}
