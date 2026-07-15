import { useQuery } from '@tanstack/react-query';
import { workspaceService } from '../../services';
import { QUERY_KEYS } from '../../constants';

export function useWorkspace(id: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.workspaces.detail(id ?? ''),
    queryFn: () => workspaceService.getWorkspace(id!),
    enabled: !!id,
  });
}
