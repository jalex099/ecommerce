import ImageService from "#/services/ImageService.js";

const Logo = () => {
  const { findLogo } = ImageService();
  return (
      <img src={findLogo()} alt="logo" className="rounded-full h-12 w-12"/>
  );
}

export default Logo;