import AdminGuard from "../../components/layout/AdminGuard";
import AdminShell from "../../components/layout/AdminShell";

export const metadata = {
  title: "Rupantorii Admin",
  description: "Admin dashboard for Rupantorii"
};

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}

