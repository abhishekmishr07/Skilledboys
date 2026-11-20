"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
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
          <div className="relative bg-white rounded-2xl shadow-md border border-purple-100">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/results?category=${encodeURIComponent(cat.category)}`}
                className="group bg-white rounded-3xl p-5 border border-gray-100/90 shadow-soft hover:shadow-card-hover hover:border-brand-400 hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center justify-between"
              >
                <div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 rounded-2xl bg-purple-50 p-2 flex items-center justify-center group-hover:bg-purple-100 group-hover:scale-105 transition duration-300">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-brand-600 transition">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                    {cat.count}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-50 w-full flex items-center justify-center gap-1 text-[11px] font-bold text-brand-600 group-hover:text-brand-700">
                  <span>Find Pros</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
