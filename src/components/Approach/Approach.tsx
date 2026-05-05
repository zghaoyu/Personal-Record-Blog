import s from './Approach.module.css';

const items = [
  {
    title: 'Family-centered care',
    body: 'We collaborate with families and the IFSP team to design a plan focused on meaningful progress and everyday skills.',
    icon: '🤝',
  },
  {
    title: 'Natural environments',
    body: 'Therapy happens where the child lives, learns, and plays — making skills meaningful and immediately functional.',
    icon: '🌿',
  },
  {
    title: 'Interdisciplinary team',
    body: 'Speech, occupational, and physical therapists work together so each child gets a coherent, holistic plan.',
    icon: '🧩',
  },
  {
    title: 'Individualized care',
    body: 'No “one size fits all.” Every plan is shaped around a single person, their family, and what they care about.',
    icon: '✨',
  },
];

export function Approach() {
  return (
    <section className={s.section}>
      <header className={s.header}>
        <p className={s.eyebrow}>Our approach</p>
        <h2 className={`${s.headline} display`}>
          Compassion, science, and presence — in equal parts.
        </h2>
      </header>

      <ul className={s.grid}>
        {items.map((it) => (
          <li key={it.title} className={s.card}>
            <span className={s.icon} aria-hidden="true">
              {it.icon}
            </span>
            <h3 className={s.cardTitle}>{it.title}</h3>
            <p className={s.cardBody}>{it.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
