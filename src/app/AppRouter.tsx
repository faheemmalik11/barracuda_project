import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { DashboardLayout } from '@shared/components/layout'
import { Skeleton } from '@shared/components/ui/skeleton'
import { ProtectedRoute, AuthProvider } from '@shared/components/auth'

// Import eager components
import { HomePage } from '@shared/components/pages/home-page'
import { LoginPage } from '@shared/components/pages/LoginPage'
import { MerchantsListPage } from '@features/merchants'
import { EcommerceListPage } from '@features/ecommerce/pages/EcommerceListPage'
import PaymentsListPage from '@/features/payments/pages/PaymentsListPage'
import { TerminalDetailPage } from '@/features/in-stores/pages/TerminalDetailPage'
import { InventoryDetailPage } from '@/features/in-stores/pages/InventoryDetailPage'
import { OrderDetailPage } from '@/features/in-stores/pages/OrderDetailPage'

// Lazy load components
const CustomersListPage = lazy(() => import('@features/customers').then(m => ({ default: m.CustomersListPage })))
const CustomerDetailsPage = lazy(() => import('@shared/components/pages/CustomerDetailsPage'))
const PaymentDetailsPage = lazy(() => import('@shared/components/pages/PaymentDetailsPage'))
const PaymentLinkDetailsPage = lazy(() => import('@shared/components/pages/PaymentLinkDetailsPage'))
const EcommerceDetailsPage = lazy(() => import('@shared/components/pages/EcommerceDetailsPage'))
const CreatePaymentPage = lazy(() => import('@shared/components/pages/create-payment-page'))
const DisputesListPage = lazy(() => import('@features/disputes').then(m => ({ default: m.DisputesListPage })))
const RefundsListPage = lazy(() => import('@features/refunds').then(m => ({ default: m.RefundsListPage })))
const OrdersListPage = lazy(() => import('@features/orders').then(m => ({ default: m.OrdersListPage })))
const ProductsListPage = lazy(() => import('@features/products').then(m => ({ default: m.ProductsListPage })))
const BalancesPage = lazy(() => import('@shared/components/pages/balances-page'))
const BillingOverviewPage = lazy(() => import('@features/billing').then(m => ({ default: m.BillingOverviewPage })))
const SettingsPage = lazy(() => import('@shared/components/pages/settings-page'))
const CreateMerchantPage = lazy(() => import('@shared/components/pages/create-merchant-page'))

// Services pages
const RadarPage = lazy(() => import('@features/risk').then(m => ({ default: m.RadarPage })))
const EngagementListPage = lazy(() => import('@shared/components/pages/engagement-list-page'))
const InStoresPage = lazy(() => import('@features/in-stores/pages/InStoresPage'))
const CheckoutPage = lazy(() => import('@shared/components/pages/checkout-page'))
const PaymentLinksPage = lazy(() => import('@shared/components/pages/payment-links-page'))
const DigitalListPage = lazy(() => import('@features/digital').then(m => ({ default: m.DigitalListPage })))
const InvoicesPage = lazy(() => import('@shared/components/pages/invoices-page'))
const MeteringPage = lazy(() => import('@shared/components/pages/metering-page'))
const SubscriptionsPage = lazy(() => import('@shared/components/pages/subscriptions-page'))
const RevenueRecognitionPage = lazy(() => import('@shared/components/pages/revenue-recognition-page'))

// Business Tools pages
const MembersListPage = lazy(() => import('@features/members').then(m => ({ default: m.MembersListPage })))
const ClearingListPage = lazy(() => import('@shared/components/pages/clearing-list-page'))
const SettlementListPage = lazy(() => import('@features/settlements').then(m => ({ default: m.SettlementListPage })))
const ReconciliationsListPage = lazy(() => import('@shared/components/pages/reconciliations-list-page'))

// Layout wrapper components
const ListLayoutWrapper = () => (
  <ProtectedRoute>
    <DashboardLayout showTopNav={true}>
      <Suspense fallback={
        <div className="flex h-64 items-center justify-center">
          <Skeleton.Page layout="dashboard" />
        </div>
      }>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  </ProtectedRoute>
)

const DetailLayoutWrapper = () => (
  <ProtectedRoute>
    <DashboardLayout showTopNav={false}>
      <Suspense fallback={
        <div className="flex h-64 items-center justify-center">
          <Skeleton.Page layout="dashboard" />
        </div>
      }>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  </ProtectedRoute>
)

// Modern router configuration with nested layout routes
const router = createBrowserRouter([
  // Auth routes (no layout)
  {
    path: '/login',
    element: <LoginPage />
  },
  
  // List pages with top navigation
  {
    element: <ListLayoutWrapper />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/payments',
        element: <PaymentsListPage />
      },
      {
        path: '/payments/create',
        element: <CreatePaymentPage />
      },
      {
        path: '/customers',
        element: <CustomersListPage />
      },
      {
        path: '/merchants',
        element: <MerchantsListPage />
      },
      {
        path: '/merchants/create',
        element: <CreateMerchantPage />
      },
      {
        path: '/balances',
        element: <BalancesPage />
      },
      {
        path: '/billing-overview',
        element: <BillingOverviewPage />
      },
      {
        path: '/orders',
        element: <OrdersListPage />
      },
      {
        path: '/disputes',
        element: <DisputesListPage />
      },
      {
        path: '/refunds',
        element: <RefundsListPage />
      },
      {
        path: '/products',
        element: <ProductsListPage />
      },
      {
        path: '/settings',
        element: <SettingsPage />
      },
      // Services routes
      {
        path: '/radar',
        element: <RadarPage />
      },
      {
        path: '/engagement',
        element: <EngagementListPage />
      },
      {
        path: '/in-stores',
        element: <InStoresPage />,
        children: [
          {
            path: '',
            element: <Navigate to="/in-stores/terminals" replace />
          },
          {
            path: 'terminals',
            element: <div />
          },
          {
            path: 'inventory', 
            element: <div />
          },
          {
            path: 'orders',
            element: <div />
          }
        ]
      },
      {
        path: '/ecommerce',
        element: <EcommerceListPage />
      },
      {
        path: '/checkout',
        element: <CheckoutPage />
      },
      {
        path: '/payment-links',
        element: <PaymentLinksPage />
      },
      {
        path: '/digital',
        element: <DigitalListPage />
      },
      {
        path: '/invoices',
        element: <InvoicesPage />
      },
      {
        path: '/metering',
        element: <MeteringPage />
      },
      {
        path: '/subscriptions',
        element: <SubscriptionsPage />
      },
      {
        path: '/revenue-recognition',
        element: <RevenueRecognitionPage />
      },
      // Business Tools routes
      {
        path: '/members',
        element: <MembersListPage />
      },
      {
        path: '/clearing',
        element: <ClearingListPage />
      },
      {
        path: '/settlement',
        element: <SettlementListPage />
      },
      {
        path: '/reconciliations',
        element: <ReconciliationsListPage />
      }
    ]
  },
  
  // Detail pages without top navigation
  {
    element: <DetailLayoutWrapper />,
    children: [
      {
        path: '/payments/:id',
        element: <PaymentDetailsPage />
      },
      {
        path: '/customers/:id',
        element: <CustomerDetailsPage />
      },
      {
        path: '/ecommerce/:id',
        element: <EcommerceDetailsPage />
      },
      {
        path: '/in-stores/terminals/:id',
        element: <TerminalDetailPage />
      },
      {
        path: '/in-stores/inventory/:id',
        element: <InventoryDetailPage />
      },
      {
        path: '/in-stores/orders/:id',
        element: <OrderDetailPage />
      },
      {
        path: '/payment-links/:id',
        element: <PaymentLinkDetailsPage />
      }
    ]
  }
])

export const AppRouter = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
export default AppRouter
