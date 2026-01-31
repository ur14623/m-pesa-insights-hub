import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TriggeredSMSList from "./pages/TriggeredSMSList";
import TriggeredSMSDetail from "./pages/TriggeredSMSDetail";
import InboxList from "./pages/InboxList";
import InboxDetail from "./pages/InboxDetail";
import CreateSMS from "./pages/CreateSMS";
import ContactListsPage from "./pages/ContactListsPage";
import ContactListDetail from "./pages/ContactListDetail";
import ContactGroupsPage from "./pages/ContactGroupsPage";
import ContactGroupDetail from "./pages/ContactGroupDetail";
import SegmentsPage from "./pages/SegmentsPage";
import SegmentDetail from "./pages/SegmentDetail";
import BlacklistPage from "./pages/BlacklistPage";
import BlacklistDetail from "./pages/BlacklistDetail";
import DeliveryReportsPage from "./pages/reports/DeliveryReportsPage";
import OperatorPerformancePage from "./pages/reports/OperatorPerformancePage";
import CostReportsPage from "./pages/reports/CostReportsPage";
// Audit & Compliance
import AuditLogsPage from "./pages/audit/AuditLogsPage";
import SLAStatusPage from "./pages/audit/SLAStatusPage";
// Users & Roles
import UserListPage from "./pages/users/UserListPage";
import UserFormPage from "./pages/users/UserFormPage";
import RolesPage from "./pages/users/RolesPage";
// System Settings
import SenderIDPage from "./pages/settings/SenderIDPage";
import APIWebhooksPage from "./pages/settings/APIWebhooksPage";
import RoutingRulesPage from "./pages/settings/RoutingRulesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/messaging/create" element={<CreateSMS />} />
          <Route path="/messaging/triggered-sms" element={<TriggeredSMSList />} />
          <Route path="/messaging/triggered-sms/:id" element={<TriggeredSMSDetail />} />
          <Route path="/messaging/inbox" element={<InboxList />} />
          <Route path="/messaging/inbox/:id" element={<InboxDetail />} />
          {/* Contact Management Routes */}
          <Route path="/contacts/lists" element={<ContactListsPage />} />
          <Route path="/contacts/lists/:id" element={<ContactListDetail />} />
          <Route path="/contacts/groups" element={<ContactGroupsPage />} />
          <Route path="/contacts/groups/:id" element={<ContactGroupDetail />} />
          <Route path="/contacts/segments" element={<SegmentsPage />} />
          <Route path="/contacts/segments/:id" element={<SegmentDetail />} />
          <Route path="/contacts/blacklist" element={<BlacklistPage />} />
          <Route path="/contacts/blacklist/:id" element={<BlacklistDetail />} />
          {/* Reports Routes */}
          <Route path="/reports/delivery" element={<DeliveryReportsPage />} />
          <Route path="/reports/operators" element={<OperatorPerformancePage />} />
          <Route path="/reports/costs" element={<CostReportsPage />} />
          {/* Audit & Compliance Routes */}
          <Route path="/audit/logs" element={<AuditLogsPage />} />
          <Route path="/audit/sla" element={<SLAStatusPage />} />
          {/* Users & Roles Routes */}
          <Route path="/users/list" element={<UserListPage />} />
          <Route path="/users/list/new" element={<UserFormPage />} />
          <Route path="/users/list/:id" element={<UserFormPage />} />
          <Route path="/users/roles" element={<RolesPage />} />
          {/* System Settings Routes */}
          <Route path="/settings/sender-ids" element={<SenderIDPage />} />
          <Route path="/settings/api" element={<APIWebhooksPage />} />
          <Route path="/settings/routing" element={<RoutingRulesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
