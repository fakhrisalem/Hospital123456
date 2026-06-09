import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

export default function AnimatedCounter({ target, suffix = '', label, icon }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-3 p-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-500">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-primary-600">
        {count.toLocaleString('ar-SA')}{suffix}
      </div>
      <div className="text-gray-500 font-medium">{label}</div>
    </motion.div>
  );
}
