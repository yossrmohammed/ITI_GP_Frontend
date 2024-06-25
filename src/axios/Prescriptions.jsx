import {axiosInstance} from "/src/axios";

export const getReadPrescriptions = (doctorId , params) => {
    return axiosInstance.get(`doctors/${doctorId}/prescriptions/read` , {params});
};

export const getUnReadPrescriptions = (doctorId , params) => {
    return axiosInstance.get(`doctors/${doctorId}/prescriptions/unread`, {params});
  };

export const replyToPrescription = (prescriptionId, description) => {
    return axiosInstance.post(`doctors/prescriptions/${prescriptionId}/reply`, description, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };