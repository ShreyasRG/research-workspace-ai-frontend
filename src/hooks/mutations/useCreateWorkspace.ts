import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceService } from "../../services";
import { QUERY_KEYS } from "../../constants";

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workspaceService.createWorkspace,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });

      // The dashboard reads its own bundled query (workspaces + resources +
      // summaries counts), which is a separate cache entry from
      // ["workspaces"]. Without this, creating a workspace updates any
      // dedicated workspaces list page, but the dashboard's counts/banner
      // stay stale until a manual reload forces a fresh fetch.
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.dashboard,
      });
    },
  });
}