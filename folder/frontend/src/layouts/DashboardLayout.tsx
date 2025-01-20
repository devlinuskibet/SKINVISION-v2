import BreadCrumbTimeLine from "@/components/elements/BreadCrumbTimeLine";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignedIn, SignOutButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import {Activity, FolderTree, Home, LogOut, ScanEye} from 'lucide-react'
import React from "react";
import { Button } from "../components/ui/button";
import SideBar from "@/components/elements/SideBar";

export default function DashboardLayout({children, userId, pathname}: {children: React.ReactElement, userId:string, pathname: string}) {
  return (
    <div className="w-full h-full flex items-center space-x-5 border p-3 relative bg-background bg-no-repeat bg-cover">
        <Card className="hidden sm:block w-[500px] rounded-md h-full bg-primary/10 backdrop-blur-md shadow-lg ">
            <CardHeader>
                <CardTitle>SKYNVISION</CardTitle>
                <CardDescription>We treat you remotely with no worries</CardDescription>
            </CardHeader>
            <CardContent className=" w-full  space-y-5">
                <nav className="w-full min-h-max  flex flex-col justify-between">
                    <ul className="flex flex-col space-y-6 p-3 w-full">
                        <Link to="/dashboard/$userId" params={{userId: userId}}>
                          {({isActive}) => (
                                  <li className={`w-full flex space-x-4 hover:bg-primary/20 p-3 rounded-md ${isActive ? "bg-primary/35" : ""}`}>
                                      <Home className="size-8" />
                                      <p className="text-lg font-medium">Home</p>
                                  </li>
                            )} 
                        </Link>
                        <Link to="/dashboard/$userId/activity" params={{userId: userId}}>
                          {({isActive}) => (
                                  <li className={`w-full flex space-x-4 hover:bg-primary/20 p-3 rounded-md ${isActive ? "bg-primary/35" : ""}`}>
                                      <Activity className="size-8" />
                                      <p className="text-lg font-medium">Recent Activity</p>
                                  </li>
                              )} 
                        </Link>
                          <Link to="/dashboard/$userId/analyzer" params={{ userId: userId}}>
                              {({ isActive }) => (
                                  <li className={`w-full flex space-x-4 hover:bg-primary/20 p-3 rounded-md ${isActive ? "bg-primary/35" : ""}`}>
                                      <ScanEye className="size-8" />
                                      <p className="text-lg font-medium">AI Analyzer</p>
                                  </li>
                              )}
                          </Link>
                          <Link to="/dashboard/$userId/reports" params={{ userId: userId}}>
                              {({ isActive }) => (
                                  <li className={`w-full flex space-x-4 hover:bg-primary/20 p-3 rounded-md ${isActive ? "bg-primary/35" : ""}`}>
                                      <FolderTree className="size-8" />
                                      <p className="text-lg font-medium">Reports</p>
                                  </li>
                              )}
                          </Link>
                    </ul>
                </nav>
                  <CardFooter>
                      <SignedIn>
                          <SignOutButton>
                              <Button className="w-full space-x-3 p-6" variant={"outline"}>
                                  <LogOut className="mr-3" />
                                  Log Out
                              </Button>
                          </SignOutButton>
                      </SignedIn>
                  </CardFooter>
            </CardContent>
        </Card>
        {/* BreadCrumb section */}


        {/* Main content section */}
        <main className="w-full h-full flex  flex-col items-center p-3  overflow-y-scroll space-y-4 rounded-md backdrop-blur-2xl shadow-lg">
           <div className="flex justify-center items-center w-full p-3">
                <span className="hidden sm:flex rounded-md items-center justify-between bg-primary/5 px-4 py-2">
                    <BreadCrumbTimeLine path={pathname} />
                </span>
                <SideBar navLinks={[{icon: ScanEye, label: "AI Analyzer",path: "/dashboard/$userId/analyzer", params: userId, from: "/dashboard" }, {icon: FolderTree, label: "Reports",path: "/dashboard/$userId/reports", params: userId, from: "/dashboard" }]} />
           </div>
           {children}
        </main>
    </div>
  )
}
