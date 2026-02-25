

## EduFund Enhancements: Proposal Detail Page + Create Proposal Form

### 1. Proposal Detail Page (Reddit-style full view)

Right now, the story text is shown fully on the feed card. We'll make two changes:

**On the feed card:** Truncate the story to ~2 lines with a "Read more" link. When clicked, it navigates to a dedicated detail page `/edufund/:id`.

**New detail page (`src/pages/EduFundProposal.tsx`):**
- Full-screen layout with AppLayout wrapper
- Back button ("Back to EduFund") at the top
- Student profile header (avatar, name, date, category badge)
- Full title displayed prominently
- Complete story text with proper paragraph formatting
- Eligibility badges section
- Progress bar with raised/goal amounts and supporter count
- Support/Donate button (same inline input behavior)
- Sidebar with student's public profile summary card

Each proposal's dummy data will also get a `fullStory` field -- a longer, multi-paragraph version of their story so there's actually more content to read on the detail page.

### 2. Create Proposal Form

The "Create Proposal" button will open a dialog/modal with a form containing:
- **Title** input (text)
- **Category** dropdown (Learning Device, Books & Materials, Lab Equipment, Course Fee)
- **Goal Amount** input (number, in rupees)
- **Your Story** textarea (multi-paragraph description)
- Submit button

Since this is testing phase, no eligibility restrictions are enforced -- the form is available to everyone. A toast confirmation will appear on submit.

### Technical Changes

| File | Action |
|------|--------|
| `src/pages/EduFundProposal.tsx` | **Create** -- Full detail page for a single proposal |
| `src/pages/EduFund.tsx` | **Update** -- Truncate story text to 2 lines with "Read more" link; add Create Proposal dialog with form; add longer `fullStory` to each proposal; make title clickable |
| `src/App.tsx` | **Update** -- Add route `/edufund/:id` pointing to EduFundProposal |

### Detail Page Layout

```text
+------------------------------------------+
| <- Back to EduFund                       |
+------------------------------------------+
| [Avatar] Name    Date    [Category Badge]|
|                                          |
| ## Proposal Title (large)                |
|                                          |
| Full story paragraph 1...               |
| Full story paragraph 2...               |
| Full story paragraph 3...               |
|                                          |
| [Badge] [Badge] [Badge]                 |
|                                          |
| Rs 12,500 ========== of Rs 25,000       |
| 18 supporters         50% funded        |
|                                          |
| [ Support this student ]                |
+------------------------------------------+
```

### Create Proposal Dialog

A modal form with title, category selector, goal amount, and a large textarea for the story. On submit, shows a success toast (no persistence yet since we're using dummy data).

