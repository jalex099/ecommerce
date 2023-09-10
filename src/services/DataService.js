import DataRepository from "#/repositories/DataRepository.js";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const DataService = () => {
  const { getData } = DataRepository();

  const { data, isLoading } = useQuery({
    queryKey: ["getData"],
    queryFn: getData,
    refetchOnWindowFocus: false,
  });

  const categories = useMemo(() => {
    return data?.data?.categories || [];
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

  return {
    categories,
    menu,
    company,
    carousel,
    isLoading,
  };
};

export default DataService;
