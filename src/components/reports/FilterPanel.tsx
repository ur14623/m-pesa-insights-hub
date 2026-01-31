import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

export interface FilterOption {
  id: string;
  label: string;
  type: "select" | "input";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface FilterPanelProps {
  filters: FilterOption[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onClear: () => void;
}

const FilterPanel = ({ filters, values, onChange, onClear }: FilterPanelProps) => {
  const hasActiveFilters = Object.values(values).some((v) => v && v !== "all");

  return (
    <Card className="border border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">Filters</span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="ml-auto text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{filter.label}</Label>
              {filter.type === "select" ? (
                <Select
                  value={values[filter.id] || "all"}
                  onValueChange={(value) => onChange(filter.id, value)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder={filter.placeholder || "Select..."} />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">All</SelectItem>
                    {filter.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={values[filter.id] || ""}
                  onChange={(e) => onChange(filter.id, e.target.value)}
                  placeholder={filter.placeholder}
                  className="h-9"
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
