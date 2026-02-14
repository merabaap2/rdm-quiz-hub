

# 🎯 EduBlast – Gamified Learning Platform

## Overview
A fun, colorful, Duolingo-inspired education app where students answer byte-sized questions, earn RDM points, and build learning streaks. The app uses a social-media-style feed with gamification mechanics to make studying for PCM/PCMB exams engaging.

---

## 🔐 Onboarding & Signup Flow
- **Welcome screen** with app branding and animated illustrations
- **Signup form**: Name, Class (9–12), Stream (Science/Commerce/Arts), Subject combo (PCM or PCMB)
- Class selection determines question difficulty and syllabus alignment
- On signup, user receives **100 bonus RDM** with a celebratory animation
- Login/signup will be mocked (local state) for now

---

## 🔫 Question Gun – Core Experience
- Big, satisfying **"Fire!" button** to get a random question
- Questions appear one at a time in a bold, colorful card format
- Each question shows:
  - Subject tag (Physics / Chemistry / Math / Biology)
  - 4 multiple choice options with tap-to-select interaction
  - **Hints** button (expandable)
  - **Show Answer** button
  - **Show Solution** button with step-by-step explanation
  - **Reference section**: Theory, Inventor, Related Topics, Application Example, Embedded YouTube video
  - **Like** and **Share** buttons
- **5 questions per round** – one from each selected subject, balanced distribution
- After 5 questions: "Want more relevant questions?" prompt

---

## 💰 RDM Points System
- **+10 RDM** for correct answer (with green celebration animation)
- **-5 RDM** for wrong answer (with gentle red shake)
- **+100 RDM** signup bonus
- RDM balance always visible in the top navigation bar
- When RDM runs out → prompt to view **Pricing Plans** for top-up
- Mock top-up flow: select a plan, "pay," and receive RDM instantly

---

## 🎯 Subject & Exam Targeting
- After a round, prompt: "Want questions from a specific subject/topic?"
- Filter options: Subject, Topic, Exam type (JEE, NEET, KCET, Others)
- Filtered questions appear in the same Question Gun format

---

## 🔥 25-Minute Streak System
- Timer visible during continuous play
- At **25 minutes**: earn **+50 bonus RDM** with confetti animation
- Mandatory **5-minute break** activates with fun activities:
  - Puzzles
  - Jokes
  - Qualitative & Quantitative brain teasers
  - Analytical challenges

---

## 🧠 Post-Break: Recall & Reinforcement
- After break: **"Cheat AI" Recall Exercise** (2 minutes)
  - Quick recall of questions answered in the last session
- Option to **repeat previous questions with different numerals** or explore related concepts
- Save questions to **Revision Bank** for extra RDM bonus

---

## 📋 Additional Features (Menu Items)
These will be shown as part of the Pricing Plan / Premium features:
- **Past Papers**: Links to past exam papers, answer them in-app or save for later
- **Mock Tests**: Timed, full-length practice tests
- **Adaptive Tests**: Difficulty adjusts based on performance
- **FITRICE Framework**: Structured learning methodology
- Each shows a preview/teaser with a "Unlock with Premium" overlay

---

## 💳 Pricing Plans Page
- **Free Tier**: 100 RDM on signup, earn through correct answers
- **Basic Plan**: Monthly RDM top-up + Past Papers access
- **Pro Plan**: Unlimited RDM + Mock Tests + Adaptive Tests
- **Premium Plan**: Everything + FITRICE Framework + Priority support
- Mock payment flow for demo purposes

---

## 📱 Navigation & Layout
- **Bottom tab bar**: Home (Question Gun), Explore, Revision Bank, Profile
- **Top bar**: RDM balance, streak timer, settings gear
- **Explore page**: Browse by subject, topic, or exam
- **Revision Bank**: Saved questions organized by subject with spaced repetition reminders
- **Profile/Settings**: Class, stream, subject preferences, RDM history

---

## 🎨 Design & Feel
- **Duolingo-inspired**: Bright gradients (purple, blue, green, orange), rounded cards, playful icons
- Animated transitions between questions
- Progress bars and achievement badges
- Confetti/particle effects for milestones
- Mobile-first responsive design

---

## 📦 Technical Approach
- All question data pre-loaded as local JSON (organized by class, subject, topic, exam)
- Local state management for user progress, RDM balance, and revision bank
- No backend required initially – everything runs client-side
- Structured for easy migration to a real backend later

