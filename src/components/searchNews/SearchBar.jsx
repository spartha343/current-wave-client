import useSearchNews from "../../hooks/searchNews/useSearchNews";

// eslint-disable-next-line react/prop-types
const SearchBar = () => {
  const { setSearchedNews } = useSearchNews();
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.searchText.value;
    fetch(
      `https://current-wave-server.vercel.app/search-news/${searchText}`
    ).then((res) =>
      res.json().then((data) => {
        setSearchedNews(data);
        form.reset();
      })
    );
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-center items-end mt-5 mb-10"
    >
      <label className="form-control w-full max-w-lg mr-4">
        <div className="label">
          <span className="label-text">What are you looking for?</span>
        </div>
        <input
          name="searchText"
          type="text"
          placeholder="Search here"
          className="input input-bordered w-full max-w-lg"
          required
        />
      </label>
      <input
        type="submit"
        value="Search"
        className="btn btn-active btn-ghost"
      />
    </form>
  );
};

export default SearchBar;
