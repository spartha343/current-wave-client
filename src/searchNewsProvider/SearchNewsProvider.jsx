import { createContext, useState } from "react";

export const NewsContext = createContext(null);

// eslint-disable-next-line react/prop-types
const SearchNewsProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState(null);
  const value = { searchResult, setSearchResult };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export default SearchNewsProvider;
