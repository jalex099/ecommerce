import ClientFavoriteProductsRepository from "#/repositories/ClientFavoriteProductsRepository";
import { useQuery } from "@tanstack/react-query";

const ClientFavoriteProductsService = () => {
  const { getFavoriteProducts } = ClientFavoriteProductsRepository();
  const { data, isLoading } = useQuery({
    queryKey: ["getFavoriteProducts"],
    queryFn: getFavoriteProducts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  return {
    favoriteProducts: data?.data,
    isLoading,
  };
};

export default ClientFavoriteProductsService;
