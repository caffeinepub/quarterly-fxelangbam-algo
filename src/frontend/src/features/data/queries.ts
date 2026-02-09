import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { Trade, ManagedAccount, PerformanceMetrics } from '@/backend';

export function useGetPerformanceMetrics() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PerformanceMetrics>({
    queryKey: ['performanceMetrics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPerformanceMetrics();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30000,
  });
}

export function useGetAllTrades() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Trade[]>({
    queryKey: ['trades'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllTradesSorted();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30000,
  });
}

export function useGetAllAccounts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ManagedAccount[]>({
    queryKey: ['accounts'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllAccounts();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30000,
  });
}
