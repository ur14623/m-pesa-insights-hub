import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="h-16 border-b bg-card flex items-center px-6 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger />
        <h1 className="text-xl font-bold text-primary">MPESA-CVM</h1>
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Efrem</span> | Admin
      </div>
    </header>
  );
}
