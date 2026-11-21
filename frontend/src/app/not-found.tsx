"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Search,
  Wrench,
  MapPin,
  HelpCircle,
  ArrowRight,
  Compass,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  // Client-side auto-recovery for legacy URLs and common typos
  useEffect(() => {
    if (typeof window === "undefined") return;

    const path = window.location.pathname.toLowerCase();

    // Map of legacy routes to modern canonical destinations
    const legacyRedirectMap: Record<string, string> = {
      "/landing": "/",
      "/landing.html": "/",
      "/skilled-workers-image": "/",
      "/area": "/areas",
      "/area.html": "/areas",
      "/areas.html": "/areas",
      "/category": "/categories",
      "/category.html": "/categories",
      "/categories.html": "/categories",
      "/result": "/find-workers",
      "/result.html": "/find-workers",
      "/results.html": "/find-workers",
      "/about.html": "/about",
      "/contact.html": "/contact",
      "/login.html": "/login",
      "/register.html": "/register",
      "/worker-login.html": "/worker-login",
      "/worker-register.html": "/worker-register",
      "/worker-dashboard.html": "/worker-dashboard",
    };

    if (legacyRedirectMap[path]) {
      setRedirecting(true);
      window.location.replace(legacyRedirectMap[path]);
      return;
    }

    if (path.endsWith(".html")) {
      const cleanPath = path.replace(/\.html$/, "");
      setRedirecting(true);
      window.location.replace(cleanPath);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/find-workers?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const quickServices = [
    { name: "Electrician", href: "/services/electrician" },
    { name: "Plumber", href: "/services/plumber" },
    { name: "Carpenter", href: "/services/carpenter" },
    { name: "Cleaner", href: "/services/cleaner" },
    { name: "Cook", href: "/services/cook" },
    { name: "Painter", href: "/services/painter" },
  ];

  const quickCities = [
    { name: "Noida", href: "/results?location=Noida" },
    { name: "Greater Noida", href: "/results?location=Greater+Noida" },
    { name: "Delhi NCR", href: "/results?location=Delhi" },
    { name: "Ghaziabad", href: "/results?location=Ghaziabad" },
    { name: "Gurgaon", href: "/results?location=Gurgaon" },
  ];

  if (redirecting) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50/50 py-16 px-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-gray-600">Redirecting to updated page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-gradient-to-b from-purple-50/40 via-white to-gray-50/30">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-12 border border-purple-100/80 shadow-card text-center space-y-8">
        
        {/* Badge & Code */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Compass className="h-3.5 w-3.5" />
            <span>Navigation Assistant</span>
          </div>
          <div className="text-6xl sm:text-7xl font-black text-brand-600 tracking-tight">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Looking for a SkilledBoys Page?
          </h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            The link you clicked may have moved or been updated as part of our recent platform upgrade. Let&apos;s help you find exactly what you need.
          </p>
        </div>

        {/* Instant Search Bar */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services or cities (e.g. Electrician in Noida)..."
              className="w-full h-13 pl-12 pr-28 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100 transition"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition shadow-sm"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Links Group */}
        <div className="space-y-4 pt-2 text-left border-t border-gray-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Popular Services:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickServices.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 text-brand-700 hover:bg-brand-600 hover:text-white text-xs font-semibold transition"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Active Service Hubs:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.href}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-brand-600 hover:text-white text-xs font-semibold transition flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  <span>{city.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
          <Link
            href="/"
            className="py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition shadow-sm"
          >
            <Home className="h-4 w-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            href="/find-workers"
            className="py-3 px-4 rounded-2xl bg-purple-50 hover:bg-purple-100 text-brand-700 font-bold text-xs inline-flex items-center justify-center gap-2 transition"
          >
            <Search className="h-4 w-4" />
            <span>Find Workers</span>
          </Link>
          <Link
            href="/contact"
            className="py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs inline-flex items-center justify-center gap-2 transition"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Contact Support</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
