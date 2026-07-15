import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { resourceService, workspaceService, profileService } from '../services';
import type { ResourceType, ScannedDocument } from '../types';

export const useAddResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { workspaceId: string; title: string; type: ResourceType; sourceUrl: string; description?: string; thumbnailUrl?: string }) => resourceService.addResource(input),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.resourcesByWorkspace(variables.workspaceId) });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.resources });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.workspaces });
    },
  });
};

export const useDeleteResource = () => {
  const qc = useQueryClient();
  return useMutation({
    // workspaceId is required now (not just id) - without it we can't
    // invalidate the byWorkspace cache entry, which previously left a
    // workspace's resource list stale until a manual reload.
    mutationFn: (input: { id: string; workspaceId: string }) => resourceService.deleteResource(input.id),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.resources });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.resourcesByWorkspace(variables.workspaceId) });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.workspaces });
    },
  });
};

export const useUpdateResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; workspaceId: string; title?: string; description?: string; status?: string; tags?: string[] }) => {
      const { workspaceId, ...updateInput } = input;
      return resourceService.updateResource(updateInput);
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.resources });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.resourcesByWorkspace(variables.workspaceId) });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.resource(variables.id) });
    },
  });
};

export const useCreateWorkspace = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { title: string; description: string; color: string; icon: string }) => workspaceService.createWorkspace(input),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QUERY_KEYS.workspaces }); },
  });
};

export const useDeleteWorkspace = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workspaceService.deleteWorkspace(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QUERY_KEYS.workspaces }); },
  });
};

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (updates: Parameters<typeof profileService.updateProfile>[0]) => profileService.updateProfile(updates),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QUERY_KEYS.profile }); },
  });
};

// Still mocked - see resourceService.simulateScan for why.
export const useSimulateScan = () => useMutation({ mutationFn: () => resourceService.simulateScan() as Promise<ScannedDocument> });
