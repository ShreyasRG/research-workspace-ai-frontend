import { useMutation, useQueryClient } from "@tanstack/react-query";

import { workspaceService } from "../../services";

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
    },
  });
}