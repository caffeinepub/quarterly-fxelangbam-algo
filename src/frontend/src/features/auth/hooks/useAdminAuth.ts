import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useQuery } from "@tanstack/react-query";

export function useAdminAuth() {
  const { identity, loginStatus } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const isAdminQuery = useQuery({
    queryKey: ["isAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !!identity && !actorFetching,
    retry: false,
  });

  const isAuthenticated = !!identity;
  const isAdmin = isAdminQuery.data === true;

  return {
    isAuthenticated,
    isAdmin,
    isLoading:
      loginStatus === "initializing" || actorFetching || isAdminQuery.isLoading,
    status: loginStatus,
  };
}
