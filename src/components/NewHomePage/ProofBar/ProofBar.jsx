import React from "react";
import { motion } from "framer-motion";
import "./ProofBar.css";

// No TVL or volume figures here on purpose — credibility comes from the
// comparative LP claim, audit coverage, and research pedigree.
const proofPoints = [
  {
    figure: "20%+",
    label: "more fees than vanilla Uniswap",
    href: null,
  },
  {
    figure: "3",
    label: "independent security audits",
    href: "/docs/security/security_audits",
  },
  {
    figure: "Peer-reviewed",
    label: "research behind the pricing model",
    href: "/research",
  },
  {
    figure: "Permissionless",
    label: "markets on any Uniswap pair",
    href: null,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProofBar() {
  return (
    <section className="proof-bar">
      <motion.div
        className="proof-bar-container"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {proofPoints.map((p) => {
          const body = (
            <>
              <span className="proof-figure">{p.figure}</span>
              <span className="proof-label">{p.label}</span>
            </>
          );
          return p.href ? (
            <motion.a key={p.label} className="proof-point proof-point--link" href={p.href} variants={item}>
              {body}
            </motion.a>
          ) : (
            <motion.div key={p.label} className="proof-point" variants={item}>
              {body}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
