import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HubspotForm from 'react-hubspot-form';
import { APP_LINK } from "../../../constants";
import "./CTASection.css";

const HUBSPOT_PORTAL_ID = '44445689';
const HUBSPOT_FORM_ID = 'f0b4f21e-9ddc-4fff-a88d-bba812a2d084';

function NewsletterModal({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="newsletter-modal-overlay" onClick={onClose}>
      <div className="newsletter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="newsletter-modal-header">
          <h3>Get the latest updates</h3>
          <button className="newsletter-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="newsletter-modal-body">
          <HubspotForm
            portalId={HUBSPOT_PORTAL_ID}
            formId={HUBSPOT_FORM_ID}
            onSubmit={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default function CTASection() {
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  return (
    <section className="cta-section">
      <motion.div
        className="cta-glow"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="cta-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get Started
        </motion.div>
        <motion.h2
          className="cta-title"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          The options layer<br/>DeFi was missing.
        </motion.h2>
        <motion.p
          className="cta-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join thousands of traders and LPs using Panoptic to trade, hedge, and earn — permissionlessly.
        </motion.p>
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        >
          <a href={APP_LINK} className="btn-cta-big" target="_blank" rel="noopener noreferrer">
            Launch App →
          </a>
          <a href="/docs/intro" className="btn-cta-outline">
            Documentation
          </a>
        </motion.div>

        {/* Newsletter signup */}
        <motion.div
          className="cta-newsletter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="cta-newsletter-inner">
            <div className="cta-newsletter-text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cta-newsletter-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Stay up to date with DeFi options</span>
            </div>
            <button
              onClick={() => setNewsletterOpen(true)}
              className="cta-newsletter-btn"
            >
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
    </section>
  );
}
