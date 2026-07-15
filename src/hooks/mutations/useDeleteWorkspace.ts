import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceService } from '../../services';
import { QUERY_KEYS } from '@/constants/queryKeys'; // Specify the direct file name here

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workspaceService.getWorkspace(id).then(() => undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workspaces.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    },
  });
}
