import { AppSidebar } from "./app-sidebar"
import { TopNavigation } from "./top-navigation"
import { SidebarInset, SidebarProvider } from "@shared/components/ui/sidebar"
import { PanelInset, PanelsProvider } from "@shared/components/panels"

interface DashboardLayoutProps {
  children: React.ReactNode
  showTopNav?: boolean
}

export const DashboardLayout = ({ children, showTopNav = true }: DashboardLayoutProps): JSX.Element => {
  return (
    <PanelsProvider>
      <SidebarProvider>
        <div className="relative flex h-screen w-full overflow-hidden bg-background">
          <AppSidebar />
          <SidebarInset className="flex min-w-0 flex-1 flex-col">
            <PanelInset className="flex flex-col h-full" enablePanelPush={showTopNav}>
              {showTopNav && <TopNavigation />}
              <main className="relative flex-1 overflow-y-auto">
                <div className="min-h-full px-4 py-4 sm:px-6 lg:px-8">
                  {children}
                </div>
              </main>
            </PanelInset>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </PanelsProvider>
  )
}
