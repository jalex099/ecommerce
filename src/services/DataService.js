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

  const groupsOfOptions = useMemo(() => {
    return options
      ?.reduce((acc, item) => {
        const group = item?.group;
        const label = group || "N/A";
        // Verificar si ya existe el grupo
        const groupExists = acc?.find((item) => item?.value === group);
        if (groupExists) return acc;
        return [
          ...acc,
          {
            value: group,
            index: !group ? 0 : 1,
            label: label,
            options: options?.filter((item) => item?.group === group),
          },
        ];
      }, [])
      ?.sort((a, b) => {
        // por index y luego por label
        if (a?.index < b?.index) return -1;
        if (a?.index > b?.index) return 1;
        if (a?.label < b?.label) return -1;
        if (a?.label > b?.label) return 1;
        return 0;
      });
  }, [options]);

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
    groupsOfOptions,
  };
};

export default DataService;
