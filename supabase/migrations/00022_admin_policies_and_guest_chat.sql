-- Add admin RLS policies for interaction_checks (needed for admin dashboard counts)
-- The existing policies only allow users to see their own checks;
-- admins need to see all for the dashboard.

-- First, add admin read policy for interaction_checks
CREATE POLICY "Admins can view all interaction checks"
  ON public.interaction_checks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add admin read policy for chat_sessions (for admin dashboard)
CREATE POLICY "Admins can view all chat sessions"
  ON public.chat_sessions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add admin read policy for chat_messages
CREATE POLICY "Admins can view all chat messages"
  ON public.chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add guest_id column to chat_sessions for anonymous chat persistence
-- (HerbAlly is a public app with no user accounts)
ALTER TABLE public.chat_sessions
  ADD COLUMN IF NOT EXISTS guest_id TEXT;

-- Create index for guest_id lookups
CREATE INDEX IF NOT EXISTS idx_chat_sessions_guest_id
  ON public.chat_sessions(guest_id)
  WHERE guest_id IS NOT NULL;

-- Add RLS policy for guest sessions (no auth required, keyed by guest_id)
CREATE POLICY "Guests can view own chat sessions"
  ON public.chat_sessions FOR SELECT
  USING (guest_id IS NOT NULL AND guest_id = current_setting('request.jwt.claims', true)::json ->> 'guest_id');

-- For simplicity, we'll use a service-role approach for guest sessions
-- rather than trying to pass guest_id through JWT claims.
-- The API route will handle guest persistence using the service role key.

-- Add a function to get guest chat sessions (callable with service role)
CREATE OR REPLACE FUNCTION public.get_guest_chat_sessions(p_guest_id TEXT)
RETURNS SETOF public.chat_sessions
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT *
  FROM public.chat_sessions
  WHERE guest_id = p_guest_id
  ORDER BY updated_at DESC
  LIMIT 20;
$$;

-- Add a function to get guest chat messages
CREATE OR REPLACE FUNCTION public.get_guest_chat_messages(p_session_id UUID)
RETURNS SETOF public.chat_messages
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT *
  FROM public.chat_messages
  WHERE session_id = p_session_id
  ORDER BY created_at ASC;
$$;

-- Add a function to create a guest chat session
CREATE OR REPLACE FUNCTION public.create_guest_chat_session(
  p_guest_id TEXT,
  p_herb_context TEXT DEFAULT NULL
)
RETURNS public.chat_sessions
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_session public.chat_sessions;
BEGIN
  INSERT INTO public.chat_sessions (guest_id, title, herb_context, user_id)
  VALUES (p_guest_id, 'New Chat', p_herb_context, NULL)
  RETURNING * INTO new_session;
  RETURN new_session;
END;
$$;

-- Add a function to add a guest chat message
CREATE OR REPLACE FUNCTION public.add_guest_chat_message(
  p_session_id UUID,
  p_role TEXT,
  p_content TEXT,
  p_guest_id TEXT
)
RETURNS public.chat_messages
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_message public.chat_messages;
  v_session record;
BEGIN
  -- Verify session belongs to this guest
  SELECT id, title INTO v_session
  FROM public.chat_sessions
  WHERE id = p_session_id AND guest_id = p_guest_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Session not found or not owned by guest';
  END IF;

  INSERT INTO public.chat_messages (session_id, role, content)
  VALUES (p_session_id, p_role, p_content)
  RETURNING * INTO new_message;

  -- Update session title from first user message
  IF p_role = 'user' AND v_session.title = 'New Chat' THEN
    UPDATE public.chat_sessions
    SET title = LEFT(p_content, 50) || CASE WHEN LENGTH(p_content) > 50 THEN '...' ELSE '' END,
        updated_at = now()
    WHERE id = p_session_id;
  ELSE
    UPDATE public.chat_sessions
    SET updated_at = now()
    WHERE id = p_session_id;
  END IF;

  RETURN new_message;
END;
$$;

-- Add a function to delete a guest chat session
CREATE OR REPLACE FUNCTION public.delete_guest_chat_session(
  p_session_id UUID,
  p_guest_id TEXT
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.chat_sessions
  WHERE id = p_session_id AND guest_id = p_guest_id;

  RETURN FOUND;
END;
$$;