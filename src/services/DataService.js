import DataRepository from "#/repositories/DataRepository.js";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const DataService = () => {
  const { getData } = DataRepository();

  const { data, isLoading } = useQuery({
    queryKey: ["getData"],
    queryFn: getData,
    refetchOnWindowFocus: true,
  });

  const categories = useMemo(() => {
    if (!data) return [];
    const categories = data?.categories;
    return categories;
  }, [data]);

  const products = useMemo(() => {
    if (!data) return [];
    const products = data?.products;
    return products;
  }, [data]);

  const company = useMemo(() => {
    if (!data) return null;
    const company = data?.company;
    return company;
  }, [data]);

  const images = useMemo(() => {
    if (!data) return [];
    const images = data?.images;
    return images;
  }, [data]);

  const carousel = useMemo(() => {
    if (!data) return [];
    const carousel = data?.images;
    return carousel;
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
