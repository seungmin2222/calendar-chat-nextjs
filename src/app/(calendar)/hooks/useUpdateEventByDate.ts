'use client';

import { updateEventByDate } from '@/actions/updateEventByDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationArgs, UpdateEventParams } from '../types/calendar';

export default function useUpdateEventByDate({
  onSuccessAction,
  onErrorAction,
}: MutationArgs) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updateEvent }: UpdateEventParams) =>
      updateEventByDate({ id, updateEvent }),
    onSuccess: (_, variables) => {
      if (onSuccessAction) onSuccessAction();
      queryClient.invalidateQueries({
        queryKey: [
          'events',
          variables.updateEvent.year,
          variables.updateEvent.month - 1,
        ],
      });
    },
    onError: (error: Error) => {
      console.log('이벤트 수정 실패:', error);
      if (onErrorAction) onErrorAction();
    },
  });
}
