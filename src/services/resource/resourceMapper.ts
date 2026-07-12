import type { ResourceResponseDTO } from "../../dto/resource";
import type { Resource, ResourceType, ResourceStatus } from "../../types/resource";
import type { Tag } from "../../types/common";
import { TAGS, TAG_COLORS } from "../../constants";

// Backend stores tags as plain label strings (no id/color) to keep the
// schema simple - no separate Tag CRUD subsystem. The frontend UI expects
// full Tag objects ({ id, label, color }) for colored badges, so we
// reconstruct that here: known labels get their preset color from the
// existing TAGS constant; unrecognized labels get a deterministic color
// derived from the label itself, so the same tag always renders the same
// color even though the backend never stored one.
const KNOWN_TAGS = Object.values(TAGS);
const FALLBACK_COLOR_KEYS = Object.keys(TAG_COLORS);

function hashToIndex(value: string, modulo: number): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash % modulo;
}

function toTag(label: string): Tag {
  const known = KNOWN_TAGS.find(
    (t) => t.label.toLowerCase() === label.toLowerCase()
  );

  if (known) {
    return known;
  }

  const color =
    FALLBACK_COLOR_KEYS[hashToIndex(label, FALLBACK_COLOR_KEYS.length)];

  return {
    id: label,
    label,
    color,
  };
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
