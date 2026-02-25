import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { getProfileById, rankColors, type DummyProfile } from '@/data/dummyProfiles';
import { Award, CheckCircle2, Flame, HelpCircle, MessageSquare, Star, Trophy, Zap } from 'lucide-react';

const subjectBarColors: Record<string, string> = {
  physics: 'bg-secondary',
  chemistry: 'bg-primary',
  math: 'bg-edu-orange',
  biology: 'bg-accent',
};

const ProfileContent = ({ profile }: { profile: DummyProfile }) => {
  const totalAnswered = profile.subjectStats.physics + profile.subjectStats.chemistry + profile.subjectStats.math + profile.subjectStats.biology;
  const maxSubject = Math.max(...Object.values(profile.subjectStats));
  const rankProgress = Math.min(100, Math.round((profile.rdm / profile.nextRankRdm) * 100));

  return (
    <div className="w-[340px] space-y-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-full ${profile.avatarColor} flex items-center justify-center text-lg font-bold text-primary-foreground shrink-0`}>
          {profile.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-sm text-foreground">{profile.name}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${rankColors[profile.rank]}`}>{profile.rank}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{profile.bio}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-bold text-edu-orange">🪙 {profile.rdm} RDM</span>
            <span className="text-[10px] text-muted-foreground">Since {profile.memberSince}</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      {profile.badges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {profile.badges.map((badge) => (
            <span key={badge} className="text-[10px] px-2 py-0.5 rounded-full bg-edu-orange/10 text-edu-orange font-semibold flex items-center gap-1">
              <Star className="w-3 h-3" /> {badge}
            </span>
          ))}
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: 'Asked', value: profile.questionsAsked, icon: HelpCircle, color: 'text-secondary' },
          { label: 'Answered', value: profile.answersGiven, icon: MessageSquare, color: 'text-primary' },
          { label: 'Accepted', value: profile.acceptedAnswers, icon: CheckCircle2, color: 'text-accent' },
          { label: 'Strike %', value: `${profile.strikeRate}%`, icon: Zap, color: 'text-edu-orange' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-muted/50 p-2 text-center">
            <stat.icon className={`w-3.5 h-3.5 mx-auto mb-0.5 ${stat.color}`} />
            <p className="text-sm font-bold text-foreground">{stat.value}</p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Subject breakdown */}
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Subject Breakdown</p>
        <div className="space-y-1">
          {(Object.entries(profile.subjectStats) as [string, number][]).map(([subject, count]) => (
            <div key={subject} className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-16 capitalize">{subject}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${subjectBarColors[subject]}`}
                  style={{ width: `${maxSubject > 0 ? (count / maxSubject) * 100 : 0}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-foreground w-5 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reputation */}
      <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground">Rank progress</span>
            <span className="text-[10px] font-bold text-foreground">{profile.rdm}/{profile.nextRankRdm} RDM</span>
          </div>
          <Progress value={rankProgress} className="h-1.5" />
        </div>
        <div className="text-center shrink-0">
          <Trophy className="w-4 h-4 text-edu-yellow mx-auto" />
          <p className="text-[9px] text-muted-foreground mt-0.5">{profile.bountiesWon} won</p>
        </div>
      </div>

      {/* Activity */}
      <div className="flex items-center gap-2 text-[10px]">
        <Flame className="w-3.5 h-3.5 text-edu-orange" />
        <span className="font-bold text-foreground">{profile.streakDays}-day streak</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{profile.rdmFromDoubts} RDM from doubts</span>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Recent Doubts</p>
          {profile.recentDoubts.slice(0, 3).map((d, i) => (
            <p key={i} className="text-[10px] text-muted-foreground truncate py-0.5">{d}</p>
          ))}
        </div>
        <div>
          <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Recent Answers</p>
          {profile.recentAnswers.slice(0, 3).map((a, i) => (
            <p key={i} className="text-[10px] text-muted-foreground truncate py-0.5">{a}</p>
          ))}
        </div>
      </div>

      {/* Footer */}
      <button className="w-full text-xs font-bold text-secondary hover:underline text-center py-1">
        View Full Profile →
      </button>
    </div>
  );
};

interface UserProfilePopupProps {
  userId: string;
  children: React.ReactNode;
}

const UserProfilePopup = ({ userId, children }: UserProfilePopupProps) => {
  const profile = getProfileById(userId);
  if (!profile) return <>{children}</>;

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-auto p-4" side="top" align="start">
        <ProfileContent profile={profile} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserProfilePopup;
