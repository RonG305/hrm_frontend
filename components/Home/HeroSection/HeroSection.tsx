'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const modules = [
  { id: 1, name: "Smart CHR", color: "bg-blue-500" },
  { id: 2, name: "Payroll", color: "bg-green-500" },
  { id: 3, name: "Recruitment", color: "bg-purple-500" },
  { id: 4, name: "Performance", color: "bg-orange-500" },
  { id: 5, name: "Attendance", color: "bg-teal-500" },
];

export default function AnimatedHero() {
  const [showSmartCHR, setShowSmartCHR] = useState(false);
  const [branches, setBranches] = useState(false);
  const [visibleModules, setVisibleModules] = useState<typeof modules>([]);

  useEffect(() => {
    setTimeout(() => setShowSmartCHR(true), 600);
    setTimeout(() => setBranches(true), 1600);

    modules.forEach((mod, index) => {
      setTimeout(() => {
        setVisibleModules((prev) => [...prev, mod]);
      }, 2200 + index * 500);
    });
  }, []);

  return (
    <div className="w-full flex justify-center items-center min-h-[70vh] relative overflow-hidden p-10">
      {/* Central Smart CHR Card */}
      <AnimatePresence>
        {showSmartCHR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute z-20 w-44 h-32 bg-white shadow-xl rounded-2xl flex items-center justify-center font-semibold text-lg border"
          >
            Smart CHR
          </motion.div>
        )}
      </AnimatePresence>

      {/* Branch Lines */}
      {branches && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute w-full h-full pointer-events-none"
        >
          {modules.map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-px bg-gray-400"
              style={{ height: `120px`, transform: `rotate(${(360 / modules.length) * i}deg) translateY(-60px)` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.3 * i }}
            />
          ))}
        </motion.div>
      )}

      {/* Orbiting Modules */}
      {visibleModules.map((mod, i) => (
        <motion.div
          key={mod.id}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`absolute w-40 h-28 ${mod.color} text-white shadow-xl rounded-2xl flex items-center justify-center font-medium border`}
          style={{
            transform: `rotate(${(360 / modules.length) * i}deg) translate(200px) rotate(-${(360 / modules.length) * i}deg)`
          }}
        >
          {mod.name}
        </motion.div>
      ))}
    </div>
  );
}
