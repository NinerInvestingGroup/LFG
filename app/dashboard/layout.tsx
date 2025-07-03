"use client"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Add authentication check here
  // For now, allowing access to dashboard for development
  
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  )
}
