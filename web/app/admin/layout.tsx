import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Akiba Technologies",
  description: "Internal administration console for Akiba Technologies operations, inquiries, and case studies.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
