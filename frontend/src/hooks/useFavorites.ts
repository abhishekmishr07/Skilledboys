"use client";

import { useState, useEffect } from "react";
import { Worker } from "@/types";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("skilledboys_favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleFavorite = (workerId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId];
      try {
        localStorage.setItem("skilledboys_favorites", JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const isFavorite = (workerId: string) => favorites.includes(workerId);

  return { favorites, toggleFavorite, isFavorite };
}
