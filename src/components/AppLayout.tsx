import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/store/useUserStore';
import { LayoutDashboard, Crosshair, Compass, BookMarked, User, Coins, Settings, Crown, ClipboardList, MessageCircleQuestion, Heart } from 'lucide-react';
import StreakTimer from '@/components/StreakTimer';
import NotificationBell from '@/components/NotificationBell';
import BreakScreen from '@/components/BreakScreen';
import RecallExercise from '@/components/RecallExercise';
import { useStreakTimer } from '@/hooks/useStreakTimer';

interface AppLayoutProps {
  children: ReactNode;
  streakTimer?: ReturnType<typeof useStreakTimer>;
}

const baseNavItems = [
  { path: '/home', icon: LayoutDashboard, label: 'Dashboard', emoji: '📊' },
  { path: '/play', icon: Crosshair, label: 'Play', emoji: '🔥' },
  { path: '/explore', icon: Compass, label: 'Explore', emoji: '🧭' },
  
  { path: '/mock', icon: ClipboardList, label: 'Mock', emoji: '📝' },
  { path: '/doubts', icon: MessageCircleQuestion, label: 'Doubts', emoji: '❓' },
  { path: '/edufund', icon: Heart, label: 'EduFund', emoji: '💛' },
  { path: '/revision', icon: BookMarked, label: 'Revision', emoji: '📚' },
  { path: '/profile', icon: User, label: 'Profile', emoji: '👤' },
];

const AppLayout = ({ children, streakTimer }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const user = useUserStore((s) => s.user);
  const allResults = useUserStore((s) => s.allResults);
  const navItems = baseNavItems;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <button onClick={() => navigate('/home')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🎯</span>
            <h1 className="text-2xl font-display bg-clip-text text-transparent" style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              EduBlast
            </h1>
          </button>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-0.5 bg-muted/50 rounded-2xl p-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-card text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
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
              <button
                onClick={() => navigate('/pricing')}
                className="flex items-center gap-1.5 bg-edu-yellow/15 hover:bg-edu-yellow/25 px-3.5 py-2 rounded-full transition-colors"
              >
                <Coins className="w-4 h-4 text-edu-orange" />
                <span className="font-extrabold text-sm text-foreground">{user.rdm}</span>
                <span className="text-xs text-muted-foreground hidden sm:inline font-bold">RDM</span>
              </button>
            )}
            <NotificationBell />
            <button
              onClick={() => navigate('/profile')}
              className="w-9 h-9 rounded-xl bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors"
            >
              <Settings className="w-4.5 h-4.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-border/60">
          <div className="flex overflow-x-auto px-2 gap-0.5">
            {navItems.map(({ path, icon: Icon, label, emoji }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-sm">{emoji}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">{children}</main>

      {/* Overlay screens */}
      {streakTimer?.isActive && streakTimer.phase === 'break' && (
        <BreakScreen secondsLeft={streakTimer.secondsLeft} />
      )}
      {streakTimer?.isActive && streakTimer.phase === 'recall' && (
        <RecallExercise secondsLeft={streakTimer.secondsLeft} recentResults={allResults.slice(-5)} />
      )}

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card/40 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="font-bold">© 2026 EduBlast — Learn thru Questions 🎯</span>
          <div className="flex gap-6">
            <button onClick={() => navigate('/pricing')} className="hover:text-foreground transition-colors font-bold">Pricing</button>
            <button onClick={() => navigate('/profile')} className="hover:text-foreground transition-colors font-bold">Profile</button>
            <button onClick={() => navigate('/explore')} className="hover:text-foreground transition-colors font-bold">Explore</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
