import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | SkilledBoys",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
