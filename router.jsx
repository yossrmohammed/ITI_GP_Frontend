import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from './src/pages/Home/Home';
import Register from './src/pages/Register/Resgister';
import Login from './src/pages/Login/Login';
import Navbar from "./src/components/Navbar/Navbar";
import Footer from "./src/components/Footer/Footer";
import Doctors from "./src/pages/Doctors/Doctors";
import ICUs from "./src/pages/ICUs/ICUs";
import Nurses from "./src/pages/Nurses/Nurses";
import MedicPage from "./src/pages/MedicPage/MedicPage";

import DoctorProfile from "/src/pages/Doctors/DoctorProfile"
import ReadPrescriptions from "/src/pages/Doctors/Prescriptions/ReadPrescriptions"
import UnReadPrescriptions from "/src/pages/Doctors/Prescriptions/UnReadPrescriptions"
import DoctorAppointments from "/src/pages/Doctors/Appointments"

import NurseProfile from "/src/pages/Nurses/NurseProfile"
import NurseAppointments from "/src/pages/Nurses/Appointments"

import Verify from "./src/pages/Verify/Verify";
import ResetPassword from "./src/pages/ResetPassword/ResetPassword";
import HospitalICUs from "./src/pages/Hospital/HospitalICUs";
import Applications from "./src/pages/Hospital/Applications";
import PatientProfile from "./src/pages/Patient/PatientProfile";
import PayPal from "./src/pages/PayPal/PayPal";
import PatientAppointments from "./src/pages/Patient/PatientAppointments";
import  Dashboard from "./src/components/Dashboard/Dashboard";
import PatientPage from "./src/pages/Patient/PatientPage";
import { useSelector } from "react-redux";
import NotFound from "./src/pages/NotFound/NotFound";
import NotAuthorized from "./src/pages/NotAuthorized/NotAuthorized";
import PatientPrescriptions from "./src/pages/Patient/PatientPrescriptions";


function Styled() 
{
    return(
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    );
}

function PatientLayout()
{
    const loggedUser = useSelector((state) => state.auth.user);

    if (!loggedUser || loggedUser.role !== 'patient')
    {
        return <NotAuthorized/>
    }

    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    );
}

function DoctorLayout()
{
    const loggedUser = useSelector((state) => state.auth.user);

    if (!loggedUser || loggedUser.role !== 'doctor')
    {
        return <NotAuthorized/>;     
    }

    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>       
    );
}

function NurseLayout()
{
    const loggedUser = useSelector((state) => state.auth.user);

    if (!loggedUser || loggedUser.role !== 'nurse')
    {
        return <NotAuthorized/>;     
    }

    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>       
    );
}

function HospitalLayout()
{
    const loggedUser = useSelector((state) => state.auth.user);

    if (!loggedUser || loggedUser?.user?.role !== 'hospital')
    {
        return <NotAuthorized/>;     
    }

    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>       
    );
}

function MedicLayout()
{
    const loggedUser = useSelector((state) => state.auth.user);

    if (!loggedUser || (loggedUser.role !== 'doctor' && loggedUser.role !== 'nurse'))
    {
        return <NotAuthorized/>;     
    }

    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>       
    );   
}

function AdminLayout()
{
    const loggedUser = useSelector((state) => state.auth.user);

    if (!loggedUser || loggedUser.role !== 'admin')
    {
        return <NotAuthorized/>;     
    }

    return (
        <>
        <Navbar />
        <Outlet />
        </>       
    );      
}

export const router = createBrowserRouter([
    {
        element: <Styled/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/doctors',
                element: <Doctors/>,
            },
            {
                path: '/doctors/home-visit',
                element: <Doctors home={true}/>,
            },
            {
                path: '/icu',
                element: <ICUs/>
            },
            {
                path: '/nurses',
                element: <Nurses/>,
            },
            {
                path: '/user/:role/:id',
                element: <MedicPage/>,
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/checkout',
                element: <PayPal/>
            },
            {
                path: '/verify',
                element: <Verify/>
            },
            {
                path: '/reset',
                element: <ResetPassword/>
            },
        ]
    },
    {
        element: <PatientLayout/>,
        children: [
            {
                path: '/patient/profile',
                element: <PatientProfile/>
            },
            {
                path: '/patient/appointments',
                element: <PatientAppointments/>
            },
            {
                path: '/patient/prescriptions',
                element: <PatientPrescriptions/>
            }
        ]
    },
    {
        element: <DoctorLayout/>,
        children: [
            {
                path: '/doctor/profile',
                element: <DoctorProfile/>,
            },
            {
                path: '/doctor/prescriptions/read',
                element: <ReadPrescriptions/>,
            },
            {
                path: '/doctor/prescriptions/unread',
                element: <UnReadPrescriptions/>,
            },
            {
                path: '/doctor/appointments',
                element: <DoctorAppointments/>,
            },
        ]
    }, 
    {
        element: <NurseLayout/>,
        children: [
            {
                path: '/nurse/profile',
                element: <NurseProfile/>,
            },
            {
                path: '/nurse/appointments',
                element: <NurseAppointments/>,
            },
        ]
    },
    {
        element: <HospitalLayout/>,
        children: [
            {
                path:'/hospital',
                element: <HospitalICUs/>
            },
            {
                path:'/application',
                element:<Applications/>
            },
        ]
    },
    {
        element: <MedicLayout/>,
        children: [
            {
                path: '/patient/:id',
                element: <PatientPage/>
            },           
        ]
    },
    {
        element: <AdminLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
        ]
    },
    {
        path: '*',
        element:  <NotFound/>
    }
])

