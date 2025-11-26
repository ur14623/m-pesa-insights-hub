import { MetricCard } from "@/components/MetricCard";
import { useNavigate } from "react-router-dom";

const metrics = [
  { title: "Active Total", slug: "active-total" },
  { title: "Active New", slug: "active-new" },
  { title: "Active Existing", slug: "active-existing" },
  { title: "Active Existing Transacting", slug: "active-existing-transacting" },
  { title: "Active New Transacting", slug: "active-new-transacting" },
  { title: "Active Micro Merchants", slug: "active-micro-merchants" },
  { title: "Active Unified Merchants", slug: "active-unified-merchants" },
  { title: "Active App Users", slug: "active-app-users" },
  { title: "App Downloads", slug: "app-downloads" },
  { title: "Non-Gross Adds", slug: "non-gross-adds" },
  { title: "Gross Adds", slug: "gross-adds" },
  { title: "Top Up", slug: "top-up" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">MPESA CVM Dashboard</h2>
        <p className="text-muted-foreground mt-1">Overview of all key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.slug}
            title={metric.title}
            onNavigate={() => navigate(`/metric/${metric.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}
