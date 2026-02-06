-- Add ip_address column to contact_submissions for rate limiting
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS ip_address text;

-- Create index for faster IP-based lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_ip_date ON contact_submissions (ip_address, created_at);
