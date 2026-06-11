import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "./userSlice";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/get-current-user", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const user = await res.json();

      thunkAPI.dispatch(setUser(user));

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Error fetching user"
      );
    }
  }
);