import {
  Worker,
  WorkerAuthResponse,
  WorkerSearchParams,
  AdminStats,
  ContactInquiry,
} from "@/types";

const DEFAULT_PRODUCTION_API_URL = "https://skilledboys-backend-u54y.onrender.com";

const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }
  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.endsWith(".local");
    if (!isLocalhost) {
      return DEFAULT_PRODUCTION_API_URL;
    }
  }
  return process.env.NODE_ENV === "production"
    ? DEFAULT_PRODUCTION_API_URL
    : "http://localhost:5000";
};

const API_BASE_URL = getApiBaseUrl();

function getWorkerToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminToken");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || data.error || `HTTP error ${res.status}`);
    }

    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected network error occurred.");
  }
}

export const api = {
  // Health
  async checkHealth(): Promise<{ success: boolean; message: string }> {
    return request("/api/health");
  },

  // Workers Public
  async getWorkers(params: WorkerSearchParams = {}): Promise<Worker[]> {
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.append("category", params.category);
    if (params.location) searchParams.append("location", params.location);
    if (params.search) searchParams.append("search", params.search);
    if (params.gender) searchParams.append("gender", params.gender);
    if (params.status) searchParams.append("status", params.status);
    if (params.minRating) searchParams.append("minRating", String(params.minRating));

    const qs = searchParams.toString();
    const endpoint = `/api/workers${qs ? `?${qs}` : ""}`;
    return request<Worker[]>(endpoint);
  },

  async getWorkerById(id: string): Promise<Worker> {
    const workers = await this.getWorkers();
    const found = workers.find((w) => w._id === id || w.id === id);
    if (!found) {
      throw new Error("Worker profile not found");
    }
    return found;
  },

  // Worker Auth
  async registerWorker(data: Record<string, unknown>): Promise<{ success: boolean; message: string }> {
    return request("/api/workers/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async loginWorker(credentials: { number: string; password: string }): Promise<WorkerAuthResponse> {
    const res = await request<WorkerAuthResponse>("/api/workers/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (res.success && res.token && res.worker) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.token);
        localStorage.setItem("workerId", res.worker.id);
        localStorage.setItem("workerData", JSON.stringify(res.worker));
      }
    }
    return res;
  },

  async getWorkerProfile(): Promise<{ success: boolean; worker: Worker }> {
    const token = getWorkerToken();
    if (!token) {
      throw new Error("Not logged in");
    }
    return request("/api/workers/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async toggleWorkerStatus(workerId: string): Promise<{ success: boolean; status: "working" | "not working" }> {
    const token = getWorkerToken();
    return request(`/api/workers/status/${encodeURIComponent(workerId)}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async updateWorkerProfile(workerId: string, data: Partial<Worker>): Promise<{ success: boolean; worker: Worker }> {
    const token = getWorkerToken();
    return request(`/api/workers/${encodeURIComponent(workerId)}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },

  // Contact Inquiries
  async submitContactInquiry(inquiry: {
    name: string;
    email: string;
    phone?: string;
    queryType: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    return request("/api/contact", {
      method: "POST",
      body: JSON.stringify(inquiry),
    });
  },

  // Admin API
  async loginAdmin(credentials: { username: string; password: string }): Promise<{
    success: boolean;
    token: string;
    admin: { username: string; role: string };
  }> {
    const res = await request<{
      success: boolean;
      token: string;
      admin: { username: string; role: string };
    }>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (res.success && res.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("adminToken", res.token);
        localStorage.setItem("adminUser", JSON.stringify(res.admin));
      }
    }
    return res;
  },

  async getAdminStats(): Promise<{ success: boolean; stats: AdminStats }> {
    const token = getAdminToken();
    return request("/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async getAdminWorkers(params: { search?: string; category?: string; location?: string; status?: string } = {}): Promise<{
    success: boolean;
    count: number;
    workers: Worker[];
  }> {
    const token = getAdminToken();
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.append("search", params.search);
    if (params.category) searchParams.append("category", params.category);
    if (params.location) searchParams.append("location", params.location);
    if (params.status) searchParams.append("status", params.status);

    const qs = searchParams.toString();
    return request(`/api/admin/workers${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async adminCreateWorker(data: Partial<Worker> & { password?: string }): Promise<{
    success: boolean;
    message: string;
    worker: Worker;
  }> {
    const token = getAdminToken();
    return request("/api/admin/workers", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },

  async adminUpdateWorker(id: string, data: Partial<Worker>): Promise<{
    success: boolean;
    message: string;
    worker: Worker;
  }> {
    const token = getAdminToken();
    return request(`/api/admin/workers/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },

  async adminDeleteWorker(id: string): Promise<{ success: boolean; message: string }> {
    const token = getAdminToken();
    return request(`/api/admin/workers/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async adminGetInquiries(): Promise<{ success: boolean; count: number; inquiries: ContactInquiry[] }> {
    const token = getAdminToken();
    return request("/api/admin/inquiries", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
