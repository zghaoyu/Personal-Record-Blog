import s from './Header.module.css';

export function Header() {
  return (
    <header className={s.header}>
      <a className={s.logo} href="/" aria-label="Maxima Therapy home">
        <span className={s.logoMark} aria-hidden="true">
          <span className={s.logoDot} />
          <span className={s.logoDot} />
        </span>
        <span className={s.logoText}>maxima</span>
      </a>

      <nav className={s.navWrap}>
        <ul className={s.nav}>
          <li>
            <button type="button" className={s.navItem}>
              Programs <span className={s.caret}>▾</span>
            </button>
          </li>
          <li>
            <button type="button" className={s.navItem}>
              About <span className={s.caret}>▾</span>
            </button>
          </li>
          <li>
            <a className={s.navItem} href="#service-areas">
              Service Areas
            </a>
          </li>
        </ul>
      </nav>

      <div className={s.actions}>
        <a className={s.donate} href="#donate">
          Donate
        </a>
        <a
          className={s.mailBtn}
          href="mailto:hello@maximatherapy.com"
          aria-label="Contact"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="6"
              width="18"
              height="12"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M3.5 7l8.5 6.5L20.5 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}
