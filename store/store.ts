import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import activeCompanySlice from "./slices/activeCompanySlice";

export const store =configureStore({
    reducer:{
        auth:authSlice,
        activeCompany:activeCompanySlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchStatus = typeof store.dispatch


