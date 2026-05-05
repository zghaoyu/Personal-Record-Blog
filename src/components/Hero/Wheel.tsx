import { forwardRef } from 'react';
import { programs } from '../../data/programs';
import { SlideContent } from './SlideContent';
import s from './Hero.module.css';

/**
 * The wheel is a big circle with 4 equal sectors at 90° each.
 * The visible viewport is a triangular clip in <Hero>; only the top sector
 * shows through. Rotating the wheel by -90° brings the next sector to the top.
 */
export const Wheel = forwardRef<HTMLDivElement>(function Wheel(_props, ref) {
  return (
    <div className={`${s.wheel} no-select`} ref={ref}>
      {programs.map((p, i) => (
        <div
          key={p.id}
          className={s.wheelSection}
          style={{ transform: `translate(-50%, -50%) rotate(${i * 90}deg)` }}
        >
          <SlideContent program={p} index={i} />
        </div>
      ))}
    </div>
  );
});
