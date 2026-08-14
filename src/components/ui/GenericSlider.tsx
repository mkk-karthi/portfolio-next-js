"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState, useRef } from "react";

import PortfolioCard from "./PortfolioCard";
import { PortfolioItem } from "@/data/data";

type AllowedCard = PortfolioItem;

interface GenericSliderProps<T extends AllowedCard> {
  data: T[];
  slidesPerView: number;
  heightClass?: string;
  cardType?: "portfolio";
}

export function GenericSlider<T extends AllowedCard>({
  data,
  slidesPerView,
  heightClass,
}: GenericSliderProps<T>) {
  const [isClient, setIsClient] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <div
        className={`relative w-full flex flex-col justify-center items-center ${heightClass || ""}`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl">
          <div className="flex gap-4 overflow-x-auto">
            {data.slice(0, 3).map((item, index) => (
              <div key={index} className="shrink-0 w-full max-w-sm">
                <PortfolioCard {...item} priority={index === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full flex flex-col justify-center items-center ${heightClass || ""}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          centeredSlides={false}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 18,
            },
            850: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: slidesPerView,
              spaceBetween: 24,
            },
          }}
          className="pb-16!"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} className="flex! justify-center">
              <PortfolioCard
                {...item}
                priority={index === 0}
                onToggleDetails={(isOpen) => {
                  if (isOpen) {
                    swiperRef.current?.autoplay?.stop();
                  } else {
                    swiperRef.current?.autoplay?.start();
                  }
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
