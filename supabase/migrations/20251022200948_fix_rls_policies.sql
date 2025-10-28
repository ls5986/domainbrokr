-- Fix RLS policies to allow inserts
DROP POLICY IF EXISTS "Public domains are viewable by everyone." ON domains;
DROP POLICY IF EXISTS "Offers can be created by anyone." ON offers;

-- Create new policies that allow both SELECT and INSERT
CREATE POLICY "Allow all operations on domains" ON domains
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Allow all operations on offers" ON offers
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

