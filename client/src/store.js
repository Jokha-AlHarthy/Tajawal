import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/UserSlice';
import tripReducer from "./features/TripSlice";
import adminReducer from "./features/AdminSlice";
import notificationsReducer from "./features/NotificationSlice";

export const store=configureStore({
    reducer:{
        users:UserReducer,
        trip: tripReducer,
        admin: adminReducer, 
        notifications: notificationsReducer,
    }
});
