'use client';

import { getAllEvent } from '@/actions/getAllEvent';
import { useQuery } from '@tanstack/react-query';

export const useGetAllEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await getAllEvent();
      return res.data;
    },
  });
};
