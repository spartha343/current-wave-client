import axiosInstance from "../../axios/axiosInstance";
import useAuthInfo from "../authInfo/useAuthInfo";

const useGetUserByMongoId = () => {
  const { user } = useAuthInfo();
  return async (id) => {
    const res = await axiosInstance
      .post(
        `/users/${id}`,
        { fUserId: user.uid },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
      .then((data) => data.data);
    return res;
  };
};

export default useGetUserByMongoId;
