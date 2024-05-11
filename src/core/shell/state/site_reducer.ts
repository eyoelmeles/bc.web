import { createSlice } from "@reduxjs/toolkit";
import { SiteModel } from "../../../feature/site/model/site";

interface InitialState {
  site: null | SiteModel;
  activeSites: SiteModel[];
}

const initialState: InitialState = {
  site: null,
  activeSites: [],
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setActiveSites(state, action) {
      state.activeSites = action.payload;
    },
    setSite(state, action) {
      state.site = action.payload;
    },
  },
});

export const { setActiveSites, setSite } = siteSlice.actions;
export default siteSlice.reducer;
