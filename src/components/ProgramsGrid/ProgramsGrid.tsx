import { useTheme } from '../../theme/ThemeContext';
import s from './ProgramsGrid.module.css';

export function ProgramsGrid() {
  const { programs, index, setIndex } = useTheme();

  return (
    <section className={s.section} id="programs">
      <header className={s.header}>
        <p className={s.eyebrow}>Programs</p>
        <h2 className={`${s.headline} display`}>
          Care that grows with the person.
        </h2>
        <p className={s.intro}>
          Maxima provides therapy and services for neurodivergent individuals
          across all stages of life — from infancy to aging.
        </p>
      </header>

      <ul className={s.grid}>
        {programs.map((p, i) => {
          const active = i === index;
          return (
            <li key={p.id} className={`${s.card} ${active ? s.active : ''}`}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className={s.cardBtn}
                style={{
                  backgroundColor: p.theme.bg,
                  color: p.theme.textOnBg,
                }}
              >
                <span className={s.cardEmoji} aria-hidden="true">
                  {p.emoji}
                </span>
                <span
                  className={s.cardStatus}
                  style={{
                    backgroundColor: p.theme.cardBg,
                    color: p.theme.cardText,
                  }}
                >
                  {p.status === 'live' ? 'Live now' : 'Coming soon'}
                </span>
                <h3 className={s.cardTitle}>{p.programName}</h3>
                <p className={s.cardAge}>{p.ageRange}</p>
                <p className={s.cardDesc}>{p.description}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
