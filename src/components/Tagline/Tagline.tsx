import s from './Tagline.module.css';

export function Tagline() {
  return (
    <section className={s.section}>
      <p className={s.eyebrow}>Personalized therapies</p>
      <h2 className={`${s.headline} display`}>
        See life from a different angle.
        <br />
        We don&rsquo;t treat disabilities — we support
        <br />
        differences, from <em className={s.em}>birth</em> to{' '}
        <em className={s.em}>golden age</em>.
      </h2>
      <p className={s.lede}>
        Personalized therapies to help people of all ages find healing and
        happiness one step at a time.
      </p>
    </section>
  );
}
