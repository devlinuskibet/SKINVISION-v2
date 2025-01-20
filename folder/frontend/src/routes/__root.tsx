import { ToastProvider } from '@/components/ui/toast'
import { Link, Navigate, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout
})


function RootLayout() {
  return (
    <div className='w-screen h-screen'>
      <main className='w-full h-full'>
        <ToastProvider />
        <Outlet />
      </main>
    </div>

  )
}

