import { CreateEventType } from '@/app/(calendar)/types/calendar';

export const createEventByDate = async (arg: CreateEventType) => {
  const url = '/events';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log('생성 중 에러 발생:', error);
    throw new Error('이벤트  중 오류가 발생했습니다.');
  }
};
