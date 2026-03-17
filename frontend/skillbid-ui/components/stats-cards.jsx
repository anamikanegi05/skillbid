"use client"

import { TrendingUp, DollarSign, Briefcase, Clock } from "lucide-react"

function StatCard({ title, value, change, icon, trend = "neutral" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {change && (
          <span
            className={`ml-2 text-sm ${
              trend === "up"
                ? "text-green-500"
                : trend === "down"
                ? "text-red-500"
                : "text-muted-foreground"
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  )
}

export function StatsCards() {
  const stats = [
    {
      title: "Earnings This Month",
      value: "$4,250",
      change: "+12%",
      icon: <DollarSign className="size-5 text-primary" />,
      trend: "up",
    },
    {
      title: "Active Projects",
      value: "3",
      icon: <Briefcase className="size-5 text-primary" />,
    },
    {
      title: "Profile Views",
      value: "148",
      change: "+23%",
      icon: <TrendingUp className="size-5 text-primary" />,
      trend: "up",
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-8%",
      icon: <Clock className="size-5 text-primary" />,
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
