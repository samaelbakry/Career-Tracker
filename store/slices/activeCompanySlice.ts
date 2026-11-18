import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveCompanyState = {
  activeCompanyId: string | null;
};

const initialState: ActiveCompanyState = {
  activeCompanyId: null,
};

const activeCompanySlice = createSlice({
  name: "activeCompany",
  initialState,
  reducers: {
    setActiveCompanyId: (state, action: PayloadAction<string>) => {
      state.activeCompanyId = action.payload;
    },
    clearActiveCompany: (state) => {
      state.activeCompanyId = null;
    },
  },
});

export const { setActiveCompanyId, clearActiveCompany } =
  activeCompanySlice.actions;

export default activeCompanySlice.reducer;
