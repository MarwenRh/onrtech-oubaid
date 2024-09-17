import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

import ClientCard from "./ClientCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { client } from "../../types/types";
import { Loader } from "../loader/Loader";
type Props = {
  autoplayState: boolean;
};

const ActiveSlider = ({ autoplayState }: Props) => {
  const [clients, setClients] = useState<client[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getClients = async () => {
      const resp = await axios(
        `${import.meta.env.VITE_APP_API_BASE_URL}/clients`
      );
      setLoading(false);
      setClients(resp.data.Clients);
    };
    getClients();
  }, []);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center flex-col text-center">
          <Swiper
            breakpoints={{
              default: {
                slidesPerView: 2,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3,
              },
              // when window width is >= 1280px
              1280: {
                slidesPerView: 4,
              },
              // when window width is >= 1440px
              // 1440: {
              //   slidesPerView: 5,
              // },
            }}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            autoplay={autoplayState ? { delay: 1500 } : false}
            modules={[FreeMode, Pagination, Navigation, Autoplay]}
            className="w-full md:w-10/12 h-full p-8 flex flex-col justify-between items-center "
          >
            {clients?.map((client, index) => (
              <SwiperSlide className="m-2" key={index}>
                <ClientCard client={client} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ActiveSlider;
