import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const variants = {
  primary: 'bg-gradient-to-r from-[#6F1C80] to-[#32446C] text-white hover:from-[#8B3A9C] hover:to-[#4A5E8A] shadow-lg shadow-[#6F1C80]/25',
  secondary: 'bg-gradient-to-r from-[#8B3A9C] to-[#6F1C80] text-white hover:from-[#9333EA] hover:to-[#8B3A9C] shadow-lg shadow-[#8B3A9C]/25',
  outline: 'bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40',
  ghost: 'bg-transparent text-white hover:bg-white/10',
  glass: 'bg-white/5 backdrop-blur-lg border border-white/10 text-white hover:bg-white/10 hover:border-white/20',
  success: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25',
  danger: 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/25',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
  xl: 'px-8 py-4 text-xl gap-3',
  icon: 'p-2',
};

export const GlassButton = forwardRef(function GlassButton(
  {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    className,
    asChild = false,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  );

  return (
    <motion.button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-[#6F1C80]/50 focus:ring-offset-2 focus:ring-offset-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {content}
    </motion.button>
  );
});
