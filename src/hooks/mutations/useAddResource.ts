import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resourceService } from '../../services';
import { QUERY_KEYS } from '../../constants';
import type { ResourceType } from '../../types';

export function useAddResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: {
      workspaceId: string;
      title: string;
      type: ResourceType;
      sourceUrl: string;
    }) => resourceService.addResource(input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.resources.byWorkspace(variables.workspaceId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.resources.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    },
  });
}
