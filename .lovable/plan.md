

# Phase 2-4 Implementation: Content, Live Sessions, and Enhanced Classroom Flows

## Current State Assessment

**Already built (Phase 1):**
- Database tables: `profiles`, `user_roles`, `classrooms`, `classroom_members`, `notifications`
- Auth: Google OAuth + email sign-in, onboarding with role selection (student/teacher)
- Classrooms: basic create, list, join by 6-digit code, member list view
- Navigation: role-aware with Classes tab

**Missing from the detailed flows you shared:**

| Flow | Status | Key Gaps |
|------|--------|----------|
| Flow 0 - Google connect checklist | Not built | Checklist screen before OAuth |
| Flow 1 - Teacher onboarding | Partial | Missing: teaching levels picker, exam tags, visibility, verification upload |
| Flow 2 - Create class (Google-linked) | Not built | Missing: "Link with Google Classroom" option, create/link existing course |
| Flow 3 - Invite students | Minimal | Missing: search users, share link method, CSV import, branching join UX |
| Flow 4 - Post content | Not built | Missing: posts table, post composer, content types, class feed |
| Flow 5 - Live lectures | Not built | Missing: live_sessions table, scheduling, attendance, Meet integration |
| Flow 6 - Weekly cycle | Not built | Missing: teacher analytics dashboard |
| Flow 7 - Fallback handling | Not built | Missing: error states, manual alternatives |

**Missing database tables:** `posts`, `live_sessions`, `session_attendance`

---

## What This Implementation Covers

Given the scope, this session will build **Flows 0-4** (the core classroom + content experience), leaving Meet integration (Flow 5) and Analytics (Flow 6) for a follow-up.

---

## Step 1: Database Migration -- Add Missing Tables

Add three new tables:

**posts** -- stores all classroom content (concepts, videos, quizzes, assignments, polls, announcements)
- id, classroom_id, teacher_id, type, title, description, content_json, tags, visibility, due_date, google_classroom_synced, created_at

**live_sessions** -- stores scheduled/live/completed lectures
- id, classroom_id, teacher_id, title, scheduled_at, duration_minutes, meet_link, attendance_code, status, recording_url, recap_post_id, created_at

**session_attendance** -- tracks who attended
- id, session_id, user_id, checked_in_at

All with RLS policies matching existing patterns (teachers manage their own, students view what they're members of).

---

## Step 2: Enhanced Teacher Onboarding (Flow 0 + Flow 1)

**Update `Onboarding.tsx`** to add richer teacher profile setup:
- Teaching levels multi-select: School / UG / PG / Competitive / International
- Exam tags multi-select: JEE / NEET / GRE / GMAT / SAT / TOEFL
- Visibility toggle: Public / Invite-only
- Language selection
- Optional verification note (text field; file upload deferred)

**New component: `GoogleConnectChecklist`** (Flow 0)
- Shown when teacher clicks "Connect Google" anywhere
- Light checklist: Google account ready, admin allows Classroom, understand ESM vs Classroom
- Buttons: "Continue -> Connect Google" and "Skip (ESM-only)"

---

## Step 3: Enhanced Classroom Creation (Flow 2)

**Update `Classrooms.tsx` create dialog** to support:
- Step 1: Choose type -- "Link with Google Classroom (Recommended)" vs "ESM-only Classroom"
- Step 2 (ESM-only): Current form (name, subject, section) + description + auto-create ESM community
- Step 2 (Google-linked): Placeholder UI showing "Create new course" or "Link existing course" with a note that Google API integration requires credentials setup
- Toggle: "Also create ESM Community space" (checked by default)

---

## Step 4: Enhanced Invite + Join Experience (Flow 3)

**Update `ClassroomDetail.tsx`** Members tab with invite methods:
- Method 1: Search ESM users by name (query `profiles` table)
- Method 2: Share join link (`/join/<classId>`) with copy button
- Method 3: Bulk invite placeholder (CSV upload UI, functional later)

**Update `JoinClassroom.tsx`** with branching:
- Step A: "Continue with Google" or "Continue with Email (ESM-only)"
- If Google + classroom is Google-linked: show "Joined ESM + Classroom pending" message
- If domain blocks: show fallback with "Join ESM Only" + "View Classroom Code" + admin request template
- If ESM-only: instant join with "connect Google later" note

---

## Step 5: Content Posting System (Flow 4)

**New component: `PostComposer.tsx`**
- Content type selector: Concept Post, Video Lesson, Quiz, Assignment, Poll, Announcement
- Common fields: title, description, tags (chapter/topic/exam/difficulty using existing taxonomy), visibility, due date
- "Publish destinations" checkboxes: ESM Class Feed (checked) + Google Classroom (with mapping options)
- Publish button

**New component: `ClassFeed.tsx`**
- Chronological post list inside classroom
- Each post card shows type icon, title, description, tags, timestamp
- React/comment placeholder (thumbs up count for now)

**Update `ClassroomDetail.tsx`** to add tabbed layout:
- Tabs: Home | Posts | Live | Members | Settings
- Home: classroom overview + recent posts
- Posts: full feed + compose button (teacher only)
- Live: placeholder for Phase 5
- Members: existing member list + invite methods
- Settings: classroom settings (teacher only)

---

## Step 6: Notification Bell + In-App Notifications

**New component: `NotificationBell.tsx`**
- Bell icon in AppLayout header with unread count badge
- Dropdown showing recent notifications
- Mark as read on click
- Links to action_url

---

## Step 7: Fallback Handling (Flow 7)

Throughout all Google-linked flows, add:
- "Continue in ESM" always available as alternative
- When Google features are unavailable, show actionable next steps
- Copy-paste admin request template component for school domain restrictions
- Manual Meet link entry field in live session creation

---

## Files to Create
- `src/components/PostComposer.tsx` -- rich post creation form
- `src/components/ClassFeed.tsx` -- chronological post feed
- `src/components/NotificationBell.tsx` -- header notification dropdown
- `src/components/GoogleConnectChecklist.tsx` -- Flow 0 checklist
- `src/components/InviteStudents.tsx` -- multi-method invite UI
- `src/components/AdminRequestTemplate.tsx` -- copy-paste template for domain issues

## Files to Modify
- `src/pages/Onboarding.tsx` -- richer teacher profile fields
- `src/pages/Classrooms.tsx` -- classroom type selection in create dialog
- `src/pages/ClassroomDetail.tsx` -- tabbed layout with feed, members, settings
- `src/pages/JoinClassroom.tsx` -- branching join UX
- `src/components/AppLayout.tsx` -- add notification bell
- `src/integrations/supabase/types.ts` -- add posts, live_sessions, session_attendance types

## Database Migration
- Add `posts`, `live_sessions`, `session_attendance` tables with RLS

---

## What Is NOT Included (Deferred)

- **Google Classroom API calls** -- requires Google Cloud credentials + edge function. The UI will be built with placeholders.
- **Google Meet auto-creation** -- Flow 5 scheduling UI will be built but Meet API integration deferred.
- **File uploads** -- teacher verification docs, recording uploads use Supabase Storage (separate setup).
- **Weekly cycle + analytics** -- Flow 6 deferred to next session.
- **Real-time features** -- Supabase realtime subscriptions for live doubt queue deferred.

