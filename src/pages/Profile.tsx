import AppLayout from '@/components/AppLayout';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut, BookOpen, Trophy, Coins, Settings as SettingsIcon } from 'lucide-react';

const Profile = () => {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const allResults = useUserStore((s) => s.allResults);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const totalCorrect = allResults.filter((r) => r.isCorrect).length;
  const totalWrong = allResults.filter((r) => !r.isCorrect).length;
  const accuracy = allResults.length > 0 ? Math.round((totalCorrect / allResults.length) * 100) : 0;

  return (
    <AppLayout>
      <div className="p-4 pb-8 space-y-4">
        {/* Profile header */}
        <div className="bg-card rounded-2xl p-5 border border-border text-center">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-display text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">
            Class {user.classLevel} · {user.stream} · {user.subjectCombo}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card rounded-2xl p-3 border border-border text-center">
            <Coins className="w-5 h-5 text-edu-orange mx-auto mb-1" />
            <span className="text-lg font-bold text-foreground">{user.rdm}</span>
            <span className="block text-[10px] text-muted-foreground">RDM</span>
          </div>
          <div className="bg-card rounded-2xl p-3 border border-border text-center">
            <Trophy className="w-5 h-5 text-edu-yellow mx-auto mb-1" />
            <span className="text-lg font-bold text-foreground">{accuracy}%</span>
            <span className="block text-[10px] text-muted-foreground">Accuracy</span>
          </div>
          <div className="bg-card rounded-2xl p-3 border border-border text-center">
            <BookOpen className="w-5 h-5 text-edu-blue mx-auto mb-1" />
            <span className="text-lg font-bold text-foreground">{allResults.length}</span>
            <span className="block text-[10px] text-muted-foreground">Answered</span>
          </div>
        </div>

        {/* History */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h3 className="font-bold text-foreground text-sm mb-2">Performance</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-accent h-full rounded-full transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-bold">{totalCorrect}✓ {totalWrong}✗</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full rounded-xl justify-start"
            onClick={() => navigate('/pricing')}
          >
            <Coins className="w-4 h-4 mr-2" /> Pricing Plans & Top-up
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-xl justify-start text-destructive hover:text-destructive"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <LogOut className="w-4 h-4 mr-2" /> Log Out
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
