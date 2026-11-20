"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MapPin, Wrench, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const TYPED_STRINGS = [
  "Electricians",
  "Plumbers",
  "Carpenters",
  "Home Cleaners",
  "Cooks & Chefs",
  "Drivers",
  "Painters",
];

export function HeroSection() {
  const router = useRouter();
  const [typedIndex, setTypedIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Typing effect
  useEffect(() => {
    const fullText = TYPED_STRINGS[typedIndex % TYPED_STRINGS.length];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setTypedIndex((prev) => prev + 1);
      } else {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typedIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedLocation) params.append("location", selectedLocation);
    router.push(`/results${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/70 via-white to-purple-50/30 pt-10 pb-16 lg:py-20">
      
      {/* Decorative blurred backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-300/20 to-purple-400/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-brand-700 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Free Direct Connect • No Commission</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.12] tracking-tight">
              Find Trusted <br className="hidden sm:inline" />
              <span className="text-brand-600 inline-block min-w-[280px]">
                {currentText}
                <span className="animate-pulse text-brand-500 font-normal">|</span>
              </span>
              <br />
              <span className="text-gray-900">Near You.</span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Connect with verified local professionals for all everyday home and business needs — in one single click.
              <br />
              <span className="text-gray-800 font-medium italic mt-1 block">
                &ldquo;काम कोई भी हो, सिर्फ़ एक क्लिक, और हर काम आसान।&rdquo;
              </span>
            </p>

            {/* Quick Search Card */}
            <form
              onSubmit={handleSearch}
              className="bg-white p-3.5 sm:p-4 rounded-3xl shadow-xl shadow-purple-900/5 border border-purple-100 flex flex-col sm:flex-row gap-3 max-w-2xl"
            >
              <div className="relative flex-1">
                <Wrench className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-gray-50 hover:bg-gray-100/80 focus:bg-white rounded-2xl border border-transparent focus:border-brand-500 text-sm font-medium text-gray-800 transition outline-none cursor-pointer"
                >
                  <option value="">Select Service / Worker</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Cleaner">Home Cleaner</option>
                  <option value="Cook">Cook / Chef</option>
                  <option value="Painter">Painter</option>
                  <option value="Driver">Driver</option>
                  <option value="Maid">Maid / Housekeeper</option>
                  <option value="Labour">Labour / Helper</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Yoga Instructor">Yoga Instructor</option>
                </select>
              </div>

              <div className="relative flex-1">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-gray-50 hover:bg-gray-100/80 focus:bg-white rounded-2xl border border-transparent focus:border-brand-500 text-sm font-medium text-gray-800 transition outline-none cursor-pointer"
                >
                  <option value="">Select Location</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Noida">Noida</option>
                  <option value="Greater Noida">Greater Noida</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="Jaipur">Jaipur</option>
                </select>
              </div>

              <Button type="submit" size="lg" className="h-12 sm:px-7 rounded-2xl font-bold shadow-lg">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>
            </form>

            {/* Role Selection Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl">
              <button
                type="button"
                onClick={() => router.push("/find-workers")}
                className="group p-4 bg-white rounded-2xl border border-gray-200/80 hover:border-brand-400 hover:shadow-lg transition-all duration-300 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">I&apos;m a Customer</div>
                    <div className="text-xs text-gray-500">Find &amp; hire verified pros</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-600 group-hover:translate-x-1 transition" />
              </button>

              <button
                type="button"
                onClick={() => router.push("/worker-register")}
                className="group p-4 bg-white rounded-2xl border border-gray-200/80 hover:border-brand-400 hover:shadow-lg transition-all duration-300 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">I&apos;m a Worker</div>
                    <div className="text-xs text-gray-500">Get jobs near you &amp; grow</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-600 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hero Graphic - Real Indian Skilled Professionals Team */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex justify-center w-full"
          >
            <div className="relative w-full max-w-xl lg:max-w-none">
              {/* Aspect Ratio 16:9 Frame to preserve all 10 professionals without cropping */}
              <div className="relative z-10 w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-purple-100 bg-gray-100">
                <Image
                  src="/images/hero-team.jpg"
                  alt="SkilledBoys Verified Local Service Professionals Team in Delhi NCR"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
                />

                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-black/10 pointer-events-none" />

                {/* Bottom glassmorphic overlay bar */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-lg border border-white/60">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-black text-gray-900 flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                        Verified Local Pro Network
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 truncate">
                        Electricians, Plumbers, Carpenters, Cooks &amp; Maids
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-black text-brand-700 bg-purple-100 px-2.5 py-1 rounded-xl whitespace-nowrap flex-shrink-0">
                      0% Commission
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-3 sm:-bottom-4 -left-2 sm:-left-3 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Direct Phone Calling</div>
                  <div className="text-[10px] text-gray-500">100% Free • No Middlemen</div>
                </div>
              </div>

              {/* Floating Star Badge */}
              <div className="absolute -top-3 sm:-top-3.5 -right-2 sm:-right-3 z-20 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-1.5">
                <span className="text-amber-500 font-black text-xs sm:text-sm">★ 4.8 / 5.0</span>
                <span className="text-[10px] sm:text-[11px] text-gray-600 font-semibold">Top Rated</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
