import useSearchNews from "../../hooks/searchNews/useSearchNews";
import SingleNews from "../allNews/SingleNews";

const SearchResults = () => {
  const { searchedNews } = useSearchNews();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-10">
      {searchedNews?.length ? (
        searchedNews?.map((singleNews) => (
          <SingleNews key={singleNews._id} singleNews={singleNews} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchResults;
