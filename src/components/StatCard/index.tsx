"use client";

import React from "react";
import { AnimatedCounter } from "./AnimatedCounter";
import { TrendIndicator } from "./TrendIndicator";
import { Sparkline } from "./Sparkline";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  sparklineData?: { date: string; amount: number }[];
  prefix?: string;
  suffix?: string;
  decimals?: number;
  loading?: boolean;
  confidence?: number;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  sparklineData,
  prefix = "",
  suffix = "",
  decimals = 0,
  loading = false,
  confidence,
}: StatCardProps) {
  if (loading) {
    return (
      <div className="bg-[color:var(--surface)] dark:bg-gray-800 rounded-2xl p-6 border border-ink/10 shadow-card animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-ink/5 rounded-lg" />
          <div className="w-16 h-6 bg-ink/5 rounded-full" />
        </div>
        <div className="h-8 w-24 bg-ink/5 rounded mb-2" />
        <div className="h-4 w-16 bg-ink/5 rounded" />
        <div className="mt-4 h-12 w-full bg-ink/5 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-[color:var(--surface)] dark:bg-gray-800 rounded-2xl p-6 border border-ink/10 shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-wave/10 dark:bg-wave/20 rounded-lg text-wave">
          {icon}
        </div>
        {trend !== undefined && <TrendIndicator value={trend} />}
      </div>
      
      <h3 className="text-3xl font-bold text-ink dark:text-white">
        <AnimatedCounter 
          value={value} 
          prefix={prefix} 
          suffix={suffix} 
          decimals={decimals} 
        />
      </h3>
      
      <p className="text-sm font-medium text-ink/60 dark:text-gray-400 mt-1 uppercase tracking-wide">
        {label}
        {confidence && (
          <span className="ml-2 text-xs text-wave font-normal normal-case">
            ({(confidence * 100).toFixed(0)}% confidence)
          </span>
        )}
      </p>
      
      {sparklineData && (
        <div className="mt-4 pt-4 border-t border-ink/5">
          <Sparkline data={sparklineData} color={trend && trend < 0 ? "#ef4444" : "#8b5cf6"} />
        </div>
      )}
    </div>
  );
}
