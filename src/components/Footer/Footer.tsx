import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className={s.brand}>
          <span className={s.logoMark} aria-hidden="true">
            <span className={s.logoDot} />
            <span className={s.logoDot} />
          </span>
          <span className={s.logoText}>maxima</span>
        </div>
        <p className={s.tagline}>
          Personalized support for neurodivergent individuals,
          <br />
          from birth to golden age.
        </p>
      </div>

      <div className={s.cols}>
        <div className={s.col}>
          <h4 className={s.colTitle}>Visit</h4>
          <p className={s.colItem}>
            16130 Ventura Blvd, Ste 380
            <br />
            Encino, CA 91436
          </p>
        </div>
        <div className={s.col}>
          <h4 className={s.colTitle}>Contact</h4>
          <p className={s.colItem}>
            <a href="tel:8336294621">(833) 629-4621</a>
          </p>
          <p className={s.colItem}>
            <a href="mailto:hello@maximatherapy.com">hello@maximatherapy.com</a>
          </p>
          <p className={s.colItem}>Mon–Fri · 9am – 5pm</p>
        </div>
        <div className={s.col}>
          <h4 className={s.colTitle}>Programs</h4>
          <p className={s.colItem}>
            <a href="#programs">Early Intervention</a>
          </p>
          <p className={s.colItem}>
            <a href="#programs">Behavioral Therapy</a>
          </p>
          <p className={s.colItem}>
            <a href="#programs">Path to Employment</a>
          </p>
          <p className={s.colItem}>
            <a href="#programs">Home Health</a>
          </p>
        </div>
        <div className={s.col}>
          <h4 className={s.colTitle}>Company</h4>
          <p className={s.colItem}>
            <a href="#">About</a>
          </p>
          <p className={s.colItem}>
            <a href="#service-areas">Service Areas</a>
          </p>
          <p className={s.colItem}>
            <a href="#">FAQ</a>
          </p>
          <p className={s.colItem}>
            <a href="#">Careers</a>
          </p>
        </div>
      </div>

      <div className={s.bottom}>
        <p>© {new Date().getFullYear()} Maxima Therapy. All rights reserved.</p>
        <p className={s.credit}>
          Homepage tribute · React + GSAP rebuild
        </p>
      </div>
    </footer>
  );
}
