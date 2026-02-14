import AppLayout from '@/components/AppLayout';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut, BookOpen, Trophy, Coins, Target, Clock } from 'lucide-react';

const Profile = () => {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const allResults = useUserStore((s) => s.allResults);
  const navigate = useNavigate();

  if (!user) return null;

  const totalCorrect = allResults.filter((r) => r.isCorrect).length;
  const totalWrong = allResults.filter((r) => !r.isCorrect).length;
  const accuracy = allResults.length > 0 ? Math.round((totalCorrect / allResults.length) * 100) : 0;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        {/* Profile header */}
        <div className="bg-card rounded-2xl p-8 border border-border flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center shrink-0">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-display text-foreground">{user.name}</h2>
            <p className="text-muted-foreground">
              Class {user.classLevel} · {user.subjectCombo}
            </p>
          </div>
          <div className="sm:ml-auto flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/pricing')}
              className="rounded-xl"
            >
              <Coins className="w-4 h-4 mr-2" /> Top Up
            </Button>
            <Button
              variant="outline"
              className="rounded-xl text-destructive hover:text-destructive"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Log Out
            </Button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-5 border border-border text-center">
            <Coins className="w-6 h-6 text-edu-orange mx-auto mb-2" />
            <span className="text-2xl font-bold text-foreground block">{user.rdm}</span>
            <span className="text-xs text-muted-foreground">RDM Balance</span>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border text-center">
            <Trophy className="w-6 h-6 text-edu-yellow mx-auto mb-2" />
            <span className="text-2xl font-bold text-foreground block">{accuracy}%</span>
            <span className="text-xs text-muted-foreground">Accuracy</span>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border text-center">
            <BookOpen className="w-6 h-6 text-edu-blue mx-auto mb-2" />
            <span className="text-2xl font-bold text-foreground block">{allResults.length}</span>
            <span className="text-xs text-muted-foreground">Answered</span>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border text-center">
            <Target className="w-6 h-6 text-edu-green mx-auto mb-2" />
            <span className="text-2xl font-bold text-foreground block">{user.savedQuestions.length}</span>
            <span className="text-xs text-muted-foreground">Saved</span>
          </div>
        </div>

        {/* Performance bar */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-foreground mb-3">Performance</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
              <div
                className="bg-accent h-full rounded-full transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground font-bold whitespace-nowrap">
              {totalCorrect} ✓ · {totalWrong} ✗
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
