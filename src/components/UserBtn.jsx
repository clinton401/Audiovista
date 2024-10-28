import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import {
  faXmark,
  faCaretDown,
  faCaretUp,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
const containerVariant = {
  hidden: {
    opacity: 0,
    x: 300,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      // delay: 0.3,
      // mass: 0.4,
      // damping: 8,
      // when: "beforeChildren"
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 300,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
function UserBtn() {
  const [newCreatorName, setNewCreatorName] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const { logOut, userData } = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      const creatorName = userData.display_name;
      const upperCaseCreatorName =
        creatorName.charAt(0).toUpperCase() + creatorName.slice(1);
      setNewCreatorName(upperCaseCreatorName);
    }
  }, [userData]);
  useEffect(() => {
    function removeOptionsHandler() {
      if (showOptions) {
        setShowOptions(false);
      }
    }

    window.addEventListener("click", removeOptionsHandler);
    return () => document.removeEventListener("click", removeOptionsHandler);
  }, [showOptions]);

  return (
    <>
      {userData && (
        <div className="relative ">
          <button
            className="user_btn items-center hidden  min-w-[160px] ipad:flex p-2 bg-white  gap-3 text-primary border rounded-full font-bold"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
          >
            {newCreatorName && (
              <span className="w-[25px] aspect-square bg-primary flex items-center justify-center text-white rounded-full text-[10px]">
                {newCreatorName.charAt(0).toUpperCase()}
              </span>
            )}

            {newCreatorName && newCreatorName}
            {showOptions ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </button>
          <button
            className="flex ipad:hidden px-4 text-2xl"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
          >
            <FontAwesomeIcon icon={faGear} />
          </button>
          <AnimatePresence>
            {showOptions && (
              <motion.span
                className=" flex ipad:absolute  flex-col text-white z-[1000] pt-10 font-bold ipad:font-normal text-2xl px-[10%] ipad:p-0 fixed top-0 ipad:top-[55px] h-dvh ipad:h-auto rounded-md ipad:text-sm w-full ipad:w-[200px]   right-0 bg-black ipad:bg-white ipad:divide-y ipad:divide-tGray ipad:text-primary "
                variants={containerVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                key="modal"
              >

                <Link
                  to={`/library`}
                  className=" flex w-full p-2 links ipad:p-4"
                >
                  Profile
                </Link>
           
                <button
                  // to={`user/${userData.id}`}
                  className="w-full flex justify-start links p-2 ipad:p-4"
                  onClick={logOut}
                >
                  Logout
                </button>
          
                <div className=" px-[2.5%] pt-10 flex  ipad:p-0 ipad:hidden justify-center items-center  ">
                  <button
                    //   variants={containerVariant5}
                    className="button2 text-base type1"
                    onClick={() => setShowOptions(false)}
                    //   initial="hidden"
                    //   animate="visible"
                  >
                    <span className="btn-txt"> Close</span>
                  </button>
                </div>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
export default UserBtn;
