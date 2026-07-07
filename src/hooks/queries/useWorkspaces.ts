import { useQuery } from "@tanstack/react-query";
import { workspaceService } from "../../services";

export function useWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspaceService.getWorkspaces(),
  });
}