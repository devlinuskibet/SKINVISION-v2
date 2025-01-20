import DashboardLayout from '@/layouts/DashboardLayout'
import { SignInButton, useAuth, useUser } from '@clerk/clerk-react'
import { createFileRoute, Outlet, useLocation, useParams } from '@tanstack/react-router'
import Lottie from 'lottie-react'
import LoadingAnimation from '../../public/Animation - 1729510714673.json'
import { ReactSVG } from 'react-svg'
import { Button } from '@/components/ui/button'
export const Route = createFileRoute('/dashboard')({
  component: Dashboard
})

function Dashboard(){
  const location = useLocation()
  const pathname = location.href.split('/')[3]
  const {user} = useUser();
  const {userId, isLoaded} = useAuth()
  
  if(!isLoaded) {
    return (
      <div className='w-full h-screen overflow-hidden'>
        <Lottie animationData={LoadingAnimation} loop={true}  /> 
      </div>
    )
  }
  if (!userId && isLoaded) {
    return (
      <div className='w-full h-full'>
        <ReactSVG src='/public/InternalServerError.svg' className='w-full h-full flex items-center justify-center overflow-auto' />
      </div>
    )
  }
  if(!user && !isLoaded){
    return (
      <div className='w-screen h-screen '>
        <ReactSVG src='/public/Unauthorized.svg' className='object-center w-full h-full object-contain' />
        <SignInButton>
          <Button variant={"default"}>
            Back To Login
          </Button>
        </SignInButton>
      </div>
    )
  }
  return (
    <DashboardLayout userId={userId} pathname={pathname}>
      <Outlet />
    </DashboardLayout>
  )
}

