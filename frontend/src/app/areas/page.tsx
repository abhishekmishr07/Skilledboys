"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { CITIES } from "@/lib/constants";

export default function AreasPage() {
  const [search, setSearch] = useState("");

  const filteredCities = useMemo(() => {
    if (!search.trim()) return CITIES;
    const query = search.toLowerCase();
    return CITIES.filter(
      (city) =>
        city.name.toLowerCase().includes(query) ||
        city.tag.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Pan-India Presence</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Our Service Areas
          </h1>
          <p className="text-gray-500 text-base mt-2">
            SkilledBoys is rapidly growing across Tier 1 and Tier 2 cities in India. Click on your city to find local service pros.
          </p>
        </div>

        {/* City Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative bg-white rounded-2xl shadow-md border border-purple-100">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for your city (e.g. Noida, Delhi, Mumbai, Lucknow)..."
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

        {/* Cities Grid */}
        {filteredCities.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-soft max-w-md mx-auto">
            <p className="text-4xl mb-3">🏙️</p>
            <h3 className="text-lg font-bold text-gray-900 mb-1">City Not Listed Yet</h3>
            <p className="text-sm text-gray-500">
              We haven&apos;t officially launched in &ldquo;{search}&rdquo; yet, but we are expanding fast! Check nearby metro areas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCities.map((city) => (
              <Link
                key={city.name}
                href={`/results?location=${encodeURIComponent(city.tag)}`}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-500 block bg-gray-900"
              >
                {/* Background Image */}
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent flex flex-col justify-end p-6" />

                {/* City Card Content */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 bg-purple-950/70 backdrop-blur-md px-2.5 py-1 rounded-full mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{city.workersCount}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-purple-200 transition">
                    {city.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-xs font-bold text-brand-400 group-hover:text-purple-300">
                    <span>View Available Workers</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
