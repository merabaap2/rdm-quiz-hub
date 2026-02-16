import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Copy, BookOpen, Link2, School } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GoogleConnectChecklist from '@/components/GoogleConnectChecklist';

interface Classroom {
  id: string;
  name: string;
  section: string | null;
  subject: string | null;
  description: string | null;
  join_code: string;
  teacher_id: string;
  created_at: string;
  type: string;
}

const Classrooms = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [step, setStep] = useState<'type' | 'google_checklist' | 'google_link' | 'form'>('type');
  const [classroomType, setClassroomType] = useState<'esm_only' | 'google_linked'>('esm_only');
  const [newName, setNewName] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newSection, setNewSection] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const isTeacher = profile?.role === 'teacher';

  const fetchClassrooms = async () => {
    if (!user) return;
    setLoading(true);
    if (isTeacher) {
      const { data } = await supabase.from('classrooms').select('*').eq('teacher_id', user.id).order('created_at', { ascending: false });
      setClassrooms((data as Classroom[]) || []);
    } else {
      const { data: memberships } = await supabase.from('classroom_members').select('classroom_id').eq('user_id', user.id);
      if (memberships && memberships.length > 0) {
        const ids = memberships.map(m => m.classroom_id);
        const { data } = await supabase.from('classrooms').select('*').in('id', ids).order('created_at', { ascending: false });
        setClassrooms((data as Classroom[]) || []);
      } else {
        setClassrooms([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => { fetchClassrooms(); }, [user, profile]);

  const createClassroom = async () => {
    if (!newName.trim() || !user) return;
    const { error } = await supabase.from('classrooms').insert({
      teacher_id: user.id,
      name: newName.trim(),
      subject: newSubject.trim() || null,
      section: newSection.trim() || null,
      description: newDescription.trim() || null,
      type: classroomType,
    });
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }

    const { data: newClass } = await supabase.from('classrooms').select('id').eq('teacher_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle();
    if (newClass) {
      await supabase.from('classroom_members').insert({ classroom_id: newClass.id, user_id: user.id, role: 'teacher' });
    }

    resetDialog();
    fetchClassrooms();
    toast({ title: 'Classroom created! 🎉' });
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setStep('type');
    setNewName(''); setNewSubject(''); setNewSection(''); setNewDescription('');
    setClassroomType('esm_only');
  };

  const handleJoin = async () => {
    if (!joinCode.trim() || !user) return;
    const { data: classroom } = await supabase.from('classrooms').select('id').eq('join_code', joinCode.trim()).maybeSingle();
    if (!classroom) { toast({ title: 'Invalid code', description: 'No classroom found with that code.', variant: 'destructive' }); return; }

    const { error } = await supabase.from('classroom_members').insert({ classroom_id: classroom.id, user_id: user.id, role: 'student' });
    if (error) {
      if (error.code === '23505') toast({ title: 'Already joined!' });
      else toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    setJoinDialogOpen(false); setJoinCode('');
    fetchClassrooms();
    toast({ title: 'Joined classroom! 🎉' });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="edu-page-title">{isTeacher ? 'My Classrooms' : 'Classrooms'}</h1>
            <p className="edu-page-desc">{isTeacher ? 'Manage your classes and students' : 'Your enrolled classes'}</p>
          </div>
          <div className="flex gap-2">
            {!isTeacher && (
              <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl font-bold">Join Class</Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                  <DialogHeader><DialogTitle className="font-display">Join a Classroom</DialogTitle></DialogHeader>
                  <div className="space-y-4 mt-2">
                    <Input placeholder="Enter 8-character join code" value={joinCode} onChange={e => setJoinCode(e.target.value)} className="rounded-xl h-12 text-center text-lg tracking-widest font-bold" maxLength={8} />
                    <Button onClick={handleJoin} className="w-full rounded-xl edu-btn-primary h-12 font-extrabold">Join 🚀</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            {isTeacher && (
              <Dialog open={dialogOpen} onOpenChange={v => { if (!v) resetDialog(); else setDialogOpen(true); }}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl edu-btn-primary font-bold gap-2"><Plus className="w-4 h-4" /> New Classroom</Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl max-w-lg">
                  <DialogHeader><DialogTitle className="font-display">
                    {step === 'type' ? 'Choose Classroom Type' : step === 'google_checklist' ? 'Google Setup' : step === 'google_link' ? 'Link Google Classroom' : 'Create Classroom'}
                  </DialogTitle></DialogHeader>

                  {step === 'type' && (
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button onClick={() => { setClassroomType('google_linked'); setStep('google_checklist'); }}
                        className="bg-muted/30 rounded-2xl p-5 text-center border-2 border-border/50 hover:border-primary/40 hover:shadow-md transition-all">
                        <span className="text-3xl block mb-2">🔗</span>
                        <h3 className="font-display text-sm text-foreground">Link with Google</h3>
                        <p className="text-xs text-muted-foreground mt-1">Recommended</p>
                      </button>
                      <button onClick={() => { setClassroomType('esm_only'); setStep('form'); }}
                        className="bg-muted/30 rounded-2xl p-5 text-center border-2 border-border/50 hover:border-primary/40 hover:shadow-md transition-all">
                        <span className="text-3xl block mb-2">🎯</span>
                        <h3 className="font-display text-sm text-foreground">ESM-only</h3>
                        <p className="text-xs text-muted-foreground mt-1">No Google needed</p>
                      </button>
                    </div>
                  )}

                  {step === 'google_checklist' && (
                    <div className="mt-2">
                      <GoogleConnectChecklist
                        onContinue={() => setStep('google_link')}
                        onSkip={() => { setClassroomType('esm_only'); setStep('form'); }}
                      />
                    </div>
                  )}

                  {step === 'google_link' && (
                    <div className="mt-2 space-y-4">
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="text-sm font-bold text-foreground mb-1">🔗 Google Classroom API</p>
                        <p className="text-xs text-muted-foreground">Google API integration requires credentials setup in your Supabase project. For now, we'll create an ESM classroom marked for Google linking.</p>
                      </div>
                      <Button onClick={() => setStep('form')} className="w-full rounded-xl edu-btn-primary h-11 font-bold">
                        Continue to Create →
                      </Button>
                    </div>
                  )}

                  {step === 'form' && (
                    <div className="space-y-4 mt-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-lg font-bold ${classroomType === 'google_linked' ? 'bg-blue-500/10 text-blue-600' : 'bg-primary/10 text-primary'}`}>
                          {classroomType === 'google_linked' ? '🔗 Google-linked' : '🎯 ESM-only'}
                        </span>
                      </div>
                      <Input placeholder="Class name (e.g. JEE Physics – Mechanics)" value={newName} onChange={e => setNewName(e.target.value)} className="rounded-xl h-12" />
                      <Input placeholder="Subject (optional)" value={newSubject} onChange={e => setNewSubject(e.target.value)} className="rounded-xl" />
                      <Input placeholder="Section (optional)" value={newSection} onChange={e => setNewSection(e.target.value)} className="rounded-xl" />
                      <Textarea placeholder="Description (optional)" value={newDescription} onChange={e => setNewDescription(e.target.value)} className="rounded-xl" />
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setStep('type')} className="rounded-xl">Back</Button>
                        <Button onClick={createClassroom} disabled={!newName.trim()} className="flex-1 rounded-xl edu-btn-primary h-12 font-extrabold">Create 🎯</Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="edu-card p-6 h-40 animate-pulse bg-muted/40" />)}
          </div>
        ) : classrooms.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-1">No classrooms yet</h3>
            <p className="text-muted-foreground text-sm">{isTeacher ? 'Create your first classroom to get started!' : 'Join a classroom using a code from your teacher.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classrooms.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/classroom/${c.id}`)}
                className="edu-card p-6 cursor-pointer hover:border-primary/30 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground text-xl shadow-md">
                    {c.type === 'google_linked' ? '🔗' : '📚'}
                  </div>
                  {isTeacher && (
                    <button onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(c.join_code); toast({ title: 'Code copied!' }); }}
                      className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 hover:bg-muted/80">
                      <Copy className="w-3 h-3" /> {c.join_code}
                    </button>
                  )}
                </div>
                <h3 className="font-extrabold text-foreground text-lg group-hover:text-primary transition-colors">{c.name}</h3>
                {c.subject && <p className="text-sm text-muted-foreground mt-0.5">{c.subject}</p>}
                <div className="flex items-center gap-2 mt-2">
                  {c.section && <span className="edu-chip bg-muted text-muted-foreground">{c.section}</span>}
                  <span className="edu-chip bg-muted text-muted-foreground text-[10px]">{c.type === 'google_linked' ? 'Google' : 'ESM'}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" /> View class
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Classrooms;
