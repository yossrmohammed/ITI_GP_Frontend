import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";


export const getHospitalICUs = createAsyncThunk("ICUs/getICUs", async (hospitalId) => {
    const response = await axiosInstance.get(`/intensive-care-units/${hospitalId}`);
    return response.data.data;
});


export const addICU = createAsyncThunk("ICUs/addICU", async (data) => {
    const response = await axiosInstance.post("/intensive-care-units", data);
    
    return response.data;
});

export const updateICU = createAsyncThunk("ICUs/updateICU", async ({ id, data }) => {
    const response = await axiosInstance.put(`/intensive-care-units/${id}`, data);
    return response.data;
});


export const deleteICU = createAsyncThunk("ICUs/deleteICU", async (id) => {
    await axiosInstance.delete(`/intensive-care-units/${id}`);
    return id;
});

const HospitalSlice = createSlice({
    name: "ICUs",
    initialState: {
        ICUs: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHospitalICUs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHospitalICUs.fulfilled, (state, action) => {
                state.ICUs = action.payload;
                state.isLoading = false;
            })
            .addCase(getHospitalICUs.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addICU.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addICU.fulfilled, (state, action) => {
                state.ICUs.push(action.payload);
                state.isLoading = false;
            })
            .addCase(addICU.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateICU.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateICU.fulfilled, (state, action) => {
                const index = state.ICUs.findIndex(icu => icu.id === action.payload.id);
                if (index !== -1) {
                    state.ICUs[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updateICU.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteICU.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteICU.fulfilled, (state, action) => {
                state.ICUs = state.ICUs.filter(icu => icu.id !== action.payload);
                state.isLoading = false;
            })
            .addCase(deleteICU.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default HospitalSlice.reducer;
