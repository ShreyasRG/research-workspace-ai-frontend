import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { workspaceService, resourceService, summaryService, profileService, notificationService } from '../services';

export const useWorkspaces = () => useQuery({ queryKey: QUERY_KEYS.workspaces, queryFn: () => workspaceService.getWorkspaces() });
export const useWorkspace = (id: string | undefined) => useQuery({ queryKey: QUERY_KEYS.workspace(id ?? ''), queryFn: () => workspaceService.getWorkspace(id!), enabled: !!id });
export const useResources = (workspaceId?: string) => useQuery({ queryKey: workspaceId ? QUERY_KEYS.resourcesByWorkspace(workspaceId) : QUERY_KEYS.resources, queryFn: () => resourceService.getResources(workspaceId) });
export const useResource = (id: string | undefined) => useQuery({ queryKey: QUERY_KEYS.resource(id ?? ''), queryFn: () => resourceService.getResource(id!), enabled: !!id });
export const useSummaries = () => useQuery({ queryKey: QUERY_KEYS.summaries, queryFn: () => summaryService.getSummaries() });
export const useSummary = (id: string | undefined) => useQuery({ queryKey: QUERY_KEYS.summary(id ?? ''), queryFn: () => summaryService.getSummary(id!), enabled: !!id });
export const useProfile = () => useQuery({ queryKey: QUERY_KEYS.profile, queryFn: () => profileService.getProfile() });
export const useNotifications = () => useQuery({ queryKey: QUERY_KEYS.notifications, queryFn: () => notificationService.getNotifications() });
