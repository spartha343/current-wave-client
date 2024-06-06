import useGetMongoUserByFuid from "../../hooks/getMongoUserByFuid/useGetMongoUserByFuid";

const UserProfile = () => {
  const { data } = useGetMongoUserByFuid();
  const { userEmail, userImg, userName } = data || {};
  return (
    <div className="flex items-center gap-10">
      {userImg && (
        <div className="avatar">
          <div className="max-w-[20vw] mask mask-squircle">
            <img src={userImg} />
          </div>
        </div>
      )}
      <div>
        {userName && <p className="text-3xl font-light">Name: {userName}</p>}
        {userEmail && <p className="text-3xl font-light">Email: {userEmail}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
