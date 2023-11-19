import ClientFavoriteProductsRepository from "#/repositories/ClientFavoriteProductsRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ClientFavoriteProductsService = () => {
  const { getFavoriteProducts, addFavoriteProduct, removeFavoriteProduct } =
    ClientFavoriteProductsRepository();
  const queryClient = useQueryClient();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getFavoriteProducts"],
    queryFn: getFavoriteProducts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  const add = useMutation({
    mutationFn: addFavoriteProduct,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["getFavoriteProducts"], (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, data],
        };
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const remove = useMutation({
    mutationFn: removeFavoriteProduct,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["getFavoriteProducts"], (oldData) => {
        return {
          ...oldData,
          data: oldData.data.filter((product) => product?._id !== data?._id),
        };
      });
    },
    onError: (error) => {
      console.log(error);
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
