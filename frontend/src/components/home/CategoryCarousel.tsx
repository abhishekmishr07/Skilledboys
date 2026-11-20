"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    const cardWidth = 320;
    setActiveIndex(Math.round(scrollLeft / cardWidth));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const distance = 340;
    trackRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  const scrollToSlide = (idx: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollTo({
      left: idx * 340,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50/40 via-white to-purple-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2 border border-purple-200/60 shadow-xs">
              <span>Verified Local Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Find Professionals for Every Job
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1.5 max-w-xl">
              Connect directly with verified electricians, plumbers, cooks, carpenters, and everyday experts near you.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/categories"
              className="text-brand-600 font-bold text-sm hover:text-brand-700 inline-flex items-center gap-1.5 transition mr-2 group"
            >
              <span>View all services</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous categories"
              className="w-10 h-10 rounded-full bg-white shadow-soft border border-purple-100 flex items-center justify-center text-gray-700 hover:bg-brand-600 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-700 transition duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next categories"
              className="w-10 h-10 rounded-full bg-white shadow-soft border border-purple-100 flex items-center justify-center text-gray-700 hover:bg-brand-600 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-700 transition duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-5 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/results?category=${encodeURIComponent(cat.category)}`}
              className="group relative flex-shrink-0 w-72 sm:w-80 h-[380px] rounded-3xl bg-white border border-gray-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(109,40,217,0.18)] hover:border-purple-300 hover:-translate-y-1.5 transition-all duration-300 snap-start flex flex-col overflow-hidden"
            >
              {/* Photo Frame */}
              <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 288px, 320px"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-black/20" />

                {/* Glassmorphic Category Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold shadow-sm border border-white/60">
                    {cat.badge}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3.5 right-3.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-900/85 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    <span>4.9</span>
                  </span>
                </div>

                {/* Bottom title highlight on photo */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-black text-white drop-shadow-sm tracking-tight leading-snug">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Card Body & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Card Footer Bar */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-gray-700">
                      {cat.count}
                    </span>
                  </div>

                  <span className="w-8 h-8 rounded-full bg-purple-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-xs group-hover:shadow-sm">
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-brand-600" : "w-2 bg-purple-200 hover:bg-purple-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
