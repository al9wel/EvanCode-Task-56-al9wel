type DashboardEmptyStateProps = {
  message?: string
}

const DashboardEmptyState = ({
  message = "لا توجد بيانات متاحة حالياً",
}: DashboardEmptyStateProps) => {
  return (
    <div className="flex min-h-48 w-full items-center justify-center rounded-xl border border-dashed text-muted-foreground text-sm">
      {message}
    </div>
  )
}

export default DashboardEmptyState
