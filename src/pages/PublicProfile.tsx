import AppLayout from '@/components/AppLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileById, rankColors, type DummyProfile } from '@/data/dummyProfiles';
import { Progress } from '@/components/ui/progress';
import { Award, ArrowLeft, CheckCircle2, Flame, GraduationCap, HelpCircle, Medal, MessageSquare, ShieldCheck, ShieldAlert, ShieldQuestion, Star, Trophy, Zap, Calendar, Target, BookOpen } from 'lucide-react';

const subjectBarColors: Record<string, string> = {
  physics: 'bg-secondary',
  chemistry: 'bg-primary',
  math: 'bg-edu-orange',
  biology: 'bg-accent',
};

const levelColors: Record<string, string> = {
  School: 'bg-muted text-muted-foreground',
  District: 'bg-secondary/15 text-secondary',
  State: 'bg-accent/15 text-accent',
  National: 'bg-primary/15 text-primary',
  International: 'bg-edu-orange/15 text-edu-orange',
};

const verificationConfig = {
  verified: { label: 'Verified', icon: ShieldCheck, className: 'text-accent' },
  pending: { label: 'Pending', icon: ShieldQuestion, className: 'text-edu-orange' },
  unverified: { label: 'Unverified', icon: ShieldAlert, className: 'text-muted-foreground' },
};

const PublicProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const profile = getProfileById(id || '');

  if (!profile) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-muted-foreground">Profile not found</p>
          <button onClick={() => navigate('/doubts')} className="mt-4 text-secondary font-bold hover:underline">← Back to Doubts</button>
        </div>
      </AppLayout>
    );
  }

  const totalAnswered = Object.values(profile.subjectStats).reduce((a, b) => a + b, 0);
  const maxSubject = Math.max(...Object.values(profile.subjectStats));
  const rankProgress = Math.min(100, Math.round((profile.rdm / profile.nextRankRdm) * 100));

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Header card */}
        <div className="edu-card p-6">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-full ${profile.avatarColor} flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0`}>
              {profile.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-foreground">{profile.name}</h1>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${rankColors[profile.rank]}`}>{profile.rank}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <span className="text-sm font-bold text-edu-orange">🪙 {profile.rdm} RDM</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Since {profile.memberSince}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Flame className="w-3 h-3 text-edu-orange" /> {profile.streakDays}-day streak</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          {profile.badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {profile.badges.map((badge) => (
                <span key={badge} className="text-xs px-2.5 py-1 rounded-full bg-edu-orange/10 text-edu-orange font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" /> {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Questions Asked', value: profile.questionsAsked, icon: HelpCircle, color: 'text-secondary' },
            { label: 'Answers Given', value: profile.answersGiven, icon: MessageSquare, color: 'text-primary' },
            { label: 'Accepted Answers', value: profile.acceptedAnswers, icon: CheckCircle2, color: 'text-accent' },
            { label: 'Strike Rate', value: `${profile.strikeRate}%`, icon: Target, color: 'text-edu-orange' },
          ].map((stat) => (
            <div key={stat.label} className="edu-card p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Academic Record */}
        {profile.academics.length > 0 && (
          <div className="edu-card p-5">
            <h2 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-4">
              <GraduationCap className="w-4 h-4 text-secondary" /> Academic Record
            </h2>
            <div className="space-y-2">
              {profile.academics.map((rec, i) => {
                const v = verificationConfig[rec.verified];
                return (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">{rec.exam}</span>
                      <span className="text-xs text-muted-foreground">{rec.board}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground">{rec.score}</span>
                      <span className={`flex items-center gap-1 text-xs font-medium ${v.className}`}>
                        <v.icon className="w-3.5 h-3.5" /> {v.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Achievements & Competitions */}
        {profile.achievements.length > 0 && (
          <div className="edu-card p-5">
            <h2 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-4">
              <Medal className="w-4 h-4 text-edu-orange" /> Achievements & Competitions
            </h2>
            <div className="space-y-2">
              {profile.achievements.map((ach, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{ach.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${levelColors[ach.level]}`}>{ach.level}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{ach.year}</span>
                    <span className="text-xs font-semibold text-foreground">{ach.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RDM Score Breakdown */}
        <div className="edu-card p-5">
          <h2 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-4">
            <Zap className="w-4 h-4 text-edu-orange" /> RDM Score Breakdown
          </h2>
          {(() => {
            const b = profile.rdmBreakdown;
            const items = [
              { label: 'Answers Given', value: b.answersGiven, color: 'bg-primary' },
              { label: 'Accepted Bonus', value: b.acceptedBonus, color: 'bg-accent' },
              { label: 'Mock Tests', value: b.mockTests, color: 'bg-secondary' },
              { label: 'Streak Bonus', value: b.streakBonus, color: 'bg-edu-orange' },
              { label: 'Bounties Won', value: b.bountiesWon, color: 'bg-edu-yellow' },
              { label: 'Doubts Asked', value: b.doubtsAsked, color: 'bg-muted-foreground' },
            ];
            const total = items.reduce((s, i) => s + i.value, 0);
            const maxVal = Math.max(...items.map(i => i.value));
            return (
              <>
                <div className="space-y-2.5">
                  {items.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-28 shrink-0">{item.label}</span>
                      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${maxVal > 0 ? (item.value / maxVal) * 100 : 0}%` }} />
                      </div>
                      <span className="text-xs font-bold text-foreground w-12 text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4 pt-3 border-t border-border">
                  <span className="text-sm font-bold text-edu-orange">Total: {total} RDM 🪙</span>
                </div>
              </>
            );
          })()}
        </div>

        {/* Subject breakdown */}
        <div className="edu-card p-5">
          <h2 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-4">
            <BookOpen className="w-4 h-4 text-secondary" /> Subject Breakdown
          </h2>
          <div className="space-y-3">
            {(Object.entries(profile.subjectStats) as [string, number][]).map(([subject, count]) => (
              <div key={subject} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-20 capitalize font-medium">{subject}</span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${subjectBarColors[subject]}`}
                    style={{ width: `${maxSubject > 0 ? (count / maxSubject) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-foreground w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">Total answers across subjects: <span className="font-bold text-foreground">{totalAnswered}</span></p>
        </div>

        {/* Reputation */}
        <div className="edu-card p-5">
          <h2 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-4">
            <Trophy className="w-4 h-4 text-edu-yellow" /> Reputation
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{profile.rdmFromDoubts}</p>
              <p className="text-[10px] text-muted-foreground">RDM from Doubts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{profile.bountiesWon}</p>
              <p className="text-[10px] text-muted-foreground">Bounties Won</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{profile.streakDays}d</p>
              <p className="text-[10px] text-muted-foreground">Active Streak</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Rank progress to next level</span>
              <span className="text-xs font-bold text-foreground">{profile.rdm}/{profile.nextRankRdm} RDM</span>
            </div>
            <Progress value={rankProgress} className="h-2" />
          </div>
        </div>

        {/* Recent activity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="edu-card p-5">
            <h2 className="font-bold text-sm text-foreground mb-3">Recent Doubts</h2>
            {profile.recentDoubts.map((d, i) => (
              <p key={i} className="text-xs text-muted-foreground py-1.5 border-b border-border last:border-0">{d}</p>
            ))}
          </div>
          <div className="edu-card p-5">
            <h2 className="font-bold text-sm text-foreground mb-3">Recent Answers</h2>
            {profile.recentAnswers.map((a, i) => (
              <p key={i} className="text-xs text-muted-foreground py-1.5 border-b border-border last:border-0">{a}</p>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PublicProfile;
