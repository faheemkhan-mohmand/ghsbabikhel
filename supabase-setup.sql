-- =============================================
-- GHS Babi Khel - Full Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- 1. ROLE ENUM & USER ROLES TABLE
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null default 'user',
    unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS for user_roles
create policy "Users can read own role" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

create policy "Allow insert for signup" on public.user_roles
  for insert to authenticated with check (user_id = auth.uid());

-- 2. SCHOOL INFO
create table public.school_info (
    id uuid primary key default gen_random_uuid(),
    name text not null default 'GHS Babi Khel',
    full_name text default 'Government High School Babi Khel',
    description text,
    mission text,
    vision text,
    total_students integer default 1200,
    pass_rate integer default 98,
    total_teachers integer default 45,
    established integer default 2018,
    address text,
    phone text,
    email text,
    created_at timestamptz default now()
);

alter table public.school_info enable row level security;
create policy "Anyone can read school info" on public.school_info for select using (true);
create policy "Admins can update school info" on public.school_info for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can insert school info" on public.school_info for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));

-- Insert default school info
insert into public.school_info (name, full_name, description, mission, vision, total_students, pass_rate, total_teachers, established, address, phone, email)
values (
  'GHS Babi Khel',
  'Government High School Babi Khel',
  'Government High School Babi Khel is a prestigious educational institution committed to providing quality education and nurturing the potential of every student.',
  'To provide quality education that empowers students with knowledge, skills, and values necessary for success in life.',
  'To be the leading educational institution in the region, known for academic excellence and holistic student development.',
  1200, 98, 45, 2018,
  'Babi Khel, Khyber Pakhtunkhwa, Pakistan',
  '+92-XXX-XXXXXXX',
  'info@ghsbabikhel.edu.pk'
);

-- 3. TEACHERS
create table public.teachers (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    subject text not null,
    qualification text,
    experience text,
    photo_url text,
    created_at timestamptz default now()
);

alter table public.teachers enable row level security;
create policy "Anyone can read teachers" on public.teachers for select using (true);
create policy "Admins can insert teachers" on public.teachers for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update teachers" on public.teachers for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete teachers" on public.teachers for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 4. NOTICES
create table public.notices (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    content text,
    date date default current_date,
    priority text default 'medium' check (priority in ('high', 'medium', 'low')),
    created_at timestamptz default now()
);

alter table public.notices enable row level security;
create policy "Anyone can read notices" on public.notices for select using (true);
create policy "Admins can insert notices" on public.notices for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update notices" on public.notices for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete notices" on public.notices for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 5. NEWS
create table public.news (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    excerpt text,
    content text,
    date date default current_date,
    image_url text,
    created_at timestamptz default now()
);

alter table public.news enable row level security;
create policy "Anyone can read news" on public.news for select using (true);
create policy "Admins can insert news" on public.news for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update news" on public.news for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete news" on public.news for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 6. GALLERY ALBUMS
create table public.gallery_albums (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    cover_image_url text,
    created_at timestamptz default now()
);

alter table public.gallery_albums enable row level security;
create policy "Anyone can read albums" on public.gallery_albums for select using (true);
create policy "Admins can insert albums" on public.gallery_albums for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update albums" on public.gallery_albums for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete albums" on public.gallery_albums for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 7. GALLERY IMAGES
create table public.gallery_images (
    id uuid primary key default gen_random_uuid(),
    album_id uuid references public.gallery_albums(id) on delete cascade not null,
    image_url text not null,
    caption text,
    created_at timestamptz default now()
);

alter table public.gallery_images enable row level security;
create policy "Anyone can read gallery images" on public.gallery_images for select using (true);
create policy "Admins can insert gallery images" on public.gallery_images for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete gallery images" on public.gallery_images for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 8. LIBRARY FILES
create table public.library_files (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    category text default 'past-paper' check (category in ('past-paper', 'book', 'notes')),
    file_type text default 'pdf' check (file_type in ('pdf', 'docx')),
    subject text,
    class_level text,
    file_url text,
    upload_date date default current_date,
    created_at timestamptz default now()
);

alter table public.library_files enable row level security;
create policy "Anyone can read library" on public.library_files for select using (true);
create policy "Admins can insert library" on public.library_files for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update library" on public.library_files for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete library" on public.library_files for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 9. TIMETABLE
create table public.timetable (
    id uuid primary key default gen_random_uuid(),
    class_name text not null,
    day text not null,
    period integer not null,
    time text not null,
    subject text not null,
    teacher text,
    created_at timestamptz default now(),
    unique (class_name, day, period)
);

alter table public.timetable enable row level security;
create policy "Anyone can read timetable" on public.timetable for select using (true);
create policy "Admins can insert timetable" on public.timetable for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update timetable" on public.timetable for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete timetable" on public.timetable for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 10. RESULTS
create table public.results (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    roll_number text not null,
    photo_url text,
    class_name text not null,
    exam_type text not null,
    obtained_marks integer not null,
    total_marks integer not null,
    percentage numeric(5,2) generated always as (
        case when total_marks > 0 then (obtained_marks::numeric / total_marks::numeric) * 100 else 0 end
    ) stored,
    created_at timestamptz default now()
);

alter table public.results enable row level security;
create policy "Anyone can read results" on public.results for select using (true);
create policy "Admins can insert results" on public.results for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update results" on public.results for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete results" on public.results for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 11. ACHIEVEMENTS
create table public.achievements (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text,
    date date default current_date,
    category text,
    created_at timestamptz default now()
);

alter table public.achievements enable row level security;
create policy "Anyone can read achievements" on public.achievements for select using (true);
create policy "Admins can insert achievements" on public.achievements for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update achievements" on public.achievements for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete achievements" on public.achievements for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 12. STORAGE BUCKETS
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true);
insert into storage.buckets (id, name, public) values ('library', 'library', true);
insert into storage.buckets (id, name, public) values ('photos', 'photos', true);

-- Storage policies - anyone can read, admins can upload
create policy "Anyone can read gallery" on storage.objects for select using (bucket_id = 'gallery');
create policy "Admins can upload gallery" on storage.objects for insert to authenticated with check (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete gallery" on storage.objects for delete to authenticated using (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));

create policy "Anyone can read library" on storage.objects for select using (bucket_id = 'library');
create policy "Admins can upload library" on storage.objects for insert to authenticated with check (bucket_id = 'library' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete library" on storage.objects for delete to authenticated using (bucket_id = 'library' and public.has_role(auth.uid(), 'admin'));

create policy "Anyone can read photos" on storage.objects for select using (bucket_id = 'photos');
create policy "Admins can upload photos" on storage.objects for insert to authenticated with check (bucket_id = 'photos' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete photos" on storage.objects for delete to authenticated using (bucket_id = 'photos' and public.has_role(auth.uid(), 'admin'));

-- 13. SEED DATA - Teachers
insert into public.teachers (name, subject, qualification, experience) values
  ('Muhammad Arif Khan', 'Mathematics', 'M.Sc Mathematics', '15 years'),
  ('Syed Rahim Shah', 'Physics', 'M.Sc Physics', '12 years'),
  ('Abdul Wahab', 'Chemistry', 'M.Sc Chemistry', '10 years'),
  ('Muhammad Ismail', 'English', 'M.A English', '8 years'),
  ('Fazal Rahim', 'Urdu', 'M.A Urdu', '14 years'),
  ('Zahid Khan', 'Islamiat', 'M.A Islamiat', '11 years'),
  ('Noor Muhammad', 'Computer Science', 'M.Sc Computer Science', '6 years'),
  ('Tariq Mehmood', 'Biology', 'M.Sc Biology', '9 years');

-- Seed Notices
insert into public.notices (title, content, date, priority) values
  ('Annual Examination Schedule 2026', 'Annual examinations for classes 6-10 will commence from April 15, 2026.', '2026-03-15', 'high'),
  ('Parent-Teacher Meeting', 'Parents are invited for a meeting on March 25, 2026 at 10:00 AM.', '2026-03-12', 'medium'),
  ('Sports Day Announcement', 'Annual Sports Day will be held on April 5, 2026.', '2026-03-10', 'medium'),
  ('Fee Submission Deadline', 'Last date for fee submission is March 31, 2026.', '2026-03-08', 'high'),
  ('Science Fair Registration', 'Register by March 20, 2026.', '2026-03-05', 'low');

-- Seed News
insert into public.news (title, excerpt, content, date) values
  ('GHS Babi Khel Students Excel in Board Exams', 'Our students achieved remarkable results with 98% pass rate.', 'Full article content...', '2026-03-10'),
  ('New Computer Lab Inaugurated', 'State-of-the-art computer lab with 30 systems inaugurated.', 'Full article content...', '2026-03-05'),
  ('Inter-School Quiz Competition Victory', 'Our students won first position in the district-level quiz competition.', 'Full article content...', '2026-02-28'),
  ('Tree Plantation Drive', 'Students planted over 200 saplings.', 'Full article content...', '2026-02-20');

-- Seed Albums
insert into public.gallery_albums (name, description) values
  ('Annual Day 2026', 'Celebrations from our Annual Day ceremony'),
  ('Science Fair 2025', 'Student projects and innovations'),
  ('Sports Day 2025', 'Highlights from the annual sports competition'),
  ('Campus Life', 'Day-to-day life at GHS Babi Khel');

-- Seed Library
insert into public.library_files (title, category, file_type, subject, class_level, upload_date) values
  ('Mathematics Past Paper 2025 - 10th Class', 'past-paper', 'pdf', 'Mathematics', '10th', '2026-02-15'),
  ('Physics Notes Chapter 1-5', 'notes', 'pdf', 'Physics', '9th', '2026-02-10'),
  ('English Grammar Guide', 'book', 'pdf', 'English', 'All', '2026-01-20'),
  ('Chemistry Past Paper 2025 - 9th Class', 'past-paper', 'pdf', 'Chemistry', '9th', '2026-02-12'),
  ('Urdu Literature Notes', 'notes', 'docx', 'Urdu', '10th', '2026-01-15');

-- Seed Results
insert into public.results (name, roll_number, class_name, exam_type, obtained_marks, total_marks) values
  ('Ahmad Khan', '101', '10th', 'Annual-I', 920, 1050),
  ('Bilal Ahmed', '102', '10th', 'Annual-I', 890, 1050),
  ('Farhan Ali', '103', '10th', 'Annual-I', 870, 1050),
  ('Hamza Shah', '104', '10th', 'Annual-I', 845, 1050),
  ('Imran Khan', '105', '10th', 'Annual-I', 810, 1050),
  ('Junaid Afridi', '106', '10th', 'Annual-I', 780, 1050),
  ('Khalid Yousafzai', '107', '10th', 'Annual-I', 750, 1050),
  ('Luqman Shah', '108', '10th', 'Annual-I', 720, 1050),
  ('Mubashir Khan', '201', '9th', 'Annual-I', 880, 1050),
  ('Nasir Ahmad', '202', '9th', 'Annual-I', 850, 1050),
  ('Omar Farooq', '203', '9th', 'Annual-I', 830, 1050),
  ('Qasim Ali', '301', '8th', '1st Semester', 420, 500),
  ('Raheel Khan', '302', '8th', '1st Semester', 395, 500),
  ('Saeed Ahmad', '303', '8th', '1st Semester', 380, 500);

-- Seed Achievements
insert into public.achievements (title, description, date, category) values
  ('District Science Olympiad - 1st Position', 'Our students secured 1st position.', '2026-03-01', 'Academic'),
  ('98% Pass Rate in Board Exams', 'GHS Babi Khel achieved 98% pass rate.', '2025-09-15', 'Academic'),
  ('Inter-School Cricket Tournament Winners', 'School cricket team won at district level.', '2026-01-20', 'Sports'),
  ('Best School Award', 'Awarded Best Government School by KPK Education Department.', '2025-08-14', 'Recognition'),
  ('National Quiz Competition - 2nd Position', 'Students secured 2nd position nationally.', '2025-11-10', 'Academic');

-- Seed Timetable for 6th class
insert into public.timetable (class_name, day, period, time, subject, teacher) values
  ('6th', 'Monday', 1, '8:00 - 8:40', 'Math', 'M. Arif'),
  ('6th', 'Monday', 2, '8:40 - 9:20', 'English', 'M. Ismail'),
  ('6th', 'Monday', 3, '9:20 - 10:00', 'Urdu', 'F. Rahim'),
  ('6th', 'Monday', 4, '10:00 - 10:40', 'Science', 'T. Mehmood'),
  ('6th', 'Monday', 5, '10:40 - 11:00', 'Break', '-'),
  ('6th', 'Monday', 6, '11:00 - 11:40', 'Islamiat', 'Z. Khan'),
  ('6th', 'Monday', 7, '11:40 - 12:20', 'Social Studies', 'A. Wahab'),
  ('6th', 'Monday', 8, '12:20 - 1:00', 'PT', '-'),
  ('6th', 'Tuesday', 1, '8:00 - 8:40', 'English', 'M. Ismail'),
  ('6th', 'Tuesday', 2, '8:40 - 9:20', 'Math', 'M. Arif'),
  ('6th', 'Tuesday', 3, '9:20 - 10:00', 'Science', 'T. Mehmood'),
  ('6th', 'Tuesday', 4, '10:00 - 10:40', 'Urdu', 'F. Rahim'),
  ('6th', 'Tuesday', 5, '10:40 - 11:00', 'Break', '-'),
  ('6th', 'Tuesday', 6, '11:00 - 11:40', 'Computer', 'N. Muhammad'),
  ('6th', 'Tuesday', 7, '11:40 - 12:20', 'Islamiat', 'Z. Khan'),
  ('6th', 'Tuesday', 8, '12:20 - 1:00', 'Drawing', '-'),
  ('6th', 'Wednesday', 1, '8:00 - 8:40', 'Urdu', 'F. Rahim'),
  ('6th', 'Wednesday', 2, '8:40 - 9:20', 'Science', 'T. Mehmood'),
  ('6th', 'Wednesday', 3, '9:20 - 10:00', 'Math', 'M. Arif'),
  ('6th', 'Wednesday', 4, '10:00 - 10:40', 'English', 'M. Ismail'),
  ('6th', 'Wednesday', 5, '10:40 - 11:00', 'Break', '-'),
  ('6th', 'Wednesday', 6, '11:00 - 11:40', 'Social Studies', 'A. Wahab'),
  ('6th', 'Wednesday', 7, '11:40 - 12:20', 'Computer', 'N. Muhammad'),
  ('6th', 'Wednesday', 8, '12:20 - 1:00', 'PT', '-'),
  ('6th', 'Thursday', 1, '8:00 - 8:40', 'Science', 'T. Mehmood'),
  ('6th', 'Thursday', 2, '8:40 - 9:20', 'Urdu', 'F. Rahim'),
  ('6th', 'Thursday', 3, '9:20 - 10:00', 'English', 'M. Ismail'),
  ('6th', 'Thursday', 4, '10:00 - 10:40', 'Math', 'M. Arif'),
  ('6th', 'Thursday', 5, '10:40 - 11:00', 'Break', '-'),
  ('6th', 'Thursday', 6, '11:00 - 11:40', 'Islamiat', 'Z. Khan'),
  ('6th', 'Thursday', 7, '11:40 - 12:20', 'Drawing', '-'),
  ('6th', 'Thursday', 8, '12:20 - 1:00', 'Social Studies', 'A. Wahab'),
  ('6th', 'Friday', 1, '8:00 - 8:40', 'Math', 'M. Arif'),
  ('6th', 'Friday', 2, '8:40 - 9:20', 'Islamiat', 'Z. Khan'),
  ('6th', 'Friday', 3, '9:20 - 10:00', 'Urdu', 'F. Rahim'),
  ('6th', 'Friday', 4, '10:00 - 10:40', 'English', 'M. Ismail'),
  ('6th', 'Friday', 5, '10:40 - 11:00', 'Break', '-'),
  ('6th', 'Friday', 6, '11:00 - 11:40', 'Science', 'T. Mehmood'),
  ('6th', 'Friday', 7, '11:40 - 12:20', 'Computer', 'N. Muhammad'),
  ('6th', 'Friday', 8, '12:20 - 1:00', 'PT', '-'),
  ('6th', 'Saturday', 1, '8:00 - 8:40', 'English', 'M. Ismail'),
  ('6th', 'Saturday', 2, '8:40 - 9:20', 'Math', 'M. Arif'),
  ('6th', 'Saturday', 3, '9:20 - 10:00', 'Islamiat', 'Z. Khan'),
  ('6th', 'Saturday', 4, '10:00 - 10:40', 'Science', 'T. Mehmood'),
  ('6th', 'Saturday', 5, '10:40 - 11:00', 'Break', '-'),
  ('6th', 'Saturday', 6, '11:00 - 11:40', 'Urdu', 'F. Rahim'),
  ('6th', 'Saturday', 7, '11:40 - 12:20', 'Social Studies', 'A. Wahab'),
  ('6th', 'Saturday', 8, '12:20 - 1:00', '-', '-');

-- =============================================
-- PATCHES FOR LATEST APP VERSION (SAFE TO RE-RUN)
-- =============================================

-- School established year normalization
alter table public.school_info add column if not exists established_year integer;
update public.school_info
set established_year = coalesce(established_year, established, 2018)
where established_year is null;
alter table public.school_info alter column established_year set default 2018;

-- Results year (dynamic manual input support)
alter table public.results add column if not exists year text;

-- Timetable dynamic periods metadata
alter table public.timetable add column if not exists period_name text;
alter table public.timetable add column if not exists start_time text;
alter table public.timetable add column if not exists end_time text;

update public.timetable
set period_name = coalesce(period_name, case when period = 7 then 'Break' else concat('P', period) end),
    start_time = coalesce(start_time, split_part(time, ' - ', 1)),
    end_time = coalesce(end_time, split_part(time, ' - ', 2))
where period_name is null or start_time is null or end_time is null;

-- Videos table
create table if not exists public.videos (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text,
    category text default 'events' check (category in ('events', 'lectures', 'announcements')),
    video_url text,
    youtube_url text,
    created_at timestamptz default now()
);

alter table public.videos enable row level security;
drop policy if exists "Anyone can read videos" on public.videos;
drop policy if exists "Admins can insert videos" on public.videos;
drop policy if exists "Admins can update videos" on public.videos;
drop policy if exists "Admins can delete videos" on public.videos;
create policy "Anyone can read videos" on public.videos for select using (true);
create policy "Admins can insert videos" on public.videos for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update videos" on public.videos for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete videos" on public.videos for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Notifications table
create table if not exists public.notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    type text not null check (type in ('notice', 'result', 'news', 'library', 'video', 'general')),
    message text not null,
    is_read boolean not null default false,
    created_at timestamptz default now()
);

alter table public.notifications enable row level security;
drop policy if exists "Users can read own/global notifications" on public.notifications;
drop policy if exists "Users can mark own/global notifications read" on public.notifications;
drop policy if exists "Admins can insert notifications" on public.notifications;
drop policy if exists "Admins can delete notifications" on public.notifications;
create policy "Users can read own/global notifications"
on public.notifications for select to authenticated
using (user_id is null or user_id = auth.uid());
create policy "Users can mark own/global notifications read"
on public.notifications for update to authenticated
using (user_id is null or user_id = auth.uid())
with check (user_id is null or user_id = auth.uid());
create policy "Admins can insert notifications"
on public.notifications for insert to authenticated
with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete notifications"
on public.notifications for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Ensure videos bucket exists
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true)
on conflict (id) do nothing;

drop policy if exists "Anyone can read videos bucket" on storage.objects;
drop policy if exists "Admins can upload videos bucket" on storage.objects;
drop policy if exists "Admins can delete videos bucket" on storage.objects;

create policy "Anyone can read videos bucket"
on storage.objects for select
using (bucket_id = 'videos');

create policy "Admins can upload videos bucket"
on storage.objects for insert to authenticated
with check (bucket_id = 'videos' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete videos bucket"
on storage.objects for delete to authenticated
using (bucket_id = 'videos' and public.has_role(auth.uid(), 'admin'));
