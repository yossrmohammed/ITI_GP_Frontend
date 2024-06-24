import {axiosInstance} from "/src/axios";

export const getReadPrescriptions = (doctorId) => {
    return axiosInstance.get(`doctors/${doctorId}/prescriptions/read`);
};

export const getUnReadPrescriptions = (doctorId) => {
    return axiosInstance.get(`doctors/${doctorId}/prescriptions/unread`);
  };

export const replyToPrescription = (prescriptionId, description) => {
    return axiosInstance.post(`doctors/prescriptions/${prescriptionId}/reply`, description, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };