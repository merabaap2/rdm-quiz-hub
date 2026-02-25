
## Student Support Fund Page ("EduFund")

### Concept
A dedicated page called **EduFund** where academically active students can publish funding proposals (e.g., "I need a laptop for JEE prep") and other users can support them with donations. Think of it as a mini-GoFundMe built into EduBlast, but only for verified, academically committed students.

### How It Works

**For viewers (everyone):**
- Browse all active funding proposals
- See each student's verified academic profile (linked to their public profile)
- Donate any amount to a proposal
- See progress bars showing how much has been raised vs. the goal

**For publishers (eligibility-gated):**
- Only students who meet academic criteria can create proposals
- Criteria (to be enforced later, shown as UI badges now):
  - Minimum 3 accepted answers in Doubts
  - Completed at least 1 mock test
  - Active revision streak (3+ days)
  - Scholar rank or above (100+ RDM)
- For testing phase: no restrictions enforced, but eligibility badges are displayed

### Page Layout

**Header:** "EduFund" title with heart icon, description explaining the concept

**Top bar:** "Create Proposal" button (with eligibility tooltip), filter/sort options

**Proposal Cards (main feed):**
- Student avatar + name (clickable, opens UserProfilePopup)
- Proposal title and detailed description (the "blog" / story)
- Category tag (e.g., "Learning Device", "Books & Materials", "Course Fee")
- Funding goal amount and progress bar showing raised vs. goal
- Number of supporters
- Eligibility badges showing why this student qualifies (verified academic achievements)
- "Support" button with donation input
- Date posted

**Right sidebar:**
- "How EduFund Works" explainer card
- "Top Supported" proposals
- Eligibility criteria checklist card

### Dummy Proposals (5, using existing dummy profiles)

1. **Sankar L** -- "Need a laptop for JEE Advanced preparation" -- Goal: Rs 25,000 -- Raised: Rs 12,500
2. **Priya M** -- "Biology reference books for NEET" -- Goal: Rs 5,000 -- Raised: Rs 4,200
3. **Arjun K** -- "Graphic calculator for competitive math" -- Goal: Rs 8,000 -- Raised: Rs 1,500
4. **Deepa R** -- "Chemistry lab equipment for home practice" -- Goal: Rs 12,000 -- Raised: Rs 6,800
5. **Ravi T** -- "Online coaching subscription renewal" -- Goal: Rs 15,000 -- Raised: Rs 14,200

### Technical Plan

| File | Action |
|------|--------|
| `src/pages/EduFund.tsx` | Create -- Full page with proposal cards, sidebar, dummy data |
| `src/components/AppLayout.tsx` | Update -- Add "EduFund" to navbar with Heart icon |
| `src/App.tsx` | Update -- Add `/edufund` route as protected route |

**Details:**

**1. `src/pages/EduFund.tsx`**
- Uses `AppLayout` wrapper
- 3-column layout matching Doubts page style (left sidebar, main feed, right sidebar)
- Left sidebar: user's own eligibility status checklist, "My Proposals" section
- Main feed: proposal cards with avatar (wrapped in `UserProfilePopup`), story text, progress bar, support button, category/eligibility badges
- Right sidebar: "How It Works" card, "Top Supported" list, eligibility criteria explainer
- Dummy data array with 5 proposals linked to existing `dummyProfiles`
- Each proposal shows academic verification badges (e.g., "Scholar Rank", "15 Accepted Answers", "9-day Streak")
- Progress bar using the existing `Progress` component
- "Support" button opens a small inline input for donation amount

**2. `src/components/AppLayout.tsx`**
- Add `Heart` icon import from lucide-react
- Add nav item: `{ path: '/edufund', icon: Heart, label: 'EduFund', emoji: '💛' }` after Doubts

**3. `src/App.tsx`**
- Import `EduFund` page
- Add route: `<Route path="/edufund" element={<ProtectedRoute><EduFund /></ProtectedRoute>} />`
