"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/services/api";
import { Worker } from "@/types";
import { WorkerCard } from "@/components/workers/WorkerCard";
import { WorkerFilter } from "@/components/workers/WorkerFilter";
import { WorkerCardSkeleton } from "@/components/common/LoadingSpinner";
import { ArrowLeft, AlertCircle, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";

function ResultsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialLocation = searchParams.get("location") || "";

  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWorkers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getWorkers({
        category: category || undefined,
        location: location || undefined,
        search: search || undefined,
        status: status || undefined,
      });
      setWorkers(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error loading workers from server.");
      }
    } finally {
      setLoading(false);
    }
  }, [category, location, search, status]);

  useEffect(() => {
    loadWorkers();
  }, [loadWorkers]);

  const handleReset = () => {
    setCategory("");
    setLocation("");
    setSearch("");
    setStatus("");
  };

  const pageTitle = `${category || "All"} Workers in ${location || "Your Area"}`;

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/find-workers"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-brand-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Search</span>
          </Link>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-brand-700">
            {loading ? "Searching..." : `${workers.length} Available`}
          </span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Showing verified skilled professionals ready for direct booking.
          </p>
        </div>

        {/* Filter Toolbar */}
        <WorkerFilter
          search={search}
          category={category}
          location={location}
          status={status}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onLocationChange={setLocation}
          onStatusChange={setStatus}
          onReset={handleReset}
        />

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <WorkerCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-red-100 shadow-soft max-w-lg mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Server Connection Issue</h3>
            <p className="text-sm text-gray-500 mb-6">{error}</p>
            <Button onClick={loadWorkers} variant="primary">
              Retry Search
            </Button>
          </div>
        ) : workers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-soft max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-brand-600 flex items-center justify-center text-2xl mx-auto mb-4">
              <Wrench className="h-7 w-7 text-brand-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Workers Found</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              No service professionals matched your search criteria. Try broadening your location or category filters.
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={handleReset} variant="outline">
                Clear Filters
              </Button>
              <Link href="/find-workers">
                <Button variant="primary">Explore Other Services</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map((worker) => (
              <WorkerCard key={worker._id || worker.id} worker={worker} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-20 text-center text-sm text-gray-500">
          Loading worker results...
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
