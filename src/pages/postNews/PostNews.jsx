import Loading from "../../components/Loading";
import useNewsCategories from "../../hooks/newsCategories/useNewsCategories";
import { useNavigate } from "react-router-dom";
import useGetMongoUserByFuid from "../../hooks/getMongoUserByFuid/useGetMongoUserByFuid";

const PostNews = () => {
  const { categories, isLoading } = useNewsCategories();
  const navigate = useNavigate();

  const { data } = useGetMongoUserByFuid();

  if (isLoading) {
    return <Loading />;
  }

  const handlePost = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryId = parseInt(form.category.value);
    const newsTitle = form.newsTitle.value;
    const newsBody = form.newsBody.value;
    const { _id, userName, userImg } = data;
    const fileField = form.newsImg;
    const formData = new FormData();
    formData.append("image", fileField.files[0]);
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_KEY}`,
      {
        method: "POST",
        body: formData
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const { display_url } = data.data;
        console.log(display_url);
        const date = new Date().getTime();
        const newsData = {
          newsImg: display_url,
          userId: _id,
          userName,
          userImg,
          categoryId,
          newsTitle,
          newsBody,
          date
        };
        fetch("https://current-wave-server.vercel.app/post-news", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(newsData)
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              navigate(`/categories/${categoryId}`);
            }
          });
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="card  w-full max-w-lg shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handlePost}>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Select the news category</span>
              </div>
              <select name="category" className="select select-bordered">
                {categories.map(({ _id, categoryId, categoryName }) => (
                  <option key={_id} value={categoryId}>
                    {categoryName}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-control">
              <label className="label">
                <span className="label-text">News Title</span>
              </label>
              <input
                type="text"
                placeholder="newsTitle"
                name="newsTitle"
                className="input input-bordered"
                required
              />
            </div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">News Body</span>
              </div>
              <textarea
                name="newsBody"
                className="textarea textarea-bordered h-24"
                placeholder="News Body"
              ></textarea>
            </label>
            <div className="form-control">
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  <span className="label-text">News Image</span>
                </div>
                <input
                  type="file"
                  name="newsImg"
                  className="file-input file-input-bordered w-full max-w-lg"
                />
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Post Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostNews;
