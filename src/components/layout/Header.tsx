import { Bell, ChevronDown, Globe, Menu, Settings, LogOut, User } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onMenuToggle: () => void;
}

const languages = [
  { code: "en", name: "English" },
  { code: "am", name: "አማርኛ" },
  { code: "or", name: "Afaan Oromo" },
  { code: "ti", name: "ትግርኛ" },
];

const Header = ({ onMenuToggle }: HeaderProps) => {
  const [currentLang, setCurrentLang] = useState("en");
  const [notificationCount] = useState(3);

  return (
    <header className="h-16 bg-header text-header-foreground border-b border-sidebar-border flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="text-header-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">SMS</span>
          </div>
          <div className="hidden md:block">
            <h1 className="font-semibold text-sm">National SMS Platform</h1>
            <p className="text-xs text-muted-foreground">Dairy Sector</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-header-foreground hover:bg-sidebar-accent gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">
                {languages.find((l) => l.code === currentLang)?.name}
              </span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setCurrentLang(lang.code)}
                className={currentLang === lang.code ? "bg-muted" : ""}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-header-foreground hover:bg-sidebar-accent relative"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card border-border">
            <div className="p-3 border-b border-border">
              <h3 className="font-semibold text-sm">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <span className="font-medium text-sm">Delivery Issue Detected</span>
                <span className="text-xs text-muted-foreground">
                  Ethio Telecom reporting 15% failure rate
                </span>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <span className="font-medium text-sm">System Alert</span>
                <span className="text-xs text-muted-foreground">
                  Queue threshold reached - 50,000 messages pending
                </span>
                <span className="text-xs text-muted-foreground">4 hours ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <span className="font-medium text-sm">AI Content Flag</span>
                <span className="text-xs text-muted-foreground">
                  Message blocked by policy: promotional content
                </span>
                <span className="text-xs text-muted-foreground">6 hours ago</span>
              </DropdownMenuItem>
            </div>
            <div className="p-2 border-t border-border">
              <Button variant="ghost" className="w-full text-sm">
                View All Notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="text-header-foreground hover:bg-sidebar-accent hidden sm:flex"
        >
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-header-foreground hover:bg-sidebar-accent gap-2"
            >
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Abebe Kebede</p>
                <p className="text-xs text-muted-foreground">System Admin</p>
              </div>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <div className="p-3 border-b border-border">
              <p className="font-medium text-sm">Abebe Kebede</p>
              <p className="text-xs text-muted-foreground">abebe.kebede@moa.gov.et</p>
              <p className="text-xs text-muted-foreground mt-1">Role: System Admin</p>
            </div>
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
