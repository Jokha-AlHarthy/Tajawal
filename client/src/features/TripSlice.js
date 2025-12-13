import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Create trip - Add
export const createTrip = createAsyncThunk("trips/createTrip",async (tripData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8080/planTrip", tripData);
      return res.data.trip;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

//Read Trips - Read
export const fetchTrips = createAsyncThunk("trips/fetchTrips",async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8080/trips/user/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);


//Delete the trip - delete
export const deleteTrip = createAsyncThunk("trips/deleteTrip",async (tripId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:8080/trip/delete/${tripId}`);
      return tripId;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);


const TripSlice = createSlice({
  name: "trips",
  initialState: {
    trips: [],
    trip: null,
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
        state.trip = action.payload;
        state.trips.push(action.payload);
      })
      .addCase(createTrip.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trips = action.payload;
        state.isSuccess = true;
      })
      .addCase(fetchTrips.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.trips = state.trips.filter(t => t._id !== action.payload);
        if (state.trip?._id === action.payload) {
          state.trip = null;
        }
      })
  }
});

export default TripSlice.reducer;
