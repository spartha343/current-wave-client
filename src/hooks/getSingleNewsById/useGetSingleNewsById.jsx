import { useQuery } from "@tanstack/react-query";

const useGetSingleNewsById = (id) => {
  const data = useQuery({
    queryKey: ["categoryNews"],
    queryFn: () =>
      fetch(`https://current-wave.netlify.app/news-details/${id}`).then((res) =>
        res.json()
      )
  });
  return data;
};

export default useGetSingleNewsById;
