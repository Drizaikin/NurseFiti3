-- Create platform_settings table
CREATE TABLE IF NOT EXISTS platform_settings (
    id integer PRIMARY KEY DEFAULT 1,
    allow_tutor_custom_pricing boolean DEFAULT false,
    krchn_hourly_rate numeric DEFAULT 1500,
    bscn_hourly_rate numeric DEFAULT 1800,
    plan_daily_price numeric DEFAULT 99,
    plan_weekly_price numeric DEFAULT 499,
    plan_standard_price numeric DEFAULT 1199,
    plan_premium_price numeric DEFAULT 3500,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT single_row CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
DROP POLICY IF EXISTS "Allow public read access on platform_settings" ON platform_settings;
CREATE POLICY "Allow public read access on platform_settings"
    ON platform_settings FOR SELECT
    TO authenticated
    USING (true);

-- Allow updates only from admin users
DROP POLICY IF EXISTS "Allow update access on platform_settings to admins" ON platform_settings;
CREATE POLICY "Allow update access on platform_settings to admins"
    ON platform_settings FOR UPDATE
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
      )
    );

-- Seed initial row
INSERT INTO platform_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- Add anonymity columns to tutor_profiles
ALTER TABLE tutor_profiles
ADD COLUMN IF NOT EXISTS is_anonymous boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS pseudonym text;
