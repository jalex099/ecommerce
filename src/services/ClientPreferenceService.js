import ClientPreferenceRepository from "#/repositories/ClientPreferenceRepository";
import { useQuery } from "@tanstack/react-query";

const ClientPreferenceService = () => {
  const { getPreferences } = ClientPreferenceRepository();
  const { data, isLoading } = useQuery({
    queryKey: ["getPreferences"],
    queryFn: getPreferences,
    refetchOnWindowFocus: false,
    staleTime: "Infinity",
  });

  return {
    preferences: data?.data,
    isLoading,
  };
};

export default ClientPreferenceService;
