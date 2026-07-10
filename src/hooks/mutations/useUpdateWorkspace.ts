import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceService } from "../../services";
import { QUERY_KEYS } from "../../constants";

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workspaceService.updateWorkspace,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });

      queryClient.invalidateQueries({
        queryKey: ["workspace", variables.id],
      });

      // Same reasoning as useCreateWorkspace - the dashboard's own bundled
      // query is a separate cache entry and won't refresh otherwise.
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.dashboard,
      });
    },
  });
}