import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const JoinClassroom = () => {
  const { classId } = useParams<{ classId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [classroom, setClassroom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!classId) return;
    supabase.from('classrooms').select('*').eq('id', classId).single().then(({ data }) => {
      setClassroom(data);
      setLoading(false);
    });
  }, [classId]);

  if (authLoading || loading) return <div className="min-h-screen flex items-center justify-center"><span className="text-4xl animate-pulse">📚</span></div>;
  if (!user) { navigate('/auth'); return null; }
  if (!classroom) return <div className="min-h-screen flex items-center justify-center"><h2 className="font-display text-2xl">Classroom not found</h2></div>;

  const handleJoin = async () => {
    setJoining(true);
    const { error } = await supabase.from('classroom_members').insert({ classroom_id: classroom.id, user_id: user.id, role: 'student' });
    if (error) {
      if (error.code === '23505') { toast({ title: 'Already a member!' }); navigate(`/classroom/${classroom.id}`); }
      else toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Joined! 🎉' });
      navigate(`/classroom/${classroom.id}`);
    }
    setJoining(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 gradient-hero opacity-95" />
      <div className="relative flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-3xl p-8 shadow-2xl w-full max-w-md border border-border/50 text-center">
          <span className="text-5xl block mb-4">📚</span>
          <h1 className="text-2xl font-display text-foreground mb-1">{classroom.name}</h1>
          {classroom.subject && <p className="text-muted-foreground">{classroom.subject}</p>}
          <p className="text-sm text-muted-foreground mt-4 mb-6">You've been invited to join this classroom</p>
          <Button onClick={handleJoin} disabled={joining} className="w-full rounded-xl edu-btn-primary h-12 text-base font-extrabold">
            {joining ? 'Joining...' : 'Join Classroom 🚀'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinClassroom;
