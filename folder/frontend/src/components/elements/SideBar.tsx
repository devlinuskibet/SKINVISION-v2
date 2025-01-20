import { GanttChart, HamIcon, LucideIcon } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { FileRouteTypes } from "@/routeTree.gen";
export type TSideBar = {
    label: string,
    icon: LucideIcon,
    path?: FileRouteTypes["to"],
    from?: FileRouteTypes["id"],
    params?: string
    hash?:string
}
export default function SideBar({navLinks}: { navLinks: TSideBar[]}) {
  return (
    <Sheet>
        <SheetTrigger className="sm:hidden" asChild>
            <Button variant={"outline"} className="flex items-center">
                <GanttChart className="size-8 stroke-foreground" />
            </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col space-y-3">
              <SheetHeader>
                  <p className="text-foreground text-lg">SKYNVISION</p>
              </SheetHeader>
            {navLinks.map((elem) => (
                <Link to={elem.path} from={elem.from} hash={elem.hash}>
                    {({ isActive }) => (
                        <li className={`w-full flex space-x-4 hover:bg-primary/20 p-3 rounded-md ${isActive ? "bg-primary/35" : ""}`}>
                            <elem.icon className="size-8" />
                            <p className="text-lg font-medium">{elem.label}</p>
                        </li>
                    )} 
                </Link>
            ))}
              <SheetFooter>
                  @SkynVision 2024
              </SheetFooter>
        </SheetContent>
    </Sheet>
  )
}
