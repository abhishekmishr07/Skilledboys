"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "@/services/api";
import { Worker } from "@/types";
import { WorkerCard } from "@/components/workers/WorkerCard";
import { WorkerCardSkeleton } from "@/components/common/LoadingSpinner";
import { Search, MapPin, Wrench, RotateCcw, AlertCircle, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

const POPULAR_CATEGORIES = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Cook",
  "Cleaner",
  "Painter",
  "Driver",
  "Maid",
  "Labour",
  "Gardener",
];

const POPULAR_CITIES = [
  "Noida",
  "Delhi",
  "Greater Noida",
  "Gurgaon",
  "Ghaziabad",
  "Mumbai",
  "Bengaluru",
  "Lucknow",
];

export default function FindWorkersPage() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [allWorkers, setAllWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load: Fetch all workers once and cache in memory for 0ms client-side filtering
  const loadWorkers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getWorkers();
      setAllWorkers(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load workers from the server.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorkers();
  }, [loadWorkers]);

  // Instant reactive client-side filter
  const filteredWorkers = useMemo(() => {
    return allWorkers.filter((w) => {
      if (category) {
        const catLower = category.toLowerCase();
        const wCatLower = (w.category || "").toLowerCase();
        if (catLower === "cleaner") {
          if (!wCatLower.includes("clean") && !wCatLower.includes("maid")) return false;
        } else if (catLower === "cook") {
          if (!wCatLower.includes("cook") && !wCatLower.includes("chef")) return false;
        } else if (!wCatLower.includes(catLower)) {
          return false;
        }
      }

      if (location) {
        const locLower = location.toLowerCase();
        const wLocLower = (w.location || "").toLowerCase();
        if (!wLocLower.includes(locLower)) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = (w.name || "").toLowerCase().includes(q);
        const matchesCategory = (w.category || "").toLowerCase().includes(q);
        const matchesLocation = (w.location || "").toLowerCase().includes(q);
        const matchesBio = (w.bio || "").toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesLocation && !matchesBio) return false;
      }

      return true;
    });
  }, [allWorkers, category, location, searchQuery]);

  const handleReset = () => {
    setCategory("");
    setLocation("");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Discover Local Experts</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Find Trusted Local Workers
          </h1>
          <p className="text-gray-500 text-base mt-2">
            Select your skill category and location to connect directly with available service professionals.
          </p>
        </div>

        {/* Search & Filter Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-900/5 border border-purple-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search query */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by worker name, skill, area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-2xl border border-gray-200 focus:border-brand-500 focus:bg-white text-sm outline-none transition"
              />
            </div>

            {/* Category dropdown */}
            <div className="relative">
              <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 pl-12 pr-8 bg-gray-50 rounded-2xl border border-gray-200 focus:border-brand-500 focus:bg-white text-sm outline-none transition cursor-pointer appearance-none"
              >
                <option value="">All Service Categories</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Cook">Cook / Chef</option>
                <option value="Cleaner">Home Cleaner</option>
                <option value="Painter">Painter</option>
                <option value="Driver">Driver</option>
                <option value="Maid">Maid / Housekeeper</option>
                <option value="Labour">Labour / Helper</option>
                <option value="Gardener">Gardener</option>
                <option value="Yoga Instructor">Yoga Instructor</option>
              </select>
            </div>

            {/* Location dropdown */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 pl-12 pr-8 bg-gray-50 rounded-2xl border border-gray-200 focus:border-brand-500 focus:bg-white text-sm outline-none transition cursor-pointer appearance-none"
              >
                <option value="">All Locations</option>
                <option value="Noida">Noida</option>
                <option value="Delhi">Delhi</option>
                <option value="Greater Noida">Greater Noida</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Ghaziabad">Ghaziabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Jaipur">Jaipur</option>
              </select>
            </div>

          </div>

          {/* Quick Category Chips */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Quick Filter:
            </span>
            {POPULAR_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(category === cat ? "" : cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                  category === cat
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-brand-700"
                }`}
              >
                {cat}
              </button>
            ))}

            {(category || location || searchQuery) && (
              <button
                type="button"
                onClick={handleReset}
                className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset ({filteredWorkers.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Title & Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {category || "All"} Professionals {location ? `in ${location}` : ""}
          </h2>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-brand-700">
            {loading ? "Searching..." : `${filteredWorkers.length} verified found`}
          </span>
        </div>

        {/* Worker Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <WorkerCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-red-100 shadow-soft max-w-lg mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Failed to Connect to Server</h3>
            <p className="text-sm text-gray-500 mb-6">{error}</p>
            <Button onClick={loadWorkers} variant="primary">
              Retry Connection
            </Button>
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-soft max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-brand-600 flex items-center justify-center text-2xl mx-auto mb-4">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Workers Found</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              We couldn&apos;t find any verified professionals matching your current search criteria. Try choosing a different location or clearing filters.
            </p>
            <Button onClick={handleReset} variant="outline">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => (
              <WorkerCard key={worker._id || String(worker.id)} worker={worker} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
