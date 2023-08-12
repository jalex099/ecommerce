import DataService from "#/services/DataService.js";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { Skeleton } from "primereact/skeleton";

// import required modules
import {
  Autoplay,
  EffectCreative,
  Navigation,
  Pagination,
} from "swiper/modules";
import { useNavigate } from "react-router-dom";

const SliderComponent = () => {
  const { carousel, categories, isLoading } = DataService();
  const navigate = useNavigate();

  const handleClickSlide = (data) => {
    const { reference } = data;
    const selectedCategory = categories.find((item) => item?.id === reference);
    if (!selectedCategory) return;
    const { id, name } = selectedCategory;
    navigate(`/category/${id}/${name}`);
  };

  if (isLoading) {
    return <Skeleton width="100%" height="180px" borderRadius="16px" />;
  }
  if(!carousel) return (<></>)
  return (
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
      style={{ marginBottom: "24px" }}
    >
      {carousel?.map((item, index) => {
        return (
          <SwiperSlide key={index} onClick={() => handleClickSlide(item)}>
            <img src={item?.url} alt={item?.url} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SliderComponent;
