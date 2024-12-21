import React, { useEffect, useRef } from 'react';
import { eventDataType } from '../types/calendar';

interface ModalProps {
  event: eventDataType;
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarEventViewModal({
  event,
  isOpen,
  onClose,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="relative w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg focus:outline-none"
        ref={modalRef}
        tabIndex={-1}
      >
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#10005;
        </button>
        <h2 className="mb-4 text-2xl font-bold">{event.title}</h2>
        <p>
          <strong>Name:</strong> {event.name}
        </p>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Date:</strong> {event.year}-
          {String(event.month).padStart(2, '0')}-
          {String(event.day).padStart(2, '0')}
        </p>
        <p>
          <strong>Time:</strong> {event.startTime} - {event.endTime}
        </p>
      </div>
    </div>
  );
}
