interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <header className="flex h-11 min-h-10 items-center justify-center gap-5 rounded-md bg-white text-5xl text-gray-700">
      <button onClick={onPrevMonth}>{'<'}</button>
      <span className="w-44 text-center text-3xl font-semibold">
        {year}년 {month}월
      </span>
      <button onClick={onNextMonth}>{'>'}</button>
    </header>
  );
}
