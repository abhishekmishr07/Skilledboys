import React from "react";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { Testimonials } from "@/components/home/Testimonials";
import { ArrowRight, ShieldCheck, Zap, HeartHandshake } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Counter Section */}
      <StatsSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Category Carousel Section */}
      <CategoryCarousel />

      {/* Value Proposition Highlights */}
      <section className="py-20 bg-gradient-to-br from-brand-900 via-purple-950 to-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-900/60 border border-purple-700/50 px-3.5 py-1.5 rounded-full">
              Why SkilledBoys
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 tracking-tight">
              A Transparent Marketplace Built on Trust
            </h2>
            <p className="text-purple-200 text-base mt-2">
              We eliminate third-party agency cuts and connect you directly with hard-working local experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Zero Commission</h3>
              <p className="text-purple-200 text-sm leading-relaxed">
                Customers pay zero booking fees, and workers keep 100% of their hard-earned money. Direct calling with no middlemen.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Response</h3>
              <p className="text-purple-200 text-sm leading-relaxed">
                Emergency leakage or power trip? Our real-time status indicator shows workers who are on duty right now in your area.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-6">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Empowering Local Pros</h3>
              <p className="text-purple-200 text-sm leading-relaxed">
                We empower skilled workers with an online presence, verified credentials, and steady direct leads from households.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call To Action Banner */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-600 to-indigo-600 rounded-3xl p-8 sm:p-14 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Are You a Skilled Professional?
              </h2>
              <p className="text-purple-100 text-base leading-relaxed">
                Join thousands of verified electricians, plumbers, cooks, and cleaners getting direct daily client calls on SkilledBoys.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/worker-register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-brand-700 font-bold text-base hover:bg-gray-100 shadow-lg transition active:scale-95"
              >
                <span>Register for Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/find-workers"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition active:scale-95"
              >
                Find Workers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
