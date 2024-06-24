import {axiosInstance} from "/src/axios";

export const getNurseById = (nurseId) => {
  return axiosInstance.get(`nurses/${nurseId}`);
};
export const updateNurseById = (nurseId, updatedNurseData) => {
  console.log("From updateNurseById Axios", updatedNurseData);
  return axiosInstance.post(`nurses/${nurseId}`, updatedNurseData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};