import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountryCodes = createAsyncThunk(
  "country/fetchCountryCodes",
  async () => {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,idd"
    );
    const data = await res.json();

    const codes = data
      .filter((c) => c.idd?.root && c.idd?.suffixes?.length)
      .map((c) => ({
        name: c.name.common,
        code: `${c.idd.root}${c.idd.suffixes[0]}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return codes;
  }
);

const countrySlice = createSlice({
  name: "country",
  initialState: {
    codes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryCodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryCodes.fulfilled, (state, action) => {
        state.codes = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountryCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default countrySlice.reducer;
