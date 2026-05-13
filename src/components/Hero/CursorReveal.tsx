import { useEffect, useRef } from 'react';
import s from './CursorReveal.module.css';

const BASE_RADIUS = 140;
const EASE = 0.15;
const PRESS_SCALE = 0.6;

function CloudSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 60"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M105 50H15C6.7 50 0 43.3 0 35c0-7.2 5.4-13.1 12.3-13.9C13.7 12.5 23.6 5 35.5 5c9.2 0 17.3 5.1 21.8 12.7C60.6 14.3 65.8 12 71.5 12c12.4 0 22.8 8.6 25.7 20.2C106.1 33.7 112 40.6 112 49c0 .7-.1 1.3-.2 2H105z" />
    </svg>
  );
}

interface CursorRevealProps {
  baseText: string;
  revealText: string;
  baseBg?: string;
  revealBg?: string;
  baseTextColor?: string;
  revealTextColor?: string;
}

export function CursorReveal({
  baseText,
  revealText,
  baseBg = '#f3efe7',
  revealBg = '#ffd24c',
  baseTextColor = '#0a0a0a',
  revealTextColor = '#0a0a0a',
}: CursorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const reveal = revealRef.current;
    if (!container || !reveal) return;

    let tx = container.clientWidth * 0.5;
    let ty = container.clientHeight * 0.5;
    let cx = tx;
    let cy = ty;
    let cr = BASE_RADIUS;
    let tr = BASE_RADIUS;

    const getLocalPos = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMove = (e: MouseEvent) => {
      e.stopPropagation();
      const pos = getLocalPos(e);
      tx = pos.x;
      ty = pos.y;
    };

    const onLeave = () => {
      tx = container.clientWidth * 0.5;
      ty = container.clientHeight * 0.5;
    };

    const onDown = (e: MouseEvent) => {
      e.stopPropagation();
      tr = BASE_RADIUS * PRESS_SCALE;
    };

    const onUp = (e: MouseEvent) => {
      e.stopPropagation();
      tr = BASE_RADIUS;
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('mousedown', onDown);
    container.addEventListener('mouseup', onUp);

    let raf = 0;
    const tick = () => {
      cx += (tx - cx) * EASE;
      cy += (ty - cy) * EASE;
      cr += (tr - cr) * EASE;

      if (reveal) {
        reveal.style.clipPath = `circle(${cr}px at ${cx}px ${cy}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('mousedown', onDown);
      container.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  const CloudsWrap = ({ color }: { color: string }) => (
    <div style={{ color }} aria-hidden="true">
      <CloudSVG className={`${s.cloud} ${s.cloudLeft}`} />
      <CloudSVG className={`${s.cloud} ${s.cloudRight}`} />
      <CloudSVG className={`${s.cloud} ${s.cloudTop}`} />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={s.cursorReveal}
      style={{ backgroundColor: baseBg }}
    >
      {/* Base layer */}
      <div className={s.layer}>
        <div className={s.contentWrap}>
          <CloudsWrap color={baseTextColor} />
          <span className={s.sunEmojiFixed} aria-hidden="true">
            ☀️
          </span>
          <div className={s.revealContent} style={{ color: baseTextColor }}>
            {baseText}
          </div>
        </div>
      </div>

      {/* Reveal layer: larger clipped circle that follows cursor */}
      <div
        ref={revealRef}
        className={`${s.layer} ${s.revealLayer}`}
        style={{
          backgroundColor: revealBg,
          clipPath: `circle(${BASE_RADIUS}px at 50% 50%)`,
        }}
      >
        <div className={s.contentWrap}>
          <CloudsWrap color={revealTextColor} />
          <span className={s.sunEmojiFixed} aria-hidden="true">
            🌙
          </span>
          <div className={s.revealContent} style={{ color: revealTextColor }}>
            {revealText}
          </div>
        </div>
      </div>
    </div>
  );
}
