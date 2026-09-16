import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://petcqaixzetwsduscvtx.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBldGNxYWl4emV0d3NkdXNjdnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1OTAxNjMsImV4cCI6MjEwNTE2NjE2M30.4vDNJ3nBMi0TQg71KZUpyJdcBWr5zyTDKR92xA4obgM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
