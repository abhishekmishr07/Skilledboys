import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | SkilledBoys",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
