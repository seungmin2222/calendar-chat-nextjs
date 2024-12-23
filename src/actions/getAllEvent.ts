import { ResponseType } from '@/app/(calendar)/types/calendar';

interface GetAllEventParams {
  page?: number;
  limit?: number;
}

export const getAllEvent = async ({
  page = 1,
  limit = 10,
}: GetAllEventParams = {}) => {
  const url = `/events?page=${page}&limit=${limit}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ResponseType = await response.json();

    return data;
  } catch (error) {
    console.error('요청 중 에러 발생:', error);
    throw new Error('이벤트 조회 중 오류가 발생했습니다.');
  }
};
