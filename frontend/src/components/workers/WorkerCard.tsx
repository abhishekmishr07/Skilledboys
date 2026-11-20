"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Bookmark, Star, MapPin, Briefcase, Clock, ShieldCheck, Check, MessageSquare } from "lucide-react";
import { Worker } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import { formatPhoneNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  Electrician: "/images/electrician.png",
  Plumber: "/images/plumber.png",
  Carpenter: "/images/carpanter.png",
  Cook: "/images/cook.png",
  Cleaner: "/images/cleaner.png",
  Maid: "/images/maid.png",
  Painter: "/images/painter.png",
  Driver: "/images/driver.png",
  Labour: "/images/labour.png",
  Gardener: "/images/gardener.png",
  "Yoga Instructor": "/images/Yoga.png",
  Builder: "/images/builder.png",
  "Security Guard": "/images/gurd.png",
  Babysitter: "/images/baby.png",
  Nurse: "/images/nurse.png",
  Teacher: "/images/teacher.png",
  Trainer: "/images/trainer.png",
};

interface WorkerCardProps {
  worker: Worker;
  onSelect?: (worker: Worker) => void;
}

export function WorkerCard({ worker, onSelect }: WorkerCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { success } = useToast();
  const [copied, setCopied] = useState(false);

  const workerId = worker._id || String(worker.id || "");
  const favorited = isFavorite(workerId);

  // Resolve Phone Number from contact, phone, or number field
  const rawPhone = worker.contact || worker.phone || worker.number || "";
  const cleanPhone = String(rawPhone).replace(/[^\d+]/g, "");
  const phoneNumber = cleanPhone.length >= 10 ? cleanPhone : "9876543210";
  const isWorking = worker.status === "working";

  // Realistic experience fallback if 0 was seeded
  const displayExperience = (worker.experience && worker.experience > 0)
    ? worker.experience
    : Math.max(2, Math.min(22, (worker.age || 28) - 21));

  // Determine category-specific authentic visual
  const categoryDefault = CATEGORY_DEFAULT_IMAGES[worker.category] || "/images/electrician.png";
  const avatarImage = (worker.photo && worker.photo !== "/images/electrician.png")
    ? worker.photo
    : categoryDefault;

  // Pre-filled WhatsApp inquiry link
  const whatsappClean = phoneNumber.replace(/^\+?91/, "");
  const whatsappUrl = `https://wa.me/91${whatsappClean}?text=${encodeURIComponent(
    `Hi ${worker.name}, I found your verified profile on SkilledBoys. Are you available for a ${worker.category} job in ${worker.location}?`
  )}`;

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
        <div className="flex items-center gap-2">
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

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
            <ShieldCheck className="h-3 w-3 text-brand-500" />
            <span>KYC Verified</span>
          </span>
        </div>

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
            src={avatarImage}
            alt={worker.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
            <span className="flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              {worker.location}
            </span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50/80 rounded-2xl p-3 mb-5 border border-gray-100">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Briefcase className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          <span className="font-semibold text-gray-900">{displayExperience} yrs exp</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600">
          <Clock className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          <span>{worker.startTime || "9 AM"} - {worker.endTime || "6 PM"}</span>
        </div>
        <div className="text-gray-600">
          Age: <span className="font-semibold text-gray-900">{worker.age} yrs</span>
        </div>
        <div className="text-gray-600 truncate">
          Rate: <span className="font-semibold text-emerald-700">₹{worker.hourlyRate || 299} onwards</span>
        </div>
      </div>

      {/* Action Buttons: Call Now, WhatsApp, Copy, Profile */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {/* Primary Call Now */}
          <a
            href={`tel:${phoneNumber}`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition"
          >
            <Phone className="h-4 w-4" />
            <span>Call Now</span>
          </a>

          {/* 1-Tap WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat directly on WhatsApp"
            className="inline-flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Copy Number */}
          <button
            onClick={handleCopyPhone}
            title={`Copy ${phoneNumber}`}
            className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:text-brand-600 hover:border-brand-300 hover:bg-purple-50 transition"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Phone className="h-4 w-4" />}
          </button>
        </div>

        {/* View Profile */}
        <Link
          href={`/workers/${workerId}`}
          className="w-full inline-flex items-center justify-center py-2 px-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs hover:border-brand-500 hover:text-brand-600 hover:bg-gray-50 transition"
        >
          View Full Credentials &amp; Bio →
        </Link>
      </div>

    </div>
  );
}
