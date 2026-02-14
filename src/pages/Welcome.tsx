import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/useUserStore';
import { ClassLevel, SubjectCombo } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, BookOpen, Trophy, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const { user, signup } = useUserStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'welcome' | 'signup' | 'bonus'>(user?.isSignedUp ? 'bonus' : 'welcome');
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState<ClassLevel>(11);
  const [subjectCombo, setSubjectCombo] = useState<SubjectCombo>('PCM');

  const handleSignup = () => {
    if (!name.trim()) return;
    signup(name.trim(), classLevel, 'science', subjectCombo);
    setStep('bonus');
    // Trigger confetti
    import('canvas-confetti').then((confetti) => {
      confetti.default({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-primary">
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-8xl mb-6"
            >
              🎯
            </motion.div>
            <h1 className="text-5xl font-display text-primary-foreground mb-4">EduBlast</h1>
            <p className="text-xl text-primary-foreground/90 mb-2 font-semibold">Learn. Play. Conquer.</p>
            <p className="text-primary-foreground/70 mb-8">
              Fire questions, earn RDM, and blast through your syllabus with byte-sized learning!
            </p>
            <div className="flex gap-3 justify-center mb-8">
              {[
                { icon: Zap, label: 'Quick Fire' },
                { icon: BookOpen, label: 'Smart Learn' },
                { icon: Trophy, label: 'Earn RDM' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-primary-foreground/20 rounded-2xl p-3 text-center">
                  <Icon className="w-6 h-6 text-primary-foreground mx-auto mb-1" />
                  <span className="text-xs text-primary-foreground/90 font-semibold">{label}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setStep('signup')}
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-10 text-lg font-bold shadow-lg"
            >
              Get Started 🚀
            </Button>
          </motion.div>
        )}

        {step === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-card rounded-3xl p-6 shadow-2xl w-full max-w-md"
          >
            <h2 className="text-2xl font-display text-foreground mb-1 text-center">Join EduBlast! 🎉</h2>
            <p className="text-muted-foreground text-center mb-6 text-sm">Set up your learning profile</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-foreground mb-1 block">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">Class</label>
                <div className="grid grid-cols-4 gap-2">
                  {([9, 10, 11, 12] as ClassLevel[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setClassLevel(c)}
                      className={`py-2 rounded-xl font-bold text-sm transition-all ${
                        classLevel === c
                          ? 'bg-primary text-primary-foreground shadow-md scale-105'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      Class {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">Subject Combo</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['PCM', 'PCMB'] as SubjectCombo[]).map((sc) => (
                    <button
                      key={sc}
                      onClick={() => setSubjectCombo(sc)}
                      className={`py-3 rounded-xl font-bold transition-all ${
                        subjectCombo === sc
                          ? 'bg-accent text-accent-foreground shadow-md scale-105'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {sc}
                      <span className="block text-xs font-normal mt-0.5 opacity-70">
                        {sc === 'PCM' ? 'Physics, Chem, Math' : 'Physics, Chem, Math, Bio'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSignup}
                disabled={!name.trim()}
                size="lg"
                className="w-full rounded-xl text-lg font-bold gradient-primary text-primary-foreground border-0 shadow-lg mt-2"
              >
                Start Learning! ✨
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'bonus' && (
          <motion.div
            key="bonus"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: 2 }}
              className="text-7xl mb-4"
            >
              <Sparkles className="w-20 h-20 text-edu-yellow mx-auto" />
            </motion.div>
            <h2 className="text-3xl font-display text-primary-foreground mb-2">Welcome, {user?.name}! 🎉</h2>
            <p className="text-primary-foreground/80 mb-4">You received a signup bonus!</p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="bg-primary-foreground/20 rounded-2xl p-6 mb-6 inline-block"
            >
              <span className="text-5xl font-bold text-edu-yellow">+100</span>
              <span className="text-xl text-primary-foreground ml-2 font-bold">RDM</span>
            </motion.div>
            <div>
              <Button
                onClick={() => navigate('/home')}
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-10 text-lg font-bold"
              >
                Let's Go! 🔥
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
