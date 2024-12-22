import { useState } from 'react';
import CalendarAllEventViewModal from './CalendarAllEventViewModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewEvents = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="relative flex h-11 min-h-10 items-center justify-center gap-5 rounded-md bg-white text-5xl text-gray-700">
        <button onClick={onPrevMonth}>{'<'}</button>
        <span className="w-44 text-center text-3xl font-semibold">
          {year}년 {month}월
        </span>
        <button onClick={onNextMonth}>{'>'}</button>
        <button
          className="absolute right-4 rounded-lg bg-blue-600 px-4 py-1 text-base font-medium text-white shadow-lg transition duration-300 hover:bg-blue-700"
          onClick={handleViewEvents}
        >
          일정 보기
        </button>
      </header>

      <CalendarAllEventViewModal
        isOpen={isModalOpen}
        onClose={closeModal}
      ></CalendarAllEventViewModal>
    </>
  );
}
