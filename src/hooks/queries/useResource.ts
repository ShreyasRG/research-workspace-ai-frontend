import { useQuery } from '@tanstack/react-query';
import { resourceService } from '../../services';
import { QUERY_KEYS } from '../../constants';

export function useResource(id: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.resources.detail(id ?? ''),
    queryFn: () => resourceService.getResource(id!),
    enabled: !!id,
  });
}
