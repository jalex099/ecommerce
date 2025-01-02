import ClientUserDetailRepository from "#/repositories/ClientUserDetailRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addToast } from "#/stores/UIState.js";
import { useAuthState } from "#/stores/AuthState";

const ClientUserDetailService = () => {
  const queryClient = useQueryClient();
  const auth = useAuthState();
  const navigate = useNavigate();
  const { getUserDetail, saveUserDetail } = ClientUserDetailRepository();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["auth_getUserDetail"],
    queryFn: getUserDetail,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: auth?.isAuthenticated && auth?.isVerified,
  });

  const save = useMutation({
    mutationFn: saveUserDetail,
    onSuccess: () => {
      addToast("Datos guardados correctamente", "success");
      queryClient.invalidateQueries(["auth_getUserDetail"], {});
      navigate(-1);
    },
    onError: (error) => {
      addToast("Hubo un error al guardar los datos", "error");
      // console.log(error);
    },
  });

  return {
    userDetail: data?.data && data?.data?.length > 0 ? data?.data[0] : null,
    isLoading,
    isRefetching,
    save,
  };
};

export default ClientUserDetailService;
