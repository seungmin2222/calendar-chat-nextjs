interface CalendarDayProps {
  day: number;
  isToday?: boolean;
}

export default function CalendarDay({ day, isToday }: CalendarDayProps) {
  return (
    <div className="flex justify-center border border-gray-300 p-2">
      <div
        className={`flex h-fit justify-center ${
          isToday
            ? 'h-8 w-8 place-items-center rounded-full bg-blue-200 p-1 font-bold text-blue-700'
            : ''
        }`}
      >
        {day}
      </div>
    </div>
  );
}
