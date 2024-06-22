import { useNavigate, useParams } from "react-router-dom";
import useGetSingleNewsById from "../../hooks/getSingleNewsById/useGetSingleNewsById";
import Loading from "../../components/Loading";
import useNewsCategories from "../../hooks/newsCategories/useNewsCategories";
import axiosInstance from "../../axios/axiosInstance";
import Swal from "sweetalert2";

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
    // userImg,
    // userName
  } = singleNews ?? {};

  if (isLoading || isCategoriesLoading) {
    return <Loading />;
  }

  const handleUpdateNews = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryId = parseInt(form.category.value);
    const newsTitle = form.newsTitle.value;
    const newsBody = form.newsBody.value;
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
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedDoc = {
          // fUserId,
          categoryId,
          newsTitle,
          newsBody,
          newsImg: `${import.meta.env.VITE_PINATA_GATEWAY_URL}/ipfs/${
            data.IpfsHash
          }`
        };

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!"
        }).then((result) => {
          if (result.isConfirmed) {
            axiosInstance
              .patch(
                `https://current-wave-server.vercel.app/update-news/${_id}`,
                updatedDoc,
                {
                  headers: {
                    "content-type": "application/json"
                  }
                }
              )
              .then((data) => {
                if (data.data.matchedCount) {
                  Swal.fire({
                    title: "Updated!",
                    text: "Your file has been updated successfully.",
                    icon: "success"
                  });
                  navigate(`/categories/${data.categoryId}`);
                }
              });
          }
        });
      });
  };

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
