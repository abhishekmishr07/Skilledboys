"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Bookmark, Star, MapPin, Briefcase, Clock, ShieldCheck, Check } from "lucide-react";
import { Worker } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import { formatPhoneNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface WorkerCardProps {
  worker: Worker;
  onSelect?: (worker: Worker) => void;
}

export function WorkerCard({ worker, onSelect }: WorkerCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { success } = useToast();
  const [copied, setCopied] = useState(false);

  const workerId = worker._id || worker.id || "";
  const favorited = isFavorite(workerId);
  const phoneNumber = worker.phone || worker.number || "";
  const isWorking = worker.status === "working";

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(workerId);
    success(
      favorited
        ? `${worker.name} removed from your saved list.`
        : `${worker.name} saved to your favorites!`
    );
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phoneNumber) {
      navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      success(`Phone number copied: ${phoneNumber}`);
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      
      {/* Top row: Status & Bookmark */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            isWorking
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isWorking ? "bg-emerald-500 animate-pulse" : "bg-red-400"
            }`}
          />
          {isWorking ? "Available Now" : "Currently Busy"}
        </span>

        <button
          onClick={handleBookmark}
          aria-label={favorited ? "Remove bookmark" : "Save worker"}
          className={`p-2 rounded-xl border transition ${
            favorited
              ? "bg-purple-100 text-brand-600 border-purple-200"
              : "bg-gray-50 text-gray-400 hover:text-brand-600 hover:bg-purple-50 border-gray-200/60"
          }`}
        >
          <Bookmark className={`h-4 w-4 ${favorited ? "fill-brand-600" : ""}`} />
        </button>
      </div>

      {/* Main Info */}
      <div className="flex items-start gap-4 mb-5">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-purple-50 border-2 border-purple-200 flex-shrink-0">
          <Image
            src={worker.photo || "/images/electrician.png"}
            alt={worker.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-gray-900 text-lg truncate">
              {worker.name}
            </h3>
            <ShieldCheck className="h-4 w-4 text-brand-600 flex-shrink-0" />
          </div>

          <p className="text-brand-600 font-semibold text-sm mt-0.5">
            {worker.category}
          </p>

          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
            <span className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {worker.rating ? worker.rating.toFixed(1) : "4.8"}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {worker.location}
            </span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50/80 rounded-2xl p-3 mb-5 border border-gray-100">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Briefcase className="h-3.5 w-3.5 text-gray-400" />
          <span>{worker.experience || 0} yrs exp</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600">
          <Clock className="h-3.5 w-3.5 text-gray-400" />
          <span>{worker.startTime || "9 AM"} - {worker.endTime || "6 PM"}</span>
        </div>
        <div className="text-gray-600">
          Age: <span className="font-semibold text-gray-900">{worker.age} yrs</span>
        </div>
        <div className="text-gray-600">
          Gender: <span className="font-semibold text-gray-900">{worker.gender}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <a
          href={`tel:${phoneNumber}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition"
        >
          <Phone className="h-4 w-4" />
          <span>Call Now</span>
        </a>

        <button
          onClick={handleCopyPhone}
          title="Copy phone number"
          className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:text-brand-600 hover:border-brand-300 hover:bg-purple-50 transition"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Phone className="h-4 w-4" />}
        </button>

        <Link
          href={`/workers/${workerId}`}
          className="py-3 px-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:border-brand-500 hover:text-brand-600 transition"
        >
          Profile
        </Link>
      </div>

    </div>
  );
}
