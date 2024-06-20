import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from './src/pages/Home/Home';
import Navbar from "./src/components/Navbar/Navbar";
import Footer from "./src/components/Footer/Footer";
import Doctors from "./src/pages/Doctors/Doctors";
import Nurses from "./src/pages/Nurses/Nurses";

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
                path: '/nurses',
                element: <Nurses/>
            },
        ]
    },
    {
        path: '*',
        element: <div>Not Found</div>
    }
])

