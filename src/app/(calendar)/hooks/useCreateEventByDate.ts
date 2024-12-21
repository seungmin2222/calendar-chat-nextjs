'use client';

import { createEventByDate } from '@/actions/creatEventByDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateEventType, mutationArgs } from '../types/calendar';

export default function useCreateEventByDate({
  onSuccessAction,
  onErrorAction,
}: mutationArgs) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventType) => createEventByDate(data),
    onSuccess: (_, variables) => {
      if (onSuccessAction) onSuccessAction();
      queryClient.invalidateQueries({
        queryKey: ['events', variables.year, variables.month - 1],
      });
    },
    onError: (error: Error) => {
      console.log('이벤트 생성 실패:', error);
      if (onErrorAction) onErrorAction();
    },
  });
}
