import { useContext } from "react";
import { SearchNewsContext } from "../../searchNewsProvider/SearchNewsProvider";

const useSearchNews = () => {
  const { searchedNews, setSearchedNews } = useContext(SearchNewsContext);
  return { searchedNews, setSearchedNews };
};

export default useSearchNews;
