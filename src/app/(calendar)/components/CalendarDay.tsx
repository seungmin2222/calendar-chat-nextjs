interface CalendarDayProps {
  day: number;
  isToday: boolean;
}

export default function CalendarDay({ day, isToday }: CalendarDayProps) {
  return (
    <div
      className={`flex h-fit justify-center ${
        isToday
          ? 'h-8 w-8 place-items-center self-center rounded-full bg-blue-200 font-bold text-blue-700'
          : ''
      }`}
    >
      {day}
    </div>
  );
}
