import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$userId')({
  component: UserDashboard

  
})

function UserDashboard(){
  return(
    <div className='w-full'>
      <Outlet />
    </div>
  )
}
