-- Fix infinite recursion: profiles SELECT references classroom_members, 
-- and classroom_members SELECT references itself.
-- Solution: use security definer functions.

-- Function to check if two users share a classroom
CREATE OR REPLACE FUNCTION public.users_share_classroom(_user_id uuid, _other_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.classroom_members cm1
    JOIN public.classroom_members cm2 ON cm1.classroom_id = cm2.classroom_id
    WHERE cm1.user_id = _user_id AND cm2.user_id = _other_user_id
  )
$$;

-- Function to check if user is member of a classroom
CREATE OR REPLACE FUNCTION public.is_classroom_member(_user_id uuid, _classroom_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.classroom_members
    WHERE user_id = _user_id AND classroom_id = _classroom_id
  )
$$;

-- Fix profiles SELECT policy
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR public.users_share_classroom(auth.uid(), id)
  );

-- Fix classroom_members SELECT policy
DROP POLICY IF EXISTS "Users can view members of their classrooms" ON public.classroom_members;
CREATE POLICY "Users can view members of their classrooms" ON public.classroom_members
  FOR SELECT USING (
    public.is_classroom_member(auth.uid(), classroom_id)
  );

-- Fix classrooms SELECT policy (also references classroom_members)
DROP POLICY IF EXISTS "Users can view own classrooms" ON public.classrooms;
CREATE POLICY "Users can view own classrooms" ON public.classrooms
  FOR SELECT USING (
    auth.uid() = teacher_id OR public.is_classroom_member(auth.uid(), id)
  );

-- Fix posts SELECT policy
DROP POLICY IF EXISTS "Members can view class posts" ON public.posts;
CREATE POLICY "Members can view class posts" ON public.posts
  FOR SELECT USING (
    auth.uid() = teacher_id OR public.is_classroom_member(auth.uid(), classroom_id)
  );

-- Fix live_sessions SELECT policy
DROP POLICY IF EXISTS "Members can view class sessions" ON public.live_sessions;
CREATE POLICY "Members can view class sessions" ON public.live_sessions
  FOR SELECT USING (
    auth.uid() = teacher_id OR public.is_classroom_member(auth.uid(), classroom_id)
  );