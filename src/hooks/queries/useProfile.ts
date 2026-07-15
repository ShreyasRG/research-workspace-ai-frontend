import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys'; // Specify the direct file name here
import { profileService } from '@/services/profile/profileService';


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
