import { ReactNode } from 'react';

import CalendarDay from './CalendarDay';
import CalendarWeekdaysHeader from './CalendarWeekdaysHeader';

export default function CalendarBody() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

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
    cells.push(<CalendarDay key={day} day={day} />);
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
    <div className="w-full rounded-md bg-white p-4 shadow">
      <CalendarWeekdaysHeader />
      <div className="mt-2 grid grid-cols-7 gap-1">{cells}</div>
    </div>
  );
}
