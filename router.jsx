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
import Verify from "./src/pages/Verify/Verify";
import ResetPassword from "./src/pages/ResetPassword/ResetPassword";
import HospitalICUs from "./src/pages/Hospital/HospitalICUs";
import Applications from "./src/pages/Hospital/Applications";
import PayPal from "./src/pages/PayPal/PayPal";

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
        path: '*',
        element: <div>Not Found</div>
    }
])

