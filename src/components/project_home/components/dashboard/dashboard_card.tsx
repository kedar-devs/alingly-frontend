function DashboardCard({ title, value, change }: { title: string, value: number, change: number }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="p-6">
        <h4 className="text-lg font-bold mb-6">{title}</h4>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold">{value}</h3>
          <span className={`text-sm font-medium ${change >= 0 ? 'text-status-green' : 'text-status-red'}`}>
            {change >= 0 ? '+' : '-'}{change}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard