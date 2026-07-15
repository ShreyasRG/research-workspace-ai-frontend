import type { WorkspaceResponseDTO } from "../../dto/workspace";
import type { Workspace, WorkspaceMember } from "../../types/workspace";

export function toWorkspace(dto: WorkspaceResponseDTO): Workspace {
  return {
    id: dto.id,
    title: dto.name,
    description: dto.description ?? "",
    createdAt: dto.createdAt,
    owner: dto.ownerName,
    ownerId: dto.ownerId,
    color: dto.color,
    icon: dto.icon,
    resourceCount: dto.resourceCount,
    summaryCount: dto.summaryCount,
    members: dto.members.map(toWorkspaceMember),
  };
}

function toWorkspaceMember(m: {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}): WorkspaceMember {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    avatarUrl: m.avatarUrl ?? "",
    // Backend only ever sends "owner" right now (no real collaboration
    // feature yet), cast is safe given current backend behavior.
    role: m.role as WorkspaceMember["role"],
  };
}
