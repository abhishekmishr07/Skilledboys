"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/services/api";
import { Worker } from "@/types";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";
import {
  Briefcase,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Edit3,
  LogOut,
  BellRing,
  Star,
  User,
  Power,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface JobAlert {
  id: number;
  customer: string;
  number: string;
  location: string;
  category: string;
  time: string;
  status?: "pending" | "accepted" | "rejected";
}

const INITIAL_JOB_ALERTS: JobAlert[] = [
  {
    id: 1,
    customer: "Ravi Kumar",
    number: "9871112233",
    location: "Sector 62, Noida",
    category: "Switch Board Repair & Wiring",
    time: "10 mins ago",
    status: "pending",
  },
  {
    id: 2,
    customer: "Pooja Singh",
    number: "9812345678",
    location: "Laxmi Nagar, Delhi",
    category: "Ceiling Fan Installation",
    time: "35 mins ago",
    status: "pending",
  },
  {
    id: 3,
    customer: "Suresh Verma",
    number: "9911223344",
    location: "Indirapuram, Ghaziabad",
    category: "Main MCB Trip Diagnostics",
    time: "1 hour ago",
    status: "pending",
  },
];

export default function WorkerDashboardPage() {
  const router = useRouter();
  const { success, error: showError, info } = useToast();

  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [jobs, setJobs] = useState<JobAlert[]>(INITIAL_JOB_ALERTS);

  // Profile Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Worker>>({});
  const [savingEdit, setSavingEdit] = useState(false);

  const loadProfile = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const workerId = typeof window !== "undefined" ? localStorage.getItem("workerId") : null;

    if (!token || !workerId) {
      router.push("/worker-login");
      return;
    }

    try {
      const res = await api.getWorkerProfile();
      if (res.success && res.worker) {
        setWorker(res.worker);
        setEditFormData({
          name: res.worker.name,
          category: res.worker.category,
          location: res.worker.location,
          experience: res.worker.experience,
          age: res.worker.age,
          gender: res.worker.gender,
          startTime: res.worker.startTime || "09:00",
          endTime: res.worker.endTime || "18:00",
          phone: res.worker.phone || res.worker.number,
          bio: res.worker.bio,
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message);
      }
      router.push("/worker-login");
    } finally {
      setLoading(false);
    }
  }, [router, showError]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleToggleStatus = async () => {
    if (!worker) return;
    setStatusLoading(true);
    try {
      const id = String(worker._id || worker.id || "");
      const res = await api.toggleWorkerStatus(id);
      if (res.success) {
        setWorker((prev) => (prev ? { ...prev, status: res.status } : null));
        if (res.status === "working") {
          success("Status updated: You are now set to AVAILABLE for jobs!");
        } else {
          info("Status updated: You are now marked BUSY / NOT WORKING.");
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message);
      }
    } finally {
      setStatusLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!worker) return;

    setSavingEdit(true);
    try {
      const id = String(worker._id || worker.id || "");
      const res = await api.updateWorkerProfile(id, editFormData);
      if (res.success) {
        setWorker(res.worker);
        setEditModalOpen(false);
        success("Profile updated successfully!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message);
      }
    } finally {
      setSavingEdit(false);
    }
  };

  const handleJobAction = (jobId: number, action: "accept" | "reject") => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: action === "accept" ? "accepted" : "rejected" } : job
      )
    );
    if (action === "accept") {
      success(`Job #${jobId} accepted! The customer has been notified.`);
    } else {
      info(`Job #${jobId} rejected.`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("workerId");
    localStorage.removeItem("workerData");
    success("Logged out successfully.");
    router.push("/");
  };

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  if (!worker) {
    return null;
  }

  const isWorking = worker.status === "working";

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                Welcome, {worker.name}
              </h1>
              <ShieldCheck className="h-5 w-5 text-brand-600" />
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your real-time availability, profile details and job leads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl border border-gray-200 text-gray-700 hover:border-brand-500 hover:text-brand-600 text-sm font-semibold flex items-center gap-2 transition"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-2xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold flex items-center gap-2 transition"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Job Alerts */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-brand-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  New Customer Job Alerts
                </h2>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-brand-700">
                Live Leads
              </span>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {job.category}
                    </h3>
                    <span className="text-xs text-gray-400 font-medium">
                      {job.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-600 mb-4 bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
                    <div>
                      Customer: <span className="font-semibold text-gray-900">{job.customer}</span>
                    </div>
                    <div>
                      Phone: <span className="font-semibold text-brand-600">{job.number}</span>
                    </div>
                    <div>
                      Location: <span className="font-semibold text-gray-900">{job.location}</span>
                    </div>
                  </div>

                  {job.status === "accepted" ? (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>Job Accepted! You can now call the customer directly at {job.number}.</span>
                    </div>
                  ) : job.status === "rejected" ? (
                    <div className="p-3 rounded-xl bg-gray-100 text-gray-500 text-xs font-semibold flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      <span>Job declined.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleJobAction(job.id, "accept")}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Accept Job</span>
                      </button>
                      <button
                        onClick={() => handleJobAction(job.id, "reject")}
                        className="py-2.5 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs transition"
                      >
                        Reject
                      </button>
                      <a
                        href={`tel:${job.number}`}
                        className="py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs transition flex items-center gap-1"
                      >
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        <span>Call</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Worker Profile Card & Live Status */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Status Switcher Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft text-center space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Availability Control
              </h3>

              <div
                className={`py-3 px-4 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 ${
                  isWorking
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    isWorking ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                  }`}
                />
                <span>{isWorking ? "You are ON DUTY" : "You are OFF DUTY"}</span>
              </div>

              <button
                onClick={handleToggleStatus}
                disabled={statusLoading}
                className={`w-full py-3.5 px-4 rounded-2xl text-white font-black text-sm shadow-lg transition active:scale-95 flex items-center justify-center gap-2 ${
                  isWorking
                    ? "bg-red-600 hover:bg-red-700 shadow-red-600/20"
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                }`}
              >
                <Power className="h-4 w-4" />
                <span>
                  {statusLoading
                    ? "Updating..."
                    : isWorking
                    ? "Switch to: Off Duty"
                    : "Switch to: I am Working"}
                </span>
              </button>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-purple-50 border-2 border-purple-100">
                  <Image
                    src={worker.photo || "/images/electrician.png"}
                    alt={worker.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">
                    {worker.name}
                  </h3>
                  <p className="text-brand-600 font-semibold text-xs mt-0.5">
                    {worker.category}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {worker.location}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">Phone:</span>
                  <span className="font-semibold text-gray-900">{worker.phone || worker.number}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">Experience:</span>
                  <span className="font-semibold text-gray-900">{worker.experience || 0} years</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">Age / Gender:</span>
                  <span className="font-semibold text-gray-900">{worker.age} yrs • {worker.gender}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">Hours:</span>
                  <span className="font-semibold text-gray-900">{worker.startTime || "09:00"} – {worker.endTime || "18:00"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Rating:</span>
                  <span className="font-bold text-amber-500">★ {worker.rating || "4.8"} / 5.0</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditModalOpen(true)}
                className="w-full mt-2"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Update Profile</span>
              </Button>
            </div>

          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Worker Profile"
        description="Update your service details, working hours and bio."
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editFormData.name || ""}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
              <input
                type="text"
                required
                value={editFormData.category || ""}
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Location</label>
              <input
                type="text"
                required
                value={editFormData.location || ""}
                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Experience (Yrs)</label>
              <input
                type="number"
                value={editFormData.experience ?? 0}
                onChange={(e) => setEditFormData({ ...editFormData, experience: Number(e.target.value) })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Age</label>
              <input
                type="number"
                value={editFormData.age ?? 25}
                onChange={(e) => setEditFormData({ ...editFormData, age: Number(e.target.value) })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Start Time</label>
              <input
                type="time"
                value={editFormData.startTime || "09:00"}
                onChange={(e) => setEditFormData({ ...editFormData, startTime: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">End Time</label>
              <input
                type="time"
                value={editFormData.endTime || "18:00"}
                onChange={(e) => setEditFormData({ ...editFormData, endTime: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Bio / Profile Description</label>
            <textarea
              rows={3}
              value={editFormData.bio || ""}
              onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 text-sm outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={savingEdit}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
