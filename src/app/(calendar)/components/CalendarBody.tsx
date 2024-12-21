import { ReactNode, useState } from 'react';
import { EventDataType, ResponseType } from '../types/calendar';
import CalendarDay from './CalendarDay';
import CalendarEventModal from './CalendarEventModal';
import CalendarGrid from './CalendarGrid';
import CalendarEventViewModal from './CalendarViewModal';
import CalendarWeekdaysHeader from './CalendarWeekdaysHeader';

interface CalendarBodyProps {
  year: number;
  month: number;
  today: Date;
  currentEvent: ResponseType['data'];
}

export default function CalendarBody({
  year,
  month,
  today,
  currentEvent,
}: CalendarBodyProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventDataType | null>(
    null
  );
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create');
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

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

    const matchingEvents = currentEvent?.events.filter(
      (event: EventDataType) => event.day === day
    );

    calendarCells.push(
      <div
        key={day}
        className="flex h-full cursor-pointer flex-col border border-gray-300 p-2 duration-[400ms] hover:bg-blue-100"
        onClick={() => handleDayClick(formattedDate)}
      >
        <CalendarDay day={day} isToday={isToday} />
        <div className="overflow-y-auto">
          {matchingEvents?.map((event: EventDataType) => (
            <div
              key={event.id}
              className="mt-1 flex gap-1 rounded-md bg-slate-200 p-1 text-sm duration-[400ms] hover:bg-blue-300"
              onClick={(e) => {
                e.stopPropagation();
                handleEventClick(event);
              }}
            >
              <span className="font-bold">
                {event.name} : {event.title}
              </span>
            </div>
          ))}
        </div>
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

  const handleEventEdit = (event: EventDataType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setIsDetailModalOpen(false);
    setModalMode('update');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate('');
    setSelectedEvent(null);
    setModalMode('create');
  };

  const handleEventClick = (event: EventDataType) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleCloseAndResetDetailModal = () => {
    setSelectedEvent(null);
    setIsDetailModalOpen(false);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <>
      <div className="h-[95%] w-full rounded-md bg-white p-4 text-xl shadow">
        <CalendarWeekdaysHeader />
        <CalendarGrid calendarCells={calendarCells} />
      </div>
      {isModalOpen && (
        <CalendarEventModal
          onClose={closeModal}
          mode={modalMode}
          defaultDate={selectedDate}
          defaultValues={selectedEvent}
        />
      )}
      {isDetailModalOpen && selectedEvent && (
        <CalendarEventViewModal
          event={selectedEvent}
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          onResetAndClose={handleCloseAndResetDetailModal}
          onEdit={handleEventEdit}
          year={year}
          month={month}
        />
      )}
    </>
  );
}
