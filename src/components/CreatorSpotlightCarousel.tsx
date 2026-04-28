"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { generateAvatarUrl } from "@/utils/imageUtils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface SpotlightCreator {
  username: string;
  displayName: string;
  category: string;
  bio: string;
  followers: number;
  totalTips: number;
  currency?: string;
}

interface CreatorSpotlightCarouselProps {
  creators: SpotlightCreator[];
  autoplayDelay?: number;
  className?: string;
}

function CreatorSlide({ creator }: { creator: SpotlightCreator }) {
  return (
    <Link
      href={`/creator/${creator.username}`}
      className="group block rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 transition hover:border-wave/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50"
      aria-label={`View ${creator.displayName}'s profile`}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary-500/30">
          <Image
            src={generateAvatarUrl(creator.username)}
            alt={`${creator.displayName} avatar`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-wave font-medium">
            {creator.category}
          </p>
          <p className="mt-0.5 text-base font-bold text-ink group-hover:text-wave transition-colors">
            {creator.displayName}
          </p>
          <p className="mt-1 text-xs text-ink/60 line-clamp-2">{creator.bio}</p>
        </div>

        <div className="flex gap-4 text-center">
          <div>
            <p className="text-sm font-semibold text-ink">
              {creator.followers.toLocaleString()}
            </p>
            <p className="text-[10px] text-ink/40">followers</p>
          </div>
          <div className="w-px bg-ink/10" />
          <div>
            <p className="text-sm font-semibold text-primary-600">
              {creator.totalTips.toLocaleString()} {creator.currency ?? "XLM"}
            </p>
            <p className="text-[10px] text-ink/40">tips received</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CreatorSpotlightCarousel({
  creators,
  autoplayDelay = 4000,
  className = "",
}: CreatorSpotlightCarouselProps) {
  const prefersReduced = useReducedMotion();

  if (!creators.length) return null;

  return (
    <motion.section
      className={className}
      aria-labelledby="spotlight-heading"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.35 }}
    >
      <h2
        id="spotlight-heading"
        className="mb-4 text-xl font-semibold text-ink"
      >
        Creator Spotlight
      </h2>

      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={
          prefersReduced
            ? false
            : { delay: autoplayDelay, pauseOnMouseEnter: true, disableOnInteraction: false }
        }
        navigation
        pagination={{ clickable: true }}
        a11y={{ enabled: true }}
        className="pb-10"
      >
        {creators.map((creator) => (
          <SwiperSlide key={creator.username}>
            <CreatorSlide creator={creator} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}
