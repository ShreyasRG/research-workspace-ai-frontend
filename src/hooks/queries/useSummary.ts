import { useQuery } from '@tanstack/react-query';
import { summaryService } from '../../services';
import { QUERY_KEYS } from '../../constants';

export function useSummary(id: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.summaries.detail(id ?? ''),
    queryFn: () => summaryService.getSummary(id!),
    enabled: !!id,
  });
}
