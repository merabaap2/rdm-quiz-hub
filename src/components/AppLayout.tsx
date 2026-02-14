import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { Home, Compass, BookMarked, User, Coins, Settings } from 'lucide-react';
import StreakTimer from '@/components/StreakTimer';
import BreakScreen from '@/components/BreakScreen';
import RecallExercise from '@/components/RecallExercise';
import { useStreakTimer } from '@/hooks/useStreakTimer';

interface AppLayoutProps {
  children: ReactNode;
  streakTimer?: ReturnType<typeof useStreakTimer>;
}

const AppLayout = ({ children, streakTimer }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((s) => s.user);
  const allResults = useUserStore((s) => s.allResults);

  const tabs = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/revision', icon: BookMarked, label: 'Revision' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <h1 className="text-xl font-display text-primary">EduBlast</h1>
          <div className="flex items-center gap-2">
            {streakTimer?.isActive && (
              <StreakTimer
                phase={streakTimer.phase}
                secondsLeft={streakTimer.secondsLeft}
                totalSeconds={streakTimer.totalSeconds}
              />
            )}
            {user && (
              <div className="flex items-center gap-1 bg-edu-yellow/20 px-2.5 py-1 rounded-full">
                <Coins className="w-3.5 h-3.5 text-edu-orange" />
                <span className="font-bold text-xs text-foreground">{user.rdm}</span>
              </div>
            )}
            <button
              onClick={() => navigate('/profile')}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full">{children}</main>

      {/* Overlay screens */}
      {streakTimer?.isActive && streakTimer.phase === 'break' && (
        <BreakScreen secondsLeft={streakTimer.secondsLeft} />
      )}
      {streakTimer?.isActive && streakTimer.phase === 'recall' && (
        <RecallExercise secondsLeft={streakTimer.secondsLeft} recentResults={allResults.slice(-5)} />
      )}

      {/* Bottom Tab Bar */}
      <nav className="sticky bottom-0 z-40 bg-card/95 backdrop-blur border-t border-border">
        <div className="max-w-lg mx-auto flex">
          {tabs.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] font-bold">{label}</span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
