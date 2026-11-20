"use client";

import React from "react";
import Image from "next/image";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/8176033198"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with SkilledBoys on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25d366] text-white shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <Image
          src="/images/watsapp.png"
          alt="WhatsApp"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <span className="absolute right-16 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}
