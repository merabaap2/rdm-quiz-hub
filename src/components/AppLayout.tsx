import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { Home, Compass, BookMarked, User, Coins, Settings, Crown } from 'lucide-react';
import StreakTimer from '@/components/StreakTimer';
import BreakScreen from '@/components/BreakScreen';
import RecallExercise from '@/components/RecallExercise';
import { useStreakTimer } from '@/hooks/useStreakTimer';

interface AppLayoutProps {
  children: ReactNode;
  streakTimer?: ReturnType<typeof useStreakTimer>;
}

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/explore', icon: Compass, label: 'Explore' },
  { path: '/revision', icon: BookMarked, label: 'Revision' },
  { path: '/pricing', icon: Crown, label: 'Plans' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const AppLayout = ({ children, streakTimer }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((s) => s.user);
  const allResults = useUserStore((s) => s.allResults);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🎯</span>
            <h1 className="text-2xl font-display text-primary">EduBlast</h1>
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {streakTimer?.isActive && (
              <StreakTimer
                phase={streakTimer.phase}
                secondsLeft={streakTimer.secondsLeft}
                totalSeconds={streakTimer.totalSeconds}
              />
            )}
            {user && (
              <div className="flex items-center gap-1.5 bg-edu-yellow/20 px-3 py-1.5 rounded-full">
                <Coins className="w-4 h-4 text-edu-orange" />
                <span className="font-bold text-sm text-foreground">{user.rdm}</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">RDM</span>
              </div>
            )}
            <button
              onClick={() => navigate('/profile')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile nav - horizontal scroll */}
        <div className="md:hidden border-t border-border">
          <div className="flex overflow-x-auto px-2">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-6">{children}</main>

      {/* Overlay screens */}
      {streakTimer?.isActive && streakTimer.phase === 'break' && (
        <BreakScreen secondsLeft={streakTimer.secondsLeft} />
      )}
      {streakTimer?.isActive && streakTimer.phase === 'recall' && (
        <RecallExercise secondsLeft={streakTimer.secondsLeft} recentResults={allResults.slice(-5)} />
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 EduBlast — Learn thru Questions</span>
          <div className="flex gap-4">
            <button onClick={() => navigate('/pricing')} className="hover:text-foreground transition-colors">Pricing</button>
            <button onClick={() => navigate('/profile')} className="hover:text-foreground transition-colors">Profile</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
