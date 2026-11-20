import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-gray-50/50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-soft text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 text-brand-600 flex items-center justify-center text-3xl font-black">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            The page you are looking for may have moved, been renamed, or does not exist. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Popular Shortcuts */}
        <div className="pt-2 text-left space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Popular Destinations:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              href="/find-workers"
              className="p-2.5 rounded-xl bg-purple-50 text-brand-700 hover:bg-brand-600 hover:text-white transition flex items-center gap-1.5"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Find Workers</span>
            </Link>
            <Link
              href="/categories"
              className="p-2.5 rounded-xl bg-purple-50 text-brand-700 hover:bg-brand-600 hover:text-white transition flex items-center gap-1.5"
            >
              <Wrench className="h-3.5 w-3.5" />
              <span>All Services</span>
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition shadow-sm"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
