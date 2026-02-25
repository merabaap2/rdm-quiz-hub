import AppLayout from '@/components/AppLayout';
import { useState } from 'react';
import { MessageCircleQuestion, Plus, ChevronUp, ChevronDown, Bookmark, Flame, Trophy } from 'lucide-react';
import UserProfilePopup from '@/components/UserProfilePopup';

const sampleDoubts = [
  { id: '1', title: "What is the value of Planck's constant?", description: 'Quantum Physics', subject: 'Physics', resolved: true, upvotes: 0, downvotes: 0, answers: 1, date: '21/02/2026', bounty: 50, authorId: 'sankar-l', authorName: 'Sankar L', authorInitials: 'SL' },
  { id: '2', title: 'What is centrifugal force', description: 'I want more context and easy style to understand', subject: 'Physics', resolved: true, upvotes: 1, downvotes: 0, answers: 1, date: '20/02/2026', bounty: 30, authorId: 'sankar-l', authorName: 'Sankar L', authorInitials: 'SL' },
  { id: '3', title: 'What is Hemaglobin', description: 'Add context more', subject: 'Biology', resolved: true, upvotes: 0, downvotes: 0, answers: 1, date: '20/02/2026', bounty: 20, authorId: 'priya-m', authorName: 'Priya M', authorInitials: 'PM' },
  { id: '4', title: 'What is Physics', description: 'General Format', subject: 'Physics', resolved: true, upvotes: 0, downvotes: 0, answers: 1, date: '20/02/2026', bounty: 15, authorId: 'ravi-t', authorName: 'Ravi T', authorInitials: 'RT' },
  { id: '5', title: 'Difference between genotype and phenotype', description: 'I understand genotype is the genetic makeup and phenotype is what we see. Can someone give a simple example like pea plants?', subject: 'Biology', resolved: false, upvotes: 1, downvotes: 0, answers: 1, date: '20/02/2026', bounty: 0, authorId: 'priya-m', authorName: 'Priya M', authorInitials: 'PM' },
  { id: '6', title: 'Best way to balance a redox equation in acidic medium?', description: "I keep getting wrong coefficients for MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺. What are the half-reaction steps?", subject: 'Chemistry', resolved: false, upvotes: 0, downvotes: 0, answers: 0, date: '20/02/2026', bounty: 0, authorId: 'deepa-r', authorName: 'Deepa R', authorInitials: 'DR' },
  { id: '7', title: 'Why does the normal force do no work when walking?', description: 'My teacher said the normal force is perpendicular to displacement so work is zero. Can someone explain why we still need it?', subject: 'Physics', resolved: false, upvotes: 0, downvotes: 0, answers: 0, date: '20/02/2026', bounty: 0, authorId: 'sankar-l', authorName: 'Sankar L', authorInitials: 'SL' },
  { id: '8', title: 'How do I integrate x² eˣ by parts?', description: "I tried u = x² and dv = eˣ dx but the integral gets messy. What's the standard approach?", subject: 'Math', resolved: false, upvotes: 0, downvotes: 0, answers: 1, date: '20/02/2026', bounty: 0, authorId: 'arjun-k', authorName: 'Arjun K', authorInitials: 'AK' },
];

const authorColors: Record<string, string> = {
  'sankar-l': 'bg-secondary',
  'priya-m': 'bg-accent',
  'arjun-k': 'bg-edu-orange',
  'deepa-r': 'bg-primary',
  'ravi-t': 'bg-edu-yellow',
};

const subjectColors: Record<string, string> = {
  Physics: 'bg-secondary/15 text-secondary',
  Chemistry: 'bg-primary/15 text-primary',
  Math: 'bg-edu-orange/15 text-edu-orange',
  Biology: 'bg-accent/15 text-accent',
};

const sortOptions = ['Recent', 'Most upvoted', 'Unanswered', 'Highest bounty'];

const Doubts = () => {
  const [sort, setSort] = useState('Recent');
  const [question, setQuestion] = useState('');

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] gap-6">
        {/* Left sidebar */}
        <aside className="space-y-4">
          <div className="edu-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">?</div>
              <div>
                <p className="font-bold text-foreground text-sm">You</p>
                <p className="text-xs text-edu-orange font-bold">🪙 0 RDM</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Strike rate: 100% · <span className="text-accent font-bold">Novice</span> · 100 RDM to Scholar</p>
          </div>
          <div className="edu-card p-4">
            <h3 className="font-bold text-sm mb-2 text-foreground">My Subjects</h3>
            {['Physics (4)', 'Chemistry (1)', 'Math (1)', 'Biology (2)', 'General Question (0)', 'Other (0)'].map((s) => (
              <label key={s} className="flex items-center gap-2 text-xs text-muted-foreground py-1 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                {s}
              </label>
            ))}
          </div>
          <div className="edu-card p-4">
            <h3 className="font-bold text-sm mb-2 text-foreground">My Activity</h3>
            <button className="text-xs font-bold text-secondary mb-1">All doubts <span className="text-muted-foreground ml-1">9</span></button>
            <p className="text-xs text-muted-foreground py-0.5">📝 Questions I Asked (0)</p>
            <p className="text-xs text-muted-foreground py-0.5">💬 Questions I Answered (3)</p>
            <p className="text-xs text-muted-foreground py-0.5">🔖 Saved Doubts (0)</p>
          </div>
        </aside>

        {/* Main feed */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MessageCircleQuestion className="w-6 h-6 text-edu-orange" />
            <h1 className="edu-page-title text-2xl">Doubts</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Ask and answer. Earn RDM for helpful answers.</p>

          {/* Ask bar */}
          <div className="flex gap-2 mb-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What's your doubt?"
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
            <button className="edu-btn-primary px-4 py-2.5 flex items-center gap-1.5 text-sm">
              <Plus className="w-4 h-4" /> Ask
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-5">
            Click Ask → enter title & subject → then in the last step you can add an <span className="font-bold text-edu-orange">optional bounty</span> (+10, +50, +100 RDM) to attract answers.
          </p>

          {/* Sort */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="text-xs text-muted-foreground">🔽 Sort:</span>
            {sortOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
                  sort === s ? 'bg-edu-orange text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Doubt cards */}
          <div className="space-y-3">
            {sampleDoubts.map((d) => (
              <div key={d.id} className="edu-card p-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-0.5 text-muted-foreground">
                    <button className="hover:text-foreground"><ChevronUp className="w-4 h-4" /></button>
                    <span className="text-xs font-bold">{d.upvotes}</span>
                    <button className="hover:text-foreground"><ChevronDown className="w-4 h-4" /></button>
                  </div>

                  {/* Author avatar */}
                  <UserProfilePopup userId={d.authorId}>
                    <button className={`w-8 h-8 rounded-full ${authorColors[d.authorId] || 'bg-muted'} flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0 cursor-pointer hover:ring-2 hover:ring-secondary/40 transition-all`}>
                      {d.authorInitials}
                    </button>
                  </UserProfilePopup>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <UserProfilePopup userId={d.authorId}>
                        <button className="text-[11px] font-bold text-foreground hover:text-secondary cursor-pointer transition-colors">
                          {d.authorName}
                        </button>
                      </UserProfilePopup>
                      <span className="text-[10px] text-muted-foreground">· {d.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-foreground truncate">{d.title}</h3>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{d.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className={`edu-chip text-[10px] ${subjectColors[d.subject] || 'bg-muted text-muted-foreground'}`}>{d.subject}</span>
                      {d.resolved && <span className="edu-chip text-[10px] bg-accent/15 text-accent">Resolved</span>}
                      {d.bounty > 0 && <span className="edu-chip text-[10px] bg-edu-orange/15 text-edu-orange font-bold">+{d.bounty} RDM</span>}
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground self-start"><Bookmark className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-4">
          <div className="edu-card p-4 border-edu-orange/30">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-2">
              <Flame className="w-4 h-4 text-edu-orange" /> Bounty Board
            </h3>
            <p className="text-[10px] text-muted-foreground mb-2">Top unresolved bounties</p>
            {sampleDoubts.filter(d => d.bounty > 0).map(d => (
              <p key={d.id} className="text-xs text-muted-foreground py-0.5">
                <span className="text-accent font-bold">+{d.bounty} RDM</span> · {d.title}
              </p>
            ))}
          </div>
          <div className="edu-card p-4">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-2">
              <MessageCircleQuestion className="w-4 h-4 text-secondary" /> Trending Now
            </h3>
            {sampleDoubts.slice(0, 5).map(d => (
              <p key={d.id} className="text-xs text-muted-foreground py-0.5 truncate">{d.title}</p>
            ))}
          </div>
          <div className="edu-card p-4">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-2">
              <Trophy className="w-4 h-4 text-edu-yellow" /> Top Contributors (this week)
            </h3>
            {['You', 'Demo User', 'Scholar', 'Expert', 'Helper'].map((name, i) => (
              <div key={name} className="flex items-center gap-2 py-1">
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}.</span>
                <span className="text-xs font-bold text-foreground">{name}</span>
                <span className="text-xs text-accent font-bold ml-auto">{[45, 32, 28, 18, 12][i]} RDM</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </AppLayout>
  );
};

export default Doubts;
