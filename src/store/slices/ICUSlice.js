import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const getICUs = createAsyncThunk("ICUs/getICUs", async (address) => {
    const response = await axiosInstance.get("/intensive-care-units", {
        params: { address }
    });
    return response.data.data;
});

const ICUSlice = createSlice({
    name: "ICUs",
    initialState: {
        ICUs: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getICUs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getICUs.fulfilled, (state, action) => {
                state.ICUs = action.payload;
                state.isLoading = false;
            })
            .addCase(getICUs.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default ICUSlice.reducer;
