import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/components/ui/tabs'
import { Button } from '@shared/components/ui/button'
import { Download, Plus, Package } from 'lucide-react'
import { TerminalsListPage } from './TerminalsListPage'
import { InventoryListPage } from '@features/in-stores/pages/InventoryListPage'
import { OrdersListPage } from '@features/in-stores/pages/OrdersListPage'

export function InStoresPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Callback handlers for child components
  const [terminalsHandlers, setTerminalsHandlers] = useState<{
    handleExportTerminals?: () => void
    handleAddTerminal?: () => void
  }>({})
  const [inventoryHandlers, setInventoryHandlers] = useState<{
    handleOrderTerminal?: () => void
  }>({})
  const [ordersHandlers, setOrdersHandlers] = useState<{
    handleOrderTerminal?: () => void
  }>({})
  
  // Extract the current tab from the URL path
  const getCurrentTab = () => {
    const path = location.pathname
    if (path.includes('/inventory')) return 'inventory'
    if (path.includes('/orders')) return 'orders'
    return 'terminals'
  }
  
  const [activeTab, setActiveTab] = useState(getCurrentTab)
  const [closePanelsTrigger, setClosePanelsTrigger] = useState(0)
  
  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(getCurrentTab())
  }, [location.pathname])
  
  // Handle tab change and update URL
  const handleTabChange = (tab: string) => {
    // Trigger panel closure by incrementing the trigger
    setClosePanelsTrigger(prev => prev + 1)
    
    setActiveTab(tab)
    navigate(`/in-stores/${tab}`)
  }

  // Handle action buttons based on active tab
  const handleExport = () => {
    terminalsHandlers.handleExportTerminals?.()
  }

  const handleAddTerminal = () => {
    terminalsHandlers.handleAddTerminal?.()
  }

  const handleOrderTerminal = () => {
    if (activeTab === 'inventory') {
      inventoryHandlers.handleOrderTerminal?.()
    } else if (activeTab === 'orders') {
      ordersHandlers.handleOrderTerminal?.()
    }
  }

  // Render action buttons based on active tab
  const renderActionButtons = () => {
    switch (activeTab) {
      case 'terminals':
        return (
          <>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddTerminal}>
              <Plus className="h-4 w-4 mr-2" />
              Add Terminal
            </Button>
          </>
        )
      case 'inventory':
        return (
          <Button onClick={handleOrderTerminal}>
            <Package className="h-4 w-4 mr-2" />
            Order Terminal
          </Button>
        )
      case 'orders':
        return (
          <Button onClick={handleOrderTerminal}>
            <Package className="h-4 w-4 mr-2" />
            Order Terminal
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">In-Stores</h1>
            <p className="text-muted-foreground">
              Manage terminals, inventory, and orders for your physical locations
            </p>
          </div>
          <div className="flex gap-2">
            {renderActionButtons()}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
          <div className="flex-shrink-0 border-b bg-background px-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="terminals">Terminals</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="terminals" className="h-full m-0 p-0">
              {/* TerminalsListPage with callback handlers */}
              <TerminalsListPage 
                key={`terminals-${activeTab}`} 
                closePanelsTrigger={closePanelsTrigger}
                onHandlersReady={setTerminalsHandlers}
              />
            </TabsContent>

            <TabsContent value="inventory" className="h-full m-0 p-0">
              <InventoryListPage 
                key={`inventory-${activeTab}`} 
                closePanelsTrigger={closePanelsTrigger}
                onHandlersReady={setInventoryHandlers}
              />
            </TabsContent>

            <TabsContent value="orders" className="h-full m-0 p-0">
              <OrdersListPage 
                key={`orders-${activeTab}`} 
                closePanelsTrigger={closePanelsTrigger}
                onHandlersReady={setOrdersHandlers}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default InStoresPage
