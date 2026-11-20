"use client";

import React, { useEffect, useState, useRef } from "react";
import { STATS } from "@/lib/constants";
import { Users, CheckCircle, Star, MapPin } from "lucide-react";

const ICONS = [Users, CheckCircle, Star, MapPin];

export function StatsSection() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1600;
    const interval = 20;
    const steps = duration / interval;

    const timers = STATS.map((stat, i) => {
      let current = 0;
      const stepValue = stat.target / steps;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const next = [...prev];
          next[i] = current;
          return next;
        });
      }, interval);

      return timer;
    });

    return () => timers.forEach(clearInterval);
  }, [started]);

  return (
    <section ref={sectionRef} className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat, index) => {
            const Icon = ICONS[index];
            const displayValue = stat.decimal
              ? counts[index].toFixed(stat.decimal)
              : Math.floor(counts[index]).toLocaleString();

            return (
              <div
                key={stat.label}
                className="p-6 rounded-3xl bg-purple-50/50 hover:bg-purple-50 border border-purple-100/60 transition-all duration-300 text-center flex flex-col items-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-600 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                  {displayValue}
                  <span className="text-brand-600">{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
