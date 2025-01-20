import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { routeTree } from './routeTree.gen.ts'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import Store from './store/store.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react';
import { ToastProvider } from '@radix-ui/react-toast'

const router = createRouter({ routeTree })
const queryClient = new QueryClient()
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"} >
    <QueryClientProvider client={queryClient}>
        <Store>
          <RouterProvider router={router} />
        </Store>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
