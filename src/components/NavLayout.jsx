import React, { forwardRef } from "react";
import {
  faChevronLeft,
  faPlay,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginBtn from "./LoginBtn";
import UserBtn from "./UserBtn";
import TrackPlayBtn from "./TrackPlayBtn";
const NavLayout = forwardRef(
  ({ navContentsActive, BackHandler, isLoading, name, loggedIn }, ref) => {
    return (
      <nav
        className={`flex items-center max-w-[1350px] transition-all ease-in duration-300  justify-between px-[2%] z-50  top-2 rounded-tl-md  fixed artist_fixed_width    bg-${
          navContentsActive ? "[#333333]" : "transparent"
        } gap-2   py-2`}
        ref={ref && ref}
      >
        <div className=" flex items-center justify-start w-[70%] gap-3">
          <button
            className={` h-[35px] aspect-square bg-black
                  } relative rounded-full flex justify-center items-center go_back_btn`}
            onClick={BackHandler}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-lg  text-white"
            />
          </button>
          {navContentsActive && !isLoading && (
            <span className="flex items-center gap-2 w-[100%] ">
              <TrackPlayBtn />
              <h2 className="font-[900] w-[100%] ellipsis-container text-2xl text-white">
                {name}
              </h2>
            </span>
          )}
        </div>
        <div>{!loggedIn ? <LoginBtn /> : <UserBtn />}</div>
      </nav>
    );
  }
);

export default NavLayout;
