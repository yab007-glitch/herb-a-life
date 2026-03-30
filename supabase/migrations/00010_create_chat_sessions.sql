CREATE TABLE public.chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT DEFAULT 'New Chat',
  messages JSONB NOT NULL DEFAULT '[]',
  herb_context UUID REFERENCES public.herbs(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chats"
  ON public.chat_sessions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own chats"
  ON public.chat_sessions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own chats"
  ON public.chat_sessions FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own chats"
  ON public.chat_sessions FOR DELETE
  USING (user_id = auth.uid());

CREATE TRIGGER chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
