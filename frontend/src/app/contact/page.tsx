"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/Toast";

export default function ContactPage() {
  const { success, error: showError } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    queryType: "I want to hire a professional",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showError("Please provide your name and email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitContactInquiry(formData);
      if (res.success) {
        setSubmitted(true);
        success("Your inquiry has been submitted! Our team will respond shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          queryType: "I want to hire a professional",
          message: "",
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message);
      } else {
        showError("Failed to submit inquiry. Please try again or WhatsApp us directly.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Support &amp; Inquiries</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-gray-500 text-base mt-2">
            Whether you need help finding a worker, want to register your trade, or have a business question, we are here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column: Contact Cards */}
          <div className="space-y-4">
            
            <a
              href="mailto:skilledboyss@gmail.com"
              className="block bg-white rounded-3xl p-6 border border-gray-100 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-brand-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Email Us</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Send us your query</p>
                  <p className="text-sm font-semibold text-brand-600 mt-2 break-all">
                    skilledboyss@gmail.com
                  </p>
                </div>
              </div>
            </a>

            <a
              href="tel:8176033198"
              className="block bg-white rounded-3xl p-6 border border-gray-100 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Call / WhatsApp</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Direct phone assistance</p>
                  <p className="text-sm font-semibold text-emerald-600 mt-2">
                    +91 81760 33198
                  </p>
                </div>
              </div>
            </a>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Location</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Operating Hub</p>
                  <p className="text-sm font-medium text-gray-700 mt-2">
                    Noida &amp; Delhi NCR, Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Trust Highlight */}
            <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg space-y-2">
              <h4 className="font-bold text-lg">Direct &amp; Safe</h4>
              <p className="text-purple-100 text-xs leading-relaxed">
                SkilledBoys is built to bridge customers and everyday service workers with transparency, dignity, and reliability.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl shadow-purple-900/5">
              
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900">Send Us a Message</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in your details and our team will get in touch with you right away.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span>Thank you! Your message has been received. We will contact you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.queryType}
                      onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                      className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition cursor-pointer"
                    >
                      <option value="I want to hire a professional">I want to hire a professional</option>
                      <option value="I want to register as a worker">I want to register as a worker</option>
                      <option value="I need help with my account">I need help with my account</option>
                      <option value="Partnership / Business Enquiry">Partnership / Business Enquiry</option>
                      <option value="Feedback / Suggestion">Feedback / Suggestion</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you need or how we can assist..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition resize-none"
                  />
                </div>

                <Button type="submit" size="lg" isLoading={submitting} className="w-full sm:w-auto px-8">
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </Button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
