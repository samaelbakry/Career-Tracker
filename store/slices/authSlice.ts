import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "employer" | "job_seeker";
  avatar_url: string;
  created_at: string;
};

export type AuthStateType = {
  user: User | null;
  authenticated: boolean | null;
};

const initialState: AuthStateType = {
  user: null,
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.authenticated = true;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if(state.user){
        state.user={
          ...state.user,
          ...action.payload
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.authenticated = false;
    },
  },
});

export const { setCredentials, logout , updateUser} = authSlice.actions;

export const selectedUser = (state: RootState) => state.auth.user;
export const selectedAuthenticated = (state: RootState) =>
  state.auth.authenticated;

export default authSlice.reducer;
