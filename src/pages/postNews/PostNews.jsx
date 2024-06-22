import Loading from "../../components/Loading";
import useNewsCategories from "../../hooks/newsCategories/useNewsCategories";
import { useNavigate } from "react-router-dom";
import useGetMongoUserByFuid from "../../hooks/getMongoUserByFuid/useGetMongoUserByFuid";
import Swal from "sweetalert2";
import axiosInstance from "../../axios/axiosInstance";
import { SiPostmates } from "react-icons/si";

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
    const { _id, userName, userImg, fUserId } = data;
    const fileField = form.newsImg;
    const formData = new FormData();
    formData.append("file", fileField.files[0]);
    const metadata = JSON.stringify({
      name: "File name"
    });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({
      cidVersion: 0
    });
    formData.append("pinataOptions", options);
    fetch(`https://api.pinata.cloud/pinning/pinFileToIPFS`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_API_KEY_JWT}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const date = new Date().getTime();
        const newsData = {
          newsImg: `${import.meta.env.VITE_PINATA_GATEWAY_URL}/ipfs/${
            data.IpfsHash
          }`,
          userId: _id,
          userName,
          userImg,
          categoryId,
          newsTitle,
          newsBody,
          date,
          fUserId
        };
        axiosInstance
          .post("/post-news", newsData, {
            headers: {
              "content-type": "application/json"
            }
          })
          .then((data) => {
            if (data.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "News Posted Successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate(`/categories/${categoryId}`);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
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
              <button className="btn btn-primary">
                <SiPostmates size={25} />
                Post Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostNews;
