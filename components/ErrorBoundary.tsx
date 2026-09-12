"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-12 shadow-sm">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-[#171430]">Something went wrong</h3>
          <p className="mt-1 max-w-sm text-center text-xs text-[#77758d]">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 rounded-xl bg-[#f0eefb] px-4 py-2 text-xs font-bold text-[#2f2b69]"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
