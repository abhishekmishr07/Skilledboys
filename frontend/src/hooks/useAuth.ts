"use client";

import { useState, useEffect, useCallback } from "react";
import { Worker } from "@/types";

export function useAuth() {
  const [worker, setWorker] = useState<Partial<Worker> | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const token = localStorage.getItem("token");
      const workerData = localStorage.getItem("workerData");
      if (token && workerData) {
        setWorker(JSON.parse(workerData));
      } else {
        setWorker(null);
      }

      const adminToken = localStorage.getItem("adminToken");
      setIsAdmin(!!adminToken);
    } catch {
      setWorker(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logoutWorker = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("workerId");
    localStorage.removeItem("workerData");
    setWorker(null);
    window.location.href = "/";
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAdmin(false);
    window.location.href = "/admin/login";
  };

  return {
    worker,
    isWorkerLoggedIn: !!worker,
    isAdmin,
    isLoading,
    refreshAuth: checkAuth,
    logoutWorker,
    logoutAdmin,
  };
}
