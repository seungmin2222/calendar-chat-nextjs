'use client';

import { getEvent } from '@/actions/getEvent';
import { useInfiniteQuery } from '@tanstack/react-query';

interface EventsOptions {
  page?: number;
  limit: number;
}

export const useGetEvents = (options: EventsOptions) => {
  return useInfiniteQuery({
    queryKey: ['events', options],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getEvent({
        page: pageParam,
        limit: options.limit,
      });
      return res.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.events.length < (options.limit ?? 10)) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
  });
};
