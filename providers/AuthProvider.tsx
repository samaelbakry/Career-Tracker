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

      const authUser = session.user;
      const profile = await getProfile(authUser.id);

      dispatch(
        setCredentials({
             user: {
            id: authUser.id,
            name: profile.full_name,
            email: authUser.email!,
            role: profile.role as "job_seeker" | "employer",
            avatar_url: profile.avatar_url ?? "",
            created_at: authUser.created_at,
          },
        }),
      );
    };

    loadUser();
  }, []);

  return <>{children}</>;
}
