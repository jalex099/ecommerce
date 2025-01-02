import ClientPreferenceRepository from "#/repositories/ClientPreferenceRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "#/stores/UIState.js";
import { useAuthState } from "#/stores/AuthState";

const ClientPreferenceService = () => {
  const queryClient = useQueryClient();
  const { getPreferences, addOrRemovePreferences } =
    ClientPreferenceRepository();
  const auth = useAuthState();
  const {
    data,
    isSuccess,
    isLoading,
    isRefetching,
    isFetched,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auth_getPreferences"],
    queryFn: getPreferences,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: auth?.isAuthenticated && auth?.isVerified,
  });

  const addOrRemove = useMutation({
    mutationFn: addOrRemovePreferences,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["auth_getPreferences"], (oldData) => {
        return {
          ...oldData,
          data: data,
        };
      });
    },
    onError: (error) => {
      addToast(`Hubo un error`, "error");
      // console.log(error);
    },
  });

  return {
    preferences: data?.data,
    addOrRemove,
    isSuccess,
    isLoading,
    isRefetching,
    isFetched,
    isError,
    refetch,
  };
};

export default ClientPreferenceService;
