import { LayoutDashboard, TrendingUp, Users, Smartphone, Download, UserPlus, UserMinus, ArrowUpCircle, ChevronRight, Database, Settings, Megaphone, Headphones } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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

const basePreparation = [
  { title: "Existing Pin Reset", url: "/base-prep/existing-pinreset" },
  { title: "GA Pin Reset", url: "/base-prep/ga-pinreset" },
  { title: "CBE", url: "/base-prep/cbe" },
  { title: "Winback Churner", url: "/base-prep/winback-churner" },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className={!open ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar border-r border-sidebar-border shadow-elegant overflow-hidden">
        {/* Header Section */}
        {open && (
          <div className="px-4 py-3 border-b border-sidebar-border/50">
            <div className="relative inline-block">
              <h2 className="text-base font-bold bg-gradient-primary bg-clip-text text-transparent">
                CVM Metrics
              </h2>
              <div className="absolute -inset-2 bg-gradient-primary opacity-20 blur-xl -z-10" />
            </div>
            <p className="text-xs text-sidebar-foreground/60 mt-0.5">Real-time analytics</p>
          </div>
        )}

        {/* Navigation Section */}
        <SidebarGroup className={open ? "px-3 py-2" : "px-1 py-2"}>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {/* Dashboard Overview */}
              <SidebarMenuItem className="animate-fade-in">
                <SidebarMenuButton asChild className={`group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 ${!open ? "justify-center" : ""}`}>
                  <NavLink 
                    to="/" 
                    end
                    className="relative z-10"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-sidebar-primary"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                    <LayoutDashboard className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                    {open && <span className="text-sm transition-colors">Dashboard Overview</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Metrics - Collapsible */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className={`group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 ${!open ? "justify-center" : ""}`}>
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                      <TrendingUp className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                      {open && <span className="text-sm transition-colors">Metrics</span>}
                      {open && <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {metrics.map((metric, idx) => (
                        <SidebarMenuSubItem key={metric.title} className="animate-fade-in" style={{ animationDelay: `${idx * 20}ms` }}>
                          <SidebarMenuSubButton asChild className="group relative overflow-hidden hover:bg-sidebar-accent/80 transition-all duration-300">
                            <NavLink
                              to={metric.url}
                              end
                              className="relative z-10"
                              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            >
                              <metric.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                              {open && <span className="text-xs">{metric.title}</span>}
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Base Preparation - Collapsible */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className={`group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 ${!open ? "justify-center" : ""}`}>
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                      <Database className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                      {open && <span className="text-sm transition-colors">Base Preparation</span>}
                      {open && <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {basePreparation.map((item, idx) => (
                        <SidebarMenuSubItem key={item.title} className="animate-fade-in" style={{ animationDelay: `${idx * 20}ms` }}>
                          <SidebarMenuSubButton asChild className="group relative overflow-hidden hover:bg-sidebar-accent/80 transition-all duration-300">
                            <NavLink
                              to={item.url}
                              end
                              className="relative z-10"
                              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            >
                              {open && <span className="text-xs">{item.title}</span>}
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Campaign Management */}
              <SidebarMenuItem className="animate-fade-in">
                <SidebarMenuButton asChild className={`group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 ${!open ? "justify-center" : ""}`}>
                  <NavLink 
                    to="/campaign-management" 
                    end
                    className="relative z-10"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-sidebar-primary"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                    <Megaphone className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                    {open && <span className="text-sm transition-colors">Campaign Management</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Ops Support */}
              <SidebarMenuItem className="animate-fade-in">
                <SidebarMenuButton asChild className={`group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 ${!open ? "justify-center" : ""}`}>
                  <NavLink 
                    to="/ops-support" 
                    end
                    className="relative z-10"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-sidebar-primary"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                    <Headphones className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                    {open && <span className="text-sm transition-colors">Ops Support</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
