import React from "react";
import { motion } from "framer-motion";
import "./ParticipationSection.css";

/**
 * Alternating text + evidence-panel section, modeled on the app's
 * home-feature-section. `reversed` flips the columns so consecutive sections
 * don't all read left-to-right.
 */
export default function ParticipationSection({
  id,
  eyebrow,
  title,
  description,
  points,
  ctaLabel,
  ctaHref,
  reversed = false,
  children,
}) {
  return (
    <section className="participation-section" id={id}>
      <div className={`participation-container${reversed ? " participation-container--reversed" : ""}`}>
        <motion.div
          className="participation-copy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="section-title participation-title">{title}</h2>
          <p className="section-desc participation-desc">{description}</p>
          {points?.length ? (
            <ul className="participation-points">
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          ) : null}
          {ctaHref ? (
            <a
              className="participation-cta"
              href={ctaHref}
              target={ctaHref.startsWith("http") ? "_blank" : undefined}
              rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {ctaLabel}
              <span aria-hidden="true"> →</span>
            </a>
          ) : null}
        </motion.div>

        <motion.div
          className="participation-evidence"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
