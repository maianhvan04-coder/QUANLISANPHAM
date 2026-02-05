"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, hydrated } = useAuth(); // hydrated rất quan trọng để tránh hydration mismatch
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (user.role !== "ADMIN") {
      router.replace("/403");
    }
  }, [hydrated, user, router, pathname]);

  if (!hydrated) return null;
  if (!user || user.role !== "ADMIN") return null;

  return <>{children}</>;
}
