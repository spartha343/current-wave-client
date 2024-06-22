import { FaUserAlt } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { MdLocalPostOffice } from "react-icons/md";
import { TbArrowBack } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-outline drawer-button lg:hidden right-3 top-3 absolute"
          >
            Menu
          </label>
          <div className="mt-16 lg:mt-0">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
            {/* Sidebar content here */}
            <div>
              <li>
                <NavLink to="/dashboard/user-profile">
                  <FaUserAlt />
                  User Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users">
                  <ImUsers size={18} />
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/post-news">
                  <MdLocalPostOffice size={17} />
                  Post News
                </NavLink>
              </li>
            </div>
            <li>
              <Link to="/">
                <TbArrowBack size={25} />
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
