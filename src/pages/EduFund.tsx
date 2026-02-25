import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Target, CheckCircle2, Award, BookOpen, FlaskConical, Laptop, GraduationCap, ChevronRight, Flame, MessageCircleQuestion, ClipboardList, Star } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import UserProfilePopup from '@/components/UserProfilePopup';
import { dummyProfiles } from '@/data/dummyProfiles';

interface Proposal {
  id: string;
  profileId: string;
  title: string;
  story: string;
  category: string;
  categoryIcon: React.ReactNode;
  goal: number;
  raised: number;
  supporters: number;
  postedDate: string;
  badges: { label: string; icon: React.ReactNode }[];
}

const proposals: Proposal[] = [
  {
    id: '1',
    profileId: 'sankar-l',
    title: 'Need a laptop for JEE Advanced preparation',
    story: 'I\'ve been preparing for JEE Advanced using my phone, but solving complex physics problems and running simulation tools is nearly impossible on a small screen. A basic laptop would let me use tools like PhET simulations, code practice problems, and attend online coaching sessions properly. I\'ve saved ₹5,000 from tutoring younger students, but I need help with the rest. Every bit of support means the world to me.',
    category: 'Learning Device',
    categoryIcon: <Laptop className="w-3.5 h-3.5" />,
    goal: 25000,
    raised: 12500,
    supporters: 18,
    postedDate: '12 Feb 2026',
    badges: [
      { label: 'Scholar Rank', icon: <Award className="w-3 h-3" /> },
      { label: '28 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '7-day Streak', icon: <Flame className="w-3 h-3" /> },
    ],
  },
  {
    id: '2',
    profileId: 'priya-m',
    title: 'Biology reference books for NEET',
    story: 'I\'m targeting NEET 2027 and need Trueman\'s Biology (Vol I & II) and MTG Fingertips for practice. My school library doesn\'t have the latest editions. These books are essential for the depth NEET demands, especially in Botany and Human Physiology. I\'ve been relying on free PDFs, but having physical books would massively improve my revision flow.',
    category: 'Books & Materials',
    categoryIcon: <BookOpen className="w-3.5 h-3.5" />,
    goal: 5000,
    raised: 4200,
    supporters: 31,
    postedDate: '8 Feb 2026',
    badges: [
      { label: 'Expert Rank', icon: <Award className="w-3 h-3" /> },
      { label: '49 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '14-day Streak', icon: <Flame className="w-3 h-3" /> },
      { label: 'Biology Master', icon: <Star className="w-3 h-3" /> },
    ],
  },
  {
    id: '3',
    profileId: 'arjun-k',
    title: 'Graphic calculator for competitive math',
    story: 'Competitive math olympiads require a scientific/graphic calculator for practice (Casio fx-991EX). I\'m preparing for RMO and IOQM. My current calculator is a basic one from 8th grade. Having a proper calculator will help me verify complex calculations during timed practice sessions and build confidence for the actual exam.',
    category: 'Learning Device',
    categoryIcon: <Laptop className="w-3.5 h-3.5" />,
    goal: 8000,
    raised: 1500,
    supporters: 5,
    postedDate: '18 Feb 2026',
    badges: [
      { label: '10 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '3-day Streak', icon: <Flame className="w-3 h-3" /> },
    ],
  },
  {
    id: '4',
    profileId: 'deepa-r',
    title: 'Chemistry lab equipment for home practice',
    story: 'Organic chemistry practicals are crucial for board exams and NEET. I want to set up a mini home lab with basic equipment — test tubes, burette, beakers, litmus papers, and a few reagents. My school lab hours are limited (only 2 hrs/week), and I learn best by doing experiments hands-on. This setup would let me practice titrations and qualitative analysis at home.',
    category: 'Lab Equipment',
    categoryIcon: <FlaskConical className="w-3.5 h-3.5" />,
    goal: 12000,
    raised: 6800,
    supporters: 14,
    postedDate: '5 Feb 2026',
    badges: [
      { label: 'Scholar Rank', icon: <Award className="w-3 h-3" /> },
      { label: '30 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '9-day Streak', icon: <Flame className="w-3 h-3" /> },
      { label: 'Chemistry Pro', icon: <Star className="w-3 h-3" /> },
    ],
  },
  {
    id: '5',
    profileId: 'ravi-t',
    title: 'Online coaching subscription renewal',
    story: 'My Unacademy Plus subscription expired last month, and I can\'t afford to renew it. The structured courses, live classes, and doubt-solving sessions were the backbone of my KCET preparation. I\'ve been using free YouTube content since, but the quality and structure isn\'t the same. A 6-month renewal would carry me through the exam season.',
    category: 'Course Fee',
    categoryIcon: <GraduationCap className="w-3.5 h-3.5" />,
    goal: 15000,
    raised: 14200,
    supporters: 42,
    postedDate: '1 Feb 2026',
    badges: [
      { label: 'Master Rank', icon: <Award className="w-3 h-3" /> },
      { label: '78 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '21-day Streak', icon: <Flame className="w-3 h-3" /> },
      { label: 'Bounty King', icon: <Star className="w-3 h-3" /> },
    ],
  },
];

const eligibilityCriteria = [
  { label: '3+ Accepted Answers in Doubts', icon: <MessageCircleQuestion className="w-4 h-4" />, met: true },
  { label: 'Completed 1+ Mock Test', icon: <ClipboardList className="w-4 h-4" />, met: true },
  { label: '3+ Day Revision Streak', icon: <Flame className="w-4 h-4" />, met: false },
  { label: 'Scholar Rank (100+ RDM)', icon: <Award className="w-4 h-4" />, met: true },
];

const EduFund = () => {
  const [supportingId, setSupportingId] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');

  const topSupported = [...proposals].sort((a, b) => b.raised / b.goal - a.raised / a.goal).slice(0, 3);

  const getProfile = (id: string) => dummyProfiles.find(p => p.id === id);

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
          <Button className="gap-2 rounded-xl font-bold">
            <Heart className="w-4 h-4" /> Create Proposal
          </Button>
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
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
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

                      {/* Title & Story */}
                      <div>
                        <h3 className="font-bold text-foreground text-lg leading-tight mb-2">{proposal.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{proposal.story}</p>
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
                          <motion.div
                            key="input"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm font-bold text-muted-foreground">₹</span>
                            <Input
                              type="number"
                              placeholder="Amount"
                              value={donationAmount}
                              onChange={(e) => setDonationAmount(e.target.value)}
                              className="w-28 h-9 rounded-xl"
                              min={1}
                            />
                            <Button size="sm" className="rounded-xl font-bold gap-1" onClick={() => { setSupportingId(null); setDonationAmount(''); }}>
                              <Heart className="w-3.5 h-3.5" /> Donate
                            </Button>
                            <Button size="sm" variant="ghost" className="rounded-xl" onClick={() => setSupportingId(null)}>
                              Cancel
                            </Button>
                          </motion.div>
                        ) : (
                          <motion.div key="btn">
                            <Button
                              variant="outline"
                              className="gap-2 rounded-xl font-bold w-full"
                              onClick={() => setSupportingId(proposal.id)}
                            >
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
                <div className="flex gap-3">
                  <span className="text-lg">1️⃣</span>
                  <p>Verified students publish a funding proposal with their story and goal amount.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-lg">2️⃣</span>
                  <p>Community members browse proposals and donate any amount they wish.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-lg">3️⃣</span>
                  <p>Progress is tracked transparently. Once funded, the student gets the resources they need.</p>
                </div>
              </CardContent>
            </Card>

            {/* Top supported */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  🔥 Top Supported
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topSupported.map((p) => {
                  const profile = getProfile(p.profileId);
                  if (!profile) return null;
                  const pct = Math.round((p.raised / p.goal) * 100);
                  return (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${profile.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                        {profile.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{pct}% funded · {p.supporters} supporters</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
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
