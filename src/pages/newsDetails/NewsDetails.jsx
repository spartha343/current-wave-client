import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import useGetSingleNewsById from "../../hooks/getSingleNewsById/useGetSingleNewsById";

const NewsDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { data: singleNews, isLoading } = useGetSingleNewsById(id);

  const handleDeleteNews = (id, categoryId) => {
    fetch(`https://current-wave-server.vercel.app/delete-news/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          navigate(`/categories/${categoryId}`);
        }
      });
  };

  const {
    categoryId,
    _id,
    newsBody,
    // date,
    // categoryId,
    newsImg,
    newsTitle
    // userId,
    // userImg,
    // userName
  } = singleNews;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="card bg-base-100 shadow-xl m-10 ">
      <figure className="px-10 pt-10">
        <img src={newsImg} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{newsTitle}</h2>
        <p>{newsBody}</p>
        <div className="card-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <Link to={`/dashboard/update-news/${_id}`}>
            <button className="btn btn-secondary btn-sm">Update</button>
          </Link>
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleDeleteNews(_id, categoryId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
