import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { useUserStore } from '@/store/useUserStore';
import { questions } from '@/data/questions';
import { Question, Subject, ExamType } from '@/types';
import QuestionCard from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { Search, Filter, ArrowLeft, Sparkles } from 'lucide-react';

const subjects: { value: Subject; label: string; emoji: string; gradient: string }[] = [
  { value: 'physics', label: 'Physics', emoji: '⚡', gradient: 'from-blue-500 to-cyan-400' },
  { value: 'chemistry', label: 'Chemistry', emoji: '🧪', gradient: 'from-purple-500 to-violet-400' },
  { value: 'math', label: 'Math', emoji: '📐', gradient: 'from-orange-500 to-amber-400' },
  { value: 'biology', label: 'Biology', emoji: '🧬', gradient: 'from-green-500 to-emerald-400' },
];

const exams: { value: ExamType; label: string; emoji: string }[] = [
  { value: 'JEE', label: 'JEE', emoji: '🎯' },
  { value: 'NEET', label: 'NEET', emoji: '🩺' },
  { value: 'KCET', label: 'KCET', emoji: '📋' },
  { value: 'other', label: 'Other', emoji: '📝' },
];

const Explore = () => {
  const user = useUserStore((s) => s.user);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);

  const applyFilter = () => {
    let filtered = [...questions];
    if (selectedSubject) filtered = filtered.filter((q) => q.subject === selectedSubject);
    if (selectedExam) filtered = filtered.filter((q) => q.examType.includes(selectedExam));
    if (user) filtered = filtered.filter((q) => q.classLevel <= user.classLevel);
    setFilteredQuestions(filtered.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setShowQuestions(true);
  };

  const matchCount = (() => {
    let filtered = [...questions];
    if (selectedSubject) filtered = filtered.filter((q) => q.subject === selectedSubject);
    if (selectedExam) filtered = filtered.filter((q) => q.examType.includes(selectedExam));
    if (user) filtered = filtered.filter((q) => q.classLevel <= user.classLevel);
    return filtered.length;
  })();

  return (
    <AppLayout>
      {!showQuestions ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="edu-page-header">
            <h2 className="edu-page-title flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-primary-foreground" />
              </div>
              Explore Learning
            </h2>
            <p className="edu-page-desc">Find questions by subject, topic, or exam type</p>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Subject
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {subjects.map((s, i) => (
                <motion.button
                  key={s.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedSubject(selectedSubject === s.value ? null : s.value)}
                  className={`p-5 rounded-2xl text-left transition-all ${
                    selectedSubject === s.value
                      ? `bg-gradient-to-br ${s.gradient} text-primary-foreground shadow-lg scale-[1.03]`
                      : 'edu-card hover:shadow-md'
                  }`}
                >
                  <span className="text-3xl block mb-2">{s.emoji}</span>
                  <span className="font-extrabold text-sm">{s.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" /> Exam Type
            </h3>
            <div className="flex gap-2 flex-wrap">
              {exams.map((e) => (
                <button
                  key={e.value}
                  onClick={() => setSelectedExam(selectedExam === e.value ? null : e.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-extrabold transition-all ${
                    selectedExam === e.value
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {e.emoji} {e.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={applyFilter}
              size="lg"
              className="edu-btn-primary px-10"
            >
              <Filter className="w-5 h-5 mr-2" /> Find Questions
            </Button>
            <span className="text-sm text-muted-foreground font-bold">
              {matchCount} questions available
            </span>
          </div>
        </motion.div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <Button variant="ghost" size="sm" onClick={() => setShowQuestions(false)} className="rounded-full font-extrabold">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to filters
            </Button>
            <span className="text-sm text-muted-foreground font-bold edu-chip bg-muted">
              {currentIndex + 1} / {filteredQuestions.length}
            </span>
          </div>
          {filteredQuestions.length > 0 ? (
            <QuestionCard
              question={filteredQuestions[currentIndex]}
              onNext={() => {
                if (currentIndex < filteredQuestions.length - 1) {
                  setCurrentIndex((i) => i + 1);
                } else {
                  setShowQuestions(false);
                }
              }}
            />
          ) : (
            <div className="text-center py-16 edu-card p-10">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="text-muted-foreground font-bold">No questions match your filters.</p>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default Explore;
