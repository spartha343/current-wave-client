import { useContext } from "react";
import { NewsContext } from "../../searchNewsProvider/SearchNewsProvider";

const useSearchNews = () => {
  const data = useContext(NewsContext);
  return data;
};

export default useSearchNews;
