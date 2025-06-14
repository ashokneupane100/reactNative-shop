import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://trmklnjbrdvgacmpcolk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybWtsbmpicmR2Z2FjbXBjb2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzOTc3OTAsImV4cCI6MjA2NDk3Mzc5MH0.dlY-pLkpQZgQdN9APbr1kd24hxQkUGO_vl-6L0OqzaU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
