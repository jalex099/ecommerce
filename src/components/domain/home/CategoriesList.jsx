import DataService from "#/services/DataService.js";
import ImageService from "#/services/ImageService.js";
import CategoriesListSkeleton from "#/components/shared/skeletons/CategoriesListSkeleton.jsx";
import { motion } from "framer-motion";
import { FADE_ANIMATION } from "#/config/constants";

const CategoriesList = () => {
  const { categories, isLoading: isLoadingData } = DataService();
  const { findImage, isLoading: isLoadingImages } = ImageService();
  if (isLoadingData || isLoadingImages) return <CategoriesListSkeleton />;
  return (
    <div className="container p-2 overflow-x-auto  flex flex-row gap-6 _no-scrollbar">
      {categories?.map((item, index) => {
        return (
          <motion.div
            key={index}
            initial={FADE_ANIMATION.initial}
            animate={FADE_ANIMATION.animate}
            transition={{
              duration:
                FADE_ANIMATION?.transition?.duration * ((index + 1) / 3) || 0,
            }}
            exit={FADE_ANIMATION.exit}
            className=" h-[64px] bg-red-500 px-8 py-2 rounded-2xl text-[12px] flex justify-center items-center flex-row gap-2 shadow"
            style={{ backgroundColor: "var(--surface-card)" }}
          >
            <img
              src={findImage(item?._id, "TAB")}
              alt=""
              className="w-6 h-6"
              loading="lazy"
            />
            <p>{item?.name}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CategoriesList;
