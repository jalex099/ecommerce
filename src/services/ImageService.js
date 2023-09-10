import ImageRepository from "#/repositories/ImageRepository";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const ImageService = () => {
  const { getImages } = ImageRepository();
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
    console.log(imageFound, id, type)
    return imageFound?.url;
  };

  return {
    images,
    isLoading,
    findImage,
  };
};

export default ImageService;
