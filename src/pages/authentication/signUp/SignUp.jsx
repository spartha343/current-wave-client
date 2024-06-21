import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthInfo from "../../../hooks/authInfo/useAuthInfo";
import useGoogleSignIn from "../../../hooks/googleSignIn/useGoogleSignIn";
import useStoreUserInDB from "../../../hooks/storeUserInDB/useStoreUserInDB";

const SignUp = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const googleSignIn = useGoogleSignIn();
  const storeUserInDB = useStoreUserInDB();

  const { signUpWithEmailAndPass, updateUserProfile } = useAuthInfo();
  const handleSignUpUsingEmailAndPass = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;

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

    signUpWithEmailAndPass(email, password)
      .then((result) => {
        const { uid } = result.user;
        fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_API_KEY_JWT}`
          }
        })
          .then((res) => res.json())
          .then((data) => {
            updateUserProfile({
              displayName: name,
              photoURL: `${import.meta.env.VITE_PINATA_GATEWAY_URL}/ipfs/${
                data.IpfsHash
              }`
            })
              .then(() => {
                storeUserInDB({
                  fUserId: uid,
                  userName: name,
                  userEmail: email,
                  userImg: `${import.meta.env.VITE_PINATA_GATEWAY_URL}/ipfs/${
                    data.IpfsHash
                  }`,
                  role: ""
                });
                navigate(from);
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="hero min-h-screen bg-base-200 py-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSignUpUsingEmailAndPass}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  <span className="label-text">Your Image</span>
                </div>
                <input
                  type="file"
                  name="image"
                  className="file-input file-input-bordered w-full max-w-lg"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link to="/sign-in" className="underline">
                  Already have an account ? Sign in
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Sign Up"
                className="btn btn-primary"
              />
            </div>
            <div className="divider"></div>
            <div className="form-control">
              <button
                type="button"
                className="btn btn-outline"
                onClick={googleSignIn}
              >
                Sign In With Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
