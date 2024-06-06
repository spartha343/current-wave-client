import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const AllUsers = () => {
  const {
    // data: users,
    // refetch,
    isLoading
  } = useQuery({
    queryKey: ["categoryNews"],
    queryFn: () =>
      fetch(`https://current-wave-server.vercel.app/users`).then((res) =>
        res.json()
      )
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <p>This is the all users component</p>
    </div>
  );
};

export default AllUsers;
