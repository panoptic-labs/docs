import React from "react";
import { motion } from "framer-motion";

const FadeIn = ({ children, delay = 0, duration = 0.6, y = 30, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeIn;
