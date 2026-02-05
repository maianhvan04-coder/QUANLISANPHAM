"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";

function NavItem({
  href,
  label,
  active,
  icon,
}: {
  href: string;
  label: string;
  active?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
        active
          ? "bg-indigo-500/15 text-indigo-100 ring-1 ring-indigo-500/25"
          : "text-slate-200/90 hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
        {icon}
      </span>
      <span>{label}</span>
      <span className="ml-auto text-slate-300/50">›</span>
    </Link>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 overflow-auto bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-5 lg:block">
          <div className="flex items-center gap-3 px-2 pb-4">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 font-black text-white">
              A
            </div>
            <div className="text-xl font-extrabold tracking-wide text-white">Admin</div>
          </div>

          <div className="mt-3">
            <div className="px-2 pb-2 text-xs font-semibold tracking-[0.18em] text-slate-300/50">
              HOME
            </div>

            <div className="space-y-2">
              <NavItem
                href="/admin"
                label="Dashboards"
                active={pathname === "/admin"}
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white">
                    <path
                      fill="currentColor"
                      d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V11z"
                    />
                  </svg>
                }
              />

              <NavItem
                href="/admin/widgets"
                label="Widgets"
                active={pathname?.startsWith("/admin/widgets")}
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white">
                    <path
                      fill="currentColor"
                      d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
                    />
                  </svg>
                }
              />
            </div>

            <div className="mt-6 px-2 pb-2 text-xs font-semibold tracking-[0.18em] text-slate-300/50">
              USER
            </div>

            <div className="space-y-2">
              <NavItem href="/admin/components" label="Người dùng" active={pathname?.startsWith("/admin/components")} icon={<IconCube />} />
            </div>

            <div className="mt-6 px-2 pb-2 text-xs font-semibold tracking-[0.18em] text-slate-300/50">
              GENERAL
            </div>

            <div className="space-y-2">
              <NavItem href="/admin/components" label="Danh mục" active={pathname?.startsWith("/admin/components")} icon={<IconCube />} />
              <NavItem href="/admin/elements" label="Sản phẩm" active={pathname?.startsWith("/admin/elements")} icon={<IconGrid />} />
              <NavItem href="/admin/forms" label="Forms" active={pathname?.startsWith("/admin/forms")} icon={<IconForm />} />
            </div>
          </div>

          <div className="mt-6 px-2 pb-2 text-xs font-semibold tracking-[0.18em] text-slate-300/50">
              SETTING
            </div>

            <div className="space-y-2">
              <NavItem href="/admin/components" label="Cài đặt" active={pathname?.startsWith("/admin/components")} icon={<IconCube />} />
            </div>

          <div className="mt-8 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white">Signed in</div>
            <div className="mt-1 text-xs text-slate-200/70">
              {user?.name ?? "—"} · {user?.role ?? "—"}
            </div>
            <button
              onClick={logout}
              disabled={isLoading}
              className="mt-3 w-full rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-60"
            >
              {isLoading ? "..." : "Logout"}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* TOPBAR */}
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
            <div className="flex h-16 items-center justify-between px-4 lg:px-6">
              <div className="flex items-center gap-3">
                <div className="lg:hidden">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-700">
                      <path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                    </svg>
                  </div>
                </div>

                <div className="hidden w-[420px] max-w-[46vw] items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 lg:flex">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-500">
                    <path
                      fill="currentColor"
                      d="M10 2a8 8 0 1 1 5.293 14.293l3.707 3.707-1.414 1.414-3.707-3.707A8 8 0 0 1 10 2zm0 2a6 6 0 1 0 .001 12.001A6 6 0 0 0 10 4z"
                    />
                  </svg>
                  <input
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    placeholder="Search..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <IconBtn>
                  <span className="text-sm">🇺🇸</span>
                </IconBtn>
                <IconBtn>
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-600">
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 3v6l5 3-1 1-5-3V5h1z"
                    />
                  </svg>
                </IconBtn>
                <IconBtn badge="4">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-600">
                    <path
                      fill="currentColor"
                      d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"
                    />
                  </svg>
                </IconBtn>

                <div className="ml-2 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-900 to-slate-600" />
                  <div className="hidden text-sm lg:block">
                    <div className="font-semibold leading-4">{user?.name ?? "Admin"}</div>
                    <div className="text-xs text-slate-500">{user?.email ?? ""}</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

function IconBtn({ children, badge }: { children: React.ReactNode; badge?: string }) {
  return (
    <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100">
      {children}
      {badge ? (
        <span className="absolute -right-2 -top-2 rounded-full bg-rose-500 px-2 py-[2px] text-[11px] font-bold text-white ring-2 ring-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function IconCube() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white">
      <path fill="currentColor" d="M12 2l9 5-9 5-9-5 9-5zm0 10l9-5v10l-9 5-9-5V7l9 5z" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white">
      <path fill="currentColor" d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
    </svg>
  );
}
function IconForm() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white">
      <path fill="currentColor" d="M6 2h12v2H6V2zm0 6h12v2H6V8zm0 6h8v2H6v-2zm0 6h12v2H6v-2z" />
    </svg>
  );
}
