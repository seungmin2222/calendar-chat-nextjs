'use client';

import { getAllEvent } from '@/actions/getAllEvent';
import { useInfiniteQuery } from '@tanstack/react-query';

interface EventsOptions {
  page: number;
  limit: number;
}

export const useGetAllEvents = (options: EventsOptions = { limit: 10 }) => {
  return useInfiniteQuery({
    queryKey: ['events', options],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getAllEvent({
        page: pageParam,
        limit: options.limit,
      });
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.events.length < (options.limit ?? 10)) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
