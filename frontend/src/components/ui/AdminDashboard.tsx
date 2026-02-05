"use client";

import { useMemo, useState } from "react";

const tabs = ["1D", "1W", "1M", "3M", "6M", "1Y"] as const;

export default function AdminDashboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("1D");

  const listings = useMemo(
    () => [
      { name: "Kakasha Si", user: "@sensei011", change: "+0.45%", price: "1.75 BTC", up: true },
      { name: "Naruto Uzumaki", user: "@naruto111", change: "+1.70%", price: "2.45 BTC", up: true },
      { name: "Kazimo Aruke", user: "@kazimo900", change: "-1.21%", price: "1.95 BTC", up: false },
      { name: "Oorichimaru lo", user: "@oro888", change: "+0.12%", price: "0.85 BTC", up: true },
    ],
    []
  );

  const topSellers = useMemo(
    () => [
      { name: "Charles Achilles", handle: "@charlesachilles", sold: 126 },
      { name: "Julia Camo", handle: "@juliacamo", sold: 42 },
      { name: "Json Taylor", handle: "@jsontaylor", sold: 63 },
    ],
    []
  );

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
      {/* LEFT */}
      <div className="space-y-5">
        {/* NFT CARDS */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <NftCard
            title="Color Abstract - NFT"
            author="Bloom NFT"
            handle="@bloom116"
            bid="0.19 BTC"
            ending="04 Days 02 : 27 : 32"
            variant="v1"
          />
          <NftCard
            title="Fluid Abstract - NFT"
            author="Ergos NFT"
            handle="@ergos900"
            bid="0.35 BTC"
            ending="04 Days 02 : 27 : 32"
            variant="v2"
          />
          <NftCard
            title="Space Fluid - NFT"
            author="Caros NFT"
            handle="@caros002"
            bid="0.19 BTC"
            ending="04 Days 02 : 27 : 32"
            variant="v3"
          />
        </div>

        {/* 2 COLS: LIST + SALES */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Personal Listings */}
          <Card>
            <CardHeader title="Personal Listings" right={<GhostBtn>View All</GhostBtn>} />
            <div className="px-4 pb-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-slate-500">
                      <th className="px-4 py-3 font-semibold">NAME</th>
                      <th className="px-4 py-3 font-semibold">CHANGE</th>
                      <th className="px-4 py-3 text-right font-semibold">PRICE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((it) => (
                      <tr key={it.user} className="border-t border-slate-200">
                        <td className="px-4 py-3">
                          <div className="font-semibold">{it.name}</div>
                          <div className="text-xs text-slate-500">{it.user}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={it.up ? "font-bold text-emerald-600" : "font-bold text-rose-500"}>
                            {it.change}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-extrabold">{it.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Sales Overview */}
          <Card>
            <div className="flex items-center justify-between px-4 pt-4">
              <div className="text-base font-extrabold">Sales Overview</div>
              <div className="flex rounded-2xl border border-slate-100 bg-slate-50 p-1">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={[
                      "rounded-xl px-3 py-2 text-xs font-extrabold",
                      tab === t ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-white",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* header stats */}
            <div className="px-4 pt-4">
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 p-4 lg:grid-cols-3">
                <Stat label="Symbol" value="BTC" />
                <Stat label="Price (USD)" value="$1,212.67" valueClass="text-emerald-600" />
                <Stat label="Change (24H)" value="-0.14%" valueClass="text-rose-500" />
              </div>
            </div>

            {/* chart */}
            <div className="px-4 pb-4 pt-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-500">
                  Chart ({tab})
                </div>
                <SimpleChart />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-5">
        {/* Top sellers */}
        <Card>
          <div className="p-4">
            <div className="text-base font-extrabold">Top Sellers</div>

            <div className="mt-3 space-y-3">
              {topSellers.map((s) => (
                <div key={s.handle} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-900 to-slate-600" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-extrabold">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.handle}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs text-slate-500">Total Sold</div>
                    <div className="text-sm font-extrabold">{s.sold}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Featured collections */}
        <Card>
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="text-base font-extrabold">Featured Collections</div>
            <GhostBtn>View All</GhostBtn>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <Thumb />
              <Thumb />
              <Thumb />
              <Thumb />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- UI bits ---------- */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
      {children}
    </div>
  );
}

function CardHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <div className="text-base font-extrabold">{title}</div>
      {right}
    </div>
  );
}

function GhostBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-100">
      {children}
    </button>
  );
}

function Stat({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div>
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className={["mt-1 text-sm font-extrabold", valueClass ?? ""].join(" ")}>{value}</div>
    </div>
  );
}

function Thumb() {
  return (
    <div className="aspect-[1/1] rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200" />
  );
}

/* ---------- NFT Cards ---------- */
function NftCard({
  title,
  author,
  handle,
  bid,
  ending,
  variant,
}: {
  title: string;
  author: string;
  handle: string;
  bid: string;
  ending: string;
  variant: "v1" | "v2" | "v3";
}) {
  const bg =
    variant === "v1"
      ? "bg-[radial-gradient(circle_at_15%_20%,#a78bfa_0%,#4f46e5_45%,#0b1220_100%)]"
      : variant === "v2"
      ? "bg-[radial-gradient(circle_at_15%_20%,#22d3ee_0%,#f97316_45%,#0b1220_100%)]"
      : "bg-[radial-gradient(circle_at_15%_20%,#f472b6_0%,#7c3aed_45%,#0b1220_100%)]";

  return (
    <div className={["relative h-[260px] overflow-hidden rounded-2xl border border-white/10", bg].join(" ")}>
      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-slate-900/35 p-4 text-white backdrop-blur">
        <div className="text-lg font-extrabold">{title}</div>

        <div className="mt-2 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/20" />
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">{author}</div>
            <div className="text-xs text-white/75">{handle}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-white/80">
          <div>
            <div className="font-semibold text-white/70">Highest Bid</div>
            <div className="mt-1 font-extrabold text-white">{bid}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-white/70">Ending - In</div>
            <div className="mt-1 font-extrabold text-white">{ending}</div>
          </div>
        </div>

        <button className="mt-3 w-full rounded-xl bg-white/90 px-3 py-2 text-sm font-extrabold text-slate-900 hover:bg-white">
          Place Bid
        </button>
      </div>
    </div>
  );
}

/* ---------- Simple SVG chart ---------- */
function SimpleChart() {
  return (
    <div className="mt-3">
      <svg viewBox="0 0 600 220" className="h-[180px] w-full">
        <path
          d="M20 160 L80 140 L140 150 L200 120 L260 135 L320 110 L380 125 L440 90 L500 105 L560 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-indigo-600"
        />
        <path
          d="M20 160 L80 140 L140 150 L200 120 L260 135 L320 110 L380 125 L440 90 L500 105 L560 80 L560 200 L20 200 Z"
          className="fill-indigo-600/10"
        />
        <line x1="20" y1="200" x2="580" y2="200" className="stroke-slate-200" />
        <line x1="20" y1="40" x2="20" y2="200" className="stroke-slate-200" />
      </svg>
    </div>
  );
}
