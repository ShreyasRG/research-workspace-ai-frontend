import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants';
import type { ProfilePreferences } from '../../types';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Partial<ProfilePreferences>) => {
      return input;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile.all });
    },
  });
}
