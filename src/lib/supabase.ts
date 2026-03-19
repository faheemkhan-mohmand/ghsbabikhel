import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jijkfbjdvvviylfzkysz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppamtmYmpkdnZ2aXlsZnpreXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MDg5ODUsImV4cCI6MjA4OTM4NDk4NX0.m92OyBojDdpXRwEn5uvxshxUQV7oHFAjPvBxoSsg0tY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
