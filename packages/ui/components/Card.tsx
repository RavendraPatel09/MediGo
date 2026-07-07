import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@medicycle/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-xl overflow-hidden',
          glass ? 'glass-card' : 'bg-surface border border-white/5',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
