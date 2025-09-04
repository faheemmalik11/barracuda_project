import { subDays, subHours, subMinutes } from "date-fns"
import { Terminal } from "../types/terminals"

export const mockTerminals: Terminal[] = [
  {
    id: "tmr_1234567890",
    name: "Main Checkout Terminal",
    serialNumber: "VF-CHK-001",
    status: "online",
    location: {
      name: "Downtown Store",
      address: "123 Main Street",
      city: "San Francisco",
      state: "CA"
    },
    model: "Verifone P400",
    deviceType: "Verifone P400",
    batteryLevel: 85,
    lastSeen: subMinutes(new Date(), 5).toISOString(),
    createdAt: subDays(new Date(), 30).toISOString(),
    firmware: "3.4.2",
    registeredTo: "Sarah Johnson",
    transactionRef: "txn_ref_001",
    label: "Main Checkout Terminal"
  },
  {
    id: "tmr_2345678901",
    name: "Mobile Payment Terminal",
    serialNumber: "SQ-MOB-002",
    status: "online",
    location: {
      name: "Food Truck",
      address: "456 Oak Avenue",
      city: "Oakland",
      state: "CA"
    },
    model: "Square Terminal",
    deviceType: "Square Terminal",
    batteryLevel: 67,
    lastSeen: subMinutes(new Date(), 2).toISOString(),
    createdAt: subDays(new Date(), 45).toISOString(),
    firmware: "1.8.3",
    registeredTo: "Mike Chen",
    transactionRef: "txn_ref_002",
    label: "Mobile Payment Terminal"
  },
  {
    id: "tmr_3456789012",
    name: "Checkout Terminal 2",
    serialNumber: "VF-CHK-003",
    status: "offline",
    location: {
      name: "Westfield Mall",
      address: "865 Market Street",
      city: "San Francisco",
      state: "CA"
    },
    model: "Verifone P400",
    deviceType: "Verifone P400",
    batteryLevel: 0,
    lastSeen: subHours(new Date(), 3).toISOString(),
    createdAt: subDays(new Date(), 60).toISOString(),
    firmware: "3.4.1",
    registeredTo: "Lisa Rodriguez",
    transactionRef: "txn_ref_003",
    label: "Checkout Terminal 2"
  },
  {
    id: "tmr_4567890123",
    name: "Pop-up Stand Terminal",
    serialNumber: "SQ-POP-004",
    status: "error",
    location: {
      name: "Farmers Market",
      address: "Ferry Building",
      city: "San Francisco",
      state: "CA"
    },
    model: "Square Terminal",
    deviceType: "Square Terminal",
    batteryLevel: 23,
    lastSeen: subHours(new Date(), 1).toISOString(),
    createdAt: subDays(new Date(), 15).toISOString(),
    firmware: "1.8.2",
    registeredTo: "David Kim",
    transactionRef: "txn_ref_004",
    label: "Pop-up Stand Terminal"
  },
  {
    id: "tmr_5678901234",
    name: "Backup Terminal",
    serialNumber: "ST-BAK-005",
    status: "maintenance",
    location: {
      name: "Storage Room",
      address: "123 Main Street",
      city: "San Francisco",
      state: "CA"
    },
    model: "Stripe Reader S700",
    deviceType: "Stripe Reader S700",
    batteryLevel: 100,
    lastSeen: subDays(new Date(), 2).toISOString(),
    createdAt: subDays(new Date(), 90).toISOString(),
    firmware: "1.1.9",
    registeredTo: "Sarah Johnson",
    transactionRef: "txn_ref_005",
    label: "Backup Terminal"
  },
  {
    id: "tmr_6789012345",
    name: "Drive-thru Terminal",
    serialNumber: "BB-DRV-006",
    status: "online",
    location: {
      name: "Coffee Shop Drive-thru",
      address: "456 Oak Avenue",
      city: "Oakland",
      state: "CA"
    },
    model: "BBPOS Chipper 2X BT",
    deviceType: "BBPOS Chipper 2X BT",
    batteryLevel: 91,
    lastSeen: subMinutes(new Date(), 1).toISOString(),
    createdAt: subDays(new Date(), 20).toISOString(),
    firmware: "2.0.5",
    registeredTo: "Emma Wilson",
    transactionRef: "txn_ref_006",
    label: "Drive-thru Terminal"
  },
  {
    id: "tmr_7890123456",
    name: "Kiosk Terminal A",
    serialNumber: "VF-KSK-007",
    status: "online",
    location: {
      name: "Airport Terminal 1",
      address: "San Francisco International Airport",
      city: "San Francisco",
      state: "CA"
    },
    model: "Verifone P400",
    deviceType: "Verifone P400",
    batteryLevel: 100,
    lastSeen: subMinutes(new Date(), 3).toISOString(),
    createdAt: subDays(new Date(), 120).toISOString(),
    firmware: "3.4.2",
    registeredTo: "Airport Services",
    transactionRef: "txn_ref_007",
    label: "Kiosk Terminal A"
  },
  {
    id: "tmr_8901234567",
    name: "Delivery Terminal",
    serialNumber: "SQ-DEL-008",
    status: "offline",
    location: {
      name: "Delivery Van #3",
      address: "Mobile Unit",
      city: "San Francisco",
      state: "CA"
    },
    model: "Square Terminal",
    deviceType: "Square Terminal",
    batteryLevel: 12,
    lastSeen: subHours(new Date(), 6).toISOString(),
    createdAt: subDays(new Date(), 35).toISOString(),
    firmware: "1.8.1",
    registeredTo: "Delivery Co",
    transactionRef: "txn_ref_008",
    label: "Delivery Terminal"
  }
]
