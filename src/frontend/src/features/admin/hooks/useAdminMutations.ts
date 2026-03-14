import type { ManagedAccount, PerformanceMetrics, Trade } from "@/backend";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTrade() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trade: Trade) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addTrade(trade);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      queryClient.invalidateQueries({ queryKey: ["performanceMetrics"] });
    },
  });
}

export function useUpdateTrade() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, trade }: { id: bigint; trade: Trade }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateTrade(id, trade);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      queryClient.invalidateQueries({ queryKey: ["performanceMetrics"] });
    },
  });
}

export function useDeleteTrade() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteTrade(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      queryClient.invalidateQueries({ queryKey: ["performanceMetrics"] });
    },
  });
}

export function useAddAccount() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (account: ManagedAccount) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addAccount(account);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}

export function useUpdateAccount() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      account,
    }: { id: bigint; account: ManagedAccount }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateAccount(id, account);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}

export function useDeleteAccount() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteAccount(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}

export function useUpdateMetrics() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (metrics: PerformanceMetrics) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePerformanceMetrics(metrics);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["performanceMetrics"] });
    },
  });
}
