import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login Thunk
export const getUser = createAsyncThunk("users/getUser", async (udata, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:8080/login", udata);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Login failed" });
    }
});

// Register Thunk
export const addUser = createAsyncThunk("users/addUser", async (udata, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:8080/register", udata);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});

// Update Profile Thunk
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/user/update/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

const initVal = {
    user: {},
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false
};

export const UserSlice = createSlice({
    name: "users",
    initialState: initVal,
    reducers: {
        logout(state) {
            state.user = null;
            state.isSuccess = false;
            state.message = "";
            state.isError = false;
        },

        resetAuthState(state) {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addUser.fulfilled, (state) => {
                state.isLoading = false;
                state.message = "Registered Successfully";
                state.isSuccess = false; 
            })

            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Registration failed";
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Login failed";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export const { logout, resetAuthState } = UserSlice.actions;
export default UserSlice.reducer;
