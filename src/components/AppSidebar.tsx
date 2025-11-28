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
      <SidebarContent className="bg-sidebar border-r border-sidebar-border shadow-elegant flex flex-col h-full">
        {/* Header Section */}
        {open && (
          <div className="px-4 py-5 border-b border-sidebar-border/50 flex-shrink-0">
            <div className="relative inline-block">
              <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                CVM Metrics
              </h2>
              <div className="absolute -inset-2 bg-gradient-primary opacity-20 blur-xl -z-10" />
            </div>
            <p className="text-xs text-sidebar-foreground/60 mt-1">Real-time analytics</p>
          </div>
        )}

        {/* Dashboard Section */}
        <SidebarGroup className="px-3 py-4 flex-shrink-0">
          <SidebarGroupLabel className="text-xs font-bold text-sidebar-foreground/50 uppercase tracking-widest px-3 mb-3 flex items-center gap-2">
            {open && "Dashboard"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="group relative overflow-hidden rounded-xl hover:bg-sidebar-accent/80 transition-all duration-300 my-1">
                  <NavLink 
                    to="/" 
                    end
                    className="relative z-10"
                    activeClassName="bg-gradient-primary text-white font-semibold shadow-elegant"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                    <LayoutDashboard className="h-5 w-5 transition-transform group-hover:scale-110" />
                    {open && <span className="text-sm">Dashboard Overview</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4 my-2 bg-sidebar-border/30 flex-shrink-0" />

        {/* Metrics Section - Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 py-2 min-h-0">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-bold text-sidebar-foreground/50 uppercase tracking-widest px-3 mb-3 flex items-center gap-2 sticky top-0 bg-sidebar z-10 py-2">
              {open && "Metrics"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {metrics.map((metric, idx) => (
                  <SidebarMenuItem key={metric.title} className="animate-fade-in" style={{ animationDelay: `${idx * 30}ms` }}>
                    <SidebarMenuButton asChild className="group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300">
                      <NavLink
                        to={metric.url}
                        end
                        className="relative z-10"
                        activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-sidebar-primary"
                      >
                        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                        <metric.icon className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                        {open && <span className="text-sm transition-colors">{metric.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Footer */}
        {open && (
          <div className="px-4 py-4 border-t border-sidebar-border/50 flex-shrink-0">
            <div className="flex items-center gap-3 px-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="text-xs text-sidebar-foreground/60">
                <p className="font-medium text-sidebar-foreground">System Active</p>
                <p className="text-sidebar-foreground/40">All metrics live</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
