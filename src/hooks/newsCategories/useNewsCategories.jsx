import { useQuery } from "@tanstack/react-query";

const useNewsCategories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("https://current-wave.netlify.app/categories").then((res) =>
        res.json()
      )
  });
  return { categories, isLoading };
};

export default useNewsCategories;
