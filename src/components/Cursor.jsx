import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor personalizado — solo en dispositivos con puntero fino (mouse/trackpad).
 *
 * Usa useMotionValue + useSpring para actualizar el DOM directamente
 * via requestAnimationFrame, sin re-renders de React en cada mousemove.
 * Esto elimina el forced reflow detectado en Lighthouse.
 */
export default function Cursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // MotionValues — se actualizan sin pasar por el reconciliador de React
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Spring en el cursor exterior — suave y con inercia
  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.2 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.2 });

  // Estado de hover — sí usa useState porque solo cambia al entrar/salir de elementos
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
      return;
    }

    const onMove = (e) => {
      rawX.set(e.clientX - 16);
      rawY.set(e.clientY - 16);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const onOver = (e) => {
      const isClickable =
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('input') ||
        e.target.closest('textarea') ||
        e.target.closest('.cursor-pointer');
      setIsHovering(!!isClickable);
    };

    // passive: true → no bloquea el scroll en el hilo principal
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [rawX, rawY, dotX, dotY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Cursor exterior con spring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x,
          y,
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.3 : 0.6,
          backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'transparent',
        }}
      />
      {/* Punto central — sin spring, sigue el mouse al instante */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}
