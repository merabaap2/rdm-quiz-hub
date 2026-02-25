export interface DummyProfile {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  bio: string;
  rdm: number;
  rank: 'Novice' | 'Scholar' | 'Expert' | 'Master';
  memberSince: string;
  questionsAsked: number;
  answersGiven: number;
  acceptedAnswers: number;
  strikeRate: number;
  subjectStats: {
    physics: number;
    chemistry: number;
    math: number;
    biology: number;
  };
  rdmFromDoubts: number;
  bountiesWon: number;
  streakDays: number;
  badges: string[];
  recentDoubts: string[];
  recentAnswers: string[];
  nextRankRdm: number;
}

export const rankColors: Record<string, string> = {
  Novice: 'bg-muted text-muted-foreground',
  Scholar: 'bg-secondary/15 text-secondary',
  Expert: 'bg-accent/15 text-accent',
  Master: 'bg-edu-orange/15 text-edu-orange',
};

export const dummyProfiles: DummyProfile[] = [
  {
    id: 'sankar-l',
    name: 'Sankar L',
    initials: 'SL',
    avatarColor: 'bg-secondary',
    bio: 'Physics enthusiast · JEE aspirant · Loves quantum mechanics',
    rdm: 147,
    rank: 'Scholar',
    memberSince: 'Jan 2026',
    questionsAsked: 12,
    answersGiven: 34,
    acceptedAnswers: 28,
    strikeRate: 82,
    subjectStats: { physics: 22, chemistry: 5, math: 4, biology: 3 },
    rdmFromDoubts: 120,
    bountiesWon: 3,
    streakDays: 7,
    badges: ['Top 5 this week', 'Physics Pro'],
    recentDoubts: ["What is the value of Planck's constant?", 'What is centrifugal force', 'Why does the normal force do no work when walking?'],
    recentAnswers: ['Explained centripetal vs centrifugal', 'Solved integration by parts', 'Helped with redox balancing'],
    nextRankRdm: 200,
  },
  {
    id: 'priya-m',
    name: 'Priya M',
    initials: 'PM',
    avatarColor: 'bg-accent',
    bio: 'NEET topper · Biology nerd · Future doctor 🩺',
    rdm: 320,
    rank: 'Expert',
    memberSince: 'Dec 2025',
    questionsAsked: 8,
    answersGiven: 56,
    acceptedAnswers: 49,
    strikeRate: 88,
    subjectStats: { physics: 6, chemistry: 12, math: 2, biology: 36 },
    rdmFromDoubts: 280,
    bountiesWon: 7,
    streakDays: 14,
    badges: ['Top 3 this week', 'Biology Master', 'Bounty Hunter'],
    recentDoubts: ['Difference between genotype and phenotype', 'What is Hemaglobin', 'Explain mitosis vs meiosis'],
    recentAnswers: ['Detailed cell division explanation', 'DNA replication steps', 'Enzyme kinetics breakdown'],
    nextRankRdm: 500,
  },
  {
    id: 'arjun-k',
    name: 'Arjun K',
    initials: 'AK',
    avatarColor: 'bg-edu-orange',
    bio: 'Math wizard · Competitive coding · Calculus lover',
    rdm: 85,
    rank: 'Novice',
    memberSince: 'Feb 2026',
    questionsAsked: 5,
    answersGiven: 14,
    acceptedAnswers: 10,
    strikeRate: 71,
    subjectStats: { physics: 2, chemistry: 1, math: 10, biology: 1 },
    rdmFromDoubts: 65,
    bountiesWon: 1,
    streakDays: 3,
    badges: [],
    recentDoubts: ['How do I integrate x² eˣ by parts?', 'Limits at infinity trick?', 'Matrix determinant shortcut'],
    recentAnswers: ['Solved quadratic inequality', 'Explained L\'Hôpital\'s rule', 'Trigonometric identity proof'],
    nextRankRdm: 100,
  },
  {
    id: 'deepa-r',
    name: 'Deepa R',
    initials: 'DR',
    avatarColor: 'bg-primary',
    bio: 'Chemistry focused · Organic reactions are my jam ⚗️',
    rdm: 210,
    rank: 'Scholar',
    memberSince: 'Nov 2025',
    questionsAsked: 15,
    answersGiven: 38,
    acceptedAnswers: 30,
    strikeRate: 79,
    subjectStats: { physics: 4, chemistry: 28, math: 3, biology: 3 },
    rdmFromDoubts: 175,
    bountiesWon: 4,
    streakDays: 9,
    badges: ['Chemistry Pro'],
    recentDoubts: ['Best way to balance a redox equation in acidic medium?', 'SN1 vs SN2 mechanism', 'Electrochemistry basics'],
    recentAnswers: ['Organic naming conventions', 'Periodic trends explanation', 'Mole concept simplified'],
    nextRankRdm: 300,
  },
  {
    id: 'ravi-t',
    name: 'Ravi T',
    initials: 'RT',
    avatarColor: 'bg-edu-yellow',
    bio: 'All-rounder · KCET rank holder · Helping others learn 🚀',
    rdm: 530,
    rank: 'Master',
    memberSince: 'Oct 2025',
    questionsAsked: 20,
    answersGiven: 89,
    acceptedAnswers: 78,
    strikeRate: 88,
    subjectStats: { physics: 25, chemistry: 22, math: 24, biology: 18 },
    rdmFromDoubts: 480,
    bountiesWon: 12,
    streakDays: 21,
    badges: ['Top 1 this week', 'Master Rank', 'Bounty King', '100+ Answers'],
    recentDoubts: ['What is Physics', 'Thermodynamics second law intuition', 'Wave-particle duality'],
    recentAnswers: ['Complete optics guide', 'Stoichiometry walkthrough', 'Probability distributions'],
    nextRankRdm: 1000,
  },
];

export const getProfileById = (id: string): DummyProfile | undefined =>
  dummyProfiles.find((p) => p.id === id);
