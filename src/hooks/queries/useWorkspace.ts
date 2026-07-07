import { useQuery } from '@tanstack/react-query';
import { workspaceService } from '../../services';

export function useWorkspace(id: string) {
  return useQuery({
    queryKey: ["workspace", id],
    queryFn: () => workspaceService.getWorkspace(id),
    enabled: !!id,
  });
}
