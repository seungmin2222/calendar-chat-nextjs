import { http, HttpResponse } from 'msw';
import { db } from './db';

export const handlers = [
  http.get('/events', ({ request }) => {
    const url = new URL(request.url);

    const year = Number(url.searchParams.get('year'));
    const month = Number(url.searchParams.get('month'));

    try {
      const selectedEvents = db.event.findMany({
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
        data: { events: selectedEvents },
      });
    } catch (error) {
      console.error('MSW Handler Error:', error);
      return new HttpResponse(null, { status: 500 });
    }
  }),
  http.delete('/events', ({ request }) => {
    const url = new URL(request.url);

    const id = url.searchParams.get('id') as string;

    try {
      db.event.delete({
        where: {
          id: {
            equals: id,
          },
        },
      });

      return HttpResponse.json({
        status: 'success',
      });
    } catch (error) {
      console.error('MSW Handler Error:', error);
      return new HttpResponse(null, { status: 500 });
    }
  }),
];
