import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import useGetSingleNewsById from "../../hooks/getSingleNewsById/useGetSingleNewsById";
import { useEffect } from "react";
import useSearchNews from "../../hooks/searchNews/useSearchNews";
import { RiDeleteBin2Line } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";

const NewsDetails = () => {
  const { searchedNews, setSearchedNews } = useSearchNews();
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

  useEffect(() => {
    setSearchedNews([]);
  }, [setSearchedNews, id]);

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
  } = singleNews || {};

  if (isLoading) {
    return <Loading />;
  }
  if (searchedNews.length) {
    return <></>;
  }
  return (
    <div className="card bg-base-100 shadow-xl  md:m-10 ">
      <figure className="px-10 pt-10">
        <img src={newsImg} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{newsTitle}</h2>
        <p className="text-justify">{newsBody}</p>
        <div className="card-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate(-1)}
          >
            <IoChevronBackOutline />
            Go Back
          </button>
          <Link to={`/dashboard/update-news/${_id}`}>
            <button className="btn btn-secondary btn-sm">
              <GrDocumentUpdate />
              Update
            </button>
          </Link>
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleDeleteNews(_id, categoryId)}
          >
            <RiDeleteBin2Line />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
