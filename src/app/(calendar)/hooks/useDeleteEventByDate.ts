'use client';

import { deleteEventByDate } from '@/actions/deleteEventByDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationArgs } from '../types/calendar';

interface DeleteEventParams {
  id: string;
  year: number;
  month: number;
}

export default function useDeleteEventByDate({
  onSuccessAction,
  onErrorAction,
}: MutationArgs) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteEventParams) => deleteEventByDate(id),
    onSuccess: (_, variables) => {
      if (onSuccessAction) onSuccessAction();
      queryClient.invalidateQueries({
        queryKey: ['events', variables.year, variables.month],
      });
    },
    onError: (error: Error) => {
      console.log('요청 삭제 실패:', error);
      if (onErrorAction) onErrorAction();
    },
  });
}
