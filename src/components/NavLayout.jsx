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

import { AnimatePresence, motion } from "framer-motion";
const navAnimation = {
  hidden: {
    y: -200,
    opacity: 0
  }, 
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeIn",
      type: "spring",
      duration: 0.3
    }
  }, 
  exit: {
    y: -200,
    opacity: 0,
    transition: {
      ease: "easeIn",
      type: "spring",
      duration: 0.3

    }
  }
}
const NavLayout = forwardRef(
  ({ navContentsActive, BackHandler, isLoading, name, loggedIn, chosenNavColor }, ref) => {
    
    return (

      <>
      <AnimatePresence >
        {navContentsActive && <motion.nav variants={navAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
       key="nav_modal"
        className={` items-center top-[65px] max-w-[1350px]  justify-between px-[2%] z-50   rounded-tl-md  fixed artist_fixed_width    flex   gap-2 ${chosenNavColor.normal }  py-2`}
        ref={ref && ref}
      >
        {/* <div className=" flex items-center justify-start w-[70%] gap-3"> */}
          {/* <button
            className={` h-[35px] aspect-square bg-black
                  } relative rounded-full flex justify-center items-center go_back_btn`}
            onClick={BackHandler}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-lg  text-white"
            />
          </button> */}
          {!isLoading && (
            <div className="flex items-center  gap-2 w-[100%] ">

              <TrackPlayBtn />
              <h2 className="font-[900] font-erica w-[100%] ellipsis-container text-2xl text-white">
                {name}
              </h2>
            </div>
          )}
        {/* </div> */}
        {/* <div>{!loggedIn ? <LoginBtn /> : <UserBtn />}</div> */}
      </motion.nav>}
      </AnimatePresence>
      
      </>
    );
  }
);

export default NavLayout;
