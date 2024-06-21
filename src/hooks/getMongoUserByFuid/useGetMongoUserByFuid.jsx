import { useQuery } from "@tanstack/react-query";
import useAuthInfo from "../authInfo/useAuthInfo";
import axiosInstance from "../../axios/axiosInstance";

const useGetMongoUserByFuid = () => {
  const { user } = useAuthInfo();
  const data = useQuery({
    queryKey: ["mongoDB-User", user],
    queryFn: () =>
      axiosInstance.get(`/users/${user.uid}`).then((res) => res.data)
  });

  return data;
};

export default useGetMongoUserByFuid;
