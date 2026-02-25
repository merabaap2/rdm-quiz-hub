import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Target, CheckCircle2, Award, GraduationCap, ChevronRight, Flame, MessageCircleQuestion, ClipboardList, Laptop, BookOpen, FlaskConical } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import UserProfilePopup from '@/components/UserProfilePopup';
import { dummyProfiles } from '@/data/dummyProfiles';
import { proposals } from '@/data/edufundProposals';
import { useToast } from '@/hooks/use-toast';

const eligibilityCriteria = [
  { label: '3+ Accepted Answers in Doubts', icon: <MessageCircleQuestion className="w-4 h-4" />, met: true },
  { label: 'Completed 1+ Mock Test', icon: <ClipboardList className="w-4 h-4" />, met: true },
  { label: '3+ Day Revision Streak', icon: <Flame className="w-4 h-4" />, met: false },
  { label: 'Scholar Rank (100+ RDM)', icon: <Award className="w-4 h-4" />, met: true },
];

const categoryOptions = [
  { value: 'Learning Device', icon: <Laptop className="w-3.5 h-3.5" /> },
  { value: 'Books & Materials', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { value: 'Lab Equipment', icon: <FlaskConical className="w-3.5 h-3.5" /> },
  { value: 'Course Fee', icon: <GraduationCap className="w-3.5 h-3.5" /> },
];

const EduFund = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supportingId, setSupportingId] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newStory, setNewStory] = useState('');

  const topSupported = [...proposals].sort((a, b) => b.raised / b.goal - a.raised / a.goal).slice(0, 3);

  const getProfile = (id: string) => dummyProfiles.find(p => p.id === id);

  const handleCreateSubmit = () => {
    if (!newTitle || !newCategory || !newGoal || !newStory) {
      toast({ title: 'Missing fields', description: 'Please fill in all fields.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Proposal submitted! 💛', description: 'Your proposal has been published successfully.' });
    setCreateOpen(false);
    setNewTitle('');
    setNewCategory('');
    setNewGoal('');
    setNewStory('');
  };

  const handleDonate = (title: string) => {
    const amt = parseInt(donationAmount);
    if (!amt || amt <= 0) return;
    toast({ title: 'Thank you! 💛', description: `You donated ₹${amt.toLocaleString('en-IN')} to "${title}".` });
    setSupportingId(null);
    setDonationAmount('');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💛</span>
            <h1 className="text-3xl font-display font-bold text-foreground">EduFund</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Support academically committed students who need help funding their education essentials. Every contribution makes a difference.
          </p>
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 rounded-xl font-bold">
                <Heart className="w-4 h-4" /> Create Proposal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-destructive" /> Create Funding Proposal
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="e.g., Need a laptop for JEE prep" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <span className="flex items-center gap-2">{opt.icon} {opt.value}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Goal Amount (₹)</Label>
                  <Input id="goal" type="number" placeholder="e.g., 25000" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} className="rounded-xl" min={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="story">Your Story</Label>
                  <Textarea id="story" placeholder="Tell the community why you need this, what it means to you, and how it will help your studies..." value={newStory} onChange={(e) => setNewStory(e.target.value)} className="rounded-xl min-h-[140px]" />
                </div>
                {/* Disclaimer */}
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive leading-relaxed">
                  <span className="font-bold">⚠️ Important:</span> Your story must be 100% original and written in your own words. AI-generated, copied, or plagiarised content will result in <span className="font-bold">immediate proposal removal, all received funds being blocked, and permanent account suspension.</span> Write genuinely — reviewers verify every submission.
                </div>
                <Button className="w-full rounded-xl font-bold gap-2" onClick={handleCreateSubmit}>
                  <Heart className="w-4 h-4" /> Publish Proposal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-bold">{proposals.length} active proposals</span>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Feed */}
          <div className="space-y-5">
            {proposals.map((proposal, i) => {
              const profile = getProfile(proposal.profileId);
              if (!profile) return null;
              const pct = Math.round((proposal.raised / proposal.goal) * 100);

              return (
                <motion.div key={proposal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-5 space-y-4">
                      {/* Author row */}
                      <div className="flex items-center gap-3">
                        <UserProfilePopup userId={profile.id}>
                          <button className={`w-10 h-10 rounded-full ${profile.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                            {profile.initials}
                          </button>
                        </UserProfilePopup>
                        <div className="flex-1 min-w-0">
                          <UserProfilePopup userId={profile.id}>
                            <button className="font-bold text-foreground hover:underline text-sm">{profile.name}</button>
                          </UserProfilePopup>
                          <p className="text-xs text-muted-foreground">{proposal.postedDate}</p>
                        </div>
                        <Badge variant="secondary" className="gap-1 text-xs font-bold shrink-0">
                          {proposal.categoryIcon} {proposal.category}
                        </Badge>
                      </div>

                      {/* Title & Story (truncated) */}
                      <div>
                        <button className="text-left" onClick={() => navigate(`/edufund/${proposal.id}`)}>
                          <h3 className="font-bold text-foreground text-lg leading-tight mb-2 hover:underline">{proposal.title}</h3>
                        </button>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{proposal.story}</p>
                        <button onClick={() => navigate(`/edufund/${proposal.id}`)} className="text-xs font-bold text-primary hover:underline mt-1">
                          Read more →
                        </button>
                      </div>

                      {/* Eligibility badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {proposal.badges.map((badge) => (
                          <span key={badge.label} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {badge.icon} {badge.label}
                          </span>
                        ))}
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-foreground">₹{proposal.raised.toLocaleString('en-IN')}</span>
                          <span className="text-muted-foreground">of ₹{proposal.goal.toLocaleString('en-IN')}</span>
                        </div>
                        <Progress value={pct} className="h-2.5" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {proposal.supporters} supporters</span>
                          <span className="font-bold text-primary">{pct}% funded</span>
                        </div>
                      </div>

                      {/* Support action */}
                      <AnimatePresence mode="wait">
                        {supportingId === proposal.id ? (
                          <motion.div key="input" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2">
                            <span className="text-sm font-bold text-muted-foreground">₹</span>
                            <Input type="number" placeholder="Amount" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} className="w-28 h-9 rounded-xl" min={1} />
                            <Button size="sm" className="rounded-xl font-bold gap-1" onClick={() => handleDonate(proposal.title)}>
                              <Heart className="w-3.5 h-3.5" /> Donate
                            </Button>
                            <Button size="sm" variant="ghost" className="rounded-xl" onClick={() => setSupportingId(null)}>Cancel</Button>
                          </motion.div>
                        ) : (
                          <motion.div key="btn">
                            <Button variant="outline" className="gap-2 rounded-xl font-bold w-full" onClick={() => setSupportingId(proposal.id)}>
                              <Heart className="w-4 h-4 text-destructive" /> Support this student
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* How it works */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> How EduFund Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3"><span className="text-lg">1️⃣</span><p>Verified students publish a funding proposal with their story and goal amount.</p></div>
                <div className="flex gap-3"><span className="text-lg">2️⃣</span><p>Community members browse proposals and donate any amount they wish.</p></div>
                <div className="flex gap-3"><span className="text-lg">3️⃣</span><p>Progress is tracked transparently. Once funded, the student gets the resources they need.</p></div>
              </CardContent>
            </Card>

            {/* Top supported */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">🔥 Top Supported</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topSupported.map((p) => {
                  const profile = getProfile(p.profileId);
                  if (!profile) return null;
                  const pct = Math.round((p.raised / p.goal) * 100);
                  return (
                    <button key={p.id} className="flex items-center gap-3 w-full text-left hover:bg-muted/50 rounded-lg p-1 -m-1 transition-colors" onClick={() => navigate(`/edufund/${p.id}`)}>
                      <div className={`w-8 h-8 rounded-full ${profile.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                        {profile.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{pct}% funded · {p.supporters} supporters</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Eligibility criteria */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" /> Eligibility to Publish
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {eligibilityCriteria.map((c) => (
                  <div key={c.label} className={`flex items-center gap-2.5 text-sm ${c.met ? 'text-foreground' : 'text-muted-foreground'}`}>
                    <span className={c.met ? 'text-primary' : 'text-muted-foreground/50'}>{c.icon}</span>
                    <span className="font-medium flex-1">{c.label}</span>
                    {c.met && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-1">Meet all criteria to create your own proposal.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EduFund;
