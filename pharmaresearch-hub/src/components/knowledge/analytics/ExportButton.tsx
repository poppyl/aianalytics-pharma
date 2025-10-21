import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileJson, FileSpreadsheet, FileText } from "lucide-react";
import { AnalyticsSnapshot } from "@/types/knowledge";
import { useToast } from "@/hooks/use-toast";

interface ExportButtonProps {
  data: AnalyticsSnapshot | undefined;
}

export const ExportButton = ({ data }: ExportButtonProps) => {
  const { toast } = useToast();

  const handleExport = (format: "json" | "csv" | "pdf") => {
    if (!data) {
      toast({
        title: "No data to export",
        description: "Please wait for analytics data to load.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement actual export functionality
    toast({
      title: "Export initiated",
      description: `Exporting analytics data as ${format.toUpperCase()}...`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("json")}>
          <FileJson className="mr-2 h-4 w-4" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
