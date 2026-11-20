"use client";

import React from "react";
import { Search, MapPin, Wrench, RotateCcw, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WorkerFilterProps {
  search: string;
  category: string;
  location: string;
  status: string;
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onReset: () => void;
}

export function WorkerFilter({
  search,
  category,
  location,
  status,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
  onStatusChange,
  onReset,
}: WorkerFilterProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 mb-8">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 font-bold text-gray-900 text-base">
          <Filter className="h-5 w-5 text-brand-600" />
          <span>Filters &amp; Search</span>
        </div>
        {(search || category || location || status) && (
          <button
            onClick={onReset}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by worker name, keyword..."
            className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white rounded-2xl text-sm transition outline-none"
          />
        </div>

        {/* Category select */}
        <div className="relative">
          <Wrench className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full h-12 pl-10 pr-8 bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white rounded-2xl text-sm transition outline-none cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Cook">Cook / Chef</option>
            <option value="Cleaner">Home Cleaner</option>
            <option value="Painter">Painter</option>
            <option value="Driver">Driver</option>
            <option value="Maid">Maid</option>
            <option value="Labour">Labour</option>
            <option value="Gardener">Gardener</option>
            <option value="Yoga Instructor">Yoga Instructor</option>
          </select>
        </div>

        {/* Location select */}
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full h-12 pl-10 pr-8 bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white rounded-2xl text-sm transition outline-none cursor-pointer"
          >
            <option value="">All Locations</option>
            <option value="Delhi">Delhi</option>
            <option value="Noida">Noida</option>
            <option value="Greater Noida">Greater Noida</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Ghaziabad">Ghaziabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Patna">Patna</option>
          </select>
        </div>

        {/* Availability Status */}
        <div>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white rounded-2xl text-sm transition outline-none cursor-pointer"
          >
            <option value="">Any Status</option>
            <option value="working">🟢 Available Now</option>
            <option value="not working">🔴 Currently Busy</option>
          </select>
        </div>
      </div>
    </div>
  );
}
