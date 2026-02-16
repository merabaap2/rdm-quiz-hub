-- Increase join code length from 6 to 8 characters for new classrooms
ALTER TABLE public.classrooms
  ALTER COLUMN join_code SET DEFAULT SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8);

-- Update existing short join codes
UPDATE public.classrooms
  SET join_code = SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8)
  WHERE LENGTH(join_code) < 8;