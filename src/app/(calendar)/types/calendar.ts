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

export interface eventDataType extends CreateEventType {
  id: string;
}

export interface responseType {
  data: { events: eventDataType[] };
  status: string;
}

export interface mutationArgs {
  onSuccessAction?: () => void;
  onErrorAction?: () => void;
}
