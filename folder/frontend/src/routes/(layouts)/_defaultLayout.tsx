import { Button } from '@/components/ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(layouts)/_defaultLayout')({
  component: () => <div>Hello /(layouts)/_defaultLayout!</div>,
})


function DefaultLayout(){
  return(
    //root container
    /**@todo: remember to remove the max-h-screen property */
    <div className='w-screen h-screen max-h-screen relative text-foreground' >
      <nav className='z-50 w-full p-3 sm:w-2/3 bg-transparent backdrop-blur-md shadow-lg ring fixed top-2 rounded-xl left-1/2 transform -translate-x-1/2 flex justify-between items-center'>
        <p className='text-xl font-medium text-foreground'>SKYNVISION</p>
        <ul className=' hidden sm:flex space-x-3'>
          <li className='text-lg'>
            <Link to='/'>
              {({ isActive }) => {
                return (
                  <p className={`${isActive ? "bg-primary/10" : ""} p-2 rounded-md text-foreground`}>Home</p>
                )
              }}
            </Link>

          </li>
          <li className='text-lg'>
            <Link to='/about'>
              {({ isActive }) => {
                return (
                  <p className={`${isActive ? "bg-primary/10" : ""} p-2 rounded-md text-foreground`}>About</p>
                )
              }}
            </Link>
          </li>
          <li className='text-lg'>
            <Link to='/dashboard/$userId' params={{ userId: "Chris" }}>
              {({ isActive }) => {
                return (
                  <p className={`${isActive ? "bg-primary/10" : ""} p-2 rounded-md text-foreground`}>Dashboard</p>
                )
              }}
            </Link>
          </li>
        </ul>
        <div className='hidden sm:flex space-x-3'>
          <Button variant={"outline"} className='bg-transparent'>Login</Button>
          <Button variant={"default"}>Register</Button>
        </div>
        <span className='sm:hidden size-10 border rounded-md p-2 hover:bg-primary/20'>
          <HamburgerMenuIcon className='size-full' />
        </span>
      </nav>
      <main className='bg-background w-full h-full'>
        <Outlet />
      </main>
    </div>

  )
}