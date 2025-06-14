import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useState, createContext } from "react";

// Define the AuthData type outside the component
type AuthData = {
  session: Session | null;
  user: any; // You can replace 'any' with a specific user type if known
  mounting: boolean;
};

// Create the context with default values
const AuthContext = createContext<AuthData>({
  session: null,
  mounting: true,
  user: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any>(null); // Adjust type as needed
  const [mounting, setMounting] = useState(true);

  useEffect(() => {
    // Fetch initial session
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (error) {
          console.log("Error fetching user:", error);
        } else {
          setUser(user);
        }
      }
      setMounting(false);
    };

    // Initial fetch
    fetchSession();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <AuthContext.Provider value={{ session, mounting, user }}>
      {children}
    </AuthContext.Provider>
  );
}