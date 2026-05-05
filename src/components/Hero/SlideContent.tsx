import type { Program } from '../../data/programs';
import s from './Hero.module.css';

export function SlideContent({ program, index }: { program: Program; index: number }) {
  return (
    <div
      className={s.slide}
      style={{ backgroundColor: program.theme.triangle }}
    >
      <span
        className={s.debugBadge}
        style={{
          color: program.theme.accent,
          transform: `translateX(-50%) rotate(${-index * 90}deg)`,
        }}
      >
        {index + 1}·{program.emoji}
      </span>
      <div className={s.placeholder}>
        <span className={s.emoji} aria-hidden="true">
          {program.emoji}
        </span>
        <span
          className={s.slideTitle}
          style={{ color: program.theme.textOnBg }}
        >
          {program.slideTitle}
        </span>
      </div>
    </div>
  );
}
