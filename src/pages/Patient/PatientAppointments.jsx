import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/auth/authSlice"
import { getAllPatientAppointments } from "../../store/slices/AppointmentSlice"
import { useEffect, useState } from "react"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function PatientAppointments() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const { appointments, isLoading } = useSelector((state) => state.appointments)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    
    useEffect(() => {
        console.log(user);
        if (user) {
            dispatch(getAllPatientAppointments({ id: user.id, page, rowsPerPage }));
        }
      }, [user, page, rowsPerPage, dispatch])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    if (isLoading) {
        return <div>Loading..</div>
    }
    console.log("DATA", appointments);
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Doctor
                        </TableCell>
                        <TableCell>
                            Kind of Visit
                        </TableCell>
                        <TableCell>
                            Day
                        </TableCell>
                        <TableCell>
                            Status
                        </TableCell>
                        <TableCell>
                            Notes
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.appointments
                    .map((appointment) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={appointment.id}>
                            <TableCell>
                                {appointment.doctor_id}
                            </TableCell>
                            <TableCell>
                                {appointment.kind_of_visit}
                            </TableCell>
                            <TableCell>
                                {appointment.day}
                            </TableCell>
                            <TableCell>
                                {appointment.status}
                            </TableCell>
                            <TableCell>
                                {appointment.notes}
                            </TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={appointments.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
