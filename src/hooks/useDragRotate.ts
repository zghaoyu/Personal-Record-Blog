import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Options {
  onSnap: (newIndex: number) => void;
  totalSlides: number;
  initialIndex?: number;
}

const DRAG_SENSITIVITY = 0.1; // degrees per pixel

export function useDragRotate<T extends HTMLElement>({
  onSnap,
  totalSlides,
  initialIndex = 0,
}: Options) {
  const ref = useRef<T | null>(null);
  const indexRef = useRef(initialIndex);
  const onSnapRef = useRef(onSnap);

  useEffect(() => {
    onSnapRef.current = onSnap;
  }, [onSnap]);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const segment = 360 / totalSlides;
    const startAngle = -indexRef.current * segment;
    gsap.set(el, { rotation: startAngle, transformOrigin: '50% 50%' });

    let startX = 0;
    let startRot = startAngle;
    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      startRot = gsap.getProperty(el, 'rotation') as number;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const rot = startRot + deltaX * DRAG_SENSITIVITY;
      gsap.set(el, { rotation: rot });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = 'grab';

      const rot = gsap.getProperty(el, 'rotation') as number;
      const target = Math.round(rot / segment) * segment;
      gsap.to(el, {
        rotation: target,
        duration: 0.55,
        ease: 'power3.out',
      });
      const newIndex =
        ((-target / segment) % totalSlides + totalSlides) % totalSlides;
      indexRef.current = newIndex;
      onSnapRef.current(newIndex);
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
    };
  }, [totalSlides]);

  /** Programmatic navigation (used by left/right arrow buttons). */
  const goTo = (newIndex: number) => {
    if (!ref.current) return;
    const segment = 360 / totalSlides;
    const target = -newIndex * segment;
    gsap.to(ref.current, {
      rotation: target,
      duration: 0.55,
      ease: 'power3.out',
      onComplete: () => {
        indexRef.current = newIndex;
      },
    });
    indexRef.current = newIndex;
  };

  return { ref, goTo };
}
