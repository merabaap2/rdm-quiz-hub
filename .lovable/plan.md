

# EduBlast - Complete the Missing Features

## What's Already Working
- Signup with Class (9-12) and PCM/PCMB selection
- Question Gun with 5-question rounds
- RDM system (+10/-5, 100 bonus)
- Explore by subject/exam type
- Revision Bank (save/unsave questions)
- Pricing page with mock top-up
- Bottom tab navigation and top bar with RDM display

## What's Missing (to be implemented)

### 1. 25-Minute Streak Timer + Break System
- Add a visible countdown timer in the top bar that starts when the user begins answering
- At 25 minutes: award +50 RDM bonus with confetti, then force a 5-minute break
- During break: show random activities from `breakActivities.ts` (puzzles, jokes, brain teasers)
- Break screen with a 5-minute countdown - user cannot skip
- New `useStreakTimer` hook to manage timer state

### 2. Post-Break "Cheat AI" Recall Exercise (2 mins)
- After the 5-minute break ends, show a 2-minute recall screen
- Display summaries of the questions answered in the last session
- User taps to reveal answers (testing memory)
- Timer counts down from 2 minutes, then returns to Question Gun

### 3. "Stop or Keep Continuing?" Prompt
- After each 5-question round completes, add a "Stop or Keep Continuing?" choice
- "Keep Going" fires another round immediately
- "Stop" returns to the home screen (already partially there with the round-complete screen, just needs the stop option)

### 4. "Repeat with Different Numerals" Option
- After a round, offer "Repeat previous with different numerals or related concept"
- Generate variant questions by swapping numbers/values in the same question templates
- Add a `variants` field to the Question type or generate them on-the-fly

### 5. Fix Console Warnings
- The `framer-motion` ref warnings in `QuestionCard` and `Explore` need fixing
- Wrap animated components properly to avoid React ref forwarding issues

## Technical Plan

### New Files
- `src/hooks/useStreakTimer.ts` - Timer hook managing 25-min streak, 5-min break, 2-min recall phases
- `src/components/BreakScreen.tsx` - Break activity display with countdown
- `src/components/RecallExercise.tsx` - Post-break recall exercise component
- `src/components/StreakTimer.tsx` - Visual timer component for the top bar

### Modified Files
- `src/components/AppLayout.tsx` - Integrate streak timer in top bar; show BreakScreen/RecallExercise overlays when active
- `src/pages/Home.tsx` - Add "Stop or Keep Continuing?" and "Repeat with variants" options in round-complete screen
- `src/store/useUserStore.ts` - Add streak phase tracking (playing/break/recall)
- `src/types/index.ts` - Add `StreakPhase` type
- `src/components/QuestionCard.tsx` - Fix framer-motion ref warnings
- `src/data/questions.ts` - Add more questions (at least 3 per subject per class for 9-12)

### Flow

```text
[Start Playing] --> [25-min Timer Running]
       |                    |
  [Answer Questions]   [25 min reached]
       |                    |
  [Round Complete]    [+50 RDM Bonus]
       |                    |
  [Stop / Continue?]  [5-min Break Screen]
       |                    |
  [Repeat Variants]   [Break Activities]
                           |
                    [2-min Recall Exercise]
                           |
                    [Back to Questions]
```

### Implementation Order
1. Fix console warnings first (quick win)
2. Add streak timer hook and UI component
3. Build break screen with activity cards
4. Build recall exercise screen
5. Update Home.tsx with stop/continue and repeat options
6. Add more questions to the database
