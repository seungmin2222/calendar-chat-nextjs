import { CreateEventType } from '@/app/(calendar)/types/calendar';
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
  http.post('/events', async ({ request }) => {
    try {
      const eventData = (await request.json()) as CreateEventType;

      if (eventData) {
        db.event.create({
          title: eventData.title,
          name: eventData.name,
          description: eventData.description || '',
          year: eventData.year,
          month: eventData.month,
          day: eventData.day,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
        });
      }

      return HttpResponse.json(
        {
          status: 'success',
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('MSW Handler Error:', error);
      return new HttpResponse(
        JSON.stringify({
          status: 'error',
          message: '서버 에러가 발생했습니다.',
        }),
        { status: 500 }
      );
    }
  }),
];
