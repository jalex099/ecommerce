import ImageRepository from "#/repositories/ImageRepository";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import DataService from "#/services/DataService.js";

const ImageService = () => {
  const { getImages } = ImageRepository();
  const { company } = DataService();
  const { data, isLoading } = useQuery({
    queryKey: ["getImages"],
    queryFn: getImages,
    refetchOnWindowFocus: false,
  });

  const images = useMemo(() => {
    return data?.data;
  }, [data]);

  const findImage = (id, type) => {
    const imageFound = images?.find(
      (image) => image?.reference == id && image?.type === type
    );
    return imageFound?.url;
  };

  const findCollection = (id, type) => {
    const collection = images?.filter(
      (image) => image?.reference == id && image?.type === type
    );
    return collection;
  };

  const findLogo = () => {
    const logo = images?.find(
      (image) => image?.type === "LOG" && image?.reference == company?._id
    );
    return logo?.url;
  };

  return {
    images,
    isLoading,
    findImage,
    findCollection,
    findLogo,
  };
};

export default ImageService;
