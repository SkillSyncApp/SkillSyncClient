import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Discover from "../views/discover/Discover";
import Login from "../views/login/Login";
import Inbox from "../views/inbox/Inbox";
import Profile from "../views/profile/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // TODO: implement error page
        errorElement: <div>error</div>,
        children: [
            { path: '/', element: <Discover /> },
            { path: '/inbox', element: <Inbox/> },
            { path: '/profile', element: <Profile/> },
        ]
    },
    {
        path: "/login",
        element: <Login/>
    }
]);