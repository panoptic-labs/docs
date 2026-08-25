import React, {useCallback, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import styles from './styles.module.css';

function transformImgClassName(className) {
  return clsx(className, styles.img);
}

export default function MDXImg({alt = '', className, onClick, onKeyDown, ...props}) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback((event) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(true);
    }
  }, [onClick]);

  const handleKeyDown = useCallback((event) => {
    onKeyDown?.(event);
    if (!event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      setOpen(true);
    }
  }, [onKeyDown]);

  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [handleClose, open]);

  return (
    <>
      <img
        loading="lazy"
        {...props}
        alt={alt}
        className={transformImgClassName(className)}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={alt ? `View ${alt} full size` : 'View image full size'}
        style={{cursor: 'zoom-in', ...props.style}}
      />
      {open && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt ? `Full-size view of ${alt}` : 'Full-size image'}
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: 24,
          }}
        >
          <img
            src={props.src}
            alt={alt}
            onClick={(event) => event.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 8,
              cursor: 'default',
            }}
          />
        </div>,
        document.body,
      )}
    </>
  );
}
