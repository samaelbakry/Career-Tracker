"use client";
import { supabase } from "@/lib/supabase";
import { getProfile } from "@/services/auth";
import { useAppDispatch } from "@/store/hooks/redux-hooks";
import { setCredentials } from "@/store/slices/authSlice";
import React, { useEffect } from "react";

export default function AuthProvider({ children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const user = session.user;
      const profile = await getProfile(user.id);
      dispatch(
        setCredentials({
            user: {
              id: user.id,
              name: user.user_metadata.full_name,
              email: user.email!,
              role: profile?.role as "job_seeker" | "employer",
              created_at: user.created_at,
            },
        }),
      );
    };

    loadUser();
  }, []);

  return <>{children}</>;
}
