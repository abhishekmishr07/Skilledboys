import { Metadata } from "next";
import {
  SITE_URL,
  generateWorkerSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";

interface WorkerLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch("https://skilledboys.onrender.com/api/workers", {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const workers = await res.json();
      if (Array.isArray(workers)) {
        const worker = workers.find((w) => w._id === id || w.id === id);
        if (worker) {
          const title = `${worker.name} – Verified ${worker.category} in ${worker.location}`;
          const description = `Hire ${worker.name}, a trusted ${worker.category} in ${worker.location}. ${worker.experience || "Experienced"} with a ${worker.rating || "4.8"} rating. Call or WhatsApp directly with 0% commission.`;
          const url = `${SITE_URL}/workers/${id}`;

          return {
            title,
            description,
            keywords: [
              worker.name,
              `${worker.category} in ${worker.location}`,
              `hire ${worker.name}`,
              `${worker.category} near me`,
              `skilledboys ${worker.location}`,
            ],
            alternates: {
              canonical: url,
            },
            openGraph: {
              title,
              description,
              url,
              type: "profile",
              images: [
                {
                  url: worker.photo && worker.photo.startsWith("http")
                    ? worker.photo
                    : `${SITE_URL}/images/skilledboyslogo1.png`,
                  width: 800,
                  height: 600,
                  alt: `${worker.name} - ${worker.category} in ${worker.location}`,
                },
              ],
            },
          };
        }
      }
    }
  } catch (err) {
    console.error("Worker generateMetadata error:", err);
  }

  return {
    title: "Worker Profile | Verified Local Professional | SkilledBoys",
    description:
      "Connect directly with verified local tradespeople, technicians, cooks, and cleaners in Delhi NCR with zero commission on SkilledBoys.",
    alternates: {
      canonical: `${SITE_URL}/workers/${id}`,
    },
  };
}

export default async function WorkerProfileLayout({
  children,
  params,
}: WorkerLayoutProps) {
  const { id } = await params;
  let workerSchema = null;
  let breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Workers", url: "/find-workers" },
    { name: "Profile", url: `/workers/${id}` },
  ]);

  try {
    const res = await fetch("https://skilledboys.onrender.com/api/workers", {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const workers = await res.json();
      if (Array.isArray(workers)) {
        const worker = workers.find((w) => w._id === id || w.id === id);
        if (worker) {
          workerSchema = generateWorkerSchema({
            name: worker.name,
            category: worker.category,
            location: worker.location,
            rating: worker.rating,
            experience: worker.experience,
            phone: worker.phone || worker.number,
            id,
          });

          breadcrumbSchema = generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Workers", url: "/find-workers" },
            { name: `${worker.category} in ${worker.location}`, url: `/find-workers?category=${encodeURIComponent(worker.category)}&location=${encodeURIComponent(worker.location)}` },
            { name: worker.name, url: `/workers/${id}` },
          ]);
        }
      }
    }
  } catch (e) {
    // Continue gracefully
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {workerSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(workerSchema) }}
        />
      )}
      {children}
    </>
  );
}
