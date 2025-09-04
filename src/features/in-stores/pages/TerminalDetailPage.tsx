import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { DetailHeader } from '../components/detail/DetailHeader'
import { 
  ActivitySection,
  HardwareSection,
  ConnectivitySection,
  ServicesSection,
  VisualSection,
  IntegrationSection,
  OrderSection
} from '@shared/components/panels/terminals/components'
import { Settings, Power, AlertTriangle } from 'lucide-react'
import { TerminalService } from '../services/terminal.service'

export function TerminalDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [terminal, setTerminal] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTerminal = async () => {
      try {
        const terminalData = await TerminalService.getTerminalById(id || 'T001')
        setTerminal(terminalData || {
          id: id || 'T001',
          serialNumber: 'VX520-2024-001',
          model: 'Verifone VX520',
          status: 'active' as const,
          location: 'Main Store - Checkout 1',
          store: 'Downtown Location',
          lastSeen: new Date().toISOString(),
          installDate: '2024-01-15',
          firmwareVersion: '2.1.4',
          batteryLevel: 85,
          ipAddress: '192.168.1.101',
          connectionType: 'wifi' as const
        })
      } catch (error) {
        console.error('Failed to fetch terminal:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTerminal()
  }, [id])

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'inactive': return 'secondary'
      case 'maintenance': return 'destructive'
      default: return 'secondary'
    }
  }

  const handleBack = () => {
    navigate('/in-stores/terminals')
  }

  const headerActions = [
    {
      label: 'Restart Terminal',
      onClick: () => console.log('Restart terminal'),
      icon: Power
    },
    {
      label: 'Configure',
      onClick: () => console.log('Configure terminal'),
      icon: Settings
    },
    {
      label: 'Report Issue',
      onClick: () => console.log('Report issue'),
      icon: AlertTriangle
    }
  ]

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading terminal details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!terminal) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Terminal not found</p>
            <button 
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Back to Terminals
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <DetailHeader
        title={`Terminal ${terminal.id}`}
        subtitle={terminal.location}
        status={terminal.status.replace('_', ' ')}
        statusVariant={getStatusVariant(terminal.status)}
        onBack={handleBack}
        actions={headerActions}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-none w-full">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Activity & Hardware */}
            <div className="xl:col-span-2 space-y-6">
              <ActivitySection terminalData={terminal} />
              <HardwareSection terminalData={terminal} />
            </div>

            {/* Middle Column - Connectivity & Services */}
            <div className="space-y-6">
              <ConnectivitySection terminalData={terminal} />
              <ServicesSection terminalData={terminal} />
            </div>

            {/* Right Column - Visual, Integration & Orders */}
            <div className="space-y-6">
              <VisualSection terminalData={terminal} />
              <IntegrationSection terminalData={terminal} />
              <OrderSection terminalData={terminal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
