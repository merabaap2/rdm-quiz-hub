
-- ============================================
-- FIX SECURITY: Tighten overly permissive RLS
-- ============================================

-- Fix profiles: only view own profile or profiles of classroom co-members
DROP POLICY "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated
  USING (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM public.classroom_members cm1
      JOIN public.classroom_members cm2 ON cm1.classroom_id = cm2.classroom_id
      WHERE cm1.user_id = auth.uid() AND cm2.user_id = profiles.id
    )
  );

-- Fix classrooms: only view classrooms you own or are a member of
DROP POLICY "Anyone authenticated can view classrooms" ON public.classrooms;
CREATE POLICY "Users can view own classrooms" ON public.classrooms FOR SELECT TO authenticated
  USING (
    auth.uid() = teacher_id OR
    EXISTS (
      SELECT 1 FROM public.classroom_members
      WHERE classroom_id = classrooms.id AND user_id = auth.uid()
    )
  );

-- Fix classroom_members: only view members of classrooms you belong to
DROP POLICY "Members can view classroom members" ON public.classroom_members;
CREATE POLICY "Users can view members of their classrooms" ON public.classroom_members FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.classroom_members cm
      WHERE cm.classroom_id = classroom_members.classroom_id AND cm.user_id = auth.uid()
    )
  );

-- ============================================
-- NEW TABLE: posts (classroom content)
-- ============================================
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id uuid NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES public.profiles(id),
  type text NOT NULL DEFAULT 'announcement',
  title text NOT NULL,
  description text,
  content_json jsonb DEFAULT '{}',
  tags text[] DEFAULT '{}',
  visibility text NOT NULL DEFAULT 'class_only',
  due_date timestamp with time zone,
  google_classroom_synced boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view class posts" ON public.posts FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.classroom_members
      WHERE classroom_id = posts.classroom_id AND user_id = auth.uid()
    ) OR auth.uid() = teacher_id
  );

CREATE POLICY "Teachers can create posts" ON public.posts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update own posts" ON public.posts FOR UPDATE TO authenticated
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete own posts" ON public.posts FOR DELETE TO authenticated
  USING (auth.uid() = teacher_id);

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- NEW TABLE: live_sessions
-- ============================================
CREATE TABLE public.live_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id uuid NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES public.profiles(id),
  title text NOT NULL,
  scheduled_at timestamp with time zone NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  meet_link text,
  attendance_code text,
  status text NOT NULL DEFAULT 'scheduled',
  recording_url text,
  recap_post_id uuid REFERENCES public.posts(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.live_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view class sessions" ON public.live_sessions FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.classroom_members
      WHERE classroom_id = live_sessions.classroom_id AND user_id = auth.uid()
    ) OR auth.uid() = teacher_id
  );

CREATE POLICY "Teachers can create sessions" ON public.live_sessions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update own sessions" ON public.live_sessions FOR UPDATE TO authenticated
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete own sessions" ON public.live_sessions FOR DELETE TO authenticated
  USING (auth.uid() = teacher_id);

-- ============================================
-- NEW TABLE: session_attendance
-- ============================================
CREATE TABLE public.session_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.live_sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id),
  checked_in_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(session_id, user_id)
);

ALTER TABLE public.session_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attendance" ON public.session_attendance FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view session attendance" ON public.session_attendance FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.live_sessions
      WHERE live_sessions.id = session_attendance.session_id AND live_sessions.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Users can check in" ON public.session_attendance FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
