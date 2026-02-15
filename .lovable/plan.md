

# Education Social Media Platform - Google Classroom + Meet Integration

## Scope Assessment

The current EduBlast app is a **client-side only quiz app** with no backend, no authentication, and no database. The requested feature set requires building an entirely new platform layer on top of it. This plan covers the **complete roadmap** broken into implementable phases.

---

## Phase 1: Foundation (Must be done first)

### 1A. Enable Supabase (Lovable Cloud)
- Set up Lovable Cloud backend for database, auth, and edge functions
- This provides PostgreSQL, authentication, and serverless functions

### 1B. Database Schema
Create the following tables:

```text
profiles
  - id (uuid, FK to auth.users)
  - name, class_level, stream, subject_combo
  - role: 'student' | 'teacher'
  - avatar_url, bio
  - teaching_levels, subjects, exam_tags (for teachers)
  - visibility: 'public' | 'invite_only'
  - google_connected (boolean)
  - created_at

user_roles (separate table per security rules)
  - user_id, role (app_role enum: admin, teacher, student)

classrooms
  - id, teacher_id (FK profiles)
  - name, section, subject, description
  - type: 'esm_only' | 'google_linked'
  - google_classroom_id (nullable)
  - join_code (6-digit)
  - invite_link
  - created_at

classroom_members
  - classroom_id, user_id
  - role: 'teacher' | 'student'
  - google_synced (boolean)
  - joined_at

posts
  - id, classroom_id, teacher_id
  - type: 'concept' | 'video' | 'quiz' | 'assignment' | 'poll' | 'announcement'
  - title, description, content_json
  - tags (topic, exam, difficulty)
  - visibility: 'class_only' | 'public'
  - due_date
  - google_classroom_synced (boolean)
  - created_at

live_sessions
  - id, classroom_id, teacher_id
  - title, scheduled_at, duration_minutes
  - meet_link, attendance_code
  - status: 'scheduled' | 'live' | 'completed'
  - recording_url, recap_post_id
  - created_at

session_attendance
  - session_id, user_id, checked_in_at

notifications
  - id, user_id, type, title, body
  - action_url, read (boolean)
  - created_at
```

### 1C. Authentication
- Google OAuth sign-in (primary method)
- Email/password fallback
- Role selection during onboarding (Student vs Teacher)
- Profile auto-creation via database trigger

---

## Phase 2: Teacher Onboarding + Classroom System (Flows 0-2)

### 2A. Teacher Profile Setup Page
- After Google sign-in, if role = teacher, show profile setup
- Fields: teaching levels, subjects, exam tags, languages, visibility
- Optional: verification upload (stored in Supabase Storage)

### 2B. Classroom Management
- "My Classrooms" dashboard for teachers
- Create Classroom flow:
  - ESM-only: create directly in database
  - Google-linked: uses Google Classroom API via edge function
- Classroom settings page (edit name, manage members, toggle Google sync)

### 2C. Google Classroom API Integration
- Edge function: `google-classroom` that proxies Classroom API calls
- Requires teacher's Google OAuth token (stored securely)
- Operations: create course, list courses, link existing course, sync roster
- Scopes needed: `classroom.courses`, `classroom.rosters`, `classroom.coursework`

---

## Phase 3: Student Join Experience (Flow 3)

### 3A. Join Methods
- Direct invite from ESM (search users, send notification)
- Share join link: `/join/:classId` with optional access code
- Bulk invite via CSV/email list

### 3B. Student Join Page
- `/join/:classId` route
- Shows classroom info (name, teacher, subject)
- "Join with Google" or "Join ESM-only" branching
- If Google-linked: attempt Classroom enrollment via API
- Fallback: join ESM community only with instructions for manual Classroom join

### 3C. Notifications System
- In-app notification bell
- "You've been invited to join..." notifications
- Read/unread state

---

## Phase 4: Content Posting (Flow 4)

### 4A. Post Composer
- Rich post creation inside a classroom
- Content types: Concept Post, Video Lesson, Quiz, Assignment, Poll, Announcement
- Tag system: chapter/topic/exam/difficulty (reuses existing taxonomy)
- Visibility control

### 4B. Google Classroom Sync
- "Also publish to Google Classroom" checkbox
- Maps content types to Classroom types:
  - Video/Concept -> Material
  - Quiz/Assignment -> Assignment with ESM link
  - Question -> Short answer question
- Edge function handles Classroom API `coursework.create`

### 4C. Class Feed
- Students see posts in chronological feed
- React/comment/ask doubts on posts
- Links back to ESM quiz engine for practice content

---

## Phase 5: Live Lectures with Google Meet (Flow 5)

### 5A. Schedule Session
- Create live lecture with title, date/time, duration
- Audience selection (whole class or subgroup)
- Auto-create Google Meet link via Calendar/Meet API
- Post announcement to class feed + optional Classroom

### 5B. Live Session Experience
- "Join Live" button linking to Meet
- Attendance tracking (check-in button + optional 4-digit code)
- In-session: quick polls, doubt queue (stored in database)

### 5C. Post-Session Workflow
- Upload recording link, slides, notes
- Auto-generate recap post
- Create practice set from session topic
- Streak credit for attendees

---

## Phase 6: Weekly Cycle + Analytics (Flows 6-7)

### 6A. Teacher Analytics Dashboard
- Weekly plan view
- Student engagement metrics
- "Students who slipped" nudge list
- Weak topics cluster insights

### 6B. Fallback Handling
- Graceful degradation when Google APIs fail
- Manual Meet link entry
- "Continue in ESM" always available
- Copy-paste admin request templates for school domain restrictions

---

## What Gets Built in THIS Implementation Session

Given the massive scope, this session will implement **Phase 1 (Foundation)** which is the prerequisite for everything else:

1. **Enable Lovable Cloud** (Supabase backend)
2. **Database schema** -- all tables listed above with RLS policies
3. **Google OAuth authentication** with role selection
4. **Profile creation** (student + teacher flows)
5. **Basic classroom CRUD** (create, list, join via code)
6. **Updated navigation** -- teacher vs student views
7. **Classroom dashboard page** for teachers

### New Pages
- `/auth` -- Login/Signup with Google + email
- `/onboarding` -- Role selection + profile setup
- `/classrooms` -- Teacher's classroom list
- `/classroom/:id` -- Single classroom view (members, posts placeholder)
- `/join/:classId` -- Student join page

### New Components
- `AuthGuard` -- replaces current simple check, uses Supabase session
- `RoleGuard` -- restricts teacher-only pages
- `ClassroomCard` -- displays classroom info
- `CreateClassroomDialog` -- form for new classroom

### Modified Files
- `src/App.tsx` -- new routes, Supabase auth provider
- `src/components/AppLayout.tsx` -- role-aware navigation
- `src/store/useUserStore.ts` -- sync with Supabase profile instead of local-only

### Edge Functions
- `google-classroom` -- proxy for Classroom API (created but Google integration configured in Phase 2)

### Database Migrations
- Full schema creation with RLS policies
- Profile trigger on auth signup
- User roles table (per security requirements)

---

## Prerequisites from You

Before implementation can begin:
1. **Google Cloud Console setup**: Create a project, enable Classroom API, create OAuth credentials. (Detailed instructions will be provided after Supabase is connected.)
2. **Decide on domain**: The OAuth redirect URL needs your app's domain.

---

## Summary

| Phase | What | Depends On |
|-------|------|------------|
| 1 | Supabase + Auth + DB + Basic Classrooms | Nothing |
| 2 | Teacher onboarding + Google Classroom API | Phase 1 + Google Cloud setup |
| 3 | Student join flows + Notifications | Phase 1 |
| 4 | Content posting + Classroom sync | Phase 2 |
| 5 | Live lectures + Meet integration | Phase 2 + Meet API |
| 6 | Analytics + Weekly cycle + Fallbacks | Phases 3-5 |

This session focuses on **Phase 1** to establish the foundation. Subsequent phases build on top incrementally.

