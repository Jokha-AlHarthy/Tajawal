import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTrip = createAsyncThunk(
  "/planTrip",
  async (tripData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/planTrip", tripData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const TripSlice = createSlice({
  name: "trip",
  initialState: {
    trip: {},
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trip = action.payload.trip;
      })
      .addCase(createTrip.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export default TripSlice.reducer;
