import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { useUserStore } from '@/store/useUserStore';
import { questions, getQuestionsBySubject, getQuestionsByExam } from '@/data/questions';
import { Question, Subject, ExamType } from '@/types';
import QuestionCard from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { Search, Filter, Zap } from 'lucide-react';

const subjects: { value: Subject; label: string; emoji: string; color: string }[] = [
  { value: 'physics', label: 'Physics', emoji: '⚡', color: 'bg-edu-blue' },
  { value: 'chemistry', label: 'Chemistry', emoji: '🧪', color: 'bg-edu-purple' },
  { value: 'math', label: 'Math', emoji: '📐', color: 'bg-edu-orange' },
  { value: 'biology', label: 'Biology', emoji: '🧬', color: 'bg-edu-green' },
];

const exams: { value: ExamType; label: string }[] = [
  { value: 'JEE', label: 'JEE' },
  { value: 'NEET', label: 'NEET' },
  { value: 'KCET', label: 'KCET' },
  { value: 'other', label: 'Other' },
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

  return (
    <AppLayout>
      <div className="p-4 pb-8">
        {!showQuestions ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-display text-foreground mb-1 flex items-center gap-2">
              <Search className="w-6 h-6" /> Explore
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Find questions by subject, topic, or exam type
            </p>

            <div className="mb-5">
              <h3 className="text-sm font-bold text-foreground mb-2">Subject</h3>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedSubject(selectedSubject === s.value ? null : s.value)}
                    className={`p-3 rounded-2xl text-left transition-all ${
                      selectedSubject === s.value
                        ? `${s.color} text-primary-foreground shadow-lg scale-[1.02]`
                        : 'bg-card border border-border hover:shadow'
                    }`}
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <span className="block font-bold text-sm mt-1">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-foreground mb-2">Exam Type</h3>
              <div className="flex gap-2 flex-wrap">
                {exams.map((e) => (
                  <button
                    key={e.value}
                    onClick={() => setSelectedExam(selectedExam === e.value ? null : e.value)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      selectedExam === e.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={applyFilter}
              size="lg"
              className="w-full rounded-xl font-bold gradient-primary text-primary-foreground border-0"
            >
              <Filter className="w-5 h-5 mr-1" /> Find Questions
            </Button>
          </motion.div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="sm" onClick={() => setShowQuestions(false)} className="rounded-full text-xs">
                ← Back to filters
              </Button>
              <span className="text-xs text-muted-foreground">
                {filteredQuestions.length} questions found
              </span>
            </div>
            {filteredQuestions.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No questions match your filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Explore;
