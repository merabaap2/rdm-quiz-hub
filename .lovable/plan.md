

# Fix: EduBlast - Multiple Bugs Preventing App from Working

## Issues Found

### 1. Misplaced import in questions.ts (causes potential bundling issues)
The `import { Subject }` statement is at **line 245** -- after the functions that reference it. While ES modules hoist imports, this is fragile and can confuse some tooling.

**Fix**: Move `import { Subject } from '@/types'` to the top of the file, next to the existing `Question` import.

### 2. Welcome.tsx uses `window.location.href` instead of React Router
Line 173 uses `window.location.href = '/home'` which triggers a **full page reload**, breaking the SPA flow and potentially causing navigation issues.

**Fix**: Use `useNavigate()` hook and call `navigate('/home')` instead.

### 3. No questions exist for Class 9
All questions in the database have `classLevel` 10, 11, or 12. When a Class 9 student fires the Question Gun, `getRandomQuestions` returns an **empty array**, so nothing displays.

**Fix**: Add Class 9 questions (at least 1 per subject) so every class level has content.

### 4. framer-motion ref warnings with React 18
The console shows warnings about function components not accepting refs. This happens because `AnimatePresence` in framer-motion v12 tries to pass refs to its direct children.

**Fix**: Wrap the conditional motion.div children inside `AnimatePresence` to avoid the ref forwarding issue -- ensure each child is a proper `motion.div` with a unique `key`.

### 5. Profile page shows hardcoded "science" stream
Line 32 in Profile.tsx displays `user.stream` which is now always "science". Since we removed streams, this should just show the subject combo.

**Fix**: Change the profile display to only show `Class {classLevel} - {subjectCombo}`.

### 6. Navigation in render body (Home.tsx & Profile.tsx)
Both pages call `navigate('/')` directly in the render body (not inside `useEffect`), which can cause React warnings and unexpected behavior.

**Fix**: Move the redirect logic into a `useEffect` or rely on the existing `ProtectedRoute` wrapper in App.tsx (which already handles this).

---

## Technical Changes

### File: `src/data/questions.ts`
- Move `import { Subject }` from line 245 to the top (line 1-2 area)
- Add 4 Class 9 questions (1 physics, 1 chemistry, 1 math, 1 biology)

### File: `src/pages/Welcome.tsx`  
- Import `useNavigate` from react-router-dom
- Replace `window.location.href = '/home'` with `navigate('/home')`

### File: `src/pages/Home.tsx`
- Remove the manual `navigate('/')` redirect (ProtectedRoute already handles it)
- Keep AnimatePresence children properly keyed

### File: `src/pages/Profile.tsx`
- Remove the manual `navigate('/')` redirect
- Change stream display from `{user.stream} - {user.subjectCombo}` to just `{user.subjectCombo}`

### File: `src/components/QuestionCard.tsx`
- No changes needed -- component logic is correct

