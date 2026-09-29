export default function AppShell({ children, className = '' }) {
  return (
    <div className={`min-h-[100dvh] w-full bg-[#F5F6FA] ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
