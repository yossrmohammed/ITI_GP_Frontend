import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const getICUs = createAsyncThunk("ICUs/getICUs", async ({ address, page, itemsPerPage }) => {
    const response = await axiosInstance.get("/icus", {
        params: { address, page, itemsPerPage }
    });
    return response.data;
});

const ICUSlice = createSlice({
    name: "ICUs",
    initialState: {
        ICUs: [],
        isLoading: false,
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 5,
    },
    reducers: {
        setItemsPerPage: (state, action) => {
            state.itemsPerPage = action.payload;
            state.currentPage = 1; // Reset to first page on items per page change
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getICUs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getICUs.fulfilled, (state, action) => {
                state.ICUs = action.payload.data;
                state.currentPage = action.payload.current_page;
                state.totalPages = action.payload.last_page;
                state.isLoading = false;
            })
            .addCase(getICUs.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setItemsPerPage } = ICUSlice.actions;

export default ICUSlice.reducer;
