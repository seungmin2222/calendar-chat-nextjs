import { ReactNode } from 'react';
import CalendarDay from './CalendarDay';
import CalendarWeekdaysHeader from './CalendarWeekdaysHeader';

interface CalendarBodyProps {
  year: number;
  month: number;
}

export default function CalendarBody({ year, month }: CalendarBodyProps) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;
  const todayDate = isCurrentMonth ? today.getDate() : null;

  const cells: ReactNode[] = [];

  for (let i = 0; i < startDay; i++) {
    cells.push(
      <div
        key={`empty-start-${i}`}
        className="border border-gray-300 bg-gray-100"
      />
    );
  }

  for (let day = 1; day <= totalDays; day++) {
    const isToday = todayDate === day;
    cells.push(<CalendarDay key={day} day={day} isToday={isToday} />);
  }

  const remainder = cells.length % 7;
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) {
      cells.push(
        <div
          key={`empty-end-${i}`}
          className="border border-gray-300 bg-gray-100"
        />
      );
    }
  }

  return (
    <div className="h-[95%] w-full rounded-md bg-white p-4 text-xl shadow">
      <CalendarWeekdaysHeader />
      <div
        className="mt-2 grid h-[95%] grid-cols-7 gap-1"
        style={{
          gridTemplateRows: `repeat(${Math.ceil(cells.length / 7)}, minmax(0, 1fr))`,
        }}
      >
        {cells}
      </div>
    </div>
  );
}
