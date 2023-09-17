import ImageService from "#/services/ImageService.js";
import "#/components/domain/home/css/home.components.css";
import RedirectionService from "#/services/RedirectionService.js";

const ProductCardContainer = ({ product }) => {
  const { findImage } = ImageService();
  const { redirectToProduct } = RedirectionService();
  const handleClick = () => {
    redirectToProduct(product?._id);
  };

  return (
    <div onClick={handleClick}>
      <div className="flex flex-col items-center justify-center p-2 ">
        <div className="w-40 h-48 relative ">
          <img
            src={findImage(product?._id, "PRD")}
            alt={product?.name}
            loading="lazy"
            className="rounded-2xl object-cover w-full h-full brightness-90"
          />
          <div className="h-16 flex flex-col items-center justify-end pb-3 absolute bottom-0 left-0 right-0  stared-shadow rounded-2xl">
            <h4
              className="font-semibold text-xs"
              style={{ color: "var(--gray-50)" }}
            >
              {product?.name}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardContainer;
