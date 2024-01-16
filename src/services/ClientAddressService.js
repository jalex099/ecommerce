import ClientAddressRepository from "#/repositories/ClientAddressRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addToast } from "#/stores/UIState.js";
import { useAuthState } from "#/stores/AuthState";

const ClientAddressService = () => {
  const queryClient = useQueryClient();
  const auth = useAuthState();
  const navigate = useNavigate();
  const { getAddresses, addAddress, deleteAddress } = ClientAddressRepository();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["auth_getAddresses"],
    queryFn: getAddresses,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: auth?.isAuthenticated && auth?.isVerified,
  });

  const add = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      addToast("Dirección agregada correctamente", "success");
      queryClient.invalidateQueries(["auth_getAddresses"], {});
      navigate(-1);
    },
    onError: (error) => {
      addToast("Hubo un error al agregar la dirección", "error");
      console.log(error);
    },
  });

  const remove = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      addToast(`Dirección eliminada correctamente`, "success");
      queryClient.invalidateQueries(["auth_getAddresses"], {});
    },
    onError: (error) => {
      addToast("Hubo un error al eliminar la dirección", "error");
      console.log(error);
    },
  });

  return {
    addresses: data?.data,
    isLoading,
    isRefetching,
    add,
    remove,
  };
};

export default ClientAddressService;
