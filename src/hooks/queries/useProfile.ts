import { useQuery } from '@tanstack/react-query';
import { profileService } from '../../services';
import { QUERY_KEYS } from '../../constants';

export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.profile.detail(),
    queryFn: () => profileService.getProfile(),
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: QUERY_KEYS.profile.notifications(),
    queryFn: () => profileService.getNotifications(),
  });
}
