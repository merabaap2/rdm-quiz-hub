import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { FileText, Video, HelpCircle, ClipboardList, BarChart3, Megaphone, X, Send } from 'lucide-react';

const contentTypes = [
  { type: 'concept', icon: FileText, label: 'Concept Post', emoji: '💡' },
  { type: 'video', icon: Video, label: 'Video Lesson', emoji: '🎬' },
  { type: 'quiz', icon: HelpCircle, label: 'Practice Quiz', emoji: '❓' },
  { type: 'assignment', icon: ClipboardList, label: 'Assignment', emoji: '📝' },
  { type: 'poll', icon: BarChart3, label: 'Poll / Debate', emoji: '📊' },
  { type: 'announcement', icon: Megaphone, label: 'Announcement', emoji: '📢' },
];

interface Props {
  classroomId: string;
  onClose: () => void;
  onPublished: () => void;
}

const PostComposer = ({ classroomId, onClose, onPublished }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [postType, setPostType] = useState('announcement');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [publishToGoogle, setPublishToGoogle] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handlePublish = async () => {
    if (!title.trim() || !user) return;
    setPublishing(true);

    const { error } = await supabase.from('posts').insert({
      classroom_id: classroomId,
      teacher_id: user.id,
      type: postType,
      title: title.trim(),
      description: description.trim() || null,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      due_date: dueDate || null,
      google_classroom_synced: publishToGoogle,
    });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Published! 🎉' });
      onPublished();
    }
    setPublishing(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="edu-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg text-foreground">Create Post</h3>
        <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Type selector */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
        {contentTypes.map(ct => (
          <button key={ct.type} onClick={() => setPostType(ct.type)}
            className={`flex flex-col items-center gap-1 p-2.5 rounded-xl text-xs font-bold transition-all ${postType === ct.type ? 'bg-primary/10 text-primary ring-2 ring-primary/30' : 'bg-muted/40 text-muted-foreground hover:bg-muted/60'}`}>
            <span className="text-lg">{ct.emoji}</span>
            <span className="leading-tight text-center">{ct.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="rounded-xl h-12 font-bold" />
        <Textarea placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} className="rounded-xl min-h-[80px]" />
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="rounded-xl" />
          <Input type="datetime-local" placeholder="Due date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="rounded-xl" />
        </div>

        {/* Publish destinations */}
        <div className="bg-muted/30 rounded-xl p-4 space-y-2.5">
          <p className="text-xs font-extrabold text-foreground">Publish to:</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked disabled />
            <span className="text-sm font-bold text-foreground">ESM Class Feed</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={publishToGoogle} onCheckedChange={v => setPublishToGoogle(!!v)} />
            <span className="text-sm font-medium text-muted-foreground">Also publish to Google Classroom</span>
            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-bold text-muted-foreground">Coming soon</span>
          </label>
        </div>

        <Button onClick={handlePublish} disabled={!title.trim() || publishing} className="w-full rounded-xl edu-btn-primary h-12 font-extrabold gap-2">
          <Send className="w-4 h-4" /> {publishing ? 'Publishing...' : 'Publish'}
        </Button>
      </div>
    </motion.div>
  );
};

export default PostComposer;
