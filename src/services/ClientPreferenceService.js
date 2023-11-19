import ClientPreferenceRepository from "#/repositories/ClientPreferenceRepository";
import { useQuery } from "@tanstack/react-query";

const ClientPreferenceService = () => {
  const { getPreferences } = ClientPreferenceRepository();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getPreferences"],
    queryFn: getPreferences,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return {
    preferences: data?.data,
    isLoading,
    isRefetching,
  };
};

export default ClientPreferenceService;
