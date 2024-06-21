import { useNavigate, useParams } from "react-router-dom";
import useGetMongoUserByFuid from "../../hooks/getMongoUserByFuid/useGetMongoUserByFuid";
import Swal from "sweetalert2";
import axiosInstance from "../../axios/axiosInstance";

const UpdateUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetMongoUserByFuid();
  const { userEmail, userName } = data || {};

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    const fileField = form.image;
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
        const updatedDoc = {
          userImg: `${import.meta.env.VITE_PINATA_GATEWAY_URL}/ipfs/${
            data.IpfsHash
          }`,
          userName: name
        };
        axiosInstance
          .patch(`/update-user-profile/${id}`, updatedDoc, {
            headers: {
              "content-type": "application/json"
            }
          })
          .then((data) => {
            if (data?.data?.modifiedCount) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile Updated Succesfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate("/dashboard/user-profile");
            }
          });
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="card  w-full max-w-lg shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleUpdateProfile}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                defaultValue={userName}
                placeholder="Full Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  defaultValue={userEmail}
                  disabled
                  required
                  type="email"
                  name="email"
                  className="file-input file-input-bordered w-full max-w-lg"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  <span className="label-text">Profile Image</span>
                </div>
                <input
                  required
                  type="file"
                  name="image"
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

export default UpdateUserProfile;
