import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys'; // Specify the direct file name hereimport type { Workspace } from '../../types';
import { Workspace } from '@/types';
import { workspaceService } from '@/services';

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
