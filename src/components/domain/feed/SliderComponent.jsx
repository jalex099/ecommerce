import DataService from "#/services/DataService.js";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { FADE_ANIMATION } from "#/config/constants";

// import required modules
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCreative,
} from "swiper/modules";
import ImageService from "#/services/ImageService.js";
import { useNavigate } from "react-router-dom";

function SliderComponent() {
  const { carousel, categories, isLoading } = DataService();
  const { findImage } = ImageService();
  const navigate = useNavigate();

  const handleClickSlide = (data) => {
    const { reference } = data;
    const selectedCategory = categories.find((item) => item?.id === reference);
    if (!selectedCategory) return;
    const { id, name } = selectedCategory;
    navigate(`/category/${id}/${name}`);
  };

  if (carousel?.length === 0) return <></>;
  return (
    <motion.div
      initial={FADE_ANIMATION.initial}
      animate={FADE_ANIMATION.animate}
      transition={FADE_ANIMATION.transition}
      exit={FADE_ANIMATION.exit}
    >
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination, Autoplay, EffectCreative, Navigation]}
        navigation={true}
        loop={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {carousel?.map((item, index) => {
          return (
            <SwiperSlide key={index} onClick={() => handleClickSlide(item)}>
              <img
                src={findImage(item?._id, "BNR")}
                alt={item?.url}
                loading="lazy"
                className="rounded-2xl"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
}

export default SliderComponent;
