import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Discover from "../views/discover/Discover";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // TODO: implement error page
        errorElement: <div>error</div>,
        children: [
            { path: '/inbox', element: <div>inbox</div> },
            { path: '/', element: <Discover /> }
        ]
    },
]);