
import DataService from "#/services/DataService.js";
import {Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import {Skeleton} from "primereact/skeleton";

// import required modules
import { Autoplay, Pagination, Navigation, EffectCreative } from 'swiper/modules';
const SliderComponent = () => {
  const { carousel, isLoading } = DataService();
  if (isLoading) {
    return <Skeleton width='100%' height='180px' borderRadius='16px'/>;
  }
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
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        }
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        }}
      style={{marginBottom: '24px'}}
    >
      {
        carousel?.map((item, index)=>{
          return (
            <SwiperSlide key={index}>
              <img src={item?.url} alt={item?.url} />
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  )
};


export default SliderComponent;
