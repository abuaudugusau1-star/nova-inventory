-- Update profiles table for bank details, contact, and referral system
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bank_details jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_info jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_code text UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referred_by uuid REFERENCES profiles(id);

-- Update items table for marketplace functionality
ALTER TABLE items ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT false;
ALTER TABLE items ADD COLUMN IF NOT EXISTS status text DEFAULT 'available';
ALTER TABLE items ADD COLUMN IF NOT EXISTS description text;

-- Create RLS policy for public items viewing
CREATE POLICY "Anyone can view public items"
ON items FOR SELECT
USING (is_public = true OR auth.uid() = user_id);

-- Function to generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS text AS $$
DECLARE
  code text;
  exists boolean;
BEGIN
  LOOP
    code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    SELECT EXISTS(SELECT 1 FROM profiles WHERE referral_code = code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code on profile creation
CREATE OR REPLACE FUNCTION handle_new_profile_referral()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_profile_created_referral
BEFORE INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION handle_new_profile_referral();