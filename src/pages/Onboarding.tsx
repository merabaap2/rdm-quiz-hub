import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigate, useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, ArrowRight } from 'lucide-react';

const teachingLevels = ['School', 'UG', 'PG', 'Competitive', 'International'];
const examTags = ['JEE', 'NEET', 'GRE', 'GMAT', 'SAT', 'TOEFL'];
const subjects = ['Physics', 'Chemistry', 'Math', 'Biology'];
const visibilityOptions = [
  { value: 'public', label: '🌍 Public', desc: 'Anyone can find you' },
  { value: 'invite_only', label: '🔒 Invite-only', desc: 'Only via link/code' },
];

const Onboarding = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [name, setName] = useState(profile?.name || '');
  const [classLevel, setClassLevel] = useState(11);
  const [subjectCombo, setSubjectCombo] = useState('PCM');
  const [teachingSubjects, setTeachingSubjects] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [visibility, setVisibility] = useState('public');
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><span className="text-4xl animate-pulse">🎯</span></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (profile?.onboarding_complete) return <Navigate to="/home" replace />;

  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) =>
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  const handleComplete = async () => {
    setSaving(true);
    const updates: Record<string, any> = {
      name: name.trim() || 'Student',
      role: role!,
      onboarding_complete: true,
      visibility,
    };

    if (role === 'student') {
      updates.class_level = classLevel;
      updates.subject_combo = subjectCombo;
      updates.stream = 'science';
    } else {
      updates.subjects = teachingSubjects;
      updates.teaching_levels = selectedLevels;
      updates.exam_tags = selectedExams;
    }

    await supabase.from('profiles').update(updates).eq('id', user.id);

    if (role === 'teacher') {
      await supabase.from('user_roles').update({ role: 'teacher' } as any).eq('user_id', user.id);
    }

    await refreshProfile();
    setSaving(false);

    import('canvas-confetti').then(c => c.default({ particleCount: 150, spread: 80, origin: { y: 0.6 } }));
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 gradient-hero opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex items-center justify-center p-6">
        {step === 'role' && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg w-full">
            <div className="text-center mb-8">
              <span className="text-5xl block mb-3">👋</span>
              <h1 className="text-3xl font-display text-primary-foreground">Who are you?</h1>
              <p className="text-primary-foreground/70 mt-2">Choose your role to personalize your experience</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { r: 'student' as const, emoji: '🎓', title: 'Student', desc: 'Learn, practice & conquer exams' },
                { r: 'teacher' as const, emoji: '📖', title: 'Teacher', desc: 'Create classrooms & teach' },
              ].map(({ r, emoji, title, desc }) => (
                <button key={r} onClick={() => { setRole(r); setStep('details'); }}
                  className={`bg-card rounded-3xl p-6 text-center border-2 transition-all hover:scale-105 hover:shadow-xl ${role === r ? 'border-primary shadow-lg' : 'border-border/50'}`}>
                  <span className="text-5xl block mb-3">{emoji}</span>
                  <h3 className="font-display text-xl text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'details' && role === 'student' && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-3xl p-8 shadow-2xl w-full max-w-md border border-border/50">
            <div className="text-center mb-6">
              <span className="text-4xl block mb-2">🎓</span>
              <h2 className="text-2xl font-display text-foreground">Student Profile</h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-extrabold text-foreground mb-1.5 block">Your Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} className="rounded-xl h-12" placeholder="Enter your name" />
              </div>
              <div>
                <label className="text-sm font-extrabold text-foreground mb-2 block">Class</label>
                <div className="grid grid-cols-4 gap-2">
                  {[9, 10, 11, 12].map(c => (
                    <button key={c} onClick={() => setClassLevel(c)}
                      className={`py-2.5 rounded-xl font-extrabold text-sm transition-all ${classLevel === c ? 'bg-primary text-primary-foreground shadow-md scale-105' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-extrabold text-foreground mb-2 block">Subject Combo</label>
                <div className="grid grid-cols-2 gap-3">
                  {['PCM', 'PCMB'].map(sc => (
                    <button key={sc} onClick={() => setSubjectCombo(sc)}
                      className={`py-3.5 rounded-xl font-extrabold transition-all ${subjectCombo === sc ? 'bg-accent text-accent-foreground shadow-md scale-105' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                      {sc}
                      <span className="block text-xs font-bold mt-0.5 opacity-70">{sc === 'PCM' ? 'Physics, Chem, Math' : '+ Biology'}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('role')} className="rounded-xl">Back</Button>
                <Button onClick={handleComplete} disabled={saving} className="flex-1 rounded-xl edu-btn-primary h-12 text-base font-extrabold">
                  {saving ? 'Saving...' : 'Start Learning! ✨'} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'details' && role === 'teacher' && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-3xl p-8 shadow-2xl w-full max-w-md border border-border/50 max-h-[85vh] overflow-y-auto">
            <div className="text-center mb-6">
              <span className="text-4xl block mb-2">📖</span>
              <h2 className="text-2xl font-display text-foreground">Teacher Profile</h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-extrabold text-foreground mb-1.5 block">Your Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} className="rounded-xl h-12" placeholder="Enter your name" />
              </div>
              <div>
                <label className="text-sm font-extrabold text-foreground mb-2 block">Teaching Levels</label>
                <div className="flex flex-wrap gap-2">
                  {teachingLevels.map(l => (
                    <button key={l} onClick={() => toggle(selectedLevels, l, setSelectedLevels)}
                      className={`px-3 py-2 rounded-xl font-bold text-sm transition-all ${selectedLevels.includes(l) ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-extrabold text-foreground mb-2 block">Subjects You Teach</label>
                <div className="grid grid-cols-2 gap-2">
                  {subjects.map(s => (
                    <button key={s} onClick={() => toggle(teachingSubjects, s, setTeachingSubjects)}
                      className={`py-2.5 rounded-xl font-extrabold text-sm transition-all ${teachingSubjects.includes(s) ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-extrabold text-foreground mb-2 block">Exam Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {examTags.map(e => (
                    <button key={e} onClick={() => toggle(selectedExams, e, setSelectedExams)}
                      className={`px-3 py-2 rounded-xl font-bold text-sm transition-all ${selectedExams.includes(e) ? 'bg-accent text-accent-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-extrabold text-foreground mb-2 block">Visibility</label>
                <div className="grid grid-cols-2 gap-2">
                  {visibilityOptions.map(v => (
                    <button key={v.value} onClick={() => setVisibility(v.value)}
                      className={`py-3 rounded-xl font-bold text-sm transition-all ${visibility === v.value ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                      {v.label}
                      <span className="block text-xs opacity-70 mt-0.5">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('role')} className="rounded-xl">Back</Button>
                <Button onClick={handleComplete} disabled={saving} className="flex-1 rounded-xl edu-btn-primary h-12 text-base font-extrabold">
                  {saving ? 'Saving...' : 'Create Profile! 🚀'} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
