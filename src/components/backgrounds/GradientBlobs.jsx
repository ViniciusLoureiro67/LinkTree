import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function GradientBlobs({ className }) {
  return (
    <div
      className={cn(
        'fixed inset-0 overflow-hidden pointer-events-none -z-10',
        className
      )}
      aria-hidden="true"
    >
      {/* Background base */}
      <div className="absolute inset-0 bg-[#0a0e27]" />

      {/* Blob 1 - Purple Primary (top left) */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(111, 28, 128, 0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 30, -20, 40, 0],
          y: [0, -50, 20, 30, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 2 - Navy Secondary (top right) */}
      <motion.div
        className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(50, 68, 108, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -40, 30, -20, 0],
          y: [0, 30, -40, 20, 0],
          scale: [1, 0.95, 1.1, 1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 3 - Purple Light (center) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 58, 156, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.05, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 4 - Purple (bottom left) - CORRIGIDO: era verde */}
      <motion.div
        className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(111, 28, 128, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 40, -20, 30, 0],
          y: [0, -30, 40, -20, 0],
          scale: [1, 1.1, 0.9, 1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 5 - Navy (bottom right) */}
      <motion.div
        className="absolute -bottom-20 -right-40 w-[450px] h-[450px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(50, 68, 108, 0.25) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -30, 20, -40, 0],
          y: [0, 20, -30, 40, 0],
          scale: [1, 0.95, 1.05, 0.9, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

export function GradientBlobsSimple({ className }) {
  return (
    <div
      className={cn(
        'fixed inset-0 overflow-hidden pointer-events-none -z-10',
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#0a0e27]" />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 40% 20%, rgba(111, 28, 128, 0.2) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(50, 68, 108, 0.2) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(139, 58, 156, 0.12) 0px, transparent 50%),
            radial-gradient(at 80% 50%, rgba(50, 68, 108, 0.12) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(111, 28, 128, 0.12) 0px, transparent 50%),
            radial-gradient(at 80% 100%, rgba(50, 68, 108, 0.12) 0px, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
