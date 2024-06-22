import { Link, NavLink } from "react-router-dom";
import Loading from "./Loading";
import useAuthInfo from "../hooks/authInfo/useAuthInfo";
import useNewsCategories from "../hooks/newsCategories/useNewsCategories";
import { GiStaticWaves } from "react-icons/gi";

const Navbar = () => {
  const { categories, isLoading } = useNewsCategories();

  const { signTheUserOut, user } = useAuthInfo();
  const handleSignOut = () => {
    signTheUserOut()
      .then(() => {
        localStorage.removeItem("token");
      })
      .catch((error) => console.log(error));
  };

  const navItems = (
    <>
      {categories?.map(({ _id, categoryName, categoryId }) => (
        <li key={_id}>
          <NavLink to={`/categories/${categoryId}`}>{categoryName}</NavLink>
        </li>
      ))}
    </>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl hidden md:flex">
          <GiStaticWaves />
          Current Wave
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <Link to="/dashboard/user-profile" className="btn mr-3">
              Dashboard
            </Link>
            <button onClick={handleSignOut} className="btn">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="btn mr-2">
              Sign In
            </Link>
            <Link to="/sign-up" className="btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
