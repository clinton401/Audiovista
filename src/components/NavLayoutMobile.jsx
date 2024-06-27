import {useContext, forwardRef, useEffect} from "react"
import {
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import UserBtn from "./UserBtn";
import LoginBtn from "./LoginBtn";
import { myContext } from "../App";
import TrackPlayBtn from "./TrackPlayBtn";
const NavLayoutMobile = forwardRef(
  ({ navContentsActive, isLoading, name, setNavContentsActive }, ref) => {
    const { loggedIn } = useContext(myContext);
    const navigate = useNavigate();
    useEffect(() => {
      setNavContentsActive(false);
    }, []);
    const BackHandler = () => {
      navigate(-1);
    };
    return (
      <nav
        className={`fixed  px-[2.5%] py-4 z-40  flex  w-full bg-${
          navContentsActive ? "[#333333]" : "transparent"
        } justify-between items-center gap-2 flex-wrap top-0 left-0`}
        ref={ref && ref}
      >
        <div className="flex-grow flex .ellipsis-container w-[60%] items-center gap-2">
          <button
            className={` w-[45px] aspect-square bg-black
                  } relative rounded-full flex justify-center items-center go_back_btn`}
            onClick={BackHandler}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-xl  text-white"
            />
          </button>
          {navContentsActive && !isLoading && (
            <h2 className="font-[900] w-full truncate text-2xl text-white">
              {name}
            </h2>
            // </span>
          )}
        </div>

        {!loggedIn ? <LoginBtn /> : <UserBtn />}
      </nav>
    );
  }
);

export default NavLayoutMobile
