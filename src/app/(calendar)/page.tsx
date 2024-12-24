'use client';

import { useState } from 'react';
import ErrorComponent from '../ErrorComponent';
import Loading from '../LoadingComponent';
import CalendarBody from './components/CalendarBody';
import CalendarHeader from './components/CalendarHeader';
import { useGetEventsByDate } from './hooks/useGetEventsByDate';

export default function Home() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(() => today);

  const { year, month } = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  };

  const { data, isLoading, error, refetch } = useGetEventsByDate({
    year,
    month,
  });

  const errorMessage = error?.message || '일정을 불러오는데 실패했습니다';

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent message={errorMessage} onRetry={refetch} />;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="flex h-full w-full select-none flex-col gap-3 bg-slate-400 p-4">
      <CalendarHeader
        year={year}
        month={month + 1}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      {data && (
        <CalendarBody
          year={year}
          month={month}
          today={today}
          currentEvent={data}
        />
      )}
    </div>
  );
}
