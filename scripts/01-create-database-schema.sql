-- ALQUILA PERÚ - Database Schema
-- Create tables for the rental management SaaS platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  whatsapp_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Properties table
CREATE TABLE public.properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL CHECK (property_type IN ('room', 'apartment', 'house', 'office', 'commercial')),
  address TEXT NOT NULL,
  district TEXT,
  city TEXT DEFAULT 'Lima',
  monthly_rent DECIMAL(10,2) NOT NULL,
  deposit DECIMAL(10,2),
  area_sqm DECIMAL(8,2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  furnished BOOLEAN DEFAULT FALSE,
  pets_allowed BOOLEAN DEFAULT FALSE,
  parking BOOLEAN DEFAULT FALSE,
  utilities_included BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'rented', 'maintenance')),
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property images table
CREATE TABLE public.property_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tenants table
CREATE TABLE public.tenants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  whatsapp_number TEXT,
  dni TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rental contracts table
CREATE TABLE public.rental_contracts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  monthly_rent DECIMAL(10,2) NOT NULL,
  deposit DECIMAL(10,2),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  payment_day INTEGER NOT NULL CHECK (payment_day >= 1 AND payment_day <= 31),
  contract_status TEXT NOT NULL DEFAULT 'active' CHECK (contract_status IN ('active', 'expired', 'terminated')),
  auto_renewal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contract_id UUID REFERENCES public.rental_contracts(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  due_date DATE NOT NULL,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('rent', 'deposit', 'utilities', 'maintenance', 'other')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expenses table
CREATE TABLE public.expenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  expense_date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('maintenance', 'utilities', 'taxes', 'insurance', 'repairs', 'other')),
  description TEXT NOT NULL,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE public.documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('dni', 'contract', 'receipt', 'guarantee', 'other')),
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications/Alerts table
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  contract_id UUID REFERENCES public.rental_contracts(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('payment_reminder', 'contract_expiry', 'maintenance', 'custom')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alert settings table
CREATE TABLE public.alert_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  payment_reminder_days INTEGER DEFAULT 3,
  contract_expiry_days INTEGER DEFAULT 30,
  whatsapp_enabled BOOLEAN DEFAULT TRUE,
  email_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(owner_id)
);

-- Create indexes for better performance
CREATE INDEX idx_properties_owner_id ON public.properties(owner_id);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_tenants_property_id ON public.tenants(property_id);
CREATE INDEX idx_rental_contracts_property_id ON public.rental_contracts(property_id);
CREATE INDEX idx_rental_contracts_owner_id ON public.rental_contracts(owner_id);
CREATE INDEX idx_payments_contract_id ON public.payments(contract_id);
CREATE INDEX idx_payments_due_date ON public.payments(due_date);
CREATE INDEX idx_expenses_property_id ON public.expenses(property_id);
CREATE INDEX idx_notifications_owner_id ON public.notifications(owner_id);
CREATE INDEX idx_notifications_scheduled_date ON public.notifications(scheduled_date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see and modify their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Properties policies
CREATE POLICY "Owners can view own properties" ON public.properties FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners can insert own properties" ON public.properties FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update own properties" ON public.properties FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete own properties" ON public.properties FOR DELETE USING (auth.uid() = owner_id);
CREATE POLICY "Public can view published properties" ON public.properties FOR SELECT USING (is_published = true);

-- Property images policies
CREATE POLICY "Owners can manage property images" ON public.property_images FOR ALL USING (
  EXISTS (SELECT 1 FROM public.properties WHERE id = property_id AND owner_id = auth.uid())
);
CREATE POLICY "Public can view published property images" ON public.property_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.properties WHERE id = property_id AND is_published = true)
);

-- Tenants policies
CREATE POLICY "Owners can manage their tenants" ON public.tenants FOR ALL USING (auth.uid() = owner_id);

-- Rental contracts policies
CREATE POLICY "Owners can manage their contracts" ON public.rental_contracts FOR ALL USING (auth.uid() = owner_id);

-- Payments policies
CREATE POLICY "Owners can manage their payments" ON public.payments FOR ALL USING (auth.uid() = owner_id);

-- Expenses policies
CREATE POLICY "Owners can manage their expenses" ON public.expenses FOR ALL USING (auth.uid() = owner_id);

-- Documents policies
CREATE POLICY "Owners can manage their documents" ON public.documents FOR ALL USING (auth.uid() = owner_id);

-- Notifications policies
CREATE POLICY "Owners can manage their notifications" ON public.notifications FOR ALL USING (auth.uid() = owner_id);

-- Alert settings policies
CREATE POLICY "Owners can manage their alert settings" ON public.alert_settings FOR ALL USING (auth.uid() = owner_id);
