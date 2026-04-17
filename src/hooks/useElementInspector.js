/**
 * useElementInspector.js
 * ─────────────────────────────────────────────────────────────────────────────
 * DOM Inspector hook for Engineering Debug Mode.
 *
 * Strategy:
 *  - Listens to global `mousemove` only when `isDebugActive` is true.
 *  - Uses `document.elementFromPoint()` to identify the hovered element.
 *    Because the overlay has `pointer-events: none`, elementFromPoint()
 *    looks THROUGH the overlay to the element beneath — no flickering loop.
 *  - `requestAnimationFrame` caps DOM reads to the display refresh rate.
 *    Between frames, the latest mouse coords are stored in a ref (not state)
 *    to avoid stale closures without causing re-renders.
 *  - React state is only updated when the ELEMENT REFERENCE changes.
 *    Moving over the same element → zero re-renders.
 *
 * Exclusion rules (elements ignored by the inspector):
 *  - Elements inside [data-os-ui] containers (Terminal, Taskbar, overlays)
 *  - <html> and <body>
 *  - Elements smaller than 4×4px (invisible/collapsed elements)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react';
import useSystemStore from '../store/useSystemStore';

/**
 * @typedef  {Object} InspectedElement
 * @property {string} tag        — Lowercase tag name ('div', 'section', etc.)
 * @property {string} id         — Element id attribute (or '')
 * @property {string} classes    — First 2 class names joined (or '')
 * @property {Object} rect       — { top, left, width, height } from getBoundingClientRect
 */

/**
 * useElementInspector()
 * Returns the currently hovered element's metadata, or null when inactive.
 * @returns {InspectedElement | null}
 */
const useElementInspector = () => {
  const isDebugActive = useSystemStore((s) => s.isDebugActive);

  const [inspected, setInspected] = useState(null);

  // Track last hovered element reference to skip redundant setState calls
  const lastElRef  = useRef(null);
  // Store latest mouse position between rAF frames (avoids stale closure)
  const mousePosRef = useRef({ x: 0, y: 0 });
  // rAF handle for cleanup
  const rafRef      = useRef(null);

  useEffect(() => {
    // Reset when debug mode turns off
    if (!isDebugActive) {
      setInspected(null);
      lastElRef.current = null;
      return;
    }

    // ── mousemove handler ──────────────────────────────────────────────────
    // Only updates the position ref — zero React involvement here.
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    // ── rAF loop ───────────────────────────────────────────────────────────
    // Polls the DOM at up to 60fps using the latest stored mouse position.
    const tick = () => {
      const { x, y } = mousePosRef.current;

      // elementFromPoint sees through pointer-events:none overlays
      const el = document.elementFromPoint(x, y);

      if (el && el !== lastElRef.current) {
        lastElRef.current = el;

        // ── Exclusion filters ──────────────────────────────────────────────
        const isRootEl   = el === document.body || el === document.documentElement;
        const isOsUi     = !!el.closest('[data-os-ui]');
        const rect       = el.getBoundingClientRect();
        const isTooSmall = rect.width < 4 || rect.height < 4;

        if (isRootEl || isOsUi || isTooSmall) {
          // Don't clear the previous inspection — keep last valid element shown
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        // Build class summary (show at most 2 classes to keep badge readable)
        const rawClasses = typeof el.className === 'string' ? el.className : '';
        const classNames = rawClasses
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .join(' ');

        setInspected({
          tag:     el.tagName.toLowerCase(),
          id:      el.id || '',
          classes: classNames,
          rect: {
            top:    rect.top,
            left:   rect.left,
            width:  rect.width,
            height: rect.height,
          },
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    // Start listeners and loop
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastElRef.current = null;
    };
  }, [isDebugActive]);

  return inspected;
};

export default useElementInspector;
