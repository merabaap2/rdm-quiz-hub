

## Enhance Public Student Profile with Academics, Achievements & RDM Breakdown

### 1. Academic Marks Section
Add a new "Academic Record" card showing exam marks with verification status:
- Class level (e.g., "Class 10", "Class 12") with percentage/CGPA
- Verification badge: a colored indicator showing "Verified", "Pending", or "Unverified"
- Board name (e.g., CBSE, ICSE, State Board)

### 2. Competitions & Achievements Section
Add an "Achievements & Competitions" card listing olympiads, prizes, and competitions:
- Each entry shows: competition name, level (School/District/State/National/International), year, and result (e.g., "Gold Medal", "Rank 12")
- Level shown as a colored badge to quickly distinguish scale (e.g., green for State, blue for National, purple for International)

### 3. RDM Score Breakdown Section
Replace or enhance the existing Reputation card with a detailed "RDM Score Breakdown" showing how the total RDM is composed:
- Answers given (points earned from helping others)
- Accepted answers bonus
- Mock test performance
- Streak/consistency bonus
- Bounties won
- Each component shown as a horizontal bar or row with its contribution to total RDM
- A visual summary (e.g., small donut or stacked bar) showing proportions

### Technical Changes

| File | Action |
|------|--------|
| `src/data/dummyProfiles.ts` | Add new fields to `DummyProfile` interface: `academics` (array of marks records), `achievements` (array of competition entries), `rdmBreakdown` (object with component scores). Populate dummy data for all 5 profiles. |
| `src/pages/PublicProfile.tsx` | Add three new card sections: Academic Record, Achievements, and RDM Breakdown, placed between the stats grid and subject breakdown. |

### New Data Fields

```text
academics: [
  { exam: "Class 10", board: "CBSE", score: "92%", verified: true },
  { exam: "Class 12", board: "CBSE", score: "89%", verified: false }
]

achievements: [
  { name: "Science Olympiad", level: "National", year: 2025, result: "Gold Medal" },
  { name: "Math Challenge", level: "State", year: 2024, result: "Rank 3" }
]

rdmBreakdown: {
  answersGiven: 50,
  acceptedBonus: 30,
  mockTests: 20,
  streakBonus: 15,
  bountiesWon: 25,
  doubtsAsked: 7
}
```

### Layout (new sections inserted after stats grid)

```text
+------------------------------------------+
| Academic Record              [Grad cap]  |
| Class 10  CBSE   92%     [Verified]      |
| Class 12  CBSE   89%     [Pending]       |
+------------------------------------------+

+------------------------------------------+
| Achievements & Competitions    [Medal]   |
| Science Olympiad  [National] 2025  Gold  |
| Math Challenge    [State]    2024  Rank 3|
| Quiz Bowl         [District] 2024  Winner|
+------------------------------------------+

+------------------------------------------+
| RDM Score Breakdown            [Zap]     |
| Answers Given      =========    50 RDM   |
| Accepted Bonus     ======       30 RDM   |
| Mock Tests         ====         20 RDM   |
| Streak Bonus       ===          15 RDM   |
| Bounties Won       =====        25 RDM   |
| Doubts Asked       ==            7 RDM   |
|                          Total: 147 RDM  |
+------------------------------------------+
```
