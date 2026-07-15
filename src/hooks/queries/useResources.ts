import { useQuery } from '@tanstack/react-query';
import { resourceService } from '../../services';
import { QUERY_KEYS } from '@/constants/queryKeys';


export function useResources(workspaceId?: string) {
  return useQuery({
    queryKey: workspaceId
      ? QUERY_KEYS.resources.byWorkspace(workspaceId)
      : QUERY_KEYS.resources.all,
    queryFn: () => resourceService.getResources(workspaceId),
  });
}
