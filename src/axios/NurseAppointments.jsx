import {axiosInstance} from "/src/axios";

export const getNurseAppointments = (nurseId , params) => {
    return axiosInstance.get(`nurses/${nurseId}/appointments` , {params});
};

export const ApproveNurseAppointments = (appointmentId, status) => {
    return axiosInstance.post(`/nurses/appointments/${appointmentId}/approve`, status, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
};

export const AddNoteToNurseAppointments = (appointmentId, note) => {
    return axiosInstance.post(`/nurses/appointments/${appointmentId}/add-notes`, note, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
};