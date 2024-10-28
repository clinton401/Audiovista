import {useContext, forwardRef, useEffect} from "react"
import UserBtn from "./UserBtn";
import LoginBtn from "./LoginBtn";
import { myContext } from "../App";
import TrackPlayBtn from "./TrackPlayBtn";
import { motion, AnimatePresence } from "framer-motion";
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
const NavLayoutMobile = forwardRef(
  ({ navContentsActive, isLoading, name, setNavContentsActive, 
    chosenNavColor }, ref) => {
    const { loggedIn } = useContext(myContext);
    useEffect(() => {
      setNavContentsActive(false);
    }, []);
    
    return (
      <>
      <AnimatePresence>
        {navContentsActive && <motion.nav
        variants={navAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
         key="nav_mobile_modal"
        className={`fixed  px-[2.5%] py-2 z-40 top-0 flex ${chosenNavColor.normal } w-full  justify-between items-center  gap-2 flex-wrap left-0`}
        ref={ref && ref}
      >
        <div className="flex-grow flex .ellipsis-container w-[60%] items-center gap-2">
          <TrackPlayBtn/>
          {/* <button
            className={`  aspect-square 
                  } relative rounded-full flex justify-center items-center go_back_btn`}
            onClick={BackHandler}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-xl  text-white"
            />
          </button> */}
          { !isLoading && (
            <h2 className="font-[900] font-erica w-full truncate text-2xl text-white">
              {name}
            </h2>
            // </span>
          )}
        </div>

        {!loggedIn ? <LoginBtn /> : <UserBtn />}
      </motion.nav>}
      </AnimatePresence>
      
      </>
    );
  }
);

export default NavLayoutMobile
