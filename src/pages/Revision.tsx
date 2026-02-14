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
      <div className="p-4 pb-8">
        <h2 className="text-2xl font-display text-foreground mb-1 flex items-center gap-2">
          <BookMarked className="w-6 h-6" /> Revision Bank
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          {savedQuestions.length} saved questions
        </p>

        {savedQuestions.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">📚</div>
            <p className="text-muted-foreground text-sm">
              Save questions during practice to build your revision bank!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedQuestions.map((q) => (
              <motion.div key={q.id} layout>
                {activeId === q.id ? (
                  <div>
                    <QuestionCard question={q} onNext={() => setActiveId(null)} />
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveId(q.id)}
                    className="w-full bg-card rounded-2xl p-4 border border-border text-left hover:shadow transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-primary capitalize">
                          {q.subject} · {q.topic}
                        </span>
                        <p className="text-sm font-semibold text-foreground mt-0.5 line-clamp-2">
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
