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
import { Link } from "react-router-dom";
import PatientPage from "./src/pages/Patient/PatientPage";

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
                path: '/icu/:id',
                element: <div>test</div>
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
            {
                path: '/nurse/profile',
                element: <NurseProfile/>,
            },
            {
                path: '/nurse/appointments',
                element: <NurseAppointments/>,
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
            {
                path:'/hospital',
                element: <HospitalICUs/>
            },
            {
                path:'/application',
                element:<Applications/>
            },
            {
                path: '/patient/profile',
                element: <PatientProfile/>
            },
            {
                path: '/patient/appointments',
                element: <PatientAppointments/>
            },
            {
                path: '/patient/:id',
                element: <PatientPage/>
            },
        ]
    },
    {
        path: '*',
        element:  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
        <div className="text-center">
            <p className="text-3xl font-bold mb-4">404</p>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link to={"/"} className="px-4 py-2 rounded-md btn btn-info ">
                Go Home
            </Link>
        </div>
    </div>
    }
])

