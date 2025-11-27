import { SidebarTrigger } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b bg-card flex items-center px-6 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger />
        <h1 className="text-xl font-bold text-primary">MPESA-CVM</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-none">
          <span className="font-medium text-foreground">Efrem</span> | Admin
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
