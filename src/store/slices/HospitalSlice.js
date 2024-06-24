import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const getHospitalICUs = createAsyncThunk("ICUs/getICUs", async ({ hospitalId, page, itemsPerPage }) => {
    const response = await axiosInstance.get(`/intensive-care-units/${hospitalId}`, {
        params: { page, itemsPerPage }
    });
    return response.data;
});

export const addICU = createAsyncThunk("ICUs/addICU", async (data, { dispatch }) => {
    const response = await axiosInstance.post("/intensive-care-units", data);
    dispatch(getHospitalICUs({ hospitalId: data.hospital_id, page: 1, itemsPerPage: 5 })); // Dispatch refetch action
    return response.data;
});

export const updateICU = createAsyncThunk("ICUs/updateICU", async ({ id, data }, { dispatch }) => {
    const response = await axiosInstance.put(`/intensive-care-units/${id}`, data);
    dispatch(getHospitalICUs({ hospitalId: data.hospital_id, page: 1, itemsPerPage: 5 })); // Dispatch refetch action
    return response.data;
});

export const deleteICU = createAsyncThunk("ICUs/deleteICU", async ({ id, hospitalId, itemsPerPage }, { dispatch }) => {
    await axiosInstance.delete(`/intensive-care-units/${id}`);
    dispatch(getHospitalICUs({ hospitalId, page: 1, itemsPerPage })); // Dispatch refetch action
    return id;
});

const HospitalSlice = createSlice({
    name: "hospital",
    initialState: {
        hICUs: [],
        currentPage: 1,
        totalPages: 1,
        isLoading: false,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHospitalICUs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHospitalICUs.fulfilled, (state, action) => {
                state.hICUs = action.payload.data;
                state.currentPage = action.payload.current_page;
                state.totalPages = action.payload.last_page;
                state.isLoading = false;
            })
            .addCase(getHospitalICUs.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addICU.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addICU.fulfilled, (state, action) => {
                state.hICUs.push(action.payload);
                state.isLoading = false;
            })
            .addCase(addICU.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateICU.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateICU.fulfilled, (state, action) => {
                const index = state.hICUs.findIndex(icu => icu.id === action.payload.id);
                if (index !== -1) {
                    state.hICUs[index] = action.payload;
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
                state.hICUs = state.hICUs.filter(icu => icu.id !== action.payload);
                state.isLoading = false;
            })
            .addCase(deleteICU.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setCurrentPage } = HospitalSlice.actions;

export default HospitalSlice.reducer;
