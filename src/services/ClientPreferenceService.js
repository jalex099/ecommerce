import ClientPreferenceRepository from "#/repositories/ClientPreferenceRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "#/stores/UIState.js";

const ClientPreferenceService = () => {
  const queryClient = useQueryClient();
  const { getPreferences, addOrRemovePreferences } =
    ClientPreferenceRepository();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getPreferences"],
    queryFn: getPreferences,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const addOrRemove = useMutation({
    mutationFn: addOrRemovePreferences,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["getPreferences"], (oldData) => {
        return {
          ...oldData,
          data: data,
        };
      });
    },
    onError: (error) => {
      addToast(`Hubo un error`, "error");
      console.log(error);
    },
  });

  return {
    preferences: data?.data,
    addOrRemove,
    isLoading,
    isRefetching,
  };
};

export default ClientPreferenceService;
