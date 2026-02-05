"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/auth/useAuth";

type ApiErrorBody = { message?: string };

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const u = await register({ name, email, password }); // ✅ lấy user trả về
      router.replace(u.role === "ADMIN" ? "/admin" : "/");
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorBody>(error)) {
        setErr(error.response?.data?.message || error.message || "Register failed");
      } else if (error instanceof Error) {
        setErr(error.message || "Register failed");
      } else {
        setErr("Register failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 16, maxWidth: 420 }}>
      <h1>Đăng ký</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <input placeholder="Tên" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>{loading ? "Đang tạo..." : "Register"}</button>

        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>
    </main>
  );
}
