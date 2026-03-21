import React from "react";
import { motion } from "framer-motion";

const FadeIn = ({ children, delay = 0, duration = 0.7, y = 40, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeIn;
