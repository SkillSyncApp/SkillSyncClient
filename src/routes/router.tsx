import { createBrowserRouter, redirect } from "react-router-dom";
import { getTokens } from "../services/authService";
import Dashboard from "../views/dashboard/Dashboard";
import Discover from "../views/discover/Discover";
import Inbox from "../views/inbox/Inbox";
import Login from "../views/login/Login";
import Profile from "../views/profile/Profile";
import Register from "../views/register/Register";
import LogInGoogle from "../views/additionalInfoGoogle/AdditionalInfo";
import { NotFound } from "../views/notFound/NotFound";

const authLoader = async () => {
  const tokens = getTokens();
  if (tokens.accessToken && tokens.refreshToken) {
    return null;
  }
  return redirect("/login");
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: authLoader,
    // TODO: implement error page
    errorElement: <div>error</div>,
    children: [
      { path: "/", element: <Discover /> },
      {
        path: "/inbox", element: <Inbox />, children: [
          { path: ":conversationId", element: <Inbox /> }
        ]
      },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logInGoogle",
    element: <LogInGoogle />
  },
  {
    path: "*",
    element: <NotFound/>
  },
]);
