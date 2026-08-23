import React, { useState, Fragment } from "react";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import HubspotForm from 'react-hubspot-form';
import { APP_LINK } from "../../../constants";
import "./CTASection.css";

const HUBSPOT_PORTAL_ID = '44445689';
const HUBSPOT_FORM_ID = 'f0b4f21e-9ddc-4fff-a88d-bba812a2d084';

// Accessible dialog via headless-ui (focus trap, escape, focus restore, scroll
// lock all handled) — same pattern as EmailSignup.tsx.
function NewsletterModal({ open, onClose }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="newsletter-dialog" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="newsletter-fade-enter"
          enterFrom="newsletter-fade-from"
          enterTo="newsletter-fade-to"
          leave="newsletter-fade-leave"
          leaveFrom="newsletter-fade-to"
          leaveTo="newsletter-fade-from"
        >
          <div className="newsletter-modal-overlay" aria-hidden="true" />
        </Transition.Child>
        <div className="newsletter-modal-positioner">
          <Transition.Child
            as={Fragment}
            enter="newsletter-fade-enter"
            enterFrom="newsletter-fade-from"
            enterTo="newsletter-fade-to"
            leave="newsletter-fade-leave"
            leaveFrom="newsletter-fade-to"
            leaveTo="newsletter-fade-from"
          >
            <Dialog.Panel className="newsletter-modal">
              <div className="newsletter-modal-header">
                <Dialog.Title as="h3">Get the latest updates</Dialog.Title>
                <button className="newsletter-modal-close" onClick={onClose} aria-label="Close newsletter modal">✕</button>
              </div>
              <div className="newsletter-modal-body">
                <HubspotForm
                  portalId={HUBSPOT_PORTAL_ID}
                  formId={HUBSPOT_FORM_ID}
                  onSubmit={onClose}
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
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
          Put your LP<br/>to work.
        </motion.h2>
        <motion.p
          className="cta-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Stake your Uniswap LP position and start earning more — permissionless, non-custodial, live on Ethereum.
        </motion.p>
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        >
          <a href={APP_LINK} className="btn-cta-big" target="_blank" rel="noopener noreferrer">
            Stake your LP →
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cta-newsletter-icon" aria-hidden="true">
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
