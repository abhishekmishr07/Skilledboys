import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Facebook, Youtube, Heart, MapPin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-10 w-10 brightness-150">
                <Image
                  src="/images/skilledboyslogo1.png"
                  alt="SkilledBoys Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                <span className="text-purple-400">Skilled</span>Boys
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Connecting local experts in one click. We empower local skilled technicians and help Indian households discover trustworthy professionals effortlessly and without commissions.
            </p>

            <div className="pt-2 space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-purple-400" />
                <a href="mailto:skilledboyss@gmail.com" className="hover:text-white transition">
                  skilledboyss@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-purple-400" />
                <a href="tel:8176033198" className="hover:text-white transition">
                  +91 81760 33198
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>Noida &amp; Delhi NCR, India</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.instagram.com/skilledboyss?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-pink-600/20 text-pink-400 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/8176033198"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-purple-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/find-workers" className="hover:text-purple-400 transition">
                  Find Workers
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-purple-400 transition">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/areas" className="hover:text-purple-400 transition">
                  Available Cities
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-400 transition">
                  Help &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Services */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Top Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/electrician" className="hover:text-purple-400 transition">
                  Electricians
                </Link>
              </li>
              <li>
                <Link href="/services/plumber" className="hover:text-purple-400 transition">
                  Plumbers
                </Link>
              </li>
              <li>
                <Link href="/services/carpenter" className="hover:text-purple-400 transition">
                  Carpenters
                </Link>
              </li>
              <li>
                <Link href="/services/cook" className="hover:text-purple-400 transition">
                  Cooks &amp; Chefs
                </Link>
              </li>
              <li>
                <Link href="/services/cleaner" className="hover:text-purple-400 transition">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/driver" className="hover:text-purple-400 transition">
                  Drivers
                </Link>
              </li>
            </ul>
          </div>

          {/* For Workers */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">For Workers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/worker-register" className="hover:text-purple-400 transition font-medium text-purple-300">
                  Register as Pro →
                </Link>
              </li>
              <li>
                <Link href="/worker-login" className="hover:text-purple-400 transition">
                  Worker Login
                </Link>
              </li>
              <li>
                <Link href="/worker-dashboard" className="hover:text-purple-400 transition">
                  Worker Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-purple-400 transition text-gray-500">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} SkilledBoys — India&apos;s Transparent Local Services Network.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
