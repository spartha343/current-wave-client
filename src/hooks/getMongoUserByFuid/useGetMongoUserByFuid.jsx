import { useQuery } from "@tanstack/react-query";
import useAuthInfo from "../authInfo/useAuthInfo";

const useGetMongoUserByFuid = () => {
  const { user } = useAuthInfo();
  const data = useQuery({
    queryKey: ["mongoDB-User", user],
    queryFn: () =>
      fetch(`https://current-wave-server.vercel.app/users/${user.uid}`).then(
        (res) => res.json()
      )
  });

  return data;
};

export default useGetMongoUserByFuid;
