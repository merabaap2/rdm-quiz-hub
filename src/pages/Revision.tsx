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
        <h2 className="text-3xl font-display text-foreground mb-2 flex items-center gap-2">
          <BookMarked className="w-7 h-7" /> Revision Bank
        </h2>
        <p className="text-muted-foreground mb-6">
          {savedQuestions.length} saved questions
        </p>

        {savedQuestions.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-muted-foreground">
              Save questions during practice to build your revision bank!
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {savedQuestions.map((q) => (
              <motion.div key={q.id} layout>
                {activeId === q.id ? (
                  <div className="sm:col-span-2">
                    <QuestionCard question={q} onNext={() => setActiveId(null)} />
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveId(q.id)}
                    className="w-full bg-card rounded-2xl p-5 border border-border text-left hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-primary capitalize">
                          {q.subject} · {q.topic}
                        </span>
                        <p className="text-sm font-semibold text-foreground mt-1 line-clamp-2">
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
                        className="shrink-0"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
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
