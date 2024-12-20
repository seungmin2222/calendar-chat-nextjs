import { http, HttpResponse } from 'msw';
import { db } from './db';

export const handlers = [
  http.get('https://api.calendar.com/events', ({ request }) => {
    const url = new URL(request.url);

    const year = Number(url.searchParams.get('year'));
    const month = Number(url.searchParams.get('month'));

    try {
      const selectEvents = db.event.findMany({
        where: {
          year: {
            equals: year,
          },
          month: {
            equals: month,
          },
        },
      });

      return HttpResponse.json({
        status: 'success',
        data: { events: selectEvents },
      });
    } catch (error) {
      console.error('MSW Handler Error:', error);
      return new HttpResponse(null, { status: 500 });
    }
  }),
];
