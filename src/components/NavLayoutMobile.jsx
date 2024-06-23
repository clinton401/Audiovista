import {useContext} from "react"
import {
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import UserBtn from "./UserBtn";
import LoginBtn from "./LoginBtn";
import { myContext } from "../App";
function NavLayoutMobile() {
    const { loggedIn } = useContext(myContext);
    const navigate = useNavigate()
     const BackHandler = () => {
    navigate(-1);
  };
  return (
    <nav className="fixed  px-[2.5%] py-4 z-40  flex  w-full  justify-between items-center gap-2 flex-wrap top-0 left-0">
      <button
        className={` w-[45px] aspect-square bg-black
                  } relative rounded-full flex justify-center items-center go_back_btn`}
        onClick={BackHandler}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xl  text-white" />
      </button>

      {!loggedIn ? <LoginBtn /> : <UserBtn />}
    </nav>
  );
}

export default NavLayoutMobile
