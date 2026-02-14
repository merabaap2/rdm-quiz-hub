import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/useUserStore';
import { getRandomQuestions } from '@/data/questions';
import { Question, Subject } from '@/types';
import QuestionCard from '@/components/QuestionCard';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Crosshair, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const user = useUserStore((s) => s.user);
  const clearRound = useUserStore((s) => s.clearRound);
  const currentRound = useUserStore((s) => s.currentRound);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roundComplete, setRoundComplete] = useState(false);
  const [fired, setFired] = useState(false);

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
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setRoundComplete(true);
    }
  };

  // ProtectedRoute already handles redirect if no user

  const correctCount = currentRound.filter((r) => r.isCorrect).length;
  const wrongCount = currentRound.filter((r) => !r.isCorrect).length;

  return (
    <AppLayout>
      <div className="p-4 pb-8">
        <AnimatePresence mode="wait">
          {!fired && (
            <motion.div
              key="fire-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Crosshair className="w-16 h-16 text-primary mb-4" />
              </motion.div>
              <h2 className="text-2xl font-display text-foreground mb-2">Question Gun</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Fire to get 5 random questions from {subjects.join(', ')}!
              </p>
              <Button
                onClick={fireQuestions}
                size="lg"
                className="rounded-full px-10 py-6 text-xl font-bold gradient-fire text-primary-foreground border-0 shadow-xl hover:scale-105 transition-transform"
              >
                <Zap className="w-6 h-6 mr-2" />
                Fire! 🔥
              </Button>
              {user.rdm <= 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-destructive font-bold text-sm"
                >
                  You're out of RDM!{' '}
                  <button
                    onClick={() => navigate('/pricing')}
                    className="underline text-primary"
                  >
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
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-muted-foreground">
                  Question {currentIndex + 1}/{questions.length}
                </span>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
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
              <QuestionCard
                question={questions[currentIndex]}
                onNext={handleNext}
              />
            </motion.div>
          )}

          {roundComplete && (
            <motion.div
              key="round-complete"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div className="text-6xl mb-4">
                {correctCount >= 4 ? '🏆' : correctCount >= 2 ? '👍' : '💪'}
              </div>
              <h2 className="text-2xl font-display text-foreground mb-2">Round Complete!</h2>
              <div className="flex gap-4 mb-4">
                <div className="bg-accent/20 rounded-2xl px-4 py-2">
                  <span className="text-2xl font-bold text-accent">{correctCount}</span>
                  <span className="text-xs text-muted-foreground ml-1">Correct</span>
                </div>
                <div className="bg-destructive/20 rounded-2xl px-4 py-2">
                  <span className="text-2xl font-bold text-destructive">{wrongCount}</span>
                  <span className="text-xs text-muted-foreground ml-1">Wrong</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 text-sm">
                {correctCount >= 4
                  ? 'Amazing work! 🎉'
                  : 'Keep practicing, you got this!'}
              </p>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <Button
                  onClick={fireQuestions}
                  size="lg"
                  className="rounded-full font-bold gradient-primary text-primary-foreground border-0"
                >
                  <Zap className="w-5 h-5 mr-1" /> More Questions
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/explore')}
                  className="rounded-full font-bold"
                >
                  Want specific topics? <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default HomePage;
