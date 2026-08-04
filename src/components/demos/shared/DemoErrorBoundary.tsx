"use client";

import { Component, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

type DemoErrorBoundaryProps = {
  children: ReactNode;
  fallbackTitle?: string;
  className?: string;
};

type DemoErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Isolates demo failures so case-study content remains readable.
 */
export class DemoErrorBoundary extends Component<
  DemoErrorBoundaryProps,
  DemoErrorBoundaryState
> {
  override state: DemoErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): DemoErrorBoundaryState {
    return { hasError: true };
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className={cn(
            "border-border-subtle bg-surface-1 space-y-3 rounded-[var(--radius-md)] border p-4 sm:p-6",
            this.props.className,
          )}
        >
          <Text variant="meta" className="text-warning">
            Simulation unavailable
          </Text>
          <Text className="text-pretty">
            {this.props.fallbackTitle ??
              "This portfolio simulation could not load. The case-study explanation above and below remains available."}
          </Text>
          <Button type="button" variant="secondary" onClick={this.handleReset}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
