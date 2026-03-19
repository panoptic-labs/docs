// Suppress the benign "ResizeObserver loop" error overlay in dev.
if (typeof window !== 'undefined') {
  // MutationObserver to watch for the webpack error overlay iframe
  // and hide it when it only contains ResizeObserver errors
  const observer = new MutationObserver(() => {
    // webpack-dev-server injects an iframe with id "webpack-dev-server-client-overlay"
    const overlay = document.getElementById('webpack-dev-server-client-overlay');
    if (overlay) {
      const overlayDoc = overlay.contentDocument || overlay.contentWindow?.document;
      if (overlayDoc) {
        const text = overlayDoc.body?.textContent || '';
        if (text.includes('ResizeObserver') && !text.replace(/ResizeObserver[^\n]*/g, '').trim().match(/ERROR/)) {
          overlay.style.display = 'none';
        }
      } else {
        // Can't access iframe content (cross-origin), just check if it appeared
        // after our modal closed — hide it after a short delay
        setTimeout(() => {
          const o = document.getElementById('webpack-dev-server-client-overlay');
          if (o) o.style.display = 'none';
        }, 100);
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  // Also suppress via standard handlers
  window.addEventListener('error', (e) => {
    if (e.message?.includes?.('ResizeObserver')) {
      e.stopImmediatePropagation();
      e.preventDefault();
      // Hide overlay if it exists
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) overlay.style.display = 'none';
    }
  }, true);
}
