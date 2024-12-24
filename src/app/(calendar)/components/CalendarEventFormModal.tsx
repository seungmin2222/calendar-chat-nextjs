import { useEffect, useState } from 'react';
import useCreateEventByDate from '../hooks/useCreateEventByDate';
import useUpdateEventByDate from '../hooks/useUpdateEventByDate';
import { EventDataType } from '../types/calendar';

interface CalendarEventFormModalProps {
  onClose: () => void;
  mode: 'create' | 'update';
  defaultDate: string;
  defaultValues: EventDataType | null;
}

interface FormErrors {
  title?: string;
  name?: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}

export default function CalendarEventFormModal({
  onClose,
  mode = 'create',
  defaultDate,
  defaultValues,
}: CalendarEventFormModalProps) {
  const [formData, setFormData] = useState({
    date:
      mode === 'update'
        ? `${defaultValues?.year}-${String(defaultValues?.month).padStart(2, '0')}-${String(defaultValues?.day).padStart(2, '0')}`
        : defaultDate,
    title: defaultValues?.title || '',
    name: defaultValues?.name || '',
    description: defaultValues?.description || '',
    startTime: defaultValues?.startTime || '00:00',
    endTime: defaultValues?.endTime || '00:30',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
        times.push(
          `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        );
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    }

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (formData.description.length > 200) {
      newErrors.description = '상세 내용은 200자 이내로 입력해주세요';
    }

    if (!formData.date) {
      newErrors.date = '날짜를 선택해주세요';
    }

    if (!formData.startTime) {
      newErrors.startTime = '시작 시간을 선택해주세요';
    }

    if (!formData.endTime) {
      newErrors.endTime = '종료 시간을 선택해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (formData.startTime >= formData.endTime) {
      setFormData((prev) => ({
        ...prev,
        endTime: addThirtyMinutes(formData.startTime),
      }));
    }
  }, [formData.startTime, formData.endTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const allTouched = Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);
      return;
    }

    const [year, month, day] = formData.date.split('-').map(Number);
    const eventData = {
      title: formData.title,
      name: formData.name,
      description: formData.description,
      year,
      month,
      day,
      startTime: formData.startTime,
      endTime: formData.endTime,
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

  const isFormErrorKey = (key: string): key is keyof FormErrors => {
    return [
      'title',
      'name',
      'description',
      'date',
      'startTime',
      'endTime',
    ].includes(key);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name] && isFormErrorKey(name)) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {mode === 'create' ? '일정 등록' : '일정 수정'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              className={`mt-1 w-full rounded-md border p-2 ${
                touched.title && errors.title
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              value={formData.title}
              onChange={handleChange}
              onBlur={() => handleBlur('title')}
              required
            />
            {touched.title && errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className={`mt-1 w-full rounded-md border p-2 ${
                touched.name && errors.name
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              required
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              상세 내용
            </label>
            <textarea
              name="description"
              className={`mt-1 h-48 w-full resize-none rounded-md border p-2 ${
                touched.description && errors.description
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              value={formData.description}
              onChange={handleChange}
              onBlur={() => handleBlur('description')}
              maxLength={200}
            />
            <div className="mt-1 flex justify-between">
              <span className="text-sm text-gray-500">
                {formData.description.length}/200
              </span>
              {touched.description && errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              선택한 날짜 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              className={`mt-1 w-full rounded-md border p-2 ${
                touched.date && errors.date
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              value={formData.date}
              onChange={handleChange}
              onBlur={() => handleBlur('date')}
              required
            />
            {touched.date && errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              시간 선택(시작) <span className="text-red-500">*</span>
            </label>
            <select
              name="startTime"
              className={`mt-1 w-full rounded-md border p-2 ${
                touched.startTime && errors.startTime
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              value={formData.startTime}
              onChange={handleChange}
              onBlur={() => handleBlur('startTime')}
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
            {touched.startTime && errors.startTime && (
              <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              시간 선택(종료) <span className="text-red-500">*</span>
            </label>
            <select
              name="endTime"
              className={`mt-1 w-full rounded-md border p-2 ${
                touched.endTime && errors.endTime
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              value={formData.endTime}
              onChange={handleChange}
              onBlur={() => handleBlur('endTime')}
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
            {touched.endTime && errors.endTime && (
              <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {mode === 'create' ? '등록' : '수정'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
