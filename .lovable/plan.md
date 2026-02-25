
## Public Profile Popup on Doubts Page

### What we're building
When you click on a user's avatar/name on any doubt card, a rich popup appears showing their full public profile -- similar to how LinkedIn or Twitter shows a profile preview card. We'll create 5 dummy user profiles with realistic stats to demonstrate the feature.

### Dummy Profiles (5 users)

1. **Sankar L** (SA) -- Physics enthusiast, 147 RDM, Scholar rank
2. **Priya M** (PM) -- Biology topper, 320 RDM, Expert rank
3. **Arjun K** (AK) -- Math wizard, 85 RDM, Novice rank
4. **Deepa R** (DR) -- Chemistry focused, 210 RDM, Scholar rank
5. **Ravi T** (RT) -- All-rounder, 530 RDM, Master rank

### Profile Popup Content (the "LinkedIn-meets-Twitter" card)

**Header section:**
- Avatar circle with initials + colored background
- Display name + rank badge (Novice / Scholar / Expert / Master)
- RDM balance with coin icon
- Member since date
- Bio/tagline (one-liner)

**Stats grid (4 cards):**
- Total Questions Asked
- Total Answers Given
- Accepted Answers (green checkmark count)
- Strike Rate (accuracy %)

**Subject Breakdown (bar/pill chart):**
- Physics: X questions answered
- Chemistry: X questions answered
- Math: X questions answered
- Biology: X questions answered

**Reputation section:**
- Total RDM earned from Doubts
- Bounties won
- Current rank + progress bar to next rank
- Top contributor badges (if any, e.g. "Top 5 this week")

**Activity snapshot:**
- Recent doubts asked (last 3)
- Recent answers given (last 3)
- Streak: "Active 5 days in a row"

**Footer:**
- "View Full Profile" button

### Technical Approach

**1. New component: `src/components/UserProfilePopup.tsx`**
- Uses Radix `HoverCard` (hover to preview) or `Popover` (click to open) -- will use **HoverCard** for the quick preview feel
- Receives a `userId` prop, looks up from dummy data
- Rich card layout with all sections above
- Smooth animation on open/close

**2. New data file: `src/data/dummyProfiles.ts`**
- Contains 5 detailed dummy profiles with all stats
- Each profile has: id, name, initials, avatarColor, bio, rdm, rank, memberSince, subjectStats (physics/chem/math/bio counts), questionsAsked, answersGiven, acceptedAnswers, strikeRate, bountiesWon, rdmFromDoubts, recentDoubts, recentAnswers, streakDays, badges

**3. Update `src/pages/Doubts.tsx`**
- Add `authorId` and `authorName`/`authorInitials` fields to each sampleDoubt
- Replace the plain date/subject line with a clickable avatar + name that triggers the profile popup
- Add author info row to each doubt card (avatar circle + name, like the screenshot shows "SA San L.")
- Wire up `UserProfilePopup` wrapping each author avatar

**4. Interaction model:**
- Hover over avatar: shows the full profile card
- Click on avatar: also opens it (for mobile)
- Card appears as a floating panel next to the avatar
- "View Full Profile" links to `/profile/:id` (future)

### Changes Summary

| File | Action |
|------|--------|
| `src/data/dummyProfiles.ts` | Create -- 5 rich dummy profiles |
| `src/components/UserProfilePopup.tsx` | Create -- HoverCard-based profile popup |
| `src/pages/Doubts.tsx` | Update -- add author data to doubts, render clickable avatars with popup |
