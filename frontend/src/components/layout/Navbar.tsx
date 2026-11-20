"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, User, Shield, Briefcase, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Find Workers", href: "/find-workers" },
  { name: "Categories", href: "/categories" },
  { name: "Available in", href: "/areas" },
  { name: "About Us", href: "/about" },
  { name: "Support", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { worker, isWorkerLoggedIn, isAdmin, logoutWorker, logoutAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/skilledboyslogo1.png"
              alt="SkilledBoys Logo"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <div className="text-2xl font-black tracking-tight leading-none">
              <span className="text-gray-900">Skilled</span>
              <span className="text-brand-600">Boys</span>
            </div>
            <div className="text-[10px] text-gray-500 font-medium tracking-wide uppercase mt-0.5">
              Local Experts in 1 Click
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "text-brand-700 bg-brand-50/80 shadow-sm"
                    : "text-gray-600 hover:text-brand-600 hover:bg-gray-50"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User / Worker / Admin Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {isWorkerLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/worker-dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-brand-700 font-semibold text-sm border border-purple-200 hover:bg-purple-100 transition shadow-sm"
              >
                <Briefcase className="h-4 w-4" />
                <span>{worker?.name || "Dashboard"}</span>
              </Link>
              <button
                onClick={logoutWorker}
                title="Logout"
                className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/worker-login"
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-gray-700 hover:text-brand-600 transition"
              >
                <User className="h-4 w-4 text-brand-500" />
                <span>Worker Login</span>
              </Link>
              <Link
                href="/worker-register"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20 transition active:scale-95"
              >
                Join as Worker
              </Link>
            </div>
          )}

          {isAdmin ? (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span>Admin</span>
            </Link>
          ) : (
            <Link
              href="/admin/login"
              title="Admin Portal"
              className="text-gray-400 hover:text-gray-700 text-xs px-2 py-1 rounded transition"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-semibold transition",
                    isActive
                      ? "text-brand-700 bg-purple-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-brand-600"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2.5">
            {isWorkerLoggedIn ? (
              <>
                <Link
                  href="/worker-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 text-white font-semibold text-center"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>My Worker Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutWorker();
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/worker-login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-center text-sm hover:border-brand-500"
                >
                  Worker Login
                </Link>
                <Link
                  href="/worker-register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 rounded-xl bg-brand-600 text-white font-semibold text-center text-sm shadow-md"
                >
                  Join as Pro
                </Link>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 px-1 text-xs text-gray-400">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-600"
              >
                Customer Sign In
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-600"
              >
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
