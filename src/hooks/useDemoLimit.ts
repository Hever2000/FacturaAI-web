'use client';

import { useState, useEffect, useCallback } from 'react';

const DEMO_USAGE_KEY = 'demo_usage_count';
const MAX_FREE_USAGES = 1;

interface DemoLimitState {
  usageCount: number;
  hasReachedLimit: boolean;
  incrementUsage: () => void;
  isLoading: boolean;
}

export function useDemoLimit(isAuthenticated: boolean): DemoLimitState {
  const [usageCount, setUsageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const stored = localStorage.getItem(DEMO_USAGE_KEY);
    const count = stored ? parseInt(stored, 10) : 0;
    setUsageCount(count);
    setIsLoading(false);
  }, [isAuthenticated]);

  const incrementUsage = useCallback(() => {
    if (isAuthenticated) return;

    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(DEMO_USAGE_KEY, newCount.toString());
  }, [isAuthenticated, usageCount]);

  return {
    usageCount,
    hasReachedLimit: !isAuthenticated && usageCount >= MAX_FREE_USAGES,
    incrementUsage,
    isLoading,
  };
}
