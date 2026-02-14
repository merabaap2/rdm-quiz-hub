import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut, BookOpen, Trophy, Coins, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="edu-card p-8 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-display text-foreground">{user.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2 justify-center sm:justify-start">
              <span className="edu-chip bg-primary/10 text-primary">🎓 Class {user.classLevel}</span>
              <span className="edu-chip bg-edu-green/10 text-edu-green">📚 {user.subjectCombo}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/pricing')}
              className="rounded-xl font-extrabold"
            >
              <Coins className="w-4 h-4 mr-2" /> Top Up
            </Button>
            <Button
              variant="outline"
              className="rounded-xl font-extrabold text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Log Out
            </Button>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Coins, label: 'RDM Balance', value: user.rdm, color: 'text-edu-orange', bg: 'bg-edu-orange/10' },
            { icon: Trophy, label: 'Accuracy', value: `${accuracy}%`, color: 'text-edu-yellow', bg: 'bg-edu-yellow/10' },
            { icon: BookOpen, label: 'Answered', value: allResults.length, color: 'text-edu-blue', bg: 'bg-edu-blue/10' },
            { icon: Target, label: 'Saved', value: user.savedQuestions.length, color: 'text-edu-green', bg: 'bg-edu-green/10' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="edu-stat-card"
            >
              <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-2xl font-extrabold text-foreground block">{stat.value}</span>
              <span className="text-xs text-muted-foreground font-bold">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Performance bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="edu-card p-6"
        >
          <h3 className="font-display text-lg text-foreground mb-4">Performance</h3>
          <div className="space-y-3">
            <Progress value={accuracy} className="h-4 rounded-full" />
            <div className="flex items-center justify-between text-sm">
              <span className="font-extrabold text-edu-green flex items-center gap-1">
                ✓ {totalCorrect} Correct
              </span>
              <span className="font-extrabold text-destructive flex items-center gap-1">
                ✗ {totalWrong} Wrong
              </span>
              <span className="font-extrabold text-foreground">
                {accuracy}% Accuracy
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Profile;
