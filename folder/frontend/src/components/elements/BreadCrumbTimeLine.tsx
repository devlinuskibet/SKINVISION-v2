import { Link } from "@tanstack/react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export default function BreadCrumbTimeLine({path }: {path: string}) {
  return (
    <Breadcrumb className="w-full min-h-7">
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink>
                    <Link to="/" from="/dashboard">
                        Home 
                    </Link> 
                </BreadcrumbLink> 
            </BreadcrumbItem> 
            <BreadcrumbSeparator />
              <BreadcrumbItem>
                  <BreadcrumbLink>
                      <Link to="/" from="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
              </BreadcrumbItem> 
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                  <BreadcrumbPage>{path}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
  )
}
