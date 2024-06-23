import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/auth/authSlice"
import { getAllPatientAppointments } from "../../store/slices/AppointmentSlice"
import { useEffect, useState } from "react"
import TablePagination from '@mui/material/TablePagination';

export default function PatientAppointments() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const { appointments, isLoading } = useSelector((state) => state.appointments)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [type, setType] = useState('All');
    
    useEffect(() => {
        console.log(user);
        if (user) {
            dispatch(getAllPatientAppointments({ id: user.id, page, rowsPerPage, type }));
        }
      }, [user, page, rowsPerPage, type, dispatch])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleChangeType = (event) => {
        console.log(event.target.value)
        setType(event.target.value)
    }

    if (isLoading) {
        return <div>Loading..</div>
    }
    return (
        <div className="h-auto min-h-96 bg-base-200">
            <select className="select select-bordered w-full max-w-xs bg-base-200" onChange={handleChangeType}>
                <option>All</option>
                <option>Doctors</option>
                <option>Nurses</option>
            </select>
            <div className="overflow-x-auto">
                <table className="table table-pin-rows bg-base-200">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Kind of Visit</th>
                            <th>Day</th>
                            <th>Status</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.appointments.map((appointment) => {
                            return(
                                <tr key={appointment.id} className="bg-base-200">
                                    <td>{appointment.doctor_id}</td>
                                    <td>{appointment.kind_of_visit}</td>
                                    <td>{appointment.day}</td>
                                    <td>{appointment.status}</td>
                                    <td>{appointment.notes}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <TablePagination
                sx={{
                    backgroundColor: 'oklch(var(--b2))',
                    '& .MuiTablePagination-toolbar': {
                        // Custom styles for the toolbar part
                        color: 'var(--fallback-bc,oklch(var(--bc)/1))',
                        overflow: 'auto',
                        fontSize: '0.875rem',
                    },
                    '& .MuiTablePagination-selectLabel': {
                        // Custom styles for the label part
                        color: 'var(--fallback-bc,oklch(var(--bc)/1))',
                        fontSize: '0.875rem',
                    },
                    '& .MuiTablePagination-input': {
                        // Custom styles for the select input part
                        color: 'var(--fallback-bc,oklch(var(--bc)/1))',
                        fontSize: '0.875rem',
                    },
                    '& .MuiTablePagination-select': {
                        // Custom styles for the select part
                        color: 'var(--fallback-bc,oklch(var(--bc)/1))',
                        fontSize: '0.875rem',
                    },
                    '& .MuiTablePagination-actions': {
                        // Custom styles for the actions part
                        color: 'var(--fallback-bc,oklch(var(--bc)/1))',
                        fontSize: '0.875rem',
                    },
                }}
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={appointments.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}
