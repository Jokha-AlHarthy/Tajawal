import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//Getting the destination form the database (Read)
export const getAllDestinations = createAsyncThunk("admin/getAllDestinations", async () => {
    try {
        const res = await axios.get("https://tajawal.onrender.com/admin/destinations");
        return res.data;
    } catch (error) {
        console.log(error);
    }
});

//Deleteting the destination from the database (Delete)
export const deleteDestination = createAsyncThunk("admin/deleteDestination", async (did) => {
    try {
        const res = await axios.delete(`https://tajawal.onrender.com/admin/destination/delete/${did}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});

//Adding the destination in the database (Add)
export const addDestination = createAsyncThunk("admin/addDestination", async (data) => {
    try {
        const res = await axios.post("https://tajawal.onrender.com/admin/destination/add", data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});


//Getting the registred users from the database (Read)
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
    try {
        const res = await axios.get("https://tajawal.onrender.com/admin/users");
        return res.data;
    } catch (error) {
        console.log(error);
    }
});


//Deleting the user from the website (Delete)
export const deleteUser = createAsyncThunk("admin/deleteUser", async (email) => {
    try {
        const res = await axios.delete(`https://tajawal.onrender.com/admin/user/delete/${email}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});


//Update Admin profile (Update)
export const updateAdminProfile = createAsyncThunk("admin/updateAdminProfile",async (formData) => {
    const res = await axios.put(
      "https://tajawal.onrender.com/admin/profile/update",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    return res.data;
  }
);


//Updating the user profile (Update)
export const updateUser = createAsyncThunk("admin/updateUser", async (data) => {
    try {
        const res = await axios.put("https://tajawal.onrender.com/admin/user/update", data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});

const savedAdmin = localStorage.getItem("admin");

const initVal = {
    admin: savedAdmin ? JSON.parse(savedAdmin) : {},
    users: [],
    destinations: [],
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false
};

export const AdminSlice = createSlice({
    name: "admin",
    initialState: initVal,
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
            localStorage.setItem("admin", JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder


            .addCase(getAllDestinations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllDestinations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.destinations = action.payload || [];
            })
            .addCase(getAllDestinations.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(addDestination.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addDestination.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload ? action.payload.message : "";
            })
            .addCase(addDestination.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(deleteDestination.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteDestination.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deleteDestination.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload || [];
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(updateAdminProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAdminProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                if (action.payload) {
                    state.admin = action.payload.admin;
                    state.message = action.payload.message;
                    localStorage.setItem("admin", JSON.stringify(action.payload.admin));
                }
            })
            .addCase(updateAdminProfile.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(updateUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export const { setAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;
