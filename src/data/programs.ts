export interface ProgramTheme {
  bg: string;
  accent: string;
  triangle: string;
  textOnBg: string;
  cardBg: string;
  cardText: string;
}

export interface Program {
  id: string;
  slideTitle: string;
  programName: string;
  ageRange: string;
  status: 'live' | 'soon';
  description: string;
  emoji: string;
  theme: ProgramTheme;
}

export const programs: Program[] = [
  {
    id: 'fun-to-three',
    slideTitle: 'Fun-to-Three',
    programName: 'Early Intervention',
    ageRange: 'Ages 0–3',
    status: 'live',
    description:
      'Play-based, individualized therapy that builds foundational skills and supports families from the very start.',
    emoji: '🏔️',
    theme: {
      bg: '#ffcb3a',
      accent: '#f23a1e',
      triangle: '#ffe9b3',
      textOnBg: '#1f1235',
      cardBg: '#f23a1e',
      cardText: '#ffe9b3',
    },
  },
  {
    id: 'behavioral',
    slideTitle: 'Behavioral Therapy',
    programName: 'Behavioral Therapy',
    ageRange: 'Coming soon',
    status: 'soon',
    description:
      'Compassionate, evidence-based behavior support designed around the whole person, not a checklist.',
    emoji: '🧠',
    theme: {
      bg: '#6b4fe0',
      accent: '#ff6fa3',
      triangle: '#e9deff',
      textOnBg: '#fffaf0',
      cardBg: '#ff6fa3',
      cardText: '#2a1158',
    },
  },
  {
    id: 'employment',
    slideTitle: 'Path to Employment',
    programName: 'Workforce Support',
    ageRange: 'Coming soon',
    status: 'soon',
    description:
      'Individualized guidance that empowers people through every step of their career journey.',
    emoji: '💼',
    theme: {
      bg: '#2fb37a',
      accent: '#ffd24c',
      triangle: '#e8fff1',
      textOnBg: '#0f3a25',
      cardBg: '#ffd24c',
      cardText: '#0f3a25',
    },
  },
  {
    id: 'home-health',
    slideTitle: 'Home Health',
    programName: 'Home Health',
    ageRange: 'Coming soon',
    status: 'soon',
    description:
      'Care that meets people where they live — supporting dignity, independence and well-being at home.',
    emoji: '🌅',
    theme: {
      bg: '#5b6fe8',
      accent: '#ff8a4c',
      triangle: '#ffd9b8',
      textOnBg: '#0f1845',
      cardBg: '#ff8a4c',
      cardText: '#0f1845',
    },
  },
];
