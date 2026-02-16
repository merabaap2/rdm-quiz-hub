import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Video, HelpCircle, ClipboardList, BarChart3, Megaphone, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Post {
  id: string;
  type: string;
  title: string;
  description: string | null;
  tags: string[];
  due_date: string | null;
  created_at: string;
  teacher_id: string;
  profiles: { name: string } | null;
}

const typeConfig: Record<string, { icon: typeof FileText; emoji: string; color: string }> = {
  concept: { icon: FileText, emoji: '💡', color: 'bg-blue-500/10 text-blue-600' },
  video: { icon: Video, emoji: '🎬', color: 'bg-purple-500/10 text-purple-600' },
  quiz: { icon: HelpCircle, emoji: '❓', color: 'bg-amber-500/10 text-amber-600' },
  assignment: { icon: ClipboardList, emoji: '📝', color: 'bg-green-500/10 text-green-600' },
  poll: { icon: BarChart3, emoji: '📊', color: 'bg-pink-500/10 text-pink-600' },
  announcement: { icon: Megaphone, emoji: '📢', color: 'bg-orange-500/10 text-orange-600' },
};

interface Props {
  classroomId: string;
  refreshKey?: number;
}

const ClassFeed = ({ classroomId, refreshKey }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('posts').select('*, profiles!posts_teacher_id_fkey(name)')
      .eq('classroom_id', classroomId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts((data as unknown as Post[]) || []);
        setLoading(false);
      });
  }, [classroomId, refreshKey]);

  if (loading) return <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="edu-card p-5 h-24 animate-pulse bg-muted/30" />)}</div>;

  if (posts.length === 0) return (
    <div className="text-center py-12">
      <span className="text-4xl block mb-3">📝</span>
      <p className="text-muted-foreground text-sm">No posts yet. Teachers can create the first post!</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {posts.map(post => {
        const cfg = typeConfig[post.type] || typeConfig.announcement;
        return (
          <div key={post.id} className="edu-card p-5 hover:border-primary/20 transition-all">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${cfg.color}`}>
                {cfg.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{post.type}</span>
                  {post.due_date && (
                    <span className="text-[10px] font-bold text-destructive flex items-center gap-0.5">
                      <Calendar className="w-3 h-3" /> Due {format(new Date(post.due_date), 'MMM d')}
                    </span>
                  )}
                </div>
                <h4 className="font-extrabold text-foreground">{post.title}</h4>
                {post.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.description}</p>}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map(tag => <span key={tag} className="edu-chip bg-muted text-muted-foreground text-[10px]">{tag}</span>)}
                  </div>
                )}
                <p className="text-[11px] text-muted-foreground/60 mt-2">
                  {post.profiles?.name || 'Teacher'} · {format(new Date(post.created_at), 'MMM d, h:mm a')}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClassFeed;
