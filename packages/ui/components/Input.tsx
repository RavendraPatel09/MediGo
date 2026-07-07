import React from 'react';
import { cn } from '@medicycle/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-xl border border-white/10 bg-surfaceSecondary px-3 py-2 text-sm text-white placeholder:text-white/30',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
