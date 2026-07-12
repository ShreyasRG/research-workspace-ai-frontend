import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resourceService } from '../../services';
import { QUERY_KEYS } from '../../constants';

export function useDeleteResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { id: string; workspaceId: string }) =>
      resourceService.deleteResource(input.id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.resources.all });

      // Previously missing: without this, the workspace detail page's
      // resource list (cached under this specific key) stayed stale until
      // a manual reload, same class of bug fixed earlier for dashboard.
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.resources.byWorkspace(variables.workspaceId),
      });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    },
  });
}
