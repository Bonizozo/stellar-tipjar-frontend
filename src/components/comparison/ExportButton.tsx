"use client";

import { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { useCreatorStats } from "@/hooks/queries/useCreatorStats";
import type { SelectedCreator } from "./CreatorComparison";

interface ExportButtonProps {
  creators: SelectedCreator[];
}

export function ExportButton({ creators }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  
  // Fetch stats for all creators
  const statsQueries = creators.map(creator => 
    useCreatorStats(creator.username)
  );

  const exportToCSV = async () => {
    setIsExporting(true);
    
    try {
      const statsData = statsQueries.map(query => query.data).filter(Boolean);
      
      // Prepare CSV data
      const headers = [
        'Creator Name',
        'Username',
        'Total Tips (XLM)',
        'Tip Count',
        'Unique Supporters',
        'Average Tip (XLM)',
        'Top Supporter Amount (XLM)',
        'Recent Activity 7d (XLM)'
      ];

      const rows = creators.map((creator, index) => {
        const stats = statsData[index];
        const recentActivity = stats?.tipHistory 
          ? stats.tipHistory.slice(-7).reduce((sum, day) => sum + day.amount, 0)
          : 0;
        
        return [
          creator.displayName,
          creator.username,
          stats?.totalAmountXlm || 0,
          stats?.tipCount || 0,
          stats?.uniqueSupporters || 0,
          stats && stats.tipCount > 0 ? (stats.totalAmountXlm / stats.tipCount).toFixed(2) : 0,
          stats?.topSupporters?.[0]?.totalAmount || 0,
          recentActivity.toFixed(2)
        ];
      });

      // Create CSV content
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `creator-comparison-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = async () => {
    setIsExporting(true);
    
    try {
      const statsData = statsQueries.map(query => query.data).filter(Boolean);
      
      const exportData = {
        exportDate: new Date().toISOString(),
        creators: creators.map((creator, index) => {
          const stats = statsData[index];
          return {
            displayName: creator.displayName,
            username: creator.username,
            stats: {
              totalAmountXlm: stats?.totalAmountXlm || 0,
              tipCount: stats?.tipCount || 0,
              uniqueSupporters: stats?.uniqueSupporters || 0,
              averageTip: stats && stats.tipCount > 0 ? stats.totalAmountXlm / stats.tipCount : 0,
              topSupporters: stats?.topSupporters || [],
              tipHistory: stats?.tipHistory || []
            }
          };
        })
      };

      // Download JSON
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json;charset=utf-8;' 
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `creator-comparison-${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (creators.length < 2) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={exportToCSV}
        disabled={isExporting}
        className="text-ink/70 hover:text-ink"
      >
        <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
        Export CSV
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={exportToJSON}
        disabled={isExporting}
        className="text-ink/70 hover:text-ink"
      >
        <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
        Export JSON
      </Button>
    </div>
  );
}