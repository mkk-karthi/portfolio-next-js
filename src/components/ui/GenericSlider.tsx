"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  // Stable callback - prevents PortfolioCard from receiving a new prop reference
  // on every Swiper re-render, which would bust React.memo.
  const handleToggleDetails = useCallback((isOpen: boolean) => {
    if (isOpen) {
      swiperRef.current?.autoplay?.stop();
    } else {
      swiperRef.current?.autoplay?.start();
    }
  }, []);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  if (!isClient) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <div
        className={`relative w-full flex flex-col justify-center items-center ${heightClass || ""}`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl">
          <div className="flex gap-4 overflow-x-auto">
            {data.slice(0, 3).map((item) => (
              <div key={item.title} className="shrink-0 w-full max-w-sm">
                <PortfolioCard {...item} priority={false} />
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
      <div className="relative w-full px-2 sm:px-6 lg:px-8 max-w-7xl">
        {/* Previous Slide Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Project"
          title="Previous Project"
          className="absolute left-0 sm:left-1 lg:-left-4 top-1/2 -translate-y-1/2 -mt-6 z-30 size-10 sm:size-12 rounded-full bg-slate-900/90 dark:bg-slate-950/90 border border-slate-700/60 dark:border-sky-500/30 text-white flex items-center justify-center shadow-xl shadow-blue-950/50 hover:bg-linear-to-r hover:from-blue-600 hover:to-sky-500 hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl cursor-pointer group"
        >
          <ChevronLeft
            size={20}
            className="sm:size-6 text-slate-200 group-hover:text-white transition-transform group-hover:-translate-x-0.5"
          />
        </button>

        {/* Next Slide Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Project"
          title="Next Project"
          className="absolute right-0 sm:right-1 lg:-right-4 top-1/2 -translate-y-1/2 -mt-6 z-30 size-10 sm:size-12 rounded-full bg-slate-900/90 dark:bg-slate-950/90 border border-slate-700/60 dark:border-sky-500/30 text-white flex items-center justify-center shadow-xl shadow-blue-950/50 hover:bg-linear-to-r hover:from-blue-600 hover:to-sky-500 hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl cursor-pointer group"
        >
          <ChevronRight
            size={20}
            className="sm:size-6 text-slate-200 group-hover:text-white transition-transform group-hover:translate-x-0.5"
          />
        </button>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Autoplay, Keyboard]}
          keyboard={{ enabled: true, onlyInViewport: true }}
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
          {data.map((item) => (
            <SwiperSlide key={item.title} className="flex! justify-center">
              <PortfolioCard {...item} priority={false} onToggleDetails={handleToggleDetails} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
