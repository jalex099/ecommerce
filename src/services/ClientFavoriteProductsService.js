import ClientFavoriteProductsRepository from "#/repositories/ClientFavoriteProductsRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "#/stores/AuthState";

const ClientFavoriteProductsService = () => {
  const { getFavoriteProducts, addFavoriteProduct, removeFavoriteProduct } =
    ClientFavoriteProductsRepository();
  const queryClient = useQueryClient();
  const auth = useAuthState();

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["auth_getFavoriteProducts"],
    queryFn: getFavoriteProducts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    enabled: auth?.isAuthenticated && auth?.isVerified,
  });

  const add = useMutation({
    mutationFn: addFavoriteProduct,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["auth_getFavoriteProducts"], (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, data],
        };
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const remove = useMutation({
    mutationFn: removeFavoriteProduct,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["auth_getFavoriteProducts"], (oldData) => {
        return {
          ...oldData,
          data: oldData.data.filter((product) => product?._id !== data?._id),
        };
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  return {
    favoriteProducts: data?.data,
    isLoading: isLoading || add?.isLoading || remove?.isLoading,
    isRefetching,
    add,
    remove,
  };
};

export default ClientFavoriteProductsService;
