"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { Worker, AdminStats, ContactInquiry } from "@/types";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  Shield,
  Users,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit,
  Search,
  RotateCcw,
  LogOut,
  Mail,
  MapPin,
  Wrench,
  Power,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { success, error: showError, info } = useToast();

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [activeTab, setActiveTab] = useState<"workers" | "inquiries" | "stats">("workers");

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Create Worker Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createData, setCreateData] = useState<Partial<Worker> & { password?: string }>({
    name: "",
    number: "",
    password: "",
    category: "",
    location: "",
    experience: 0,
    age: 25,
    gender: "Male",
    rating: 4.8,
    status: "working",
    hourlyRate: 300,
    bio: "",
  });
  const [creating, setCreating] = useState(false);

  // Edit Worker Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [editData, setEditData] = useState<Partial<Worker>>({});
  const [updating, setUpdating] = useState(false);

  // Delete Confirmation Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState<Worker | null>(null);
  const [deleting, setDeleting] = useState(false);

  const checkAuthAndLoad = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (!token) {
      router.push("/admin/login");
      return;
    }

    setLoading(true);
    try {
      const [statsRes, workersRes, inquiriesRes] = await Promise.all([
        api.getAdminStats().catch(() => ({ success: false, stats: null })),
        api.getAdminWorkers({
          search: search || undefined,
          category: categoryFilter || undefined,
          location: locationFilter || undefined,
        }).catch(() => ({ success: false, count: 0, workers: [] })),
        api.adminGetInquiries().catch(() => ({ success: false, count: 0, inquiries: [] })),
      ]);

      if (statsRes.success && statsRes.stats) {
        setStats(statsRes.stats);
      }
      if (workersRes.success && workersRes.workers) {
        setWorkers(workersRes.workers);
      }
      if (inquiriesRes.success && inquiriesRes.inquiries) {
        setInquiries(inquiriesRes.inquiries);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [router, search, categoryFilter, locationFilter, showError]);

  useEffect(() => {
    checkAuthAndLoad();
  }, [checkAuthAndLoad]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    success("Admin signed out.");
    router.push("/admin/login");
  };

  // Toggle worker status
  const handleToggleStatus = async (worker: Worker) => {
    const id = String(worker._id || worker.id || "");
    const nextStatus = worker.status === "working" ? "not working" : "working";
    try {
      const res = await api.adminUpdateWorker(id, { status: nextStatus });
      if (res.success) {
        setWorkers((prev) =>
          prev.map((w) => (w._id === id || w.id === id ? { ...w, status: nextStatus } : w))
        );
        success(`Status updated for ${worker.name}: ${nextStatus}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) showError(err.message);
    }
  };

  // Create Worker
  const handleCreateWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await api.adminCreateWorker(createData);
      if (res.success) {
        success(`Worker ${createData.name} created successfully!`);
        setCreateModalOpen(false);
        checkAuthAndLoad();
      }
    } catch (err: unknown) {
      if (err instanceof Error) showError(err.message);
    } finally {
      setCreating(false);
    }
  };

  // Open Edit Modal
  const openEdit = (worker: Worker) => {
    setSelectedWorker(worker);
    setEditData({
      name: worker.name,
      number: worker.number,
      category: worker.category,
      location: worker.location,
      experience: worker.experience,
      age: worker.age,
      gender: worker.gender,
      rating: worker.rating,
      status: worker.status,
      hourlyRate: worker.hourlyRate || 300,
      bio: worker.bio,
    });
    setEditModalOpen(true);
  };

  // Submit Edit Worker
  const handleUpdateWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorker) return;
    setUpdating(true);
    const id = selectedWorker._id || selectedWorker.id || "";
    try {
      const res = await api.adminUpdateWorker(id, editData);
      if (res.success) {
        success(`Worker ${editData.name} updated successfully!`);
        setEditModalOpen(false);
        checkAuthAndLoad();
      }
    } catch (err: unknown) {
      if (err instanceof Error) showError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Open Delete Confirmation
  const openDelete = (worker: Worker) => {
    setWorkerToDelete(worker);
    setDeleteModalOpen(true);
  };

  // Confirm Delete Worker
  const handleConfirmDelete = async () => {
    if (!workerToDelete) return;
    setDeleting(true);
    const id = workerToDelete._id || workerToDelete.id || "";
    try {
      const res = await api.adminDeleteWorker(id);
      if (res.success) {
        success(`Worker ${workerToDelete.name} deleted.`);
        setDeleteModalOpen(false);
        setWorkers((prev) => prev.filter((w) => w._id !== id && w.id !== id));
      }
    } catch (err: unknown) {
      if (err instanceof Error) showError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading && !stats) {
    return <LoadingSpinner text="Loading admin control panel..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-900 text-amber-400 flex items-center justify-center font-bold shadow-md">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-gray-900">
                  Admin Control Panel
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Active Session
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage worker listings, CRUD operations, platform metrics and customer inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={checkAuthAndLoad}
              className="flex items-center gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Add Worker</span>
            </Button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold flex items-center gap-1.5 transition"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Workers</div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
              {stats?.totalWorkers ?? workers.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Registered professionals</div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Available Now</div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 mt-2">
              {stats?.activeWorkers ?? workers.filter((w) => w.status === "working").length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Ready for calls</div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
            <div className="text-xs font-bold text-red-500 uppercase tracking-wider">Busy / Off Duty</div>
            <div className="text-3xl sm:text-4xl font-black text-red-500 mt-2">
              {stats?.inactiveWorkers ?? workers.filter((w) => w.status !== "working").length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Temporarily offline</div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">Contact Inquiries</div>
            <div className="text-3xl sm:text-4xl font-black text-brand-600 mt-2">
              {stats?.totalInquiries ?? inquiries.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Customer support leads</div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white rounded-2xl p-1.5 border border-gray-200/80 mb-6 max-w-md">
          <button
            onClick={() => setActiveTab("workers")}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "workers"
                ? "bg-brand-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Worker Management ({workers.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "inquiries"
                ? "bg-brand-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "stats"
                ? "bg-brand-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Category Metrics
          </button>
        </div>

        {/* Tab 1: Workers CRUD Table */}
        {activeTab === "workers" && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
            
            {/* Filter bar */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Cook">Cook</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Painter">Painter</option>
                  <option value="Driver">Driver</option>
                  <option value="Maid">Maid</option>
                </select>

                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none cursor-pointer"
                >
                  <option value="">All Locations</option>
                  <option value="Noida">Noida</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Greater Noida">Greater Noida</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Mumbai">Mumbai</option>
                </select>

                {(search || categoryFilter || locationFilter) && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategoryFilter("");
                      setLocationFilter("");
                    }}
                    className="p-2 text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="py-3.5 px-6">Worker Name</th>
                    <th className="py-3.5 px-4">Trade / Category</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Phone</th>
                    <th className="py-3.5 px-4">Experience</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {workers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-400">
                        No workers found. Try resetting filters or add a new worker.
                      </td>
                    </tr>
                  ) : (
                    workers.map((w) => {
                      const id = w._id || w.id || "";
                      const isWorking = w.status === "working";
                      return (
                        <tr key={id} className="hover:bg-purple-50/40 transition">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 border flex items-center justify-center font-bold text-brand-700">
                                {w.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">{w.name}</div>
                                <div className="text-[10px] text-gray-400">Rating: ★ {w.rating || "4.8"}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-brand-600">{w.category}</td>
                          <td className="py-4 px-4">{w.location}</td>
                          <td className="py-4 px-4 font-mono">{w.phone || w.number}</td>
                          <td className="py-4 px-4">{w.experience || 0} yrs</td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => handleToggleStatus(w)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                                isWorking
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                              }`}
                              title="Click to toggle status"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isWorking ? "bg-emerald-600" : "bg-red-600"}`} />
                              <span>{isWorking ? "Working" : "Not Working"}</span>
                            </button>
                          </td>
                          <td className="py-4 px-6 text-right space-x-1.5">
                            <button
                              onClick={() => openEdit(w)}
                              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-brand-600 hover:border-brand-300 transition"
                              title="Edit Worker"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => openDelete(w)}
                              className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                              title="Delete Worker"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: Inquiries */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Customer Contact &amp; Support Messages
            </h2>
            {inquiries.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-12">No inquiries received yet.</p>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq, idx) => (
                  <div
                    key={inq._id || inq.id || idx}
                    className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{inq.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-purple-100 text-brand-700 font-semibold">
                          {inq.queryType}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Email: <a href={`mailto:${inq.email}`} className="text-brand-600">{inq.email}</a> • Phone: {inq.phone || "Not provided"}
                      </div>
                      <p className="text-xs text-gray-700 mt-2 italic bg-white p-3 rounded-xl border border-gray-100">
                        &ldquo;{inq.message || "No message provided."}&rdquo;
                      </p>
                    </div>
                    <div className="text-right text-[11px] text-gray-400 whitespace-nowrap">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "Recent"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Stats Breakdown */}
        {activeTab === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-brand-600" />
                <span>Workers By Category</span>
              </h3>
              <div className="space-y-3">
                {stats?.categories?.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">{cat.name}</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-brand-700 font-bold">
                      {cat.count} workers
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-600" />
                <span>Workers By Location</span>
              </h3>
              <div className="space-y-3">
                {stats?.locations?.map((loc) => (
                  <div key={loc.name} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">{loc.name}</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                      {loc.count} workers
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal: Create Worker */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Worker Listing"
        description="Add a new verified professional directly to the database."
      >
        <form onSubmit={handleCreateWorker} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={createData.name || ""}
              onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={createData.number || ""}
                onChange={(e) => setCreateData({ ...createData, number: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Password</label>
              <input
                type="text"
                placeholder="Create password"
                value={createData.password || ""}
                onChange={(e) => setCreateData({ ...createData, password: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Category *</label>
              <select
                value={createData.category}
                onChange={(e) => setCreateData({ ...createData, category: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              >
                <option value="">Select Category</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Cook">Cook</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Painter">Painter</option>
                <option value="Driver">Driver</option>
                <option value="Maid">Maid</option>
                <option value="Labour">Labour</option>
                <option value="Gardener">Gardener</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                required
                value={createData.location || ""}
                onChange={(e) => setCreateData({ ...createData, location: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Exp (Yrs)</label>
              <input
                type="number"
                value={createData.experience ?? 0}
                onChange={(e) => setCreateData({ ...createData, experience: Number(e.target.value) })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={createData.age ?? 25}
                onChange={(e) => setCreateData({ ...createData, age: Number(e.target.value) })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Initial Rating</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={createData.rating ?? 4.8}
                onChange={(e) => setCreateData({ ...createData, rating: Number(e.target.value) })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={creating}>
              Create Worker
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit Worker */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Worker Listing"
        description="Update worker parameters in real time."
      >
        <form onSubmit={handleUpdateWorker} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editData.name || ""}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Category</label>
              <input
                type="text"
                required
                value={editData.category || ""}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Location</label>
              <input
                type="text"
                required
                value={editData.location || ""}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={editData.number || ""}
                onChange={(e) => setEditData({ ...editData, number: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Experience</label>
              <input
                type="number"
                value={editData.experience ?? 0}
                onChange={(e) => setEditData({ ...editData, experience: Number(e.target.value) })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                value={editData.rating ?? 4.8}
                onChange={(e) => setEditData({ ...editData, rating: Number(e.target.value) })}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Status</label>
            <select
              value={editData.status || "working"}
              onChange={(e) => setEditData({ ...editData, status: e.target.value as "working" | "not working" })}
              className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs outline-none"
            >
              <option value="working">Working / Available</option>
              <option value="not working">Not Working / Busy</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={updating}>
              Save Updates
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Delete Confirmation */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete worker "${workerToDelete?.name}"? This action cannot be undone.`}
      >
        <div className="pt-4 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" isLoading={deleting} onClick={handleConfirmDelete}>
            Delete Worker
          </Button>
        </div>
      </Modal>

    </div>
  );
}
