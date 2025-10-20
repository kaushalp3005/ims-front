import type React from "react"

interface TransferLayoutProps {
  children: React.ReactNode
  params: { company: string }
}

export default function TransferLayout({ children, params }: TransferLayoutProps) {
  return <>{children}</>
}
