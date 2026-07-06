import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceService } from '../../services';
import { QUERY_KEYS } from '../../constants';
import type { Workspace } from '../../types';

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { title: string; description: string }) =>
      workspaceService.createWorkspace(input),
    onSuccess: (_newWorkspace: Workspace) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workspaces.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    },
  });
}
