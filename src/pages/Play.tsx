import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/useUserStore';
import { getRandomQuestions } from '@/data/questions';
import { Question, Subject } from '@/types';
import QuestionCard from '@/components/QuestionCard';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Crosshair, Zap, ArrowRight, Square, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStreakTimer } from '@/hooks/useStreakTimer';

const HomePage = () => {
  const user = useUserStore((s) => s.user);
  const clearRound = useUserStore((s) => s.clearRound);
  const currentRound = useUserStore((s) => s.currentRound);
  const navigate = useNavigate();
  const streakTimer = useStreakTimer();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roundComplete, setRoundComplete] = useState(false);
  const [fired, setFired] = useState(false);
  const [lastRoundQuestions, setLastRoundQuestions] = useState<Question[]>([]);

  const subjects: Subject[] = useMemo(() => {
    if (!user) return ['physics', 'chemistry', 'math'];
    if (user.subjectCombo === 'PCMB') return ['physics', 'chemistry', 'math', 'biology'];
    return ['physics', 'chemistry', 'math'];
  }, [user]);

  const fireQuestions = () => {
    if (!user) return;
    clearRound();
    const qs = getRandomQuestions(subjects, user.classLevel, 5);
    setQuestions(qs);
    setCurrentIndex(0);
    setRoundComplete(false);
    setFired(true);
    if (!streakTimer.isActive) streakTimer.startStreak();
  };

  const repeatWithVariants = () => {
    if (!user || lastRoundQuestions.length === 0) return;
    clearRound();
    const shuffled = [...lastRoundQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setRoundComplete(false);
    setFired(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setLastRoundQuestions([...questions]);
      setRoundComplete(true);
    }
  };

  const handleStop = () => {
    streakTimer.stopStreak();
    setFired(false);
    setRoundComplete(false);
    setQuestions([]);
  };

  const correctCount = currentRound.filter((r) => r.isCorrect).length;
  const wrongCount = currentRound.filter((r) => !r.isCorrect).length;

  return (
    <AppLayout streakTimer={streakTimer}>
      <AnimatePresence mode="wait">
        {!fired && (
          <motion.div
            key="fire-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Crosshair className="w-20 h-20 text-primary mb-6" />
            </motion.div>
            <h2 className="text-4xl font-display text-foreground mb-3">Question Gun</h2>
            <p className="text-muted-foreground mb-8 text-base">
              Fire to get 5 random questions from {subjects.join(', ')}!
            </p>
            <Button
              onClick={fireQuestions}
              size="lg"
              className="rounded-full px-12 py-7 text-xl font-bold gradient-fire text-primary-foreground border-0 shadow-xl hover:scale-105 transition-transform"
            >
              <Zap className="w-6 h-6 mr-2" />
              Fire! 🔥
            </Button>
            {user && user.rdm <= 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-destructive font-bold text-sm"
              >
                You're out of RDM!{' '}
                <button onClick={() => navigate('/pricing')} className="underline text-primary">
                  Top up now
                </button>
              </motion.p>
            )}
          </motion.div>
        )}

        {fired && !roundComplete && questions.length > 0 && (
          <motion.div
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-muted-foreground">
                Question {currentIndex + 1}/{questions.length}
              </span>
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < currentIndex
                        ? currentRound[i]?.isCorrect
                          ? 'bg-accent'
                          : 'bg-destructive'
                        : i === currentIndex
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            <QuestionCard question={questions[currentIndex]} onNext={handleNext} />
          </motion.div>
        )}

        {roundComplete && (
          <motion.div
            key="round-complete"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto"
          >
            <div className="text-7xl mb-6">
              {correctCount >= 4 ? '🏆' : correctCount >= 2 ? '👍' : '💪'}
            </div>
            <h2 className="text-3xl font-display text-foreground mb-3">Round Complete!</h2>
            <div className="flex gap-6 mb-6">
              <div className="bg-accent/20 rounded-2xl px-6 py-3">
                <span className="text-3xl font-bold text-accent">{correctCount}</span>
                <span className="text-sm text-muted-foreground ml-2">Correct</span>
              </div>
              <div className="bg-destructive/20 rounded-2xl px-6 py-3">
                <span className="text-3xl font-bold text-destructive">{wrongCount}</span>
                <span className="text-sm text-muted-foreground ml-2">Wrong</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-2">
              {correctCount >= 4 ? 'Amazing work! 🎉' : 'Keep practicing, you got this!'}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Do you want to keep going or stop?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Button
                onClick={fireQuestions}
                size="lg"
                className="flex-1 rounded-xl font-bold gradient-primary text-primary-foreground border-0"
              >
                <Zap className="w-5 h-5 mr-1" /> Keep Going!
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={repeatWithVariants}
                className="flex-1 rounded-xl font-bold"
              >
                <RotateCcw className="w-4 h-4 mr-1" /> Repeat Round
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/explore')}
                className="flex-1 rounded-xl font-bold"
              >
                Specific Topics <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={handleStop}
                className="flex-1 rounded-xl font-bold text-muted-foreground"
              >
                <Square className="w-4 h-4 mr-1" /> Stop
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default HomePage;
