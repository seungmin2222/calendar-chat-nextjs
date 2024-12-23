import {
  CreateEventType,
  UpdateEventBody,
} from '@/app/(calendar)/types/calendar';
import { http, HttpResponse, ws } from 'msw';
import { db } from './db';

const chat = ws.link('wss://chat.example.com');

export const handlers = [
  http.get('/events', ({ request }) => {
    try {
      const url = new URL(request.url);

      const year = Number(url.searchParams.get('year'));
      const month = Number(url.searchParams.get('month'));

      if (!year && !month) {
        const allEvents = db.event.getAll();

        return HttpResponse.json({
          status: 'success',
          data: { events: allEvents },
        });
      }

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
  http.patch('/events', async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id') as string;

    try {
      const body = (await request.json()) as UpdateEventBody;
      const { requests: updateEvent } = body;

      const updatedEvent = db.event.update({
        where: {
          id: {
            equals: id,
          },
        },
        data: {
          title: updateEvent.title,
          name: updateEvent.name,
          description: updateEvent.description,
          year: updateEvent.year,
          month: updateEvent.month,
          day: updateEvent.day,
          startTime: updateEvent.startTime,
          endTime: updateEvent.endTime,
        },
      });

      if (!updatedEvent) {
        return new HttpResponse(
          JSON.stringify({
            status: 'error',
            message: '해당 이벤트를 찾을 수 없습니다.',
          }),
          { status: 404 }
        );
      }

      return HttpResponse.json({
        status: 'success',
        data: { event: updatedEvent },
      });
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
  chat.addEventListener('connection', ({ client }) => {
    console.log('새로운 클라이언트가 연결되었습니다.');

    client.addEventListener('message', (event) => {
      try {
        const data =
          typeof event.data === 'string'
            ? event.data
            : event.data instanceof Blob
              ? JSON.stringify(event.data)
              : JSON.stringify(event.data);

        const messageData = JSON.parse(data);
        const timestamp = new Date().toISOString();

        const broadcastMessage = {
          id: crypto.randomUUID(),
          ...messageData,
          timestamp,
        };

        client.send(
          JSON.stringify({
            ...broadcastMessage,
            sender: 'me',
          })
        );

        chat.broadcastExcept(
          client,
          JSON.stringify({
            ...broadcastMessage,
            sender: 'other',
          })
        );
      } catch (error) {
        console.error('메시지 처리 중 오류 발생:', error);
        client.send(
          JSON.stringify({
            id: crypto.randomUUID(),
            type: 'system',
            content: '메시지 처리 중 오류가 발생했습니다.',
            sender: 'system',
            timestamp: new Date().toISOString(),
          })
        );
      }
    });
  }),
];
