-- Update support_tickets table to add company_name and phone fields
ALTER TABLE support_tickets
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Create contract_customers table for tracking service contracts
CREATE TABLE IF NOT EXISTS contract_customers (
  customer_id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  contract_type TEXT NOT NULL CHECK (contract_type IN ('IIS', 'PII', 'MIWS')),
  contract_start_date DATE NOT NULL,
  contract_end_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended')),
  support_tier TEXT CHECK (support_tier IN ('basic', 'standard', 'premium', '24/7')),
  primary_contact_name TEXT,
  primary_contact_email TEXT,
  primary_contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contract_customers_company ON contract_customers(company_name);
CREATE INDEX IF NOT EXISTS idx_contract_customers_status ON contract_customers(status);
CREATE INDEX IF NOT EXISTS idx_contract_customers_type ON contract_customers(contract_type);

-- Enable RLS
ALTER TABLE contract_customers ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only service role can read contract customers (admin access)
CREATE POLICY "Service role can read contract customers"
ON contract_customers
FOR SELECT
TO service_role
USING (true);

-- RLS Policy: Only service role can insert contract customers
CREATE POLICY "Service role can insert contract customers"
ON contract_customers
FOR INSERT
TO service_role
WITH CHECK (true);

-- RLS Policy: Only service role can update contract customers
CREATE POLICY "Service role can update contract customers"
ON contract_customers
FOR UPDATE
TO service_role
USING (true);

-- Comment on table
COMMENT ON TABLE contract_customers IS 'Stores information about customers with active service contracts (IIS, PII, MIWS)';
COMMENT ON COLUMN contract_customers.customer_id IS 'Format: YYYY{IIS|PII|MIWS}-CompanyAbbrev-###';
COMMENT ON COLUMN contract_customers.contract_type IS 'IIS=IT Infrastructure Services, PII=Professional Installation & Integration, MIWS=Managed IT & Web Services';
