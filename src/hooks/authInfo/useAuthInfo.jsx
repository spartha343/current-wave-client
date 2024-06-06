import { useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";

const useAuthInfo = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};

export default useAuthInfo;
