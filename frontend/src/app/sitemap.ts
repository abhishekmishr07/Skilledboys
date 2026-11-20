import { MetadataRoute } from "next";
import { CATEGORIES, CITIES } from "@/lib/constants";

const CORE_CATEGORIES = [
  "electrician",
  "plumber",
  "cleaner",
  "carpenter",
  "cook",
  "driver",
  "maid",
  "painter",
  "labour",
  "gardener",
];

const TARGET_CITIES = [
  "noida",
  "greater-noida",
  "delhi",
  "gurgaon",
  "ghaziabad",
  "faridabad",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilledboys.com";
  const now = new Date();

  // 1. Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/find-workers`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/areas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/worker-register`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/worker-login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 2. Service Category Landing Pages
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${siteUrl}/services/${encodeURIComponent(cat.category.toLowerCase().replace(/\s+/g, "-"))}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Local High-Intent Service-in-City SEO Pages (Delhi NCR Focus)
  const localServiceRoutes: MetadataRoute.Sitemap = [];
  for (const cat of CORE_CATEGORIES) {
    for (const city of TARGET_CITIES) {
      localServiceRoutes.push({
        url: `${siteUrl}/services/${cat}/${city}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // 4. Dynamic Live Worker Profiles (Fetched from Render Backend)
  let workerRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch("https://skilledboys.onrender.com/api/workers", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const workers = await res.json();
      if (Array.isArray(workers)) {
        workerRoutes = workers
          .filter((w) => w._id || w.id)
          .slice(0, 500)
          .map((w) => ({
            url: `${siteUrl}/workers/${w._id || w.id}`,
            lastModified: w.updatedAt ? new Date(w.updatedAt) : now,
            changeFrequency: "daily",
            priority: 0.75,
          }));
      }
    }
  } catch (err) {
    console.warn("Sitemap: Failed to fetch live workers for sitemap generation, continuing without them:", err);
  }

  return [...staticRoutes, ...categoryRoutes, ...localServiceRoutes, ...workerRoutes];
}
