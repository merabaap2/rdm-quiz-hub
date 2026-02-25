import AppLayout from '@/components/AppLayout';
import { Clock, BookOpen, Target, Lightbulb, ClipboardList } from 'lucide-react';
import { useState } from 'react';

const durations = [
  { label: '60 min', value: 60 },
  { label: '90 min', value: 90 },
  { label: '180 min', value: 180 },
];

const subjects = [
  { label: 'Physics', emoji: '⚡', color: 'bg-secondary/15 text-secondary border-secondary/30' },
  { label: 'Chemistry', emoji: '🧪', color: 'bg-primary/15 text-primary border-primary/30' },
  { label: 'Math', emoji: '📐', color: 'bg-edu-orange/15 text-edu-orange border-edu-orange/30' },
  { label: 'Biology', emoji: '🌿', color: 'bg-accent/15 text-accent border-accent/30' },
];

const Mock = () => {
  const [selectedDuration, setSelectedDuration] = useState(90);
  const [selectedSubject, setSelectedSubject] = useState('Physics');

  const questionsCount = Math.round(selectedDuration / 2.5);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="edu-page-title">Long-format Mock Tests</h1>
          <p className="edu-page-desc">
            Exam-style tests across multiple chapters — 60, 90 or 180 minutes. Build stamina and find weak spots.
          </p>
        </div>

        {/* Duration */}
        <div className="edu-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-bold text-foreground">Choose duration</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {durations.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDuration(d.value)}
                className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                  selectedDuration === d.value
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            ~{questionsCount} questions in {selectedSubject.toLowerCase()} · ~2–3 min per question
          </p>
        </div>

        {/* Subject */}
        <div className="edu-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-bold text-foreground">Choose subject</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {subjects.map((s) => (
              <button
                key={s.label}
                onClick={() => setSelectedSubject(s.label)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm border transition-all ${
                  selectedSubject === s.label
                    ? s.color + ' border'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground'
                }`}
              >
                <span>{s.emoji}</span>
                {s.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Mock will focus on chapters from {selectedSubject.toLowerCase()}.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="edu-card p-5">
            <Target className="w-6 h-6 text-secondary mb-3" />
            <h3 className="font-bold text-foreground mb-1">Why long mocks?</h3>
            <p className="text-xs text-muted-foreground">
              Time pressure and stamina match the real exam. One full-length mock is worth dozens of short drills.
            </p>
          </div>
          <div className="edu-card p-5">
            <BookOpen className="w-6 h-6 text-secondary mb-3" />
            <h3 className="font-bold text-foreground mb-1">What to expect</h3>
            <p className="text-xs text-muted-foreground">
              Chapters from {selectedSubject.toLowerCase()} aligned with your class level and syllabus.
            </p>
          </div>
          <div className="edu-card p-5">
            <Lightbulb className="w-6 h-6 text-secondary mb-3" />
            <h3 className="font-bold text-foreground mb-1">Strategy</h3>
            <p className="text-xs text-muted-foreground">
              First pass without getting stuck. Flag tough ones and revisit. Use the timer like exam day.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="edu-btn-primary px-8 py-3.5 text-base flex items-center gap-2 mx-auto">
            <ClipboardList className="w-5 h-5" />
            Start mock test
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Mock;
