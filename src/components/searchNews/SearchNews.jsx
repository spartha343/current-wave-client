import useSearchNews from "../../hooks/searchNews/useSearchNews";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const SearchNews = () => {
  const { searchResult, setSearchResult } = useSearchNews();
  return (
    <div>
      <SearchBar setSearchResult={setSearchResult} />
      {searchResult?.length ? (
        <SearchResults searchResult={searchResult} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchNews;
