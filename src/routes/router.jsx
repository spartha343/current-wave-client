import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/MainLayout";
import AllNews from "../pages/allNews/AllNews";
import NewsDetails from "../pages/newsDetails/NewsDetails";
import SignUp from "../pages/authentication/signUp/SignUp";
import SignIn from "../pages/authentication/signIn/SignIn";
import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import UserProfile from "../pages/userProfile/UserProfile";
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";
import AllUsers from "../pages/allUsers/AllUsers";
import PostNews from "../pages/postNews/PostNews";
import UpdateNews from "../pages/updateNews/UpdateNews";
import UpdateUserProfile from "../pages/updateUserProfile/UpdateUserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // todo handle unmatched routes
    children: [
      {
        index: true,
        element: <AllNews />
      },
      {
        path: "/categories/:id",
        element: <AllNews />
      },
      {
        path: "/news-details/:id",
        element: <NewsDetails />
      }
    ]
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />,
      </ProtectedRoute>
    ),
    children: [
      {
        path: "user-profile",
        element: <UserProfile />
      },
      {
        path: "update-user-profile/:id",
        element: <UpdateUserProfile />
      },
      {
        path: "all-users",
        element: <AllUsers />
      },
      {
        path: "post-news",
        element: <PostNews />
      },
      {
        path: "update-news/:id",
        element: <UpdateNews />
      }
    ]
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/sign-in",
    element: <SignIn />
  }
]);

export default router;
