import { motion } from "framer-motion";

const WavyLines = () => {
  return (
    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 600"
        fill="none"
        className="opacity-80"
      >
        {/* First Wavy Shape */}
        <motion.path
          d="M 100 300 Q 200 100, 300 200 T 500 300 T 700 400"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 110 310 Q 210 110, 310 210 T 510 310 T 710 410"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, delay: 0.1, ease: "easeInOut" }}
        />
        <motion.path
          d="M 120 320 Q 220 120, 320 220 T 520 320 T 720 420"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
        />

        {/* Second Wavy Shape */}
        <motion.path
          d="M 150 200 Q 250 350, 350 250 T 550 200 T 750 300"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 160 210 Q 260 360, 360 260 T 560 210 T 760 310"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2.5, delay: 0.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M 170 220 Q 270 370, 370 270 T 570 220 T 770 320"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(280, 88%, 53%)" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(270, 75%, 50%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(265, 75%, 40%)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 100%, 55%)" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(265, 75%, 40%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(280, 88%, 53%)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text overlay on wavy lines */}
      <div className="absolute top-1/4 right-12 space-y-2">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-4xl font-bold text-foreground mb-1">Landing page.</p>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Ultra-premium inventory mastery system designed for the modern enterprise.
            Built with precision and elegance.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WavyLines;
