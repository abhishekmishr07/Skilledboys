import React from "react";
import { Search, PhoneCall, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "1",
      icon: Search,
      title: "1. Find Your Local Pro",
      desc: "Select the skill you need (Electrician, Plumber, Cleaner, Cook) and your neighborhood across Delhi NCR.",
      color: "bg-purple-100 text-brand-600",
      accent: "from-purple-500 to-indigo-500",
    },
    {
      num: "2",
      icon: PhoneCall,
      title: "2. Talk Directly (Call or WhatsApp)",
      desc: "No automated bots or booking queues. Check live availability, verify ratings, and speak to the technician directly.",
      color: "bg-amber-100 text-amber-700",
      accent: "from-amber-400 to-orange-500",
    },
    {
      num: "3",
      icon: CheckCircle2,
      title: "3. Job Done, 0% Commission",
      desc: "Agree on the work terms directly with the professional. Pay them in person with zero platform cuts or convenience charges.",
      color: "bg-emerald-100 text-emerald-700",
      accent: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-4 tracking-tight">
            How SkilledBoys Works
          </h2>
          <p className="text-gray-500 text-base mt-3 leading-relaxed">
            Finding trusted, verified skilled help in your city shouldn&apos;t take hours. Here is how simple we make it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center group"
              >
                {/* Step badge */}
                <div className="absolute -top-4 w-9 h-9 rounded-full bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-brand-600/30">
                  {step.num}
                </div>

                <div
                  className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 mt-2 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>

                {/* Connector line for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-brand-300 to-purple-200 z-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
