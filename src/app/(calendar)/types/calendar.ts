export interface GetEventsByDateProps {
  year: number;
  month: number;
}

export interface CreateEventType {
  title: string;
  name: string;
  description: string;
  year: number;
  month: number;
  day: number;
  startTime: string;
  endTime: string;
}

export interface UpdateEventParams {
  id: string;
  updateEvent: CreateEventType;
}

export interface UpdateEventBody {
  requests: CreateEventType;
}

export interface EventDataType extends CreateEventType {
  id: string;
}

export interface ResponseType {
  data: { events: EventDataType[] };
  status: string;
}

export interface MutationArgs {
  onSuccessAction?: () => void;
  onErrorAction?: () => void;
}
