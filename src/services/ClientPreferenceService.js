import ClientPreferenceRepository from "#/repositories/ClientPreferenceRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "#/stores/UIState.js";

const ClientPreferenceService = () => {
  const queryClient = useQueryClient();
  const { getPreferences, addPreference } = ClientPreferenceRepository();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getPreferences"],
    queryFn: getPreferences,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const add = useMutation({
    mutationFn: addPreference,
    onSuccess: () => {
      queryClient.invalidateQueries(["getPreferences"], {});
    },
    onError: (error) => {
      addToast("Hubo un error al agregar la preferencia", "error");
      console.log(error);
    },
  });

  return {
    preferences: data?.data,
    add,
    isLoading,
    isRefetching,
  };
};

export default ClientPreferenceService;
