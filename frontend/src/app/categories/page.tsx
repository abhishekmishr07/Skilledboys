"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return CATEGORIES;
    const query = search.toLowerCase();
    return CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.category.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Service Directory</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Worker Categories
          </h1>
          <p className="text-gray-500 text-base mt-2">
            Discover verified local experts across home, repair, wellness, transport and personal services.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative bg-white rounded-2xl shadow-soft border border-purple-100/80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search category (e.g. Electrician, Cook, Plumber, Yoga)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-soft max-w-md mx-auto">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No Categories Found</h3>
            <p className="text-sm text-gray-500">
              No service category matched &ldquo;{search}&rdquo;. Try another search keyword.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/results?category=${encodeURIComponent(cat.category)}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100/90 shadow-soft hover:shadow-card-hover hover:border-brand-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-gray-800 shadow-xs">
                        {cat.badge}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                        <Star className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
                        <span>4.9</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3.5 right-3.5">
                      <h3 className="font-black text-white text-lg tracking-tight drop-shadow-sm">
                        {cat.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-4">
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {cat.count}
                  </span>

                  <span className="w-7 h-7 rounded-full bg-purple-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-200 flex items-center justify-center">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
