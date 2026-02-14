import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/useUserStore';
import { ClassLevel, SubjectCombo } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, BookOpen, Trophy, Sparkles, ArrowRight } from 'lucide-react';
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
    import('canvas-confetti').then((confetti) => {
      confetti.default({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero background */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-foreground/3 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center max-w-2xl mx-auto"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-8xl md:text-9xl mb-8"
              >
                🎯
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-display text-primary-foreground mb-4 tracking-tight">
                EduBlast
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-3 font-extrabold">
                Learn. Play. Conquer.
              </p>
              <p className="text-primary-foreground/60 mb-10 text-base md:text-lg max-w-lg mx-auto">
                Fire questions, earn RDM, and blast through your syllabus with byte-sized learning!
              </p>

              <div className="flex gap-4 justify-center mb-10">
                {[
                  { icon: Zap, label: 'Quick Fire', desc: '5 random Q\'s' },
                  { icon: BookOpen, label: 'Smart Learn', desc: 'Adaptive practice' },
                  { icon: Trophy, label: 'Earn RDM', desc: 'Level up daily' },
                ].map(({ icon: Icon, label, desc }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[120px] border border-primary-foreground/10"
                  >
                    <Icon className="w-7 h-7 text-primary-foreground mx-auto mb-2" />
                    <span className="text-sm text-primary-foreground font-extrabold block">{label}</span>
                    <span className="text-xs text-primary-foreground/60">{desc}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => setStep('signup')}
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-12 py-7 text-lg font-extrabold shadow-2xl hover:scale-105 transition-transform"
              >
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 'signup' && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-card rounded-3xl p-8 shadow-2xl w-full max-w-md border border-border/50"
            >
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">🎉</span>
                <h2 className="text-2xl font-display text-foreground">Join EduBlast!</h2>
                <p className="text-muted-foreground text-sm mt-1">Set up your learning profile</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-extrabold text-foreground mb-1.5 block">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl h-12 text-base"
                  />
                </div>

                <div>
                  <label className="text-sm font-extrabold text-foreground mb-2 block">Class</label>
                  <div className="grid grid-cols-4 gap-2">
                    {([9, 10, 11, 12] as ClassLevel[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setClassLevel(c)}
                        className={`py-2.5 rounded-xl font-extrabold text-sm transition-all ${
                          classLevel === c
                            ? 'bg-primary text-primary-foreground shadow-md scale-105'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-extrabold text-foreground mb-2 block">Subject Combo</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['PCM', 'PCMB'] as SubjectCombo[]).map((sc) => (
                      <button
                        key={sc}
                        onClick={() => setSubjectCombo(sc)}
                        className={`py-3.5 rounded-xl font-extrabold transition-all ${
                          subjectCombo === sc
                            ? 'bg-accent text-accent-foreground shadow-md scale-105'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {sc}
                        <span className="block text-xs font-bold mt-0.5 opacity-70">
                          {sc === 'PCM' ? 'Physics, Chem, Math' : '+ Biology'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSignup}
                  disabled={!name.trim()}
                  size="lg"
                  className="w-full rounded-xl text-lg font-extrabold edu-btn-primary py-6 mt-2"
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
                className="mb-6"
              >
                <Sparkles className="w-20 h-20 text-edu-yellow mx-auto drop-shadow-lg" />
              </motion.div>
              <h2 className="text-3xl font-display text-primary-foreground mb-2">Welcome, {user?.name}! 🎉</h2>
              <p className="text-primary-foreground/80 mb-6">You received a signup bonus!</p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block border border-primary-foreground/10"
              >
                <span className="text-5xl font-extrabold text-edu-yellow">+100</span>
                <span className="text-xl text-primary-foreground ml-2 font-extrabold">RDM</span>
              </motion.div>
              <div>
                <Button
                  onClick={() => navigate('/home')}
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-12 py-7 text-lg font-extrabold shadow-2xl hover:scale-105 transition-transform"
                >
                  Let's Go! 🔥
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom text */}
      <div className="relative text-center pb-6">
        <p className="text-primary-foreground/40 text-xs font-bold">
          Classes 9-12 · PCM & PCMB · JEE · NEET · KCET
        </p>
      </div>
    </div>
  );
};

export default Welcome;
