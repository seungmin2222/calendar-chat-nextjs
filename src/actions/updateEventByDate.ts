import { UpdateEventParams } from '@/app/(calendar)/types/calendar';

export const updateEventByDate = async ({
  id,
  updateEvent,
}: UpdateEventParams) => {
  const url = `/events?id=${id}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests: updateEvent }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('변경 요청 중 에러:', error);
    throw new Error('이벤트 변경 중 오류가 발생했습니다.');
  }
};
