"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Wrench, Hammer, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ServiceRate {
  task: string;
  price: string;
  timeEstimate: string;
}

interface TradeRates {
  id: string;
  trade: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: ServiceRate[];
  browseCategory: string;
}

const TRADES: TradeRates[] = [
  {
    id: "electrical",
    trade: "Electrical",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
    browseCategory: "Electrician",
    items: [
      { task: "Switchboard / Socket Repair", price: "₹99 onwards", timeEstimate: "20-30 min" },
      { task: "Ceiling Fan Install / Repair", price: "₹149 onwards", timeEstimate: "30-40 min" },
      { task: "MCB Trip / Fuse Wire Fix", price: "₹199 onwards", timeEstimate: "30-45 min" },
      { task: "Inverter / Appliance Wiring", price: "₹299 onwards", timeEstimate: "45-60 min" },
    ],
  },
  {
    id: "plumbing",
    trade: "Plumbing",
    icon: Wrench,
    color: "from-blue-500 to-indigo-500",
    browseCategory: "Plumber",
    items: [
      { task: "Tap Repair / Leakage Fix", price: "₹149 onwards", timeEstimate: "20-30 min" },
      { task: "Basin / Sink Waste Pipe Fix", price: "₹199 onwards", timeEstimate: "30-45 min" },
      { task: "Toilet Flush Valve Repair", price: "₹249 onwards", timeEstimate: "30-45 min" },
      { task: "Water Tank Float Ball Valve", price: "₹299 onwards", timeEstimate: "45-60 min" },
    ],
  },
  {
    id: "carpentry",
    trade: "Carpentry",
    icon: Hammer,
    color: "from-amber-700 to-yellow-800",
    browseCategory: "Carpenter",
    items: [
      { task: "Door Lock / Latch Fitting", price: "₹199 onwards", timeEstimate: "30-40 min" },
      { task: "Cupboard Hinge / Drawer Channel", price: "₹149 onwards", timeEstimate: "20-30 min" },
      { task: "Bed / Dining Table Repair", price: "₹249 onwards", timeEstimate: "40-60 min" },
      { task: "Curtain Rod & Wall Drilling", price: "₹120 onwards", timeEstimate: "20-30 min" },
    ],
  },
  {
    id: "cleaning",
    trade: "Home Cleaning",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    browseCategory: "Cleaner",
    items: [
      { task: "Bathroom Deep Descaling", price: "₹399 onwards", timeEstimate: "60-90 min" },
      { task: "Kitchen Deep Degreasing", price: "₹499 onwards", timeEstimate: "60-90 min" },
      { task: "Sofa / Mattress Shampooing", price: "₹349 onwards", timeEstimate: "45-60 min" },
      { task: "Balcony / Floor Scrubbing", price: "₹299 onwards", timeEstimate: "40-60 min" },
    ],
  },
];

export function RateCardSection() {
  const [activeTrade, setActiveTrade] = useState("electrical");

  const currentTrade = TRADES.find((t) => t.id === activeTrade) || TRADES[0];
  const Icon = currentTrade.icon;

  return (
    <section className="py-20 bg-gray-50/70 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Price Transparency</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Indicative Local Service Rates
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Standard market reference rates across Delhi NCR. No platform markups, no hidden inspection surcharges.
          </p>
        </div>

        {/* Trade Tab Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {TRADES.map((trade) => {
            const TradeIcon = trade.icon;
            const isSelected = trade.id === activeTrade;
            return (
              <button
                key={trade.id}
                type="button"
                onClick={() => setActiveTrade(trade.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/70 shadow-2xs"
                }`}
              >
                <TradeIcon className="h-4 w-4" />
                <span>{trade.trade}</span>
              </button>
            );
          })}
        </div>

        {/* Rates Display Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-purple-100/80 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentTrade.color} text-white flex items-center justify-center shadow-md`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  {currentTrade.trade} Rate Benchmark
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Verified Delhi NCR market reference rates
                </p>
              </div>
            </div>

            <Link
              href={`/results?category=${encodeURIComponent(currentTrade.browseCategory)}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-brand-700 hover:bg-brand-600 hover:text-white font-bold text-xs transition"
            >
              <span>View {currentTrade.browseCategory}s Near You</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Rate Items Table / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentTrade.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-purple-200 transition flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{item.task}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 pl-5">
                    Est. Time: {item.timeEstimate}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-brand-700 bg-purple-100/70 px-2.5 py-1 rounded-lg">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Transparency Notice */}
          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
            <span className="flex items-center gap-1 text-gray-600">
              <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              Direct payment to technician. SkilledBoys charges ₹0 fee to you or the worker.
            </span>
            <span className="text-[11px] text-gray-400">
              *Prices exclude spare parts and heavy materials.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
