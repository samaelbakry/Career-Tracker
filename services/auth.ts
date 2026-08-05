import { supabase } from "@/lib/supabase";
import { loginSchemaType, registerSchemaType } from "@/schemas/authschema";

export async function signIn(values: loginSchemaType) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) throw error;

  return data.user;
}

export async function signUp(values: registerSchemaType) {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo:"http://localhost:3000/login",
      data: {
        full_name: values.name,
        role: values.role,
      },
    },
  });

  if (error) throw error;

  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return user;
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  if (error) throw error;

  return data;
}
