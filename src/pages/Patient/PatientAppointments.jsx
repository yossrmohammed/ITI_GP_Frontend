import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";
import { getAllPatientAppointments } from "../../store/slices/AppointmentSlice";
import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { CircularProgress } from "@mui/material";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa"; // Added FaCheckCircle for reviewed state
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Rating } from '@mui/material'; // For modal
import { axiosInstance } from "../../axios";
import Swal from "sweetalert2";

export default function PatientAppointments() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { appointments, isLoading } = useSelector((state) => state.appointments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState("Doctor");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(getAllPatientAppointments({ id: user.id, page, rowsPerPage, type }));
    }
  }, [user, page, rowsPerPage, type, dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'cancelled':
        return { color: 'oklch(var(--er))' };
      case 'accepted':
        return { color: 'oklch(var(--su))' };
      case 'pending':
        return { color: 'oklch(var(--wa))' };
      default:
        return {};
    }
  };

  const handleOpenReviewModal = (appointment) => {
    setSelectedAppointment(appointment);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
    setSelectedAppointment(null);
    setRating(0);
    setReviewDescription("");
  };

  const handleSubmitReview = async () => {
    try {
      // Determine the endpoint based on whether the appointment is with a doctor or a nurse
      const reviewEndpoint = selectedAppointment.doctor_id
        ? `patients/${user.id}/reviews/doctors`
        : `patients/${user.id}/reviews/nurses`;
  
      // Submit the review
      await axiosInstance.post(reviewEndpoint, {
        appointment_id: selectedAppointment.id,
        rating,
        review: reviewDescription,
        patient_id: user.id,
        medic_id: selectedAppointment.doctor_id || selectedAppointment.nurse_id,
      });
  
      // Show a success message
      Swal.fire({
        icon: "success",
        text: "Review submitted successfully",
        showConfirmButton: true,
        timer: 1500,
      });
  
      // Close the review modal
      handleCloseReviewModal();
  
      // Refresh the appointments list
      dispatch(getAllPatientAppointments({ id: user.id, page, rowsPerPage, type }));
    } catch (error) {
      // Show an error message
      Swal.fire({
        icon: "error",
        text: "Review submission failed",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!appointments.total) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="w-48 mb-4">
          <select
            className="select select-bordered w-full"
            value={type}
            onChange={handleChangeType}
          >
            <option value="Doctor">Doctors</option>
            <option value="Nurse">Nurses</option>
          </select>
        </div>
        <FaCalendarAlt size={60} className="text-gray-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Appointments</h2>
        <p className="text-gray-600 mb-4">You currently have no appointments scheduled.</p>
        <button className="btn btn-info" onClick={() => navigate('/doctors')}>Schedule Appointment</button>
      </div>
    );
  }

  return (
    <div className="h-auto min-h-96 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <div className="w-48">
          <select
            className="select select-bordered w-full"
            value={type}
            onChange={handleChangeType}
          >
            <option value="Doctor">Doctors</option>
            <option value="Nurse">Nurses</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-fixed w-full">
          <thead>
            <tr>
              <th className="w-1/7">{type === "Doctor" ? "Doctor" : "Nurse"}</th>
              <th className="w-1/7">Kind of Visit</th>
              <th className="w-1/7">Day</th>
              <th className="w-1/7">Date</th>
              <th className="w-1/7">Status</th>
              <th className="w-1/7">Notes</th>
              <th className="w-1/7">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {appointments.appointments.map((appointment) => (
              <tr key={appointment.id} className="bg-base-200 hover:bg-base-300">
                <td>{appointment.name}</td>
                <td className="capitalize">{appointment.kind_of_visit ? appointment.kind_of_visit : "clinic"}</td>
                <td>{appointment.day}</td>
                <td>{appointment.date}</td>
                <td style={{ ...getStatusStyle(appointment.status), textTransform: 'capitalize' }}>
                  {appointment.status}
                </td>
                <td>{appointment.notes}</td>
                <td>
                  {appointment.is_reviewed ? (
                    <span className="text-green-500 flex items-center">
                      <FaCheckCircle className="mr-2" /> Reviewed
                    </span>
                  ) : (
                    <button className="btn btn-info" onClick={() => handleOpenReviewModal(appointment)}>
                      Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        sx={{
          backgroundColor: "oklch(var(--b2))",
          "& .MuiTablePagination-toolbar": {
            color: "var(--fallback-bc,oklch(var(--bc)/1))",
            overflow: "auto",
            fontSize: "0.875rem",
          },
          "& .MuiTablePagination-selectLabel": {
            color: "var(--fallback-bc,oklch(var(--bc)/1))",
            fontSize: "0.875rem",
          },
          "& .MuiTablePagination-input": {
            color: "var(--fallback-bc,oklch(var(--bc)/1))",
            fontSize: "0.875rem",
          },
          "& .MuiTablePagination-select": {
            color: "var(--fallback-bc,oklch(var(--bc)/1))",
            fontSize: "0.875rem",
          },
          "& .MuiTablePagination-actions": {
            color: "var(--fallback-bc,oklch(var(--bc)/1))",
            fontSize: "0.875rem",
          },
        }}
        className="mt-4"
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={appointments.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for reviewing appointment */}
      <Dialog open={reviewModalOpen} onClose={handleCloseReviewModal} maxWidth="sm" fullWidth>
        <DialogTitle>Review Appointment</DialogTitle>
        <DialogContent>
          <div className="flex flex-col space-y-4">
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <TextField
              label="Review Description"
              multiline
              rows={4}
              value={reviewDescription}
              onChange={(event) => setReviewDescription(event.target.value)}
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitReview} color="primary">
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
