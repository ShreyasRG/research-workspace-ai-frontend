import { useQuery } from '@tanstack/react-query';
import { summaryService } from '../../services';
import { QUERY_KEYS } from '../../constants';

export function useSummaries(workspaceId?: string) {
  return useQuery({
    queryKey: workspaceId
      ? QUERY_KEYS.summaries.byWorkspace(workspaceId)
      : QUERY_KEYS.summaries.all,
    queryFn: () => summaryService.getSummaries(workspaceId),
  });
}
