import s from './Clouds.module.css';

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

interface CloudItem {
  id: number;
  top: string;
  scale: number;
  duration: number;
  delay: number;
  opacity: number;
}

const clouds: CloudItem[] = [
  { id: 1, top: '8%', scale: 1.8, duration: 28, delay: -5, opacity: 0.9 },
  { id: 2, top: '18%', scale: 1.2, duration: 35, delay: -12, opacity: 0.75 },
  { id: 3, top: '5%', scale: 2.5, duration: 22, delay: -18, opacity: 0.6 },
  { id: 4, top: '25%', scale: 1.5, duration: 30, delay: -8, opacity: 0.85 },
  { id: 5, top: '12%', scale: 2, duration: 25, delay: -22, opacity: 0.55 },
  { id: 6, top: '32%', scale: 1.1, duration: 32, delay: -15, opacity: 0.7 },
];

export function Clouds() {
  return (
    <div className={s.cloudsLayer} aria-hidden="true">
      {clouds.map((c) => (
        <div
          key={c.id}
          className={s.cloudWrap}
          style={{
            top: c.top,
            '--cloud-scale': c.scale,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            opacity: c.opacity,
          } as React.CSSProperties}
        >
          <CloudSVG className={s.cloudShape} />
        </div>
      ))}
    </div>
  );
}
