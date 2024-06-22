import {axiosInstance} from "/src/axios";

export const getDoctorById = (doctorId) => {
  return axiosInstance.get(`doctors/${doctorId}`);
};
export const updateDoctorById = (doctorId, updatedDoctorData) => {
  console.log("From updateDoctorById Axios", updatedDoctorData);
  return axiosInstance.patch(`doctors/${doctorId}`, updatedDoctorData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};