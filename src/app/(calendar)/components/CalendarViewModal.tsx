import React, { useEffect, useRef } from 'react';
import useDeleteEventsByDate from '../hooks/useDeleteEventByDate';
import { eventDataType } from '../types/calendar';

interface ModalProps {
  event: eventDataType;
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
}

export default function CalendarEventViewModal({
  event,
  isOpen,
  onClose,
  year,
  month,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const onSuccessAction = () => {
    alert('삭제 성공');
    onClose();
  };

  const onErrorAction = () => {
    console.log('삭제 실패');
  };

  const mutation = useDeleteEventsByDate({
    onSuccessAction,
    onErrorAction,
  });

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

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('수정');
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutation.mutate({ id: event.id, year, month });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="relative flex w-11/12 max-w-md flex-col gap-3 rounded-lg bg-white p-6 shadow-lg focus:outline-none"
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
        <div className="mt-4 flex justify-between">
          <button
            className="duration-400 flex w-[45%] justify-center rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            className="duration-400 flex w-[45%] justify-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleEdit}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
