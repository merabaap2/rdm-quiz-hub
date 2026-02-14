import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { questions } from '@/data/questions';
import AppLayout from '@/components/AppLayout';
import { useStreakTimer } from '@/hooks/useStreakTimer';
import { Progress } from '@/components/ui/progress';
import {
  Crosshair, Compass, BookMarked, Crown, TrendingUp,
  Target, CheckCircle2, XCircle, Coins, AlertTriangle,
  Zap, ArrowRight, BookOpen
} from 'lucide-react';
import { Subject } from '@/types';

const subjectColors: Record<Subject, string> = {
  physics: 'bg-blue-500',
  chemistry: 'bg-green-500',
  math: 'bg-purple-500',
  biology: 'bg-pink-500',
};

const subjectEmojis: Record<Subject, string> = {
  physics: '⚡',
  chemistry: '🧪',
  math: '📐',
  biology: '🧬',
};

const Dashboard = () => {
  const user = useUserStore((s) => s.user);
  const allResults = useUserStore((s) => s.allResults);
  const navigate = useNavigate();
  const streakTimer = useStreakTimer();

  const subjects: Subject[] = useMemo(() => {
    if (!user) return ['physics', 'chemistry', 'math'];
    return user.subjectCombo === 'PCMB'
      ? ['physics', 'chemistry', 'math', 'biology']
      : ['physics', 'chemistry', 'math'];
  }, [user]);

  // Calculate per-subject stats
  const subjectStats = useMemo(() => {
    return subjects.map((subject) => {
      const subjectQIds = questions
        .filter((q) => q.subject === subject)
        .map((q) => q.id);
      const subjectResults = allResults.filter((r) =>
        subjectQIds.includes(r.questionId)
      );
      const total = subjectResults.length;
      const correct = subjectResults.filter((r) => r.isCorrect).length;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      return { subject, total, correct, wrong: total - correct, accuracy };
    });
  }, [subjects, allResults]);

  // Overall stats
  const totalAnswered = allResults.length;
  const totalCorrect = allResults.filter((r) => r.isCorrect).length;
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Find weakest subject
  const weakestSubject = useMemo(() => {
    const attempted = subjectStats.filter((s) => s.total > 0);
    if (attempted.length === 0) return null;
    return attempted.reduce((min, s) => (s.accuracy < min.accuracy ? s : min));
  }, [subjectStats]);

  // Recent activity (last 5)
  const recentActivity = useMemo(() => {
    return allResults.slice(-5).reverse().map((r) => {
      const q = questions.find((q) => q.id === r.questionId);
      return { ...r, question: q };
    });
  }, [allResults]);

  const quickActions = [
    {
      icon: Crosshair,
      label: 'Question Gun',
      desc: 'Fire 5 random questions',
      path: '/play',
      gradient: 'from-orange-500 to-red-500',
      emoji: '🔥',
    },
    {
      icon: Compass,
      label: 'Explore Topics',
      desc: 'Browse by subject & topic',
      path: '/explore',
      gradient: 'from-blue-500 to-cyan-500',
      emoji: '🧭',
    },
    {
      icon: BookMarked,
      label: 'Revision Bank',
      desc: 'Review saved questions',
      path: '/revision',
      gradient: 'from-green-500 to-emerald-500',
      emoji: '📚',
    },
    {
      icon: Crown,
      label: 'Premium Plans',
      desc: 'Unlock more features',
      path: '/pricing',
      gradient: 'from-purple-500 to-pink-500',
      emoji: '👑',
    },
  ];

  return (
    <AppLayout streakTimer={streakTimer}>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-primary p-8 text-primary-foreground"
        >
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-display mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Class {user?.classLevel} • {user?.subjectCombo} •{' '}
              {user?.stream.charAt(0).toUpperCase()}{user?.stream.slice(1)} Stream
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -right-5 bottom-0 w-24 h-24 bg-white/5 rounded-full" />
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: Target,
              label: 'Questions Answered',
              value: totalAnswered,
              color: 'text-blue-500',
              bg: 'bg-blue-500/10',
            },
            {
              icon: TrendingUp,
              label: 'Accuracy',
              value: `${overallAccuracy}%`,
              color: 'text-green-500',
              bg: 'bg-green-500/10',
            },
            {
              icon: Coins,
              label: 'RDM Balance',
              value: user?.rdm ?? 0,
              color: 'text-amber-500',
              bg: 'bg-amber-500/10',
            },
            {
              icon: BookMarked,
              label: 'Saved Questions',
              value: user?.savedQuestions.length ?? 0,
              color: 'text-purple-500',
              bg: 'bg-purple-500/10',
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Focus Areas - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display text-foreground">Subject Performance</h2>
            </div>

            {totalAnswered === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Target className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-bold">No questions answered yet</p>
                <p className="text-sm mt-1">Fire the Question Gun to start tracking your progress!</p>
              </div>
            ) : (
              <div className="space-y-5">
                {subjectStats.map((stat) => (
                  <div key={stat.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{subjectEmojis[stat.subject]}</span>
                        <span className="font-bold text-sm text-foreground capitalize">
                          {stat.subject}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 text-green-500">
                          <CheckCircle2 className="w-3 h-3" /> {stat.correct}
                        </span>
                        <span className="flex items-center gap-1 text-destructive">
                          <XCircle className="w-3 h-3" /> {stat.wrong}
                        </span>
                        <span className="font-bold text-foreground">{stat.accuracy}%</span>
                      </div>
                    </div>
                    <Progress
                      value={stat.total > 0 ? stat.accuracy : 0}
                      className="h-3 rounded-full"
                    />
                  </div>
                ))}

                {/* Weak area recommendation */}
                {weakestSubject && weakestSubject.accuracy < 70 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
                  >
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm text-foreground">
                        Focus on {weakestSubject.subject.charAt(0).toUpperCase() + weakestSubject.subject.slice(1)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Your accuracy is {weakestSubject.accuracy}% — practice more {weakestSubject.subject} questions to improve!
                      </p>
                      <button
                        onClick={() => navigate('/explore')}
                        className="text-xs text-primary font-bold mt-2 flex items-center gap-1 hover:underline"
                      >
                        Practice now <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* Quick Actions - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 space-y-3"
          >
            <h2 className="text-xl font-display text-foreground mb-3">Quick Actions</h2>
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                onClick={() => navigate(action.path)}
                className="w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:shadow-md hover:border-primary/30 transition-all group text-left"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white text-xl shrink-0`}>
                  {action.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-foreground">{action.label}</div>
                  <div className="text-xs text-muted-foreground">{action.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-xl font-display text-foreground mb-4">Recent Activity</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {recentActivity.map((activity, i) => (
                <div
                  key={`${activity.questionId}-${i}`}
                  className="flex items-center gap-3 bg-muted/50 rounded-xl p-3"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      activity.isCorrect ? 'bg-green-500/15 text-green-500' : 'bg-destructive/15 text-destructive'
                    }`}
                  >
                    {activity.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-foreground truncate">
                      {activity.question?.topic ?? 'Unknown'}
                    </p>
                    <p className="text-[11px] text-muted-foreground capitalize">
                      {activity.question?.subject}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
