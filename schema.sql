-- Create profiles table
create table public.profiles (
  id uuid references auth.users not null primary key,
  user_id uuid references auth.users not null,
  hourly_rate numeric,
  weekly_budget int,
  focus_start_time time,
  focus_end_time time
);

-- Separate tasks table
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  category text check (category in ('DEEP_WORK', 'SHALLOW_WORK', 'ADMIN')),
  duration_estimate int, -- in minutes
  is_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Schedules table
create table public.schedules (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  week_id text not null, -- e.g. '2024-W01'
  layout_json jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.schedules enable row level security;

-- Create policies (basic examples, refine as needed)
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = user_id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = user_id);

create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = user_id);

create policy "Users can view their own tasks" on public.tasks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own tasks" on public.tasks
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own tasks" on public.tasks
  for update using (auth.uid() = user_id);

create policy "Users can delete their own tasks" on public.tasks
  for delete using (auth.uid() = user_id);

create policy "Users can view their own schedules" on public.schedules
  for select using (auth.uid() = user_id);
