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

  const products = useMemo(() => {
    return data?.data?.products || [];
  }, [data]);

  const company = useMemo(() => {
    return data?.data?.company || [];
  }, [data]);

  const images = useMemo(() => {
    return data?.data?.images || [];
  }, [data]);

  const carousel = useMemo(() => {
    return data?.data?.carousel || [];
  }, [data]);

  return {
    categories,
    products,
    company,
    images,
    carousel,
    isLoading
  };
};

export default DataService;
