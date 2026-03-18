import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

// Cores da marca
const colorVariants = {
  primary: {
    bg: 'bg-[#6F1C80]/15',
    border: 'border-[#6F1C80]/30',
    text: 'text-[#C084FC]',
  },
  secondary: {
    bg: 'bg-[#32446C]/20',
    border: 'border-[#32446C]/30',
    text: 'text-[#A855F7]',
  },
  accent: {
    bg: 'bg-[#8B3A9C]/15',
    border: 'border-[#8B3A9C]/30',
    text: 'text-[#E879F9]',
  },
};

export function StatCard({
  icon: Icon,
  value,
  label,
  color = 'primary',
  className,
  delay = 0,
}) {
  const colors = colorVariants[color];

  return (
    <motion.div
      className={cn(
        'relative flex items-center gap-4 p-5 rounded-2xl',
        colors.bg,
        'backdrop-blur-sm border',
        colors.border,
        'hover:border-white/20 transition-all duration-300',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {Icon && (
        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-xl',
            'bg-white/5',
            colors.text
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-sm text-white/60">{label}</span>
      </div>
    </motion.div>
  );
}

export function StatBadge({
  value,
  label,
  color = 'primary',
  className,
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2.5 rounded-full',
        'bg-white/5 backdrop-blur-sm',
        'border border-white/10',
        className
      )}
    >
      <span className="text-lg font-bold text-white">{value}</span>
      <span className="text-sm text-white/50">{label}</span>
    </div>
  );
}
