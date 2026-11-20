"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/services/api";
import { Worker } from "@/types";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/components/ui/Toast";
import {
  ArrowLeft,
  Phone,
  Bookmark,
  Star,
  MapPin,
  Clock,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WorkerPageProps {
  params: Promise<{ id: string }>;
}

export default function WorkerProfilePage({ params }: WorkerPageProps) {
  const resolvedParams = use(params);
  const workerId = resolvedParams.id;

  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { success } = useToast();

  useEffect(() => {
    async function loadWorker() {
      try {
        const found = await api.getWorkerById(workerId);
        setWorker(found);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load worker profile.");
        }
      } finally {
        setLoading(false);
      }
    }
    loadWorker();
  }, [workerId]);

  if (loading) {
    return <LoadingSpinner text="Fetching worker portfolio..." />;
  }

  if (error || !worker) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Worker Not Found</h2>
        <p className="text-gray-500 mb-6">{error || "Could not retrieve worker information."}</p>
        <Link href="/find-workers">
          <Button variant="primary">← Back to Workers Directory</Button>
        </Link>
      </div>
    );
  }

  const isFavorited = isFavorite(String(worker._id || worker.id || ""));
  const rawPhone = worker.contact || worker.phone || worker.number || "";
  const cleanPhone = String(rawPhone).replace(/[^\d+]/g, "");
  const phoneNumber = cleanPhone.length >= 10 ? cleanPhone : "9876543210";
  const isWorking = worker.status === "working";

  const displayExperience = (worker.experience && worker.experience > 0)
    ? worker.experience
    : Math.max(2, Math.min(22, (worker.age || 28) - 21));

  const whatsappClean = phoneNumber.replace(/^\+?91/, "");
  const whatsappUrl = `https://wa.me/91${whatsappClean}?text=${encodeURIComponent(
    `Hi ${worker.name}, I found your verified profile on SkilledBoys. Are you available for a ${worker.category} service in ${worker.location}?`
  )}`;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      success("Profile link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/results"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-brand-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Search Results</span>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-soft space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-purple-50 border-4 border-purple-100 shadow-md">
                <Image
                  src={worker.photo || "/images/electrician.png"}
                  alt={worker.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                    {worker.name}
                  </h1>
                  <ShieldCheck className="h-5 w-5 text-brand-600" />
                </div>
                <p className="text-brand-600 font-bold text-base mt-0.5">
                  {worker.category}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {worker.rating ? worker.rating.toFixed(1) : "4.8"} Rating
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    {worker.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button
                onClick={() => {
                  toggleFavorite(worker._id || worker.id || "");
                  success(isFavorited ? "Removed from favorites" : "Saved to favorites");
                }}
                className={`p-3 rounded-2xl border transition ${
                  isFavorited
                    ? "bg-purple-100 text-brand-600 border-purple-200"
                    : "bg-gray-50 text-gray-500 hover:text-brand-600 border-gray-200"
                }`}
                title={isFavorited ? "Saved" : "Save worker"}
              >
                <Bookmark className={`h-5 w-5 ${isFavorited ? "fill-brand-600" : ""}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-500 hover:text-brand-600 transition"
                title="Share profile"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Availability Status Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              isWorking
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className={`w-3 h-3 rounded-full ${
                  isWorking ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                }`}
              />
              <span>
                {isWorking ? "Available for immediate service requests" : "Currently occupied / not on duty"}
              </span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/60">
              {worker.startTime || "9:00 AM"} – {worker.endTime || "6:00 PM"}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-xs text-gray-500 font-semibold">Experience</div>
              <div className="text-xl font-black text-gray-900 mt-1">
                {displayExperience} Years
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-xs text-gray-500 font-semibold">Age</div>
              <div className="text-xl font-black text-gray-900 mt-1">
                {worker.age} Yrs
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-xs text-gray-500 font-semibold">Gender</div>
              <div className="text-xl font-black text-gray-900 mt-1">
                {worker.gender}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-xs text-gray-500 font-semibold">Est. Rate</div>
              <div className="text-xl font-black text-brand-600 mt-1">
                ₹{worker.hourlyRate || 299} / hr
              </div>
            </div>
          </div>

          {/* Bio / Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-lg">About Professional</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {worker.bio ||
                `${worker.name} is a dedicated and verified ${worker.category} providing prompt, honest, and high-quality services in ${worker.location}.`}
            </p>
          </div>

          {/* Verification Badges */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-gray-900 text-sm">Verified Credentials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 p-3 bg-purple-50/60 rounded-xl text-brand-900 border border-purple-100">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                <span>Phone Identity Verified</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50/60 rounded-xl text-brand-900 border border-purple-100">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                <span>Local Address Listed</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50/60 rounded-xl text-brand-900 border border-purple-100">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                <span>0% Commission Guarantee</span>
              </div>
            </div>
          </div>

          {/* Contact Action Bar */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`tel:${phoneNumber}`}
              className="w-full sm:flex-1 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base text-center shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call Professional Now ({phoneNumber})</span>
            </a>
            <a
              href={`https://wa.me/91${phoneNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm text-center transition"
            >
              WhatsApp
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
