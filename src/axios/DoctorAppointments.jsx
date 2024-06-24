import {axiosInstance} from "/src/axios";

export const getDoctorAppointments = (doctorId , params) => {
    return axiosInstance.get(`doctors/${doctorId}/appointments` , {params});
};

export const ApproveDoctorAppointments = (appointmentId, status) => {
    return axiosInstance.post(`/doctors/appointments/${appointmentId}/approve`, status, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
};

export const AddNoteToDoctorAppointments = (appointmentId, note) => {
    return axiosInstance.post(`/doctors/appointments/${appointmentId}/add-notes`, note, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
};