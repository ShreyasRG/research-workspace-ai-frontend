import type { ResourceResponseDTO } from "../../dto/resource";
import type { Resource, ResourceType, ResourceStatus } from "../../types/resource";
import type { Tag } from "../../types/common";

// This project's Tag type is just { id, name } - no color field, unlike
// the previous frontend. Since the backend only stores plain tag label
// strings anyway, this mapping is direct with no color reconstruction
// needed.
function toTag(label: string): Tag {
  return { id: label, name: label };
}

export function toResource(dto: ResourceResponseDTO): Resource {
  return {
    id: dto.id,
    workspaceId: dto.workspaceId,
    title: dto.title,
    type: dto.type.toLowerCase() as ResourceType,
    sourceUrl: dto.sourceUrl ?? "",
    sourceName: dto.sourceName ?? "",
    description: dto.description ?? "",
    tags: (dto.tags ?? []).map(toTag),
    dateAdded: dto.createdAt,
    status: dto.status.toLowerCase() as ResourceStatus,
    author: dto.author ?? "",
    thumbnailUrl: dto.thumbnailUrl,
    readTimeMinutes: dto.readTimeMinutes,
    durationSeconds: dto.durationSeconds,
  };
}
