import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User } from "./userTypes";
import { fetchCurrentUser } from "./userThunks";

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    clearUser(state) {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;