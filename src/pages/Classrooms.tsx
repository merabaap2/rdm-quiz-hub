import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Copy, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Classroom {
  id: string;
  name: string;
  section: string | null;
  subject: string | null;
  description: string | null;
  join_code: string;
  teacher_id: string;
  created_at: string;
}

const Classrooms = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newSection, setNewSection] = useState('');
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
    });
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }

    // Also add self as teacher member
    const { data: newClass } = await supabase.from('classrooms').select('id').eq('teacher_id', user.id).order('created_at', { ascending: false }).limit(1).single();
    if (newClass) {
      await supabase.from('classroom_members').insert({ classroom_id: newClass.id, user_id: user.id, role: 'teacher' });
    }

    setDialogOpen(false);
    setNewName(''); setNewSubject(''); setNewSection('');
    fetchClassrooms();
    toast({ title: 'Classroom created! 🎉' });
  };

  const handleJoin = async () => {
    if (!joinCode.trim() || !user) return;
    const { data: classroom } = await supabase.from('classrooms').select('id').eq('join_code', joinCode.trim()).single();
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
                    <Input placeholder="Enter 6-digit join code" value={joinCode} onChange={e => setJoinCode(e.target.value)} className="rounded-xl h-12 text-center text-lg tracking-widest font-bold" maxLength={6} />
                    <Button onClick={handleJoin} className="w-full rounded-xl edu-btn-primary h-12 font-extrabold">Join 🚀</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            {isTeacher && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl edu-btn-primary font-bold gap-2"><Plus className="w-4 h-4" /> New Classroom</Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                  <DialogHeader><DialogTitle className="font-display">Create Classroom</DialogTitle></DialogHeader>
                  <div className="space-y-4 mt-2">
                    <Input placeholder="Class name (e.g. Physics 11A)" value={newName} onChange={e => setNewName(e.target.value)} className="rounded-xl h-12" />
                    <Input placeholder="Subject (optional)" value={newSubject} onChange={e => setNewSubject(e.target.value)} className="rounded-xl h-12" />
                    <Input placeholder="Section (optional)" value={newSection} onChange={e => setNewSection(e.target.value)} className="rounded-xl h-12" />
                    <Button onClick={createClassroom} disabled={!newName.trim()} className="w-full rounded-xl edu-btn-primary h-12 font-extrabold">Create 🎯</Button>
                  </div>
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
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/classroom/${c.id}`)}
                className="edu-card p-6 cursor-pointer hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground text-xl shadow-md">
                    📚
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
                {c.section && <span className="edu-chip bg-muted text-muted-foreground mt-2">{c.section}</span>}
                <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" /> View members
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
