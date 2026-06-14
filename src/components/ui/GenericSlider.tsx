'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

import PortfolioCard from './PortfolioCard';

import {
  PortfolioItem,
} from '@/data/data';

type AllowedCard = PortfolioItem;

interface GenericSliderProps<T extends AllowedCard> {
  data: T[];
  slidesPerView: number;
  heightClass?: string;
  cardType: 'portfolio';
}

export function GenericSlider<T extends AllowedCard>({
  data,
  slidesPerView,
  heightClass,
  cardType,
}: GenericSliderProps<T>) {
  const [isClient, setIsClient] = useState(false);
  const isPortfolio = cardType === 'portfolio';

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <div className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}>
        <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl">
          <div className="flex gap-4 overflow-x-auto">
            {data.slice(0, 3).map((item, index) => (
              <div key={index} className="flex-shrink-0 w-full max-w-sm">
                {cardType === 'portfolio' && 'image' in item && 'href' in item && 'desc' in item && (
                  <PortfolioCard
                    image={item.image}
                    title={item.title}
                    href={item.href}
                    github={item.github}
                    desc={item.desc}
                    priority={index === 0}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}>
      <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          centeredSlides={false}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: isPortfolio ? 1 : 2,
              spaceBetween: 18,
            },
            850: {
              slidesPerView: isPortfolio ? 1 : 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: isPortfolio ? 2 : Math.min(slidesPerView, 3),
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: isPortfolio ? 2 : slidesPerView,
              spaceBetween: 24,
            },
          }}
          className="!pb-16"
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              className="!flex justify-center"
            >
              {cardType === 'portfolio' && 'image' in item && 'desc' in item && (
                <PortfolioCard
                  image={item.image}
                  title={item.title}
                  href={item.href}
                  github={item.github}
                  desc={item.desc}
                  priority={index === 0}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}