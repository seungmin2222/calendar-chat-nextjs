'use client';

import { getEventsByDate } from '@/actions/getEventsByDate';
import { useQuery } from '@tanstack/react-query';
import { GetEventsByDateProps } from '../types/calendar';

export const useGetEventsByDate = ({ year, month }: GetEventsByDateProps) => {
  return useQuery({
    queryKey: ['events', year, month],
    queryFn: async () => {
      const res = await getEventsByDate({ year, month });
      return res.data;
    },
  });
};
