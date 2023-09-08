import { Link } from "react-router-dom";
import { createPathname } from "../Functions/FormatString";

const UserProfileMenu = ({ userProfileMenuItems }) => {
  return (
    <main className=" bottom-1 bg-slate-700 text-white ">
      {userProfileMenuItems.map((element, index) => {
        return (
          <div className="" key={index}>
            <Link
              className="block px-2 h-full pt-1 pb-1 hover:bg-slate-600/80"
              to={`/${createPathname(element?.title)}`}
            >
              {element?.title}
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default UserProfileMenu;
