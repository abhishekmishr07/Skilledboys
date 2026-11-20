import React from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100">
            Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-4 tracking-tight">
            Trusted by Thousands Across India
          </h2>
          <p className="text-gray-500 text-base mt-2">
            See what customers and service partners have to say about the SkilledBoys experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="relative bg-purple-50/40 hover:bg-purple-50/80 rounded-3xl p-7 border border-purple-100/70 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <Quote className="h-8 w-8 text-brand-200 mb-3" />

              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-purple-100/60">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${review.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md`}
                >
                  {review.initial}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-none">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
