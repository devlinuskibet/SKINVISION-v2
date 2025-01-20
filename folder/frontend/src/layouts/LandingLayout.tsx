import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Link, Outlet } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, useAuth, useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { DollarSign, Home, Info, Library, LogOut, Smartphone } from "lucide-react";
import SideBar from "@/components/elements/SideBar";

export default function LandingLayout({children}: {children: React.ReactElement[] | React.ReactElement}) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate()
  if(!isLoaded) return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-lg font-medium">
        Loading....
      </p>
    </div>
  )
  return (
        //root container
    /**@todo: remember to remove the max-h-screen property */
    <div className='w-screen h-screen min-h-screen text-foreground' >
      <main className='bg-background h-full w-full relative flex-col flex gap-3'>
        <nav className='w-full p-3 md:w-2/3 bg-transparent backdrop-blur-md shadow-lg ring absolute z-20  top-2 rounded-xl left-1/2 transform -translate-x-1/2 flex justify-around items-center '>
          <span className="flex space-x-3">
            <Smartphone className="h-6 w-6 text-primary" />
            <span className="ml-2 text-2xl font-bold text-primary">SkinVision AI</span>
          </span>
          <ul className=' hidden sm:flex space-x-3'>
            <li className='text-lg'>
              <Link to='.' hash="#home">
                {({ isActive }) => {
                  return (
                    <p className={`${isActive ? "bg-primary/10" : ""} p-2 rounded-md text-foreground`}>Home</p>
                  )
                }}
              </Link>

            </li>
            <li className='text-lg'>
              <Link to='.' hash="home">
                {({ isActive }) => {
                  return (
                    <p className={`${isActive ? "bg-primary/10" : ""} p-2 rounded-md text-foreground`}>About</p>
                  )
                }}
              </Link>
            </li>
            <li className="text-lg">
              <Link to='.' hash="features">
                {({ isActive }) => {
                  return (
                    <p className={`${isActive ? "bg-primary/10" : ""} p-2 rounded-md text-foreground`}>Features</p>
                  )
                }}
              </Link>
            </li>
            <li className="text-lg">
              <Link to='.' hash="pricing">
                {({ isActive }) => {
                  return (
                    <p className={`${isActive ? "bg-primary/10" : ""} p-2 rounded-md text-foreground`}>Pricing</p>
                  )
                }}
              </Link>
            </li>
            <li className='text-lg'>
              <SignedIn>
                <Link to='/dashboard/$userId' params={{ userId: userId ? userId : ''}}>
                  {({ isActive }) => {
                    return (
                      <p className={`${isActive ? "bg-primary/10" : ""} p-2 rounded-md text-foreground`}>Dashboard</p>
                    )
                  }}
                </Link>
              </SignedIn>
            </li>
          </ul>
          <div className='hidden sm:flex space-x-3'>
            <SignedOut>
                <SignInButton forceRedirectUrl={"/dashboard/$userId"}>
                  <Button variant={"outline"} className='bg-transparent'>Login</Button>
                </SignInButton>
            </SignedOut>
            <SignedOut>
                <SignUpButton forceRedirectUrl={"/register"}>
                  <Button variant={"default"}>Register</Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                <Button variant={"outline"} className="p-6">
                  <LogOut className="size-5 mr-3" />
                  Log Out 
                </Button>
              </SignOutButton>
            </SignedIn>
        
          </div>
          <span className='sm:hidden size-10 border flex items-center justify-center rounded-md p-2 hover:bg-primary/20'>
            <SideBar navLinks={[{icon: Home, path: "/", from: "/", label: "Home"}, {icon: Info, path: "/", from: "/", label: "About", hash: "how-it-works"}, {icon: Library, path: "/", label: "Features", hash: "features"}, {icon: DollarSign, path: "/", label: "Pricing", hash: "pricing"}]} />
          </span>
        </nav>
        {children}
      </main>
      
    </div>

  )
}
