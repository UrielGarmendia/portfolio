import { useState, useEffect, useRef } from 'react';
import useSystemStore from '../store/useSystemStore';

const useElementInspector = () => {
  const isDebugActive = useSystemStore((s) => s.isDebugActive);

  const [inspected, setInspected] = useState(null);
  const lastElRef  = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafRef      = useRef(null);

  useEffect(() => {
    if (!isDebugActive) {
      setInspected(null);
      lastElRef.current = null;
      return;
    }

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    const tick = () => {
      const { x, y } = mousePosRef.current;

      const el = document.elementFromPoint(x, y);

      if (el && el !== lastElRef.current) {
        lastElRef.current = el;

        const isRootEl   = el === document.body || el === document.documentElement;
        const isOsUi     = !!el.closest('[data-os-ui]');
        const rect       = el.getBoundingClientRect();
        const isTooSmall = rect.width < 4 || rect.height < 4;

        if (isRootEl || isOsUi || isTooSmall) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

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
