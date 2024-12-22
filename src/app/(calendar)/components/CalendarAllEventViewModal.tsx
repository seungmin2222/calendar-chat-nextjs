import { useEffect } from 'react';
import { useGetAllEvents } from '../hooks/useGetAllEvents';
import CalendarEventCard from './CalendarEventCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarAllEventViewModal({
  isOpen,
  onClose,
}: ModalProps) {
  const { data, refetch } = useGetAllEvents();

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative h-[70%] w-[45%] min-w-[400px] max-w-[800px] rounded-2xl bg-white shadow-2xl"
        onClick={handleModalClick}
      >
        <div className="sticky top-0 rounded-t-2xl border-b bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">전체 일정</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            &#10005;
          </button>
        </div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto px-6 py-4">
          {data?.events.map((event) => (
            <div
              key={event.id}
              className="mb-4 transform transition-all duration-200 last:mb-0 hover:-translate-y-1"
            >
              <CalendarEventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
