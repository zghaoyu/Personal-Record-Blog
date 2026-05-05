import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { programs } from '../../data/programs';
import { useTheme } from '../../theme/ThemeContext';
import { useDragRotate } from '../../hooks/useDragRotate';
import { Wheel } from './Wheel';
import s from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);

  const { index, setIndex, programs: themePrograms } = useTheme();

  const { ref: wheelRef, goTo } = useDragRotate<HTMLDivElement>({
    onSnap: (i) => setIndex(i),
    totalSlides: themePrograms.length,
    initialIndex: index,
  });

  const handlePrev = () => {
    const next = (index - 1 + themePrograms.length) % themePrograms.length;
    setIndex(next);
    goTo(next);
  };
  const handleNext = () => {
    const next = (index + 1) % themePrograms.length;
    setIndex(next);
    goTo(next);
  };

  useEffect(() => {
    if (!heroRef.current || !pinContainerRef.current || !cardStackRef.current) return;

    const triangle = heroRef.current.querySelector<HTMLElement>(`.${s.triangleClip}`);
    const arrows = heroRef.current.querySelectorAll<HTMLElement>(`.${s.arrow}`);
    const tapHint = heroRef.current.querySelector<HTMLElement>(`.${s.tapHint}`);
    const cards = cardStackRef.current.querySelectorAll<HTMLElement>(`.${s.stackCard}`);
    const cardBriefs = cardStackRef.current.querySelectorAll<HTMLElement>(`.${s.cardBrief}`);
    const cardDetails = cardStackRef.current.querySelectorAll<HTMLElement>(`.${s.cardDetail}`);

    const fadeTargets: HTMLElement[] = [];
    arrows.forEach((a) => fadeTargets.push(a));
    if (tapHint) fadeTargets.push(tapHint);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Phase 1 (0-25%): Triangle slides up out of view; arrows/hint fade out; card stack moves to center
    if (triangle) {
      tl.to(
        triangle,
        {
          y: '-150%',
          duration: 0.25,
          ease: 'power2.out',
        },
        0
      );
    }

    tl.to(
      fadeTargets,
      {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.out',
      },
      0
    );

    tl.to(
      cardStackRef.current,
      {
        y: '-20vh',
        duration: 0.25,
        ease: 'none',
      },
      0
    );

    // Crossfade brief → detail content
    if (cardBriefs.length && cardDetails.length) {
      tl.to(cardBriefs, { opacity: 0, duration: 0.1 }, 0.2);
      tl.to(cardDetails, { opacity: 1, duration: 0.1 }, 0.2);
    }

    // Phase 2 (25-40%): Fan out cards + 3D tilt
    tl.to(
      cards,
      {
        rotation: (i) => (i - 1.5) * 22,
        x: (i) => (i - 1.5) * 50,
        duration: 0.15,
        stagger: 0.02,
        ease: 'power2.out',
      },
      0.25
    );

    tl.to(
      cardStackRef.current,
      {
        rotateX: -8,
        rotateY: 6,
        duration: 0.15,
        ease: 'power2.inOut',
      },
      0.25
    );

    // Phase 3 (40-70%): Cards fly upward one by one, top-to-bottom order
    const cardEntries = Array.from(cards).map((card) => ({
      card,
      zIndex: parseInt(window.getComputedStyle(card).zIndex, 10) || 0,
    }));
    cardEntries.sort((a, b) => b.zIndex - a.zIndex);

    cardEntries.forEach((entry, sortedIndex) => {
      tl.to(
        entry.card,
        {
          y: '-120vh',
          rotation: `+=${(Math.random() - 0.5) * 30}`,
          opacity: 0,
          duration: 0.1,
          ease: 'power2.in',
        },
        0.4 + sortedIndex * 0.08
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === heroRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section className={s.hero} ref={heroRef}>
      <p className={s.tapHint}>Tap into a service to explore</p>

      <div className={s.stage}>
        <div className={s.triangleClip}>
          <Wheel ref={wheelRef} />
        </div>

        <button
          type="button"
          className={`${s.arrow} ${s.arrowPrev}`}
          onClick={handlePrev}
          aria-label="Previous program"
        >
          <ArrowIcon dir="left" />
        </button>
        <button
          type="button"
          className={`${s.arrow} ${s.arrowNext}`}
          onClick={handleNext}
          aria-label="Next program"
        >
          <ArrowIcon dir="right" />
        </button>

        <div className={s.pinContainer} ref={pinContainerRef}>
          <div className={s.cardStack} ref={cardStackRef}>
            {programs.map((p, i) => (
              <div
                key={p.id}
                className={s.stackCard}
                style={{
                  backgroundColor: p.theme.cardBg,
                  color: p.theme.cardText,
                  zIndex: i === index ? programs.length : programs.length - 1 - i,
                }}
              >
                <div className={s.cardBrief}>
                  <p className={s.ctaTitle}>{p.programName.toUpperCase()}</p>
                  <p className={s.ctaSub}>{p.ageRange.toUpperCase()}</p>
                </div>
                <div className={s.cardDetail}>
                  <p className={s.cardTitle}>{p.programName}</p>
                  <span className={s.cardEmoji} aria-hidden="true">
                    {p.emoji}
                  </span>
                  <p className={s.cardDesc}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon({ dir }: { dir: 'left' | 'right' }) {
  const points = dir === 'left' ? 'M14 5L7 12L14 19' : 'M10 5L17 12L10 19';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d={points}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
