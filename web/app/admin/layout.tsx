import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Akiba Technologies",
  description: "Internal administrative portal for Akiba Technologies content and inquiries management.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
