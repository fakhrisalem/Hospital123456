/*
# Create bookings table (single-tenant, no auth)

1. New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `patient_name` (text, not null) — اسم المريض
  - `patient_address` (text, not null) — عنوان المريض
  - `patient_phone` (text, not null) — رقم هاتف المريض
  - `patient_email` (text, nullable) — البريد الإلكتروني (اختياري)
  - `specialty` (text, not null) — التخصص المختار
  - `doctor` (text, not null) — الطبيب المختار
  - `appointment_date` (text, not null) — تاريخ الموعد
  - `appointment_time` (text, not null) — وقت الموعد
  - `status` (text, default 'pending') — حالة الحجز (pending, confirmed, cancelled)
  - `created_at` (timestamptz, default now()) — تاريخ الإنشاء

2. Security
- Enable RLS on `bookings`.
- Allow anon + authenticated to insert (public booking form).
- Allow anon + authenticated to read (admin dashboard reads bookings).
- Allow anon + authenticated to update status (admin confirms/cancels).
- Allow anon + authenticated to delete.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  patient_address text NOT NULL,
  patient_phone text NOT NULL,
  patient_email text,
  specialty text NOT NULL,
  doctor text NOT NULL,
  appointment_date text NOT NULL,
  appointment_time text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
  TO anon, authenticated USING (true);
