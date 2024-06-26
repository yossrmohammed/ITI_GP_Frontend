import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";
import { getAllPatientAppointments } from "../../store/slices/AppointmentSlice";
import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { CircularProgress } from "@mui/material";
import { FaCalendarAlt } from "react-icons/fa"; // Example icon
import { useNavigate } from "react-router-dom";


export default function PatientAppointments() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { appointments, isLoading } = useSelector((state) => state.appointments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState("Doctor");
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
    <div className="h-auto min-h-96">
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
              <th className="w-1/6">{type == "Doctor" ? "Doctor" : "Nurse"}</th>
              <th className="w-1/6">Kind of Visit</th>
              <th className="w-1/6">Day</th>
              <th className="w-1/6">Date</th>
              <th className="w-1/6">Status</th>
              <th className="w-1/6">Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.appointments.map((appointment) => (
              <tr key={appointment.id} className="bg-base-200 hover:bg-base-300">
                <td>{appointment.name}</td>
                <td>{appointment.kind_of_visit ? appointment.kind_of_visit : "clinic"}</td>
                <td>{appointment.day}</td>
                <td>{appointment.date}</td>
                <td>{appointment.status}</td>
                <td>{appointment.notes}</td>
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
    </div>
  );
}
