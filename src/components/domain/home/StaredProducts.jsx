import ImageService from "#/services/ImageService.js";
import DataService from "#/services/DataService.js";

const StaredProducts = () => {
  const { menu, isLoading } = DataService();
  console.log(menu)
  const { findImage } = ImageService();
  return (
    <div className="">
      <h4 className="font-semibold ">Popular</h4>
      <div className="p-2">
        {
          menu?.map((item, index) => {
            return (
              <div className="flex flex-col items-center justify-center p-2" key={index}>
                <div className="w-32 h-32">
                  <img
                    src={findImage(item?._id, "PRD")}
                    alt={item?.url}
                    loading="lazy"
                    className="rounded-2xl"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h4 className="font-semibold text-sm">{item?.name}</h4>
                  <h4 className="font-semibold text-sm">{item?.price}</h4>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default StaredProducts;
