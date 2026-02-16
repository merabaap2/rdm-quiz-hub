import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/AppLayout';
import { Copy, Users, BookOpen, Settings, Home, MessageSquare, Video, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ClassFeed from '@/components/ClassFeed';
import PostComposer from '@/components/PostComposer';
import InviteStudents from '@/components/InviteStudents';

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

type Tab = 'home' | 'posts' | 'live' | 'members' | 'settings';

const tabs: { id: Tab; label: string; icon: typeof Home; emoji: string }[] = [
  { id: 'home', label: 'Home', icon: Home, emoji: '🏠' },
  { id: 'posts', label: 'Posts', icon: MessageSquare, emoji: '📝' },
  { id: 'live', label: 'Live', icon: Video, emoji: '🎥' },
  { id: 'members', label: 'Members', icon: Users, emoji: '👥' },
  { id: 'settings', label: 'Settings', icon: Settings, emoji: '⚙️' },
];

const ClassroomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [classroom, setClassroom] = useState<ClassroomData | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showComposer, setShowComposer] = useState(false);
  const [feedKey, setFeedKey] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const { data: c } = await supabase.from('classrooms').select('*').eq('id', id).maybeSingle();
      setClassroom(c as ClassroomData | null);

      const { data: m } = await supabase.from('classroom_members').select('user_id, role, joined_at, profiles(name, avatar_url)').eq('classroom_id', id);
      setMembers((m as Member[]) || []);
      setLoading(false);
    };
    fetchData();
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

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 bg-muted/30 p-1 rounded-2xl">
          {tabs.filter(t => t.id !== 'settings' || isOwner).map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === t.id ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="text-sm">{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            <div className="edu-card p-6">
              <h3 className="font-display text-lg text-foreground mb-2">📌 Class Overview</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <p className="text-2xl font-extrabold text-foreground">{members.length}</p>
                  <p className="text-muted-foreground text-xs font-bold">Members</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <p className="text-2xl font-extrabold text-foreground">—</p>
                  <p className="text-muted-foreground text-xs font-bold">Posts</p>
                </div>
              </div>
            </div>
            <h3 className="font-display text-lg text-foreground">Recent Posts</h3>
            <ClassFeed classroomId={classroom.id} refreshKey={feedKey} />
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-4">
            {isOwner && !showComposer && (
              <Button onClick={() => setShowComposer(true)} className="rounded-xl edu-btn-primary font-bold gap-2">
                <Plus className="w-4 h-4" /> Create Post
              </Button>
            )}
            {showComposer && (
              <PostComposer classroomId={classroom.id} onClose={() => setShowComposer(false)} onPublished={() => { setShowComposer(false); setFeedKey(k => k + 1); }} />
            )}
            <ClassFeed classroomId={classroom.id} refreshKey={feedKey} />
          </div>
        )}

        {activeTab === 'live' && (
          <div className="edu-card p-6 text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-1">Live Sessions</h3>
            <p className="text-muted-foreground text-sm">Scheduling & Meet integration coming in Phase 5!</p>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            {isOwner && (
              <div className="edu-card p-6">
                <h3 className="font-display text-lg text-foreground mb-4">Invite Students</h3>
                <InviteStudents classroomId={classroom.id} joinCode={classroom.join_code} />
              </div>
            )}
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
          </div>
        )}

        {activeTab === 'settings' && isOwner && (
          <div className="edu-card p-6">
            <h3 className="font-display text-lg text-foreground mb-4">⚙️ Classroom Settings</h3>
            <p className="text-muted-foreground text-sm">Advanced settings coming soon. You can manage members from the Members tab.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ClassroomDetail;
