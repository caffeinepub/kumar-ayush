import { useQuery } from "@tanstack/react-query";
import type { Quote } from "../backend.d.ts";
import { useActor } from "./useActor";

export type { Quote };

export function useGetAllJokes() {
  const { actor, isFetching } = useActor();
  return useQuery<Quote[]>({
    queryKey: ["jokes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllJokes();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetTotalJokes() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["totalJokes"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getTotalJokes();
    },
    enabled: !!actor && !isFetching,
  });
}
