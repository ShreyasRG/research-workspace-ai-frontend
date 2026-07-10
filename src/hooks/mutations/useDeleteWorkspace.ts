import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceService } from '../../services';
import { QUERY_KEYS } from '../../constants';

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
  workspaceService.deleteWorkspace(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workspaces.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    },
  });
}
