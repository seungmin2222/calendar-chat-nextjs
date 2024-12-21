import { useEffect, useState } from 'react';
import useCreateEventByDate from '../hooks/useCreateEventByDate';
import useUpdateEventByDate from '../hooks/useUpdateEventByDate';
import { EventDataType } from '../types/calendar';

interface CalendarEventModalProps {
  onClose: () => void;
  mode: 'create' | 'update';
  defaultDate: string;
  defaultValues: EventDataType | null;
}

export default function CalendarEventModal({
  onClose,
  mode = 'create',
  defaultDate,
  defaultValues,
}: CalendarEventModalProps) {
  const [date, setDate] = useState(
    mode === 'update'
      ? `${defaultValues?.year}-${String(defaultValues?.month).padStart(2, '0')}-${String(defaultValues?.day).padStart(2, '0')}`
      : defaultDate
  );
  const [title, setTitle] = useState(defaultValues?.title || '');
  const [name, setName] = useState(defaultValues?.name || '');
  const [description, setDescription] = useState(
    defaultValues?.description || ''
  );
  const [startTime, setStartTime] = useState(
    defaultValues?.startTime || '00:00'
  );
  const [endTime, setEndTime] = useState(defaultValues?.endTime || '00:30');

  const createMutation = useCreateEventByDate({
    onSuccessAction: () => {
      alert('일정이 성공적으로 등록되었습니다.');
      onClose();
    },
    onErrorAction: () => {
      alert('일정 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const updateMutation = useUpdateEventByDate({
    onSuccessAction: () => {
      alert('일정이 성공적으로 수정되었습니다.');
      onClose();
    },
    onErrorAction: () => {
      alert('일정 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const generateTimeOptions = (): string[] => {
    const times: string[] = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const timeOption = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        times.push(timeOption);
      }
    }

    return times;
  };

  const addThirtyMinutes = (time: string): string => {
    const [hours, mins] = time.split(':').map(Number);
    let newHours = hours;
    let newMins = mins + 30;

    if (newMins >= 60) {
      newMins -= 60;
      newHours += 1;
      if (newHours >= 24) newHours = 0;
    }

    return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (startTime >= endTime) {
      setEndTime(addThirtyMinutes(startTime));
    }
  }, [startTime, endTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [year, month, day] = date.split('-').map(Number);

    const eventData = {
      title,
      name,
      description,
      year,
      month,
      day,
      startTime,
      endTime,
    };

    if (mode === 'create') {
      createMutation.mutate(eventData);
    } else {
      updateMutation.mutate({
        id: defaultValues!.id,
        updateEvent: eventData,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="z-10 w-full max-w-md rounded-md bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {mode === 'create' ? '일정 등록' : '일정 수정'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-semibold">제목</label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold">이름</label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold">상세 내용</label>
            <textarea
              className="h-24 w-full rounded border border-gray-300 p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold">선택한 날짜</label>
            <input
              type="date"
              className="w-full rounded border border-gray-300 p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold">시간 선택(시작)</label>
            <select
              className="w-full rounded border border-gray-300 p-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            >
              <option value="" disabled>
                시작 시간을 선택하세요.
              </option>
              {generateTimeOptions().map((timeOption) => (
                <option key={timeOption} value={timeOption}>
                  {timeOption}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-semibold">시간 선택(종료)</label>
            <select
              className="w-full rounded border border-gray-300 p-2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            >
              <option value="" disabled>
                종료 시간을 선택하세요.
              </option>
              {generateTimeOptions().map((timeOption) => (
                <option key={timeOption} value={timeOption}>
                  {timeOption}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
