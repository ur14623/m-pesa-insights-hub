import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex flex-1 pt-16">
        <Sidebar isCollapsed={sidebarCollapsed} />
        <main
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarCollapsed ? "ml-16" : "ml-64"
          )}
        >
          <div className="min-h-[calc(100vh-128px)] p-6">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
