import { useQuery } from '@tanstack/react-query';
import { workspaceService } from '../../services';
import { QUERY_KEYS } from '@/constants/queryKeys';


export function useWorkspaces() {
  return useQuery({
    queryKey: QUERY_KEYS.workspaces.all,
    queryFn: () => workspaceService.getWorkspaces(),
  });
}
