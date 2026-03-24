"use client";

import { Component, ReactNode } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface Props {
  children: ReactNode;
  /** Optional custom fallback — receives error + reset fn */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    logError(error, { componentStack: info.componentStack });
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      if (fallback) return fallback(error, this.reset);
      return (
        <ErrorFallback
          error={error}
          reset={this.reset}
          showDetails={process.env.NODE_ENV === "development"}
        />
      );
    }

    return children;
  }
}
