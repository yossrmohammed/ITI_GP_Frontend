import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from './src/pages/Home/Home';
import Register from './src/pages/Register/Resgister';
import Login from './src/pages/Login/Login';
import Navbar from "./src/components/Navbar/Navbar";
import Footer from "./src/components/Footer/Footer";
import Doctors from "./src/pages/Doctors/Doctors";
import ICUs from "./src/pages/ICUs/ICUs";
import Nurses from "./src/pages/Nurses/Nurses";
import Verify from "./src/pages/Verify/Verify";
import ResetPassword from "./src/pages/ResetPassword/ResetPassword";

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
                element: <Doctors/>
            },
            {
                path: '/icu',
                element: <ICUs/>
            },
            {
                path: '/nurses',
                element: <Nurses/>
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
                path: '/verify',
                element: <Verify/>
            },
            ,
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

