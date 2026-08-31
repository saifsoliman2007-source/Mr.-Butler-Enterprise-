import React from 'react';
import { ComponentStateMode } from './ServiceCardState';
import { SkeletonCard, SkeletonList } from './LoadingSkeleton';
import { EmptyStateView } from './EmptyStateView';
import { ErrorStateView } from './ErrorStateView';
import { Language } from '../../types';

export type { ComponentStateMode };

interface EnterpriseStateBoundaryProps {
  state: ComponentStateMode;
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  errorTitle?: string;
  errorDescription?: string;
  errorCode?: string;
  onRetry?: () => void;
  lang?: Language;
  className?: string;
}

export const EnterpriseStateBoundary: React.FC<EnterpriseStateBoundaryProps> = ({
  state,
  children,
  loadingFallback,
  emptyTitle = 'No Enterprise Records Found',
  emptyDescription = 'There are no active entries matching the specified enterprise query.',
  emptyActionLabel,
  onEmptyAction,
  errorTitle = 'Enterprise Telemetry Unreachable',
  errorDescription = 'Failed to synchronize with the backend service hub. Please verify connectivity or retry.',
  errorCode = 'ERR_STATE_BOUNDARY_500',
  onRetry,
  lang = 'en',
  className = ''
}) => {
  if (state === 'loading') {
    return (
      <div className={className}>
        {loadingFallback || <SkeletonList count={3} />}
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className={className}>
        <ErrorStateView
          title={errorTitle}
          description={errorDescription}
          errorCode={errorCode}
          onRetry={onRetry}
          lang={lang}
        />
      </div>
    );
  }

  if (state === 'empty') {
    return (
      <div className={className}>
        <EmptyStateView
          title={emptyTitle}
          description={emptyDescription}
          primaryActionLabel={emptyActionLabel}
          onPrimaryAction={onEmptyAction}
          lang={lang}
        />
      </div>
    );
  }

  if (state === 'unavailable') {
    return (
      <div className={`opacity-60 pointer-events-none ${className}`}>
        {children}
      </div>
    );
  }

  if (state === 'disabled') {
    return (
      <div className={`opacity-50 grayscale pointer-events-none ${className}`}>
        {children}
      </div>
    );
  }

  // Available / Success state
  return <div className={className}>{children}</div>;
};
