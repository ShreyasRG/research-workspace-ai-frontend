import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resourceService } from '../../services';
import { QUERY_KEYS } from '../../constants';

export function useDeleteResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resourceService.deleteResource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.resources.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    },
  });
}
