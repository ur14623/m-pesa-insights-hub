import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Radio,
} from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MessageVolumeChart from "@/components/dashboard/MessageVolumeChart";
import DeliveryStatusChart from "@/components/dashboard/DeliveryStatusChart";
import OperatorPerformanceTable from "@/components/dashboard/OperatorPerformanceTable";
import RoutingHealth from "@/components/dashboard/RoutingHealth";
import IncomingMessages from "@/components/dashboard/IncomingMessages";
import CostUtilization from "@/components/dashboard/CostUtilization";
import SystemHealth from "@/components/dashboard/SystemHealth";
import AIModeration from "@/components/dashboard/AIModeration";
import UserActivity from "@/components/dashboard/UserActivity";
import QuickActionsGrid from "@/components/dashboard/QuickActionsGrid";
import ComplianceStatus from "@/components/dashboard/ComplianceStatus";

const Dashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Header Summary Area */}
      <DashboardHeader lastUpdated={lastUpdated} onRefresh={handleRefresh} />

      {/* Section 2: KPI Summary Cards (Row 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard
          title="Total Messages Sent"
          value="182,450"
          subtitle="Today"
          icon={Send}
          variant="primary"
          trend={{ value: 12.5, isPositive: true }}
        />
        <KPICard
          title="Successfully Delivered"
          value="178,230"
          subtitle="97.7% success rate"
          icon={CheckCircle}
          variant="success"
          trend={{ value: 2.3, isPositive: true }}
        />
        <KPICard
          title="Failed Messages"
          value="4,220"
          subtitle="Network timeout"
          icon={AlertTriangle}
          variant="danger"
          trend={{ value: 0.5, isPositive: false }}
        />
        <KPICard
          title="Incoming Messages"
          value="1,420"
          subtitle="47 new/unread"
          icon={MessageSquare}
          variant="warning"
          trend={{ value: 8.2, isPositive: true }}
        />
        <KPICard
          title="Active Sender IDs"
          value="6"
          subtitle="Approved & active"
          icon={Radio}
          variant="primary"
        />
      </div>

      {/* Section 3: Messaging Performance Analytics (Row 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MessageVolumeChart />
        </div>
        <div>
          <DeliveryStatusChart />
        </div>
      </div>

      {/* Section 4: Operator & Routing Performance (Row 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OperatorPerformanceTable />
        <RoutingHealth />
      </div>

      {/* Section 5: Incoming Messages & Cost Utilization (Row 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomingMessages />
        <CostUtilization />
      </div>

      {/* Section 6: System Health & AI Moderation (Row 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemHealth />
        <AIModeration />
      </div>

      {/* Section 7: User Activity & Compliance (Row 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserActivity />
        <ComplianceStatus />
      </div>

      {/* Section 8: Quick Action Shortcuts (Bottom) */}
      <QuickActionsGrid />
    </div>
  );
};

export default Dashboard;
