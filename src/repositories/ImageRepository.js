import API from "#/repositories/API.js";

const ImageRepository = () => {
  const getImages = async () => {
    return await API.get("/images");
  };

  return {
    getImages,
  };
};

export default ImageRepository;
