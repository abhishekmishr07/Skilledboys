import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TEAM_MEMBERS } from "@/lib/constants";
import { ShieldCheck, Zap, MapPin, Layers, Instagram, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Verified Workers",
      description: "Every service professional undergoes basic profile verification for customer peace of mind.",
      icon: ShieldCheck,
      color: "bg-purple-100 text-brand-600",
    },
    {
      title: "Fast Bookings",
      description: "Direct calling without wait times, ticket queues, or complex checkout workflows.",
      icon: Zap,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Nearby Services",
      description: "Find pros located in your immediate neighborhood for prompt arrival within minutes.",
      icon: MapPin,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "All-in-One Platform",
      description: "From household cleaners and cooks to electricians and carpenters, all in one place.",
      icon: Layers,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-700 text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-purple-200 border border-white/20">
            About SkilledBoys
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Bridging Customers &amp; Workers with Trust
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 font-medium max-w-2xl mx-auto leading-relaxed">
            Connecting you with trusted local service professionals in just one single click.
          </p>
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-purple-50 px-3.5 py-1.5 rounded-full">
              Our Story
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Why We Started SkilledBoys
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              SkilledBoys was created to solve a persistent real-world challenge: everyday families struggle to find trustworthy, verified local help, while hardworking skilled laborers lack a platform to build an online identity and receive direct job leads.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              By removing middleman markups and hidden agency charges, SkilledBoys creates a win-win: customers get instant service at fair rates, and local workers earn directly with dignity.
            </p>
          </div>

          <div className="bg-purple-50/70 rounded-3xl p-8 border border-purple-100 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Our Core Mission</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              To empower blue-collar and skilled trade workers across India with digital visibility, and to give households reliable, fast access to verified local talent safely and for free.
            </p>
            <div className="p-4 bg-white rounded-2xl border border-purple-100/80 shadow-sm flex items-center gap-3">
              <div className="text-2xl">🤝</div>
              <div className="text-xs font-semibold text-gray-700">
                &ldquo;काम कोई भी हो, सिर्फ़ एक क्लिक, और हर काम आसान।&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100">
              Platform Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
              Why Choose SkilledBoys
            </h2>
            <p className="text-gray-500 text-base mt-2">
              Everything we build is designed for speed, safety and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-3xl p-7 border border-gray-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${val.color} flex items-center justify-center mb-5`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-gray-500 text-base mt-2">
            The passionate team powering SkilledBoys and supporting local workforce development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft hover:shadow-card-hover transition-all duration-300 text-center flex flex-col items-center group"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-purple-100 shadow-md group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mt-0.5 mb-3">
                {member.role}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">
                {member.bio}
              </p>

              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-600 text-xs font-semibold hover:bg-pink-100 transition"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brand-600 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Experience SkilledBoys?
          </h2>
          <p className="text-purple-100 text-base max-w-xl mx-auto">
            Whether you need a quick repair at home or want to offer your services, connect with us today.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/find-workers"
              className="px-7 py-3.5 rounded-2xl bg-white text-brand-700 font-bold text-sm hover:bg-gray-100 transition shadow-lg"
            >
              Hire a Professional
            </Link>
            <Link
              href="/worker-register"
              className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition"
            >
              Join as a Worker
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
