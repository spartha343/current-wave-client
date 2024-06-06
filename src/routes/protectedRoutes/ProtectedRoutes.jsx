import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import useAuthInfo from "../../hooks/authInfo/useAuthInfo";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isLoading, user } = useAuthInfo();
  if (isLoading) {
    return <Loading />;
  } else if (!user) {
    return <Navigate to="/sign-up" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
