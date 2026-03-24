/**
 * Utility for exporting data to CSV format.
 */

export interface CSVColumn {
  key: string;
  label: string;
}

export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: CSVColumn[],
  filename: string
): void {
  if (data.length === 0) {
    return;
  }

  // Create CSV header
  const header = columns.map((col) => col.label).join(",");

  // Create CSV rows
  const rows = data.map((item) => {
    return columns
      .map((col) => {
        const value = item[col.key];
        const stringValue = value !== null && value !== undefined ? String(value) : "";
        
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        
        return stringValue;
      })
      .join(",");
  });

  // Combine header and rows
  const csv = [header, ...rows].join("\n");

  // Create blob and download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
