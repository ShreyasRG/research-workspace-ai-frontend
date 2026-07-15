import { useQuery } from '@tanstack/react-query';
import { workspaceService, resourceService, summaryService } from '../../services';
import { QUERY_KEYS } from '@/constants/queryKeys'; // Specify the direct file name here

export interface DashboardData {
  workspaces: Awaited<ReturnType<typeof workspaceService.getWorkspaces>>;
  resources: Awaited<ReturnType<typeof resourceService.getResources>>;
  summaries: Awaited<ReturnType<typeof summaryService.getSummaries>>;
}

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: async (): Promise<DashboardData> => {
      const [workspaces, resources, summaries] = await Promise.all([
        workspaceService.getWorkspaces(),
        resourceService.getResources(),
        summaryService.getSummaries(),
      ]);
      return { workspaces, resources, summaries };
    },
  });
}
