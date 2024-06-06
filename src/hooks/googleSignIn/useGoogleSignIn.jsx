import { useLocation, useNavigate } from "react-router-dom";
import useAuthInfo from "../authInfo/useAuthInfo";
import useStoreUserInDB from "../storeUserInDB/useStoreUserInDB";

const useGoogleSignIn = () => {
  const { signInWithGoogle } = useAuthInfo();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const storeUserInDB = useStoreUserInDB();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        navigate(from, { replace: true });
        const { displayName, email, photoURL, uid } = result.user;
        storeUserInDB({
          fUserId: uid,
          userName: displayName,
          userEmail: email,
          userImg: photoURL,
          role: ""
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return handleGoogleSignIn;
};

export default useGoogleSignIn;
