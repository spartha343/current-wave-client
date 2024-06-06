import SingleNews from "../allNews/SingleNews";

// eslint-disable-next-line react/prop-types
const SearchResults = ({ searchResult }) => {
  return (
    <div className="m-10 bg-base-200 p-10 rounded-3xl">
      <div>
        <h3 className="text-center text-3xl mb-8">Search results</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {
          // eslint-disable-next-line react/prop-types
          searchResult?.map((singleNews) => (
            <SingleNews key={singleNews._id} singleNews={singleNews} />
          ))
        }
      </div>
    </div>
  );
};

export default SearchResults;
