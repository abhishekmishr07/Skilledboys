"use client";

import React, { useEffect, useState, useRef } from "react";
import { STATS } from "@/lib/constants";
import { ShieldCheck, PhoneCall, Star, MapPin } from "lucide-react";

const ICONS = [ShieldCheck, PhoneCall, Star, MapPin];

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

    const duration = 1200;
    const interval = 20;
    const steps = duration / interval;

    const timers = STATS.map((stat, i) => {
      if (stat.target === 0) {
        setCounts((prev) => {
          const next = [...prev];
          next[i] = 0;
          return next;
        });
        return null;
      }

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

    return () => {
      timers.forEach((t) => t && clearInterval(t));
    };
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
                className="p-6 rounded-3xl bg-purple-50/40 hover:bg-purple-50 border border-purple-100/60 transition-all duration-300 text-center flex flex-col items-center group shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-brand-600 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                  {stat.prefix && <span className="text-brand-600 mr-0.5">{stat.prefix}</span>}
                  {displayValue}
                  {stat.suffix && <span className="text-brand-600 ml-0.5">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
                  {stat.label}
                </div>
                {stat.highlight && (
                  <div className="text-[11px] font-semibold text-brand-600 bg-white/90 border border-purple-100/80 px-2 py-0.5 rounded-full mt-2">
                    {stat.highlight}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
