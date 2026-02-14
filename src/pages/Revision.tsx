import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { useUserStore } from '@/store/useUserStore';
import { questions } from '@/data/questions';
import QuestionCard from '@/components/QuestionCard';
import { BookMarked, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Revision = () => {
  const user = useUserStore((s) => s.user);
  const unsaveQuestion = useUserStore((s) => s.unsaveQuestion);
  const [activeId, setActiveId] = useState<string | null>(null);

  const savedQuestions = questions.filter((q) => user?.savedQuestions.includes(q.id));

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="edu-page-header">
          <h2 className="edu-page-title flex items-center gap-3">
            <div className="w-10 h-10 gradient-success rounded-xl flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-primary-foreground" />
            </div>
            Revision Bank
          </h2>
          <p className="edu-page-desc">
            {savedQuestions.length} saved question{savedQuestions.length !== 1 ? 's' : ''}
          </p>
        </div>

        {savedQuestions.length === 0 ? (
          <div className="text-center py-20 edu-card p-10">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-foreground font-bold text-lg mb-1">No saved questions yet</p>
            <p className="text-muted-foreground text-sm">
              Save questions during practice to build your revision bank!
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {savedQuestions.map((q, i) => (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {activeId === q.id ? (
                  <div className="sm:col-span-2">
                    <QuestionCard question={q} onNext={() => setActiveId(null)} />
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveId(q.id)}
                    className="w-full edu-card p-5 text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="edu-chip bg-primary/10 text-primary mb-2">
                          {q.subject} · {q.topic}
                        </span>
                        <p className="text-sm font-bold text-foreground mt-2 line-clamp-2">
                          {q.question}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          unsaveQuestion(q.id);
                        }}
                        className="shrink-0 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Revision;
