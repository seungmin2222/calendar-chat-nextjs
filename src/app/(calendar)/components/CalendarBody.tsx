import { ReactNode, useState } from 'react';
import CalendarDay from './CalendarDay';
import CalendarEventModal from './CalendarEventModal';
import CalendarWeekdaysHeader from './CalendarWeekdaysHeader';

interface CalendarBodyProps {
  year: number;
  month: number;
}

export default function CalendarBody({ year, month }: CalendarBodyProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;
  const currentDay = isCurrentMonth ? today.getDate() : null;

  const calendarCells: ReactNode[] = [];

  for (let i = 0; i < startDay; i++) {
    calendarCells.push(
      <div
        key={`empty-start-${i}`}
        className="border border-gray-300 bg-gray-100"
      />
    );
  }

  for (let day = 1; day <= totalDays; day++) {
    const isToday = currentDay === day;
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    calendarCells.push(
      <div
        key={day}
        className="flex cursor-pointer justify-center border border-gray-300 p-2 duration-[400ms] hover:bg-blue-100"
        onClick={() => handleDayClick(formattedDate)}
      >
        <CalendarDay day={day} isToday={isToday} />
      </div>
    );
  }

  const remainingCells = calendarCells.length % 7;

  if (remainingCells !== 0) {
    for (let i = 0; i < 7 - remainingCells; i++) {
      calendarCells.push(
        <div
          key={`empty-end-${i}`}
          className="border border-gray-300 bg-gray-100"
        />
      );
    }
  }

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate('');
  };

  return (
    <div className="h-[95%] w-full rounded-md bg-white p-4 text-xl shadow">
      <CalendarWeekdaysHeader />
      <div
        className="mt-2 grid h-[95%] grid-cols-7 gap-1"
        style={{
          gridTemplateRows: `repeat(${Math.ceil(calendarCells.length / 7)}, minmax(0, 1fr))`,
        }}
      >
        {calendarCells}
      </div>

      {isModalOpen && selectedDate && (
        <CalendarEventModal onClose={closeModal} defaultDate={selectedDate} />
      )}
    </div>
  );
}
