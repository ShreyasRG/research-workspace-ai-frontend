import type {
  WorkspaceResponseDTO,
} from "../../dto/workspace";

import type { Workspace } from "../../types/workspace";

export function toWorkspace(dto: WorkspaceResponseDTO): Workspace {
  return {
    id: dto.id,

    title: dto.name,

    description: dto.description ?? "",

    createdAt: dto.createdAt,

    // Temporary placeholders until the Auth module is implemented
    owner: "You",
    ownerId: "local-user",
    members: [],
    color: "from-primary-500 to-accent-500",
    icon: "FolderKanban",
    resourceCount: 0,
    summaryCount: 0,
  };
}