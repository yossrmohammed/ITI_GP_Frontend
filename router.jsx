import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from './src/pages/Home/Home';
import Navbar from "./src/components/Navbar/Navbar";
import Footer from "./src/components/Footer/Footer";
import Doctors from "./src/pages/Doctors/Doctors";
import ICUs from "./src/pages/ICUs/ICUs";
import Nurses from "./src/pages/Nurses/Nurses";
import HospitalICUs from "./src/pages/Hospital/HospitalICUs";
import Applications from "./src/pages/Hospital/Applications";

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
                path: '/icu/:id',
                element: <div>test</div>
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
                path:'/hospital',
                element: <HospitalICUs/>
            },
            {
                path:'/application',
                element:<Applications/>
            }

        ]
    },
    {
        path: '*',
        element: <div>Not Found</div>
    }
])

