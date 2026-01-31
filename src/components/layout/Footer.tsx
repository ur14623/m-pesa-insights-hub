import { Circle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="h-16 bg-footer border-t border-border px-6 flex items-center justify-between text-footer-foreground text-sm">
      {/* Left Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <span className="font-medium">
          © 2026 National SMS Platform – Dairy Sector
        </span>
        <span className="hidden sm:inline text-muted-foreground">|</span>
        <span className="text-muted-foreground text-xs sm:text-sm">
          Ministry of Agriculture
        </span>
      </div>

      {/* Center Section - Links */}
      <div className="hidden md:flex items-center gap-4 text-xs">
        <a href="#" className="hover:text-primary transition-colors">
          Privacy Policy
        </a>
        <span className="text-muted-foreground">|</span>
        <a href="#" className="hover:text-primary transition-colors">
          Terms of Use
        </a>
        <span className="text-muted-foreground">|</span>
        <a href="#" className="hover:text-primary transition-colors">
          Data Protection
        </a>
        <span className="text-muted-foreground">|</span>
        <a href="#" className="hover:text-primary transition-colors">
          SLA
        </a>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">System Status:</span>
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 fill-success text-success" />
            <span className="text-success font-medium">Operational</span>
          </div>
        </div>
        <span className="hidden lg:inline text-muted-foreground">
          v1.0.0 | Last Updated: Jan 2026
        </span>
      </div>
    </footer>
  );
};

export default Footer;
