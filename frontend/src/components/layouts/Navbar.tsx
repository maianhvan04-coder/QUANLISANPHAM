"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuth";

export default function Navbar() {
  const { user, hydrated, isLoading, logout } = useAuth();

  return (
    <header
      style={{
        padding: 12,
        borderBottom: "1px solid #eee",
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      <Link href="/">Home</Link>

      {/* ✅ chỉ render sau khi hydrated + đúng ADMIN */}
      {hydrated && user?.role === "ADMIN" && <Link href="/admin">Admin</Link>}

      <div style={{ marginLeft: "auto" }}>
        {/* ✅ trước khi hydrate: không render login/register để khỏi lệch SSR */}
        {!hydrated ? null : user ? (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span>
              <b>{user.name}</b> · <b>{user.role}</b>
            </span>
            <button onClick={logout} disabled={isLoading}>
              {isLoading ? "..." : "Logout"}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}
