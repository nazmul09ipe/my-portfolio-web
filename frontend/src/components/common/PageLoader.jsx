import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for cinematic feel
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-void-950"
        >
          <div className="relative flex flex-col items-center">
            {/* Minimalist Futuristic Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-24 h-24 mb-8"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.path
                  d="M 20 20 L 80 20 L 80 80 L 20 80 Z"
                  fill="none"
                  stroke="url(#loaderGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
                />
                <defs>
                  <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-display text-2xl font-black text-white tracking-tighter"
                >
                  NH
                </motion.span>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-linear-to-r from-transparent via-brand-500 to-transparent"
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500"
            >
              Initializing Digital Core
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
