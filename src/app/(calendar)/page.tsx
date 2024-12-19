'use client';

import { useState } from 'react';
import CalendarBody from './components/CalendarBody';
import CalendarHeader from './components/CalendarHeader';

export default function Home() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="flex h-full w-full select-none flex-col gap-3 bg-slate-400 p-4">
      <CalendarHeader
        year={currentDate.getFullYear()}
        month={currentDate.getMonth() + 1}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarBody
        year={currentDate.getFullYear()}
        month={currentDate.getMonth()}
      />
    </div>
  );
}
