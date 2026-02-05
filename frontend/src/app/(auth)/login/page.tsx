"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/auth/useAuth";

type ApiErrorBody = { message?: string };

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next"); // string | null

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const u = await login({ email, password }); // ✅ lấy user trả về luôn
      router.replace(next ?? (u.role === "ADMIN" ? "/admin" : "/"));
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorBody>(error)) {
        setErr(error.response?.data?.message || error.message || "Login failed");
      } else if (error instanceof Error) {
        setErr(error.message || "Login failed");
      } else {
        setErr("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 16, maxWidth: 420 }}>
      <h1>Đăng nhập</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Login"}
        </button>

        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>
    </main>
  );
}
