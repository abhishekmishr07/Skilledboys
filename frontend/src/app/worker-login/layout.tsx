import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worker Login | SkilledBoys Pro Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WorkerLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
