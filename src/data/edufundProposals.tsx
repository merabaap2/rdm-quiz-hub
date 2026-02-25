import { Award, CheckCircle2, Flame, Star, BookOpen, FlaskConical, Laptop, GraduationCap } from 'lucide-react';

export interface Proposal {
  id: string;
  profileId: string;
  title: string;
  story: string;
  fullStory: string;
  category: string;
  categoryIcon: React.ReactNode;
  goal: number;
  raised: number;
  supporters: number;
  postedDate: string;
  badges: { label: string; icon: React.ReactNode }[];
}

export const proposals: Proposal[] = [
  {
    id: '1',
    profileId: 'sankar-l',
    title: 'Need a laptop for JEE Advanced preparation',
    story: 'I\'ve been preparing for JEE Advanced using my phone, but solving complex physics problems and running simulation tools is nearly impossible on a small screen.',
    fullStory: `I've been preparing for JEE Advanced using my phone, but solving complex physics problems and running simulation tools is nearly impossible on a small screen. A basic laptop would let me use tools like PhET simulations, code practice problems, and attend online coaching sessions properly.

I've saved ₹5,000 from tutoring younger students in my neighborhood, but I need help with the rest. My family runs a small provision store and they can't afford to buy me a laptop right now.

I've been scoring consistently in the top 10% on mock tests here on EduBlast, and my physics teacher says I have a real shot at a good rank if I can access proper tools. Every bit of support means the world to me.

The laptop I'm looking at is a basic Lenovo IdeaPad — nothing fancy, just enough to run simulations, attend live classes, and practice coding for JEE. If I can get this, I promise to pay it forward by helping more students here on EduBlast.`,
    category: 'Learning Device',
    categoryIcon: <Laptop className="w-3.5 h-3.5" />,
    goal: 25000,
    raised: 12500,
    supporters: 18,
    postedDate: '12 Feb 2026',
    badges: [
      { label: 'Scholar Rank', icon: <Award className="w-3 h-3" /> },
      { label: '28 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '7-day Streak', icon: <Flame className="w-3 h-3" /> },
    ],
  },
  {
    id: '2',
    profileId: 'priya-m',
    title: 'Biology reference books for NEET',
    story: 'I\'m targeting NEET 2027 and need Trueman\'s Biology (Vol I & II) and MTG Fingertips for practice. My school library doesn\'t have the latest editions.',
    fullStory: `I'm targeting NEET 2027 and need Trueman's Biology (Vol I & II) and MTG Fingertips for practice. My school library doesn't have the latest editions, and the syllabus changes mean the older versions aren't reliable.

These books are essential for the depth NEET demands, especially in Botany and Human Physiology. I've been relying on free PDFs, but having physical books would massively improve my revision flow — I learn much better when I can highlight, annotate, and flip between chapters quickly.

I'm currently ranked Expert on EduBlast with 49 accepted answers, mostly in Biology. I've helped dozens of students understand cell division, genetics, and ecology. My dream is to become a doctor and serve in a rural healthcare center.

The total cost of all the books I need is around ₹5,000. I know it's not a huge amount, but for my family it's a lot — my father is a daily wage worker and my mother is a homemaker. Any support would mean everything to me.`,
    category: 'Books & Materials',
    categoryIcon: <BookOpen className="w-3.5 h-3.5" />,
    goal: 5000,
    raised: 4200,
    supporters: 31,
    postedDate: '8 Feb 2026',
    badges: [
      { label: 'Expert Rank', icon: <Award className="w-3 h-3" /> },
      { label: '49 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '14-day Streak', icon: <Flame className="w-3 h-3" /> },
      { label: 'Biology Master', icon: <Star className="w-3 h-3" /> },
    ],
  },
  {
    id: '3',
    profileId: 'arjun-k',
    title: 'Graphic calculator for competitive math',
    story: 'Competitive math olympiads require a scientific/graphic calculator for practice (Casio fx-991EX). I\'m preparing for RMO and IOQM.',
    fullStory: `Competitive math olympiads require a scientific/graphic calculator for practice (Casio fx-991EX). I'm preparing for RMO and IOQM, and my current calculator is a basic one from 8th grade that can barely handle quadratic equations.

Having a proper calculator will help me verify complex calculations during timed practice sessions and build confidence for the actual exam. The Casio fx-991EX supports matrix operations, integration, equation solving, and statistical calculations — all of which come up regularly in olympiad preparation.

I've been active on EduBlast for about a month now, answering math doubts and helping others with calculus and algebra. I may not have the highest stats yet, but I'm genuinely passionate about mathematics and I'm working hard every day.

The calculator costs around ₹8,000 and my parents have said they'll try to save up for it, but it might take months. If I can get it sooner, I can start my timed practice sessions immediately and be ready for the upcoming IOQM in time.`,
    category: 'Learning Device',
    categoryIcon: <Laptop className="w-3.5 h-3.5" />,
    goal: 8000,
    raised: 1500,
    supporters: 5,
    postedDate: '18 Feb 2026',
    badges: [
      { label: '10 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '3-day Streak', icon: <Flame className="w-3 h-3" /> },
    ],
  },
  {
    id: '4',
    profileId: 'deepa-r',
    title: 'Chemistry lab equipment for home practice',
    story: 'Organic chemistry practicals are crucial for board exams and NEET. I want to set up a mini home lab with basic equipment.',
    fullStory: `Organic chemistry practicals are crucial for board exams and NEET. I want to set up a mini home lab with basic equipment — test tubes, burette, beakers, litmus papers, and a few reagents.

My school lab hours are limited (only 2 hrs/week), and I learn best by doing experiments hands-on. This setup would let me practice titrations and qualitative analysis at home, which would be a game-changer for my practical exam preparation.

I've been a Scholar rank member on EduBlast with 30 accepted answers, mostly in Chemistry. I've helped students understand organic naming conventions, redox reactions, and the periodic table. Chemistry isn't just a subject for me — it's my passion.

The total cost for a basic home lab kit is around ₹12,000. I've researched suppliers and found a good deal that includes all the essentials. My parents support my dream but can't afford extra expenses right now as my younger brother also has school fees due. Any contribution, no matter how small, will help me get closer to my goal.`,
    category: 'Lab Equipment',
    categoryIcon: <FlaskConical className="w-3.5 h-3.5" />,
    goal: 12000,
    raised: 6800,
    supporters: 14,
    postedDate: '5 Feb 2026',
    badges: [
      { label: 'Scholar Rank', icon: <Award className="w-3 h-3" /> },
      { label: '30 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '9-day Streak', icon: <Flame className="w-3 h-3" /> },
      { label: 'Chemistry Pro', icon: <Star className="w-3 h-3" /> },
    ],
  },
  {
    id: '5',
    profileId: 'ravi-t',
    title: 'Online coaching subscription renewal',
    story: 'My Unacademy Plus subscription expired last month, and I can\'t afford to renew it. The structured courses and live classes were the backbone of my KCET preparation.',
    fullStory: `My Unacademy Plus subscription expired last month, and I can't afford to renew it. The structured courses, live classes, and doubt-solving sessions were the backbone of my KCET preparation. I've been using free YouTube content since, but the quality and structure isn't the same.

A 6-month renewal would carry me through the exam season. The subscription gives me access to 500+ hours of structured video content, daily live classes, and unlimited doubt-solving — all of which have been crucial to my preparation so far.

I'm currently ranked Master on EduBlast with 78 accepted answers across all subjects. I've been one of the top contributors this month and I genuinely love helping others learn. My goal is to crack KCET with a top 500 rank and get into a good engineering college.

The renewal costs ₹15,000 for 6 months. I've already raised most of it thanks to the amazing EduBlast community. Just a little more and I'll be back on track with my structured preparation. I promise to continue helping others here — teaching is how I learn best.`,
    category: 'Course Fee',
    categoryIcon: <GraduationCap className="w-3.5 h-3.5" />,
    goal: 15000,
    raised: 14200,
    supporters: 42,
    postedDate: '1 Feb 2026',
    badges: [
      { label: 'Master Rank', icon: <Award className="w-3 h-3" /> },
      { label: '78 Accepted Answers', icon: <CheckCircle2 className="w-3 h-3" /> },
      { label: '21-day Streak', icon: <Flame className="w-3 h-3" /> },
      { label: 'Bounty King', icon: <Star className="w-3 h-3" /> },
    ],
  },
];
