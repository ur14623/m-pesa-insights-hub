import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Send,
  FileStack,
  Clock,
  Inbox,
  BookUser,
  Users,
  Ban,
  BarChart3,
  TrendingUp,
  DollarSign,
  FileText,
  Brain,
  FileWarning,
  Shield,
  UserCog,
  Settings,
  Server,
  Webhook,
  Route,
  HeadphonesIcon,
  Ticket,
  HelpCircle,
  ScrollText,
  Activity,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  children?: { title: string; icon: React.ElementType; path: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Messaging",
    icon: MessageSquare,
    children: [
      { title: "Create SMS", icon: Send, path: "/messaging/create" },
      { title: "Triggered SMS", icon: FileStack, path: "/messaging/triggered-sms" },
      { title: "Scheduled SMS", icon: Clock, path: "/messaging/scheduled" },
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
      { title: "Custom Reports", icon: FileText, path: "/reports/custom" },
    ],
  },
  {
    title: "AI Content Review",
    icon: Brain,
    children: [
      { title: "AI Logs", icon: FileWarning, path: "/ai/logs" },
      { title: "Policy Rules", icon: Shield, path: "/ai/policies" },
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
    title: "Support",
    icon: HeadphonesIcon,
    children: [
      { title: "Tickets", icon: Ticket, path: "/support/tickets" },
      { title: "Help & Docs", icon: HelpCircle, path: "/support/help" },
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
];

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Messaging", "Reports"]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (item: NavItem) => {
    if (!item.children) return false;
    return item.children.some((child) => location.pathname === child.path);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-64px)] bg-sidebar border-r border-sidebar-border overflow-y-auto transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <nav className="py-4">
        {navItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <>
                <button
                  onClick={() => !isCollapsed && toggleExpanded(item.title)}
                  className={cn(
                    "nav-item w-full justify-between",
                    isParentActive(item) && "text-sidebar-primary",
                    isCollapsed && "justify-center px-0"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">{item.title}</span>}
                  </div>
                  {!isCollapsed && (
                    expandedItems.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )
                  )}
                </button>
                {!isCollapsed && expandedItems.includes(item.title) && (
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
            ) : (
              <Link
                to={item.path || "/"}
                className={cn(
                  "nav-item",
                  isActive(item.path) && "nav-item-active",
                  isCollapsed && "justify-center px-0"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm">{item.title}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
