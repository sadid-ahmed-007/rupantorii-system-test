"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import AdminNav from "./AdminNav";

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const isLoginRoute = pathname === "/admin/login";

  if (isLoginRoute || !isAuthenticated) {
    return children;
  }

  return (
    <section className="section-pad space-y-6 py-10">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-pine">Admin</p>
        <AdminNav />
      </div>
      {children}
    </section>
  );
}
