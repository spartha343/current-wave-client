import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SingleNews from "../../components/allNews/SingleNews";
import Loading from "../../components/Loading";
import useSearchNews from "../../hooks/searchNews/useSearchNews";
import { useEffect } from "react";

const AllNews = () => {
  const { searchedNews, setSearchedNews } = useSearchNews();

  let { id } = useParams();
  if (!id) {
    id = 0;
  }

  const { data: categoryNews, isLoading } = useQuery({
    queryKey: ["categoryNews", id],
    queryFn: () =>
      fetch(`https://current-wave-server.vercel.app/categories/${id}`).then(
        (res) => {
          return res.json();
        }
      )
  });

  useEffect(() => {
    setSearchedNews([]);
  }, [setSearchedNews, categoryNews]);

  if (isLoading) {
    return <Loading />;
  }
  if (searchedNews.length) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-10">
      {categoryNews?.length &&
        categoryNews?.map((singleNews) => (
          <SingleNews key={singleNews._id} singleNews={singleNews} />
        ))}
    </div>
  );
};

export default AllNews;
