-- 1. Create Scholarship Campaigns Table
CREATE TABLE public.scholarship_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    sponsor_name TEXT NOT NULL,
    full_scholarship_slots INTEGER NOT NULL DEFAULT 0,
    subsidy_discount_percentage INTEGER NOT NULL DEFAULT 0,
    is_public BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Scholarship Deposits Table (Ledger IN)
CREATE TABLE public.scholarship_deposits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES public.scholarship_campaigns(id) ON DELETE CASCADE,
    amount_kes INTEGER NOT NULL CHECK (amount_kes > 0),
    reference TEXT,
    notes TEXT,
    deposit_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Scholarship Applications Table
CREATE TABLE public.scholarship_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES public.scholarship_campaigns(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    institution TEXT NOT NULL,
    course TEXT NOT NULL,
    exam_date TEXT,
    county TEXT NOT NULL,
    sub_county TEXT,
    national_id TEXT,
    student_id_number TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'waitlisted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, student_id) -- A student can only apply once per campaign
);

-- 4. Create Scholarship Beneficiaries Table (Ledger OUT)
CREATE TABLE public.scholarship_beneficiaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES public.scholarship_campaigns(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    beneficiary_type TEXT NOT NULL CHECK (beneficiary_type IN ('FULL', 'SUBSIDIZED')),
    allocated_amount_kes INTEGER NOT NULL DEFAULT 0,
    approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    activated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, student_id) -- A student can only be a beneficiary once per campaign
);

-- Indexes for performance
CREATE INDEX idx_scholarship_deposits_campaign_id ON public.scholarship_deposits(campaign_id);
CREATE INDEX idx_scholarship_applications_campaign_id ON public.scholarship_applications(campaign_id);
CREATE INDEX idx_scholarship_applications_student_id ON public.scholarship_applications(student_id);
CREATE INDEX idx_scholarship_beneficiaries_campaign_id ON public.scholarship_beneficiaries(campaign_id);
CREATE INDEX idx_scholarship_beneficiaries_student_id ON public.scholarship_beneficiaries(student_id);

-- Row Level Security (RLS)
ALTER TABLE public.scholarship_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_beneficiaries ENABLE ROW LEVEL SECURITY;

-- Campaigns: Anyone can view active campaigns, admins can do anything
CREATE POLICY "Campaigns are viewable by everyone" ON public.scholarship_campaigns
    FOR SELECT USING (true);

-- Deposits: Only admins can view and manage
CREATE POLICY "Admins can view deposits" ON public.scholarship_deposits
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can insert deposits" ON public.scholarship_deposits
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role = 'admin')
    );

-- Applications: Students can view and insert their own. Admins can do everything.
CREATE POLICY "Students can view own applications" ON public.scholarship_applications
    FOR SELECT USING (
        auth.uid() = student_id OR
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Students can insert own applications" ON public.scholarship_applications
    FOR INSERT WITH CHECK (
        auth.uid() = student_id OR
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can update applications" ON public.scholarship_applications
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role = 'admin')
    );

-- Beneficiaries: Students can view their own. Admins can do everything.
CREATE POLICY "Students can view own beneficiary status" ON public.scholarship_beneficiaries
    FOR SELECT USING (
        auth.uid() = student_id OR
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can insert beneficiaries" ON public.scholarship_beneficiaries
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can update beneficiaries" ON public.scholarship_beneficiaries
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role = 'admin')
    );
