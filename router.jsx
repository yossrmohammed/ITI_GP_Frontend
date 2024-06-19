import { createBrowserRouter } from "react-router-dom";
import Home from './src/pages/Home/Home';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>, 
    },
    {
        path: '*',
        element: <div>Not Found</div>
    }
])

