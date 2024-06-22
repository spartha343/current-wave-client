import { Link } from "react-router-dom";
import useGetMongoUserByFuid from "../../hooks/getMongoUserByFuid/useGetMongoUserByFuid";

const UserProfile = () => {
  const { data } = useGetMongoUserByFuid();
  const { userEmail, userImg, userName, fUserId } = data || {};

  return (
    <div className="flex flex-col md:flex-row items-center gap-10">
      {userImg && (
        <div className="avatar">
          <div className="max-w-[20vw] mask mask-squircle">
            <img src={userImg} />
          </div>
        </div>
      )}
      <div>
        {userName && <p className="text-3xl font-light">{userName}</p>}
        {userEmail && <p className="text-3xl font-light">{userEmail}</p>}
        <Link to={`/dashboard/update-user-profile/${fUserId}`}>
          <button className="btn btn-outline w-full mt-5">
            Update Your Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
