import { useNavigate, useParams } from "react-router-dom";
import useGetSingleNewsById from "../../hooks/getSingleNewsById/useGetSingleNewsById";
import Loading from "../../components/Loading";
import useNewsCategories from "../../hooks/newsCategories/useNewsCategories";

const UpdateNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: singleNews, isLoading } = useGetSingleNewsById(id);
  const { categories, isLoading: isCategoriesLoading } = useNewsCategories();

  const {
    _id,
    newsBody,
    // date,
    categoryId,
    // newsImg,
    newsTitle
    // userId,
    // userImg,
    // userName
  } = singleNews;

  const handleUpdateNews = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryId = parseInt(form.category.value);
    const newsTitle = form.newsTitle.value;
    const newsBody = form.newsBody.value;
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
        const updatedDoc = {
          categoryId,
          newsTitle,
          newsBody,
          newsImg: display_url
        };

        fetch(`https://current-wave-server.vercel.app/update-news/${_id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(updatedDoc)
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.matchedCount) {
              navigate(`/categories/${data.categoryId}`);
            }
          });
      });
  };

  if (isLoading || isCategoriesLoading) {
    return <Loading />;
  }

  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="card  w-full max-w-lg shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleUpdateNews}>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Select the news category</span>
              </div>
              <select
                name="category"
                defaultValue={categoryId}
                className="select select-bordered"
              >
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
                defaultValue={newsTitle}
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
                defaultValue={newsBody}
                className="textarea textarea-bordered h-24"
                placeholder="News Body"
                required
              ></textarea>
            </label>
            <div className="form-control">
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  <span className="label-text">News Image</span>
                </div>
                <input
                  required
                  type="file"
                  name="newsImg"
                  className="file-input file-input-bordered w-full max-w-lg"
                />
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Update Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateNews;
