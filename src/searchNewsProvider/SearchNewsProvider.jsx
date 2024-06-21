import { createContext, useState } from "react";

export const SearchNewsContext = createContext([]);

// eslint-disable-next-line react/prop-types
const SearchNewsProvider = ({ children }) => {
  const [searchedNews, setSearchedNews] = useState([]);
  return (
    <SearchNewsContext.Provider value={{ searchedNews, setSearchedNews }}>
      {children}
    </SearchNewsContext.Provider>
  );
};

export default SearchNewsProvider;
