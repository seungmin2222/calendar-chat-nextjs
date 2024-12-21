export interface GetEventsByDateProps {
  year: number;
  month: number;
}

export interface eventDataType {
  id: string;
  title: string;
  name: string;
  description: string;
  year: number;
  month: number;
  day: number;
  startTime: string;
  endTime: string;
}

export interface responseType {
  data: { events: eventDataType[] };
  status: string;
}

export interface mutationArgs {
  onSuccessAction?: () => void;
  onErrorAction?: () => void;
}
