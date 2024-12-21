export const deleteEventByDate = async (id: string) => {
  const url = `/events?id=${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('삭제 요청 중 에러 발생:', error);
    throw new Error('이벤트 삭제 중 오류가 발생했습니다.');
  }
};
