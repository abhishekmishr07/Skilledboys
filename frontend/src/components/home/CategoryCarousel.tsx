"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
    <section className="py-20 bg-purple-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-white px-3 py-1 rounded-full border border-purple-100 shadow-sm">
              Explore Our Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">
              Find Professionals for Every Job
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              From electricians to home cooks, connect with verified experts near you.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/categories"
              className="text-brand-600 font-bold text-sm hover:text-brand-700 inline-flex items-center gap-1.5 transition mr-2"
            >
              <span>View all services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full bg-white shadow-md border border-purple-100 flex items-center justify-center text-gray-700 hover:bg-brand-600 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full bg-white shadow-md border border-purple-100 flex items-center justify-center text-gray-700 hover:bg-brand-600 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scrollbar-none pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/results?category=${encodeURIComponent(cat.category)}`}
              className="group relative flex-shrink-0 w-72 sm:w-80 h-[320px] rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 snap-start block"
            >
              {/* Image */}
              <div className="absolute inset-0 bg-gray-900">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent flex flex-col justify-end p-6" />

              {/* Text info */}
              <div className="relative z-10 space-y-1">
                <span className="inline-block bg-brand-600/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mb-1">
                  {cat.badge}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-purple-300">
                  <span>{cat.count}</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-brand-600" : "w-2 bg-purple-200"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
