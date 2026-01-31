import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Send,
  FileStack,
  Inbox,
  BookUser,
  Users,
  Ban,
  BarChart3,
  TrendingUp,
  DollarSign,
  FileText,
  Shield,
  UserCog,
  Settings,
  Server,
  Webhook,
  Route,
  ScrollText,
  Activity,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isCollapsed: boolean;
}

interface NavChild {
  title: string;
  icon: React.ElementType;
  path: string;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  children: NavChild[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { title: "Overview", icon: LayoutDashboard, path: "/" },
    ],
  },
  {
    title: "Messaging",
    icon: MessageSquare,
    children: [
      { title: "Create SMS", icon: Send, path: "/messaging/create" },
      { title: "Triggered SMS", icon: FileStack, path: "/messaging/triggered-sms" },
      { title: "Inbox (Replies)", icon: Inbox, path: "/messaging/inbox" },
    ],
  },
  {
    title: "Contacts",
    icon: BookUser,
    children: [
      { title: "Contact Lists", icon: Users, path: "/contacts/lists" },
      { title: "Groups", icon: Users, path: "/contacts/groups" },
      { title: "Segments", icon: Users, path: "/contacts/segments" },
      { title: "Blacklist", icon: Ban, path: "/contacts/blacklist" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { title: "Delivery Reports", icon: FileText, path: "/reports/delivery" },
      { title: "Operator Performance", icon: TrendingUp, path: "/reports/operators" },
      { title: "Cost Reports", icon: DollarSign, path: "/reports/costs" },
    ],
  },
  {
    title: "System Settings",
    icon: Settings,
    children: [
      { title: "Sender IDs", icon: Server, path: "/settings/sender-ids" },
      { title: "API & Webhooks", icon: Webhook, path: "/settings/api" },
      { title: "Routing Rules", icon: Route, path: "/settings/routing" },
    ],
  },
  {
    title: "Audit & Compliance",
    icon: ScrollText,
    children: [
      { title: "Audit Logs", icon: FileText, path: "/audit/logs" },
      { title: "SLA Status", icon: Activity, path: "/audit/sla" },
    ],
  },
  {
    title: "Users & Roles",
    icon: UserCog,
    children: [
      { title: "Users", icon: Users, path: "/users/list" },
      { title: "Roles", icon: Shield, path: "/users/roles" },
    ],
  },
];

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard", "Messaging", "Reports"]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (item: NavItem) => {
    return item.children.some((child) => location.pathname === child.path);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-64px)] bg-sidebar border-r border-sidebar-border overflow-y-auto transition-all duration-300 z-40",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <nav className="py-4">
          {navItems.map((item) => (
            <div key={item.title}>
              {isCollapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={cn(
                        "nav-item w-full justify-center px-0",
                        isParentActive(item) && "text-sidebar-primary bg-sidebar-accent"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="p-0 bg-sidebar border-sidebar-border">
                    <div className="py-2 min-w-[160px]">
                      <div className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase">
                        {item.title}
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                            isActive(child.path) && "bg-sidebar-accent text-sidebar-primary font-medium"
                          )}
                        >
                          <child.icon className="h-4 w-4" />
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={cn(
                      "nav-item w-full justify-between",
                      isParentActive(item) && "text-sidebar-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{item.title}</span>
                    </div>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.title) && (
                    <div className="bg-sidebar-accent/30">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "nav-item pl-12",
                            isActive(child.path) && "nav-item-active"
                          )}
                        >
                          <child.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm">{child.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
