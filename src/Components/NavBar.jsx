import { HiUserCircle } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import UserProfileMenu from "./UserProfileMenu";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useOutsideClicked } from "../Hooks/useOutSideClicked";

const NavBar = () => {
  const userProfileMenuItems = [
    { title: "Edit profile" },
    { title: "Configure app" },
    { title: "Sign out" },
  ];
  const [ShowProfileMenu, setShowProfileMenu] = useState(false);

  const MenuRef = useRef();
  //when outside menu is clicked while menu is opened
  useOutsideClicked(MenuRef, setShowProfileMenu, false, [ShowProfileMenu]);

  return (
    <main className="w-full h-12 bg-slate-300 flex justify-end border-b-4 border-b-slate-700">
      <section className="relative top-2">
        <span className="mr-10">
          <Link to={"/"}>
            <AiFillHome color={"#334155"} size={20}></AiFillHome>
          </Link>
        </span>
      </section>

      <section
        className="flex flex-col items-center relative top-2 w-32"
        ref={MenuRef}
      >
        <button
          className="mr-10"
          onClick={() => {
            setShowProfileMenu(!ShowProfileMenu);
          }}
        >
          <HiUserCircle color={"#334155"} size={25}></HiUserCircle>
        </button>
        {
          <section
            className={
              ShowProfileMenu
                ? "relative left-10 w-32 -translate-x-10 transition-transform duration-100 ease-in"
                : " relative left-10  transition-transform duration-[1s] "
            }
          >
            {ShowProfileMenu && (
              <UserProfileMenu
                userProfileMenuItems={userProfileMenuItems}
              ></UserProfileMenu>
            )}
          </section>
        }
      </section>
    </main>
  );
};

export default NavBar;
