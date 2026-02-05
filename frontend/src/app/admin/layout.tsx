import RequireAdmin from "@/components/layouts/guards/RequireAdmin";
import AdminShell from "@/components/ui/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAdmin>
      <AdminShell>{children}</AdminShell>
    </RequireAdmin>
  );
}
