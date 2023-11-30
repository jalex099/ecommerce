import ClientPreferenceRepository from "#/repositories/ClientPreferenceRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "#/stores/UIState.js";

const ClientPreferenceService = () => {
  const queryClient = useQueryClient();
  const { getPreferencesByOpt, addPreference, removePreference } =
    ClientPreferenceRepository();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getPreferencesByOpt"],
    queryFn: getPreferencesByOpt,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const add = useMutation({
    mutationFn: addPreference,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["getPreferencesByOpt"], () => {
        return {
          data,
        };
      });
    },
    onError: (error) => {
      addToast("Hubo un error al agregar la preferencia", "error");
      console.log(error);
    },
  });

  const remove = useMutation({
    mutationFn: removePreference,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["getPreferencesByOpt"], (oldData) => {
        // Buscar si en la data, el value es un array vacio, eliminarlo
        if (data?.value?.length === 0) {
          return {
            data: oldData?.data?.filter(
              (preference) => preference?.code !== data?.code
            ),
          };
        }
        // Si existe, actualizarla
        return {
          data: oldData?.data?.map((preference) => {
            if (preference?.code === data?.code) {
              return data;
            }
            return preference;
          }),
        };
      });
    },
    onError: (error) => {
      addToast("Hubo un error al quitar la preferencia", "error");
      console.log(error);
    },
  });

  return {
    preferences: data?.data,
    add,
    remove,
    isLoading,
    isRefetching,
  };
};

export default ClientPreferenceService;
