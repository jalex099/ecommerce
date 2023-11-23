import DataRepository from "#/repositories/DataRepository.js";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const DataService = () => {
  const { getData } = DataRepository();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    isRefetching,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getData"],
    queryFn: getData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  //* Retorna las categorias que tienen productos
  const categories = useMemo(() => {
    const categoriesWithProducts = data?.data?.categories?.reduce(
      (acc, cat) => {
        // If the category almost has one product, add it to the list
        if (data?.data?.menu?.some((prd) => prd?.category === cat?._id)) {
          acc.push(cat);
        }
        return acc;
      },
      []
    );
    return categoriesWithProducts || [];
  }, [data]);

  const menu = useMemo(() => {
    return data?.data?.menu || [];
  }, [data]);

  const company = useMemo(() => {
    return data?.data?.company || [];
  }, [data]);

  const carousel = useMemo(() => {
    return data?.data?.carousels || [];
  }, [data]);

  const messages = useMemo(() => {
    return data?.data?.messages || [];
  }, [data]);

  const options = useMemo(() => {
    return data?.data?.options || [];
  }, [data]);

  return {
    categories,
    menu,
    options,
    company,
    carousel,
    messages,
    isLoading,
    isSuccess,
    isError,
    isRefetching,
    isFetching,
    refetch,
  };
};

export default DataService;
