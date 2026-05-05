import s from './CTA.module.css';

export function CTA() {
  return (
    <section className={s.section} id="donate">
      <div className={s.inner}>
        <h2 className={`${s.headline} display`}>
          Ready to get started?
        </h2>
        <p className={s.lede}>
          Reach out to learn how Maxima can support your family. Or help us
          grow our work — every dollar funds a session a family otherwise
          couldn&rsquo;t afford.
        </p>
        <div className={s.actions}>
          <a className={s.primary} href="mailto:hello@maximatherapy.com">
            Get in touch
          </a>
          <a className={s.secondary} href="#donate">
            Donate
          </a>
        </div>
      </div>
    </section>
  );
}
