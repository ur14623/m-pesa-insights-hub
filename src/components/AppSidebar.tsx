import { LayoutDashboard, TrendingUp, Users, Smartphone, Download, UserPlus, UserMinus, ArrowUpCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const metrics = [
  { title: "Active Total", url: "/metric/active-total", icon: TrendingUp },
  { title: "Active New", url: "/metric/active-new", icon: UserPlus },
  { title: "Active Existing", url: "/metric/active-existing", icon: Users },
  { title: "Active Existing Transacting", url: "/metric/active-existing-transacting", icon: TrendingUp },
  { title: "Active New Transacting", url: "/metric/active-new-transacting", icon: UserPlus },
  { title: "Active Micro Merchants", url: "/metric/active-micro-merchants", icon: Users },
  { title: "Active Unified Merchants", url: "/metric/active-unified-merchants", icon: Users },
  { title: "Active App Users", url: "/metric/active-app-users", icon: Smartphone },
  { title: "App Downloads", url: "/metric/app-downloads", icon: Download },
  { title: "Non-Gross Adds", url: "/metric/non-gross-adds", icon: UserMinus },
  { title: "Gross Adds", url: "/metric/gross-adds", icon: UserPlus },
  { title: "Top Up", url: "/metric/top-up", icon: ArrowUpCircle },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className={!open ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider px-3 mb-2">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-lg hover:bg-sidebar-accent transition-all">
                  <NavLink 
                    to="/" 
                    end
                    className="hover:bg-sidebar-accent"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {open && <span>Dashboard Overview</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-3 my-2" />

        <SidebarGroup className="px-2 py-2">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider px-3 mb-2">
            Metrics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {metrics.map((metric) => (
                <SidebarMenuItem key={metric.title}>
                  <SidebarMenuButton asChild className="rounded-lg hover:bg-sidebar-accent transition-all">
                    <NavLink
                      to={metric.url}
                      end
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <metric.icon className="h-4 w-4" />
                      {open && <span>{metric.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
