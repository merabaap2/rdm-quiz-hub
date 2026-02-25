import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { useUserStore } from '@/store/useUserStore';
import { questions } from '@/data/questions';
import { Question, Subject, ExamType, ClassLevel } from '@/types';
import { topicTaxonomy, TopicNode } from '@/data/topicTaxonomy';
import QuestionCard from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, Filter, ArrowLeft, Sparkles, BookOpen, ChevronRight, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

type ViewState = 'subjects' | 'topics' | 'questions';

const Explore = () => {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<ViewState>('subjects');

  // Get question count for a specific subject
  const getSubjectCount = (subject: Subject) => {
    let filtered = questions.filter((q) => q.subject === subject);
    if (selectedExam) filtered = filtered.filter((q) => q.examType.includes(selectedExam));
    if (user) filtered = filtered.filter((q) => q.classLevel <= user.classLevel);
    return filtered.length;
  };

  // Get question count for a specific topic
  const getTopicCount = (subject: Subject, topic: string) => {
    return questions.filter(
      (q) => q.subject === subject && q.topic === topic && (!user || q.classLevel <= user.classLevel)
    ).length;
  };

  // Topics grouped by class for selected subject
  const topicsByClass = useMemo(() => {
    if (!selectedSubject) return {};
    const relevant = topicTaxonomy.filter(
      (t) =>
        t.subject === selectedSubject &&
        (!user || t.classLevel <= user.classLevel) &&
        (!selectedExam || t.examRelevance.includes(selectedExam))
    );
    const grouped: Record<number, TopicNode[]> = {};
    for (const t of relevant) {
      if (!grouped[t.classLevel]) grouped[t.classLevel] = [];
      grouped[t.classLevel].push(t);
    }
    return grouped;
  }, [selectedSubject, selectedExam, user]);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setView('topics');
  };

  const handleTopicSelect = (topic: string) => {
    if (!selectedSubject) return;
    let filtered = questions.filter(
      (q) => q.subject === selectedSubject && q.topic === topic
    );
    if (selectedExam) filtered = filtered.filter((q) => q.examType.includes(selectedExam));
    if (user) filtered = filtered.filter((q) => q.classLevel <= user.classLevel);
    if (filtered.length === 0) return;
    setFilteredQuestions(filtered.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setView('questions');
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setView('subjects');
  };

  const handleBackToTopics = () => {
    setView('topics');
  };

  const subjectMeta = subjects.find((s) => s.value === selectedSubject);

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        {view === 'subjects' && (
          <motion.div
            key="subjects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-3xl mx-auto"
          >
            <div className="edu-page-header">
              <h2 className="edu-page-title flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary-foreground" />
                </div>
                Explore Learning
              </h2>
              <p className="edu-page-desc">Pick a subject to browse topics and questions</p>
            </div>

            {/* Exam Filter */}
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

            {/* Subject Cards */}
            <div className="mb-8">
              <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Subject
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {subjects.map((s, i) => {
                  const count = getSubjectCount(s.value);
                  return (
                    <motion.button
                      key={s.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleSubjectSelect(s.value)}
                      className={`p-5 rounded-2xl text-left transition-all edu-card hover:shadow-lg hover:scale-[1.03] group`}
                    >
                      <span className="text-3xl block mb-2">{s.emoji}</span>
                      <span className="font-extrabold text-sm block text-foreground">{s.label}</span>
                      <span className="text-xs text-muted-foreground font-bold mt-1 block">
                        {count} questions
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Classes Section */}
            <div className="mb-8">
              <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
                <School className="w-4 h-4 text-primary" /> Classes
              </h3>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate('/classrooms')}
                className="w-full p-5 rounded-2xl text-left transition-all edu-card hover:shadow-lg hover:scale-[1.01] group flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🏫</span>
                </div>
                <div className="flex-1">
                  <span className="font-extrabold text-sm block text-foreground">My Classrooms</span>
                  <span className="text-xs text-muted-foreground font-bold mt-0.5 block">
                    Join or manage your classes, view feeds & live sessions
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {view === 'topics' && selectedSubject && (
          <motion.div
            key="topics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToSubjects}
                className="rounded-full font-extrabold"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <div className={`px-4 py-2 rounded-xl bg-gradient-to-br ${subjectMeta?.gradient} text-primary-foreground flex items-center gap-2`}>
                <span className="text-lg">{subjectMeta?.emoji}</span>
                <span className="font-extrabold text-sm">{subjectMeta?.label}</span>
              </div>
              {selectedExam && (
                <Badge variant="secondary" className="font-bold">
                  {selectedExam}
                </Badge>
              )}
            </div>

            <h2 className="edu-page-title text-2xl mb-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Topics & Subtopics
            </h2>
            <p className="edu-page-desc mb-6 text-sm">Click any topic to start practicing questions</p>

            {/* Topics by Class */}
            <Accordion type="multiple" defaultValue={Object.keys(topicsByClass)} className="space-y-3">
              {([9, 10, 11, 12] as ClassLevel[])
                .filter((cl) => topicsByClass[cl] && topicsByClass[cl].length > 0)
                .map((classLevel) => (
                  <AccordionItem
                    key={classLevel}
                    value={String(classLevel)}
                    className="edu-card border rounded-2xl overflow-hidden px-1"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-extrabold text-primary">{classLevel}</span>
                        </div>
                        <span className="font-extrabold text-base text-foreground">
                          Class {classLevel}
                        </span>
                        <Badge variant="outline" className="text-xs font-bold">
                          {topicsByClass[classLevel].length} topics
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-2 pb-3">
                      <div className="space-y-2">
                        {topicsByClass[classLevel].map((topicNode) => {
                          const qCount = getTopicCount(selectedSubject, topicNode.topic);
                          const hasQuestions = qCount > 0;
                          return (
                            <motion.button
                              key={topicNode.topic}
                              whileHover={hasQuestions ? { scale: 1.01 } : {}}
                              whileTap={hasQuestions ? { scale: 0.99 } : {}}
                              onClick={() => hasQuestions && handleTopicSelect(topicNode.topic)}
                              disabled={!hasQuestions}
                              className={`w-full text-left p-4 rounded-xl border transition-all ${
                                hasQuestions
                                  ? 'bg-card hover:bg-muted/50 border-border cursor-pointer hover:shadow-sm'
                                  : 'bg-muted/30 border-transparent opacity-60 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className={`font-bold text-sm ${hasQuestions ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {topicNode.topic}
                                </span>
                                {hasQuestions ? (
                                  <Badge className="text-xs font-bold bg-primary/10 text-primary border-0">
                                    {qCount} Q{qCount !== 1 ? 's' : ''}
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs font-bold text-muted-foreground">
                                    Coming soon
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {topicNode.subtopics.map((st) => (
                                  <span
                                    key={st.name}
                                    className="edu-chip bg-muted/60 text-muted-foreground text-[10px]"
                                  >
                                    {st.name}
                                  </span>
                                ))}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </motion.div>
        )}

        {view === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToTopics}
                className="rounded-full font-extrabold"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to topics
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
                    setView('topics');
                  }
                }}
              />
            ) : (
              <div className="text-center py-16 edu-card p-10">
                <span className="text-5xl block mb-4">🔍</span>
                <p className="text-muted-foreground font-bold">No questions match your filters.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default Explore;
