import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const gradientVariants = {
  none: '',
  primary: 'before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] before:bg-gradient-to-br before:from-[#6F1C80]/50 before:to-[#32446C]/50 before:-z-10',
  secondary: 'before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] before:bg-gradient-to-br before:from-[#8B3A9C]/50 before:to-[#6F1C80]/50 before:-z-10',
  accent: 'before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] before:bg-gradient-to-br before:from-[#9333EA]/50 before:to-[#6F1C80]/50 before:-z-10',
  success: 'before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] before:bg-gradient-to-br before:from-emerald-500/50 before:to-cyan-500/50 before:-z-10',
};

const paddingSizes = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

export const GlassCard = forwardRef(function GlassCard(
  {
    children,
    gradient = 'none',
    padding = 'md',
    hover = true,
    glow = false,
    className,
    as = 'div',
    ...props
  },
  ref
) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      className={cn(
        'relative rounded-2xl',
        'bg-white/5 backdrop-blur-xl',
        'border border-white/10',
        hover && 'hover:bg-white/10 hover:border-white/20',
        'transition-all duration-300',
        glow && 'shadow-lg shadow-[#6F1C80]/10',
        gradientVariants[gradient],
        paddingSizes[padding],
        className
      )}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </Component>
  );
});

export const GlassCardHeader = forwardRef(function GlassCardHeader(
  { children, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const GlassCardTitle = forwardRef(function GlassCardTitle(
  { children, className, ...props },
  ref
) {
  return (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-none tracking-tight text-white',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
});

export const GlassCardDescription = forwardRef(function GlassCardDescription(
  { children, className, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-white/70', className)}
      {...props}
    >
      {children}
    </p>
  );
});

export const GlassCardContent = forwardRef(function GlassCardContent(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  );
});

export const GlassCardFooter = forwardRef(function GlassCardFooter(
  { children, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});
