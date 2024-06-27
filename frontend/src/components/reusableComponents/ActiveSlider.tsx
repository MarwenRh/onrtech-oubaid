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

const ActiveSlider = () => {
  const [clients, setClients] = useState<client[]>();
  useEffect(() => {
    const getClients = async () => {
      const resp = await axios("http://localhost:5000/api/clients");
      setClients(resp.data.Clients);
    };
    getClients();
  }, []);
  return (
    <div className="flex items-center justify-center flex-col  ">
      <Swiper
        breakpoints={{
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
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Pagination, Navigation, Autoplay]}
        className="w-full md:w-10/12 h-full p-8 flex flex-col justify-between items-center "
      >
        {clients?.map((client) => (
          <SwiperSlide className="m-2" key={client.clientName}>
            <ClientCard
              clientName={client.clientName}
              companyLogo={client.companyLogo}
              description={client.description}
              joinDate={client.joinDate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
