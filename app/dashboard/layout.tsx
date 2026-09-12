import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AuthProvider } from "@/contexts/auth-context";
import { ToastProvider } from "@/components/Toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ErrorBoundary>
          <DashboardShell>{children}</DashboardShell>
        </ErrorBoundary>
      </ToastProvider>
    </AuthProvider>
  );
}
