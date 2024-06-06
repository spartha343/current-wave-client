/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SingleNews = ({ singleNews }) => {
  //   const { newsBody, newsImg, newsTitle, userName, userImg, userId, date } =
  //     singleNews;
  // eslint-disable-next-line react/prop-types
  const { newsBody, newsImg, newsTitle, _id } = singleNews;

  return (
    <Link to={`/news-details/${_id}`}>
      <div className="card glass">
        <figure>
          <img src={newsImg} alt={newsTitle} className="h-56 w-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{newsTitle}</h2>
          <p>
            {newsBody?.length > 100 ? newsBody.slice(0, 100) + "..." : newsBody}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SingleNews;
