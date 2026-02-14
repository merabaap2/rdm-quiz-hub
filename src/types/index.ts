export type Subject = 'physics' | 'chemistry' | 'math' | 'biology';
export type Stream = 'science' | 'commerce' | 'arts';
export type SubjectCombo = 'PCM' | 'PCMB';
export type ExamType = 'JEE' | 'NEET' | 'KCET' | 'other';
export type ClassLevel = 9 | 10 | 11 | 12;

export interface Question {
  id: string;
  subject: Subject;
  topic: string;
  classLevel: ClassLevel;
  examType: ExamType[];
  question: string;
  options: string[];
  correctAnswer: number; // index
  hint: string;
  solution: string;
  reference: {
    theory: string;
    inventor?: string;
    relatedTopics: string[];
    applicationExample: string;
    youtubeUrl?: string;
  };
}

export interface UserProfile {
  name: string;
  classLevel: ClassLevel;
  stream: Stream;
  subjectCombo: SubjectCombo;
  rdm: number;
  answeredQuestions: string[];
  savedQuestions: string[];
  likedQuestions: string[];
  streakMinutes: number;
  isOnBreak: boolean;
  isSignedUp: boolean;
}

export interface AnswerResult {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  rdmAmount: number;
  features: string[];
  recommended?: boolean;
}
