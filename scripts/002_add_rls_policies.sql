-- Enable RLS on public tables but allow inserts from server actions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into contact_submissions (public contact form)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Allow anyone to insert into newsletter_subscribers (public newsletter form)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Allow service role to read all data (for admin purposes)
CREATE POLICY "Service role can read contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can read newsletter subscribers"
  ON public.newsletter_subscribers FOR SELECT
  USING (auth.role() = 'service_role');
