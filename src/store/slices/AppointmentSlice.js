import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

// Define the thunk with a single payload object
export const getAllPatientAppointments = createAsyncThunk(
  "appointments/getAll",
  async ({ id, page = 0, rowsPerPage = 1, type }, { rejectWithValue }) => {
    try {

      // Construct the query string based on parameters
      let queryString = `appointments?page=${page}&rowsPerPage=${rowsPerPage}`;
      if (type) {
        queryString += `&type=${type}`;
      }

      // Make the API call
      const response = await axiosInstance.get(`/patients/${id}/${queryString}`);
      
      // Return the response data
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle the error by rejecting the value
      return rejectWithValue(error.response.data);
    }
  }
);



const AppointmentSlice = createSlice({
    name: "appointments",
    initialState: {
        appointments: [],
        isLoading: true,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPatientAppointments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPatientAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.appointments = action.payload;
            })
            .addCase(getAllPatientAppointments.rejected, (state) => {
                state.isLoading = false;
            });
    },
}); 

export default AppointmentSlice.reducer