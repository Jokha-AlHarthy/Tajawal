import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load user's notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (userId) => {
    const res = await axios.get(`https://tajawalclient.onrender.com/notifications/user/${userId}`);
    return res.data;
  }
);

// Add notification to backend
export const addNotificationToDB = createAsyncThunk(
  "notifications/add",
  async (data) => {
    const res = await axios.post("https://tajawalclient.onrender.com/notifications/add", data);
    return res.data;
  }
);

// Mark notification as read
export const markReadInDB = createAsyncThunk(
  "notifications/markRead",
  async (id) => {
    const res = await axios.put(`https://tajawalclient.onrender.com/notifications/read/${id}`);
    return res.data;
  }
);

// Delete notification
export const deleteNotificationFromDB = createAsyncThunk(
  "notifications/delete",
  async (id) => {
    await axios.delete(`https://tajawalclient.onrender.com/notifications/delete/${id}`);
    return id;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addNotificationToDB.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(markReadInDB.fulfilled, (state, action) => {
        const index = state.list.findIndex(n => n._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteNotificationFromDB.fulfilled, (state, action) => {
        state.list = state.list.filter(n => n._id !== action.payload);
      });
  },
});

export default notificationSlice.reducer;
