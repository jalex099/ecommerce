import DataService from "#/services/DataService.js";
import ProductCardContainer from "#/components/domain/home/ProductCardContainer.jsx";

const StaredProducts = () => {
  const { menu } = DataService();
  return (
    <div className="">
      <h4 className="font-semibold ">Popular</h4>
      <div className="p-2 grid grid-cols-2 gap-2">
        {
          menu
            ?.slice(0, 4)
            ?.map((item, index) => {
            return (
              <ProductCardContainer key={index} product={item}/>
            );
          })
        }
      </div>
    </div>
  );
};


export default StaredProducts;
