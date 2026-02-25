import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Users, Award } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import UserProfilePopup from '@/components/UserProfilePopup';
import { dummyProfiles } from '@/data/dummyProfiles';
import { proposals } from '@/data/edufundProposals';
import { useToast } from '@/hooks/use-toast';

const EduFundProposal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supporting, setSupporting] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');

  const proposal = proposals.find(p => p.id === id);
  const profile = proposal ? dummyProfiles.find(p => p.id === proposal.profileId) : null;

  if (!proposal || !profile) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-muted-foreground">Proposal not found.</p>
          <Button variant="outline" onClick={() => navigate('/edufund')}>Back to EduFund</Button>
        </div>
      </AppLayout>
    );
  }

  const pct = Math.round((proposal.raised / proposal.goal) * 100);

  const handleDonate = () => {
    const amt = parseInt(donationAmount);
    if (!amt || amt <= 0) return;
    toast({ title: 'Thank you! 💛', description: `You donated ₹${amt.toLocaleString('en-IN')} to "${proposal.title}".` });
    setSupporting(false);
    setDonationAmount('');
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back button */}
        <Button variant="ghost" className="gap-2 -ml-2" onClick={() => navigate('/edufund')}>
          <ArrowLeft className="w-4 h-4" /> Back to EduFund
        </Button>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Author header */}
            <div className="flex items-center gap-3">
              <UserProfilePopup userId={profile.id}>
                <button className={`w-12 h-12 rounded-full ${profile.avatarColor} flex items-center justify-center text-white font-bold text-base shrink-0`}>
                  {profile.initials}
                </button>
              </UserProfilePopup>
              <div className="flex-1 min-w-0">
                <UserProfilePopup userId={profile.id}>
                  <button className="font-bold text-foreground hover:underline">{profile.name}</button>
                </UserProfilePopup>
                <p className="text-xs text-muted-foreground">{proposal.postedDate}</p>
              </div>
              <Badge variant="secondary" className="gap-1 text-xs font-bold shrink-0">
                {proposal.categoryIcon} {proposal.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-display font-bold text-foreground leading-tight">
              {proposal.title}
            </h1>

            {/* Full story */}
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {proposal.fullStory.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0">{paragraph}</p>
              ))}
            </div>

            {/* Badges */}
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
              <Progress value={pct} className="h-3" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {proposal.supporters} supporters</span>
                <span className="font-bold text-primary">{pct}% funded</span>
              </div>
            </div>

            {/* Support action */}
            <AnimatePresence mode="wait">
              {supporting ? (
                <motion.div key="input" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2">
                  <span className="text-sm font-bold text-muted-foreground">₹</span>
                  <Input type="number" placeholder="Amount" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} className="w-28 h-9 rounded-xl" min={1} />
                  <Button size="sm" className="rounded-xl font-bold gap-1" onClick={handleDonate}>
                    <Heart className="w-3.5 h-3.5" /> Donate
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-xl" onClick={() => setSupporting(false)}>Cancel</Button>
                </motion.div>
              ) : (
                <motion.div key="btn">
                  <Button variant="outline" className="gap-2 rounded-xl font-bold w-full" onClick={() => setSupporting(true)}>
                    <Heart className="w-4 h-4 text-destructive" /> Support this student
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Profile summary card */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full ${profile.avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                {profile.initials}
              </div>
              <div>
                <p className="font-bold text-foreground">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.bio}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">{profile.rdm}</p>
                <p className="text-xs text-muted-foreground">RDM</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{profile.acceptedAnswers}</p>
                <p className="text-xs text-muted-foreground">Answers</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{profile.streakDays}d</p>
                <p className="text-xs text-muted-foreground">Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EduFundProposal;
