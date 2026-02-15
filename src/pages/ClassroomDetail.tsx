import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/AppLayout';
import { Copy, Users, BookOpen, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClassroomData {
  id: string;
  name: string;
  section: string | null;
  subject: string | null;
  description: string | null;
  join_code: string;
  teacher_id: string;
}

interface Member {
  user_id: string;
  role: string;
  joined_at: string;
  profiles: { name: string; avatar_url: string | null } | null;
}

const ClassroomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [classroom, setClassroom] = useState<ClassroomData | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data: c } = await supabase.from('classrooms').select('*').eq('id', id).single();
      setClassroom(c as ClassroomData | null);

      const { data: m } = await supabase.from('classroom_members').select('user_id, role, joined_at, profiles(name, avatar_url)').eq('classroom_id', id);
      setMembers((m as Member[]) || []);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const isOwner = classroom?.teacher_id === user?.id;

  if (loading) return <AppLayout><div className="flex items-center justify-center py-20"><span className="text-4xl animate-pulse">📚</span></div></AppLayout>;
  if (!classroom) return <AppLayout><div className="text-center py-20"><h2 className="font-display text-2xl">Classroom not found</h2></div></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl gradient-primary p-8 text-primary-foreground">
          <div className="relative z-10">
            <h1 className="text-3xl font-display mb-1">{classroom.name}</h1>
            {classroom.subject && <p className="text-primary-foreground/80 font-bold">{classroom.subject}</p>}
            {classroom.section && <span className="inline-block mt-2 bg-primary-foreground/20 px-3 py-1 rounded-full text-sm font-bold">{classroom.section}</span>}
            {isOwner && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-primary-foreground/70">Join Code:</span>
                <button onClick={() => { navigator.clipboard.writeText(classroom.join_code); toast({ title: 'Copied!' }); }}
                  className="bg-primary-foreground/20 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1.5 hover:bg-primary-foreground/30 transition-colors">
                  <Copy className="w-3.5 h-3.5" /> {classroom.join_code}
                </button>
              </div>
            )}
          </div>
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-primary-foreground/10 rounded-full blur-sm" />
        </motion.div>

        {/* Members */}
        <div className="edu-card p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-display text-foreground">Members ({members.length})</h2>
          </div>

          {members.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No members yet. Share the join code to invite students!</p>
          ) : (
            <div className="grid gap-2">
              {members.map(m => (
                <div key={m.user_id} className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {(m.profiles?.name || '?')[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-foreground">{m.profiles?.name || 'Unknown'}</p>
                  </div>
                  <span className={`edu-chip text-xs ${m.role === 'teacher' ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Posts placeholder */}
        <div className="edu-card p-6 text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <h3 className="font-display text-lg text-foreground mb-1">Class Feed</h3>
          <p className="text-muted-foreground text-sm">Content posting coming in Phase 4!</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ClassroomDetail;
