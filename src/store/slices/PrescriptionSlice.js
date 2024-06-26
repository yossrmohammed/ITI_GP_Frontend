import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

// Define the thunk with a single payload object
export const getAllPatientPrescriptions = createAsyncThunk(
  "prescriptions/getAll",
  async ({ id }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get(`/patients/${id}/prescription`);
      
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const PrescriptionSlice = createSlice({
    name: "prescriptions",
    initialState: {
        prescriptions: [],
        isLoading: true,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPatientPrescriptions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPatientPrescriptions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.prescriptions = action.payload;
            })
            .addCase(getAllPatientPrescriptions.rejected, (state) => {
                state.isLoading = false;
            });
    },
}); 

export default PrescriptionSlice.reducer