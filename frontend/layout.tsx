import { SidebarProvider, SidebarTrigger } from "./src/components/ui/sidebar"
import React from "react"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}