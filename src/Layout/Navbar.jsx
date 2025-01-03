import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faBookBookmark,
  faPlus,
  faThumbtack,
  faChevronLeft,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { myContext } from "../App";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import LoginBtn from "../components/LoginBtn";
import Loader from "../components/Loader";
import avatar from "../assets/user (1).png";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoaderMini from "../components/LoaderMini";

import UserBtn from "../components/UserBtn";

import logo from "../assets/logo.png";
const containerVariant = {
  hidden: {
    // opacity: 0,
    x: "-100vw",
  },
  visible: {
    // opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      // delay: 0.5,
      // mass: 0.4,
      // damping: 8,
      // when: "beforeChildren"
      ease: "easeInOut",
    },
  },
  exit: {
    // opacity: 0,
    x: "-100vw",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const Navbar = forwardRef(({}, ref) => {
  const [filters, setFilters] = useState("artists");
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [createPlaylistLoading, setCreatePlaylistLoading] = useState(false);
  const [createPlaylistError, setCreatePlaylistError] = useState(false);
  const [createPlaylistData, setCreatePlaylistData] = useState(null);
  const inputRef = useRef();
  const {
    loggedIn,
    topArtistData,
    topArtistLoading,
    topArtistError,
    authUserPlaylistData,
    inputValue: navInputValue,
    inputFocused,
    clearInputHandler,
    inputHandler,
    followingArtists,
    artistChange,
    setArtistChange,
    accessToken,
    userData,
    setCpModalText,
    setCpModalTextError,
  } = useContext(myContext);
  const { pathname } = useLocation();
  function filtersHandler(param) {
    setFilters(param);
  }
  const bodyObject = {
    name: inputValue,
    public: true,
  };
  async function createPlaylist(bodyObject) {
    const SEARCH_PARAM_DELETE = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bodyObject),
    };
    try {
      setCreatePlaylistLoading(true);

      const SEARCH_URL = `
      https://api.spotify.com/v1/users/${userData.id}/playlists`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM_DELETE);
      if (response.ok) {
        const data = await response.json();
        setCreatePlaylistData(data);
        setCreatePlaylistError(false);
        navigate(`/playlist/${data.id}`);
        setCpModalText("Playlist created successfully");
      } else {
        setCreatePlaylistData(null);
        setCreatePlaylistError(true);
        setCpModalTextError("Something went wrong");
      }
    } catch (error) {
      setCreatePlaylistData(null);
      setCreatePlaylistError(true);
      setCpModalTextError("Something went wrong");
      console.log(error);
    } finally {
      setArtistChange(!artistChange);
      setShowInput(false);
      setCreatePlaylistLoading(false); // Corrected function call
    }
  }
  function submitHandler(e) {
    e.preventDefault();

    if (inputValue.length > 0) {
      createPlaylist(bodyObject);
      setInputValue("");
    }
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput, inputRef]);
  // console.log(createPlaylistData)
  // console.log({
  //   createPlaylistLoading,
  //   createPlaylistError,
  //   createPlaylistData,
  // });
  function submitNavHandler(e) {
    e.preventDefault();
    //  if(inputValue.length > 0) {
    //   debouncedFetchData(inputValue)
    //  }
  }

  return (
    <>
      <header className="w-full h-[65px] py-2 fixed z-[1000] hidden ipad:flex px-[2.5%] justify-between items-center gap-2">
        <Link className="flex justify-center  items-center gap-2">
          <img src={logo} alt="logo" className="aspect-square w-[30px]" />
          {/* <h2 className=" hidden miniScreen:flex font-[700] text-xl text-white font-erica ">
            Audiovista
          </h2> */}
        </Link>

        <span className=" flex items-center text-white justify-start gap-3" >
          <button
            className=" w-[44px] aspect-square bg-primary relative rounded-full flex justify-center items-center go_back_btn"
            onClick={()=> navigate('/')}
          >
            <FontAwesomeIcon
              icon={faHouse}
              className={`text-lg ${pathname === "/" ? "text-white" : "text-tGray"} `}
            />
          </button>

          <form className="relative" onSubmit={submitNavHandler}>
            <input
              type="text"
              className="bg-primary placeholder:italic placeholder:text-sm placeholder:font-normal rounded-full font-medium  outline-transparent w-96 py-3 px-[42px] text-sm "
              value={navInputValue}
              onChange={inputHandler}
              onClick={() => {
                if (pathname !== "/search") {
                  navigate("/search");
                }
              }}
              ref={ref}
              spellCheck="false"
              placeholder="What do you want to play?"
            />
            <button className="absolute h-full w-[40px]  left-0 top-0 rounded-tl-full rounded-bl-full flex items-center justify-center outline-transparent">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            {navInputValue.length > 0 && (
              <button
                className="absolute h-full w-[40px]  right-0 top-0 rounded-tr-full rounded-br-full flex items-center justify-center outline-transparent"
                onClick={clearInputHandler}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </form>
        </span>

        {!loggedIn ? <LoginBtn navBarComp={true}/> : <UserBtn />}
      </header>
      <aside
        className="hidden w-[25%] max-w-[440px] pt-[65px] ipad:min-h-[400px]  overflow-y-auto fixed top-0 left-0 ipad:max-h-[900px] h-dvh py-2 px-4 overflow-x-hidden ipad:flex flex-col gap-2"
        id="header_aside"
      >
        {/* {(createPlaylistError || createPlaylistData !== null) && <Modals />} */}
        {/* <nav
          aria-label="home and search"
          className="w-full bg-primary rounded-md px-[5%]  flex flex-col justify-center gap-4 min-h-[120px] "
        >
          <NavLink
            className="flex gap-4 outline-transparent items-center  text-tGray text-lg	font-bold transition-all duration-300 hover:text-white"
            to="/"
          >
            <FontAwesomeIcon icon={faHouse} />
            <h2 className="font-erica">Home</h2>
          </NavLink>
          <NavLink
            className="flex gap-4 outline-transparent  items-center  text-tGray text-lg transition-all duration-300	font-bold  hover:text-white"
            to="/search"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <h2 className="font-erica">Search</h2>
          </NavLink>
        </nav> */}
        <nav
          aria-label="Library"
          className="text-tGray w-full relative min-h-[280px]  bg-primary h-full  px-[5%] pb-4 rounded-md"
        >
          <div className="w-full sticky z-[5] bg-primary py-4 shadow-lg top-0 left-0 flex flex-wrap gap-2 text-xl items-center justify-between font-bold">
            <NavLink
              to="library"
              className="flex gap-4 outline-transparent  items-center text-tGray text-lg	font-bold transition-all duration-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faBookBookmark} />
              <h2 className="font-erica">Library</h2>
            </NavLink>
            {loggedIn && (
              <span className="" onClick={(e) => e.stopPropagation()}>
                <div className="tooltip-container ">
                  <span className="tooltip text-sm font-[500]">
                    Create playlist
                  </span>
                  <button
                    className={`bg-transparent border-none ${
                      showInput ? "rotate-45" : ""
                    }  hover:bg-[#36454F] transition-all duration-300 rounded-full flex items-center justify-center aspect-square h-[35px]`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInput(!showInput);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <AnimatePresence>
                  {showInput && (
                    <motion.div
                      variants={containerVariant}
                      animate="visible"
                      initial="hidden"
                      exit="exit"
                      className="w-full  rounded-md absolute flex-col gap-3 right-2 top-[60px] z-10 aspect-[1/0.5] bg-[#333333] px-[2.5%] flex items-center justify-center"
                    >
                      <form
                        className="flex w-full justify-between "
                        onSubmit={submitHandler}
                      >
                        <input
                          type="text"
                          value={inputValue}
                          ref={inputRef}
                          className="w-[85%] bg-primary rounded-tl outline-none	 rounded-bl text-white font-normal border p-4 h-[20px] text-sm  placeholder:italic placeholder:text-sm placeholder:font-normal "
                          placeholder="Playlist name"
                          required
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button className="w-[15%] outline-none border focus:bg-[#333333] focus:text-white bg-white text-xl text-primary rounded-tr rounded-br">
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      </form>
                      {createPlaylistLoading && <LoaderMini />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            )}
            <span className="w-full p2 gap-2 flex items-center overflow-x-auto mobile_filter ">
              {!topArtistError &&
                (topArtistData.length > 0 || followingArtists.length > 0) && (
                  <button
                    className={`filter_btn2 ${
                      filters === "artists" ? "artists" : ""
                    }`}
                    onClick={() => filtersHandler("artists")}
                  >
                    Artists
                  </button>
                )}
              {!topArtistError && authUserPlaylistData.length > 0 && (
                <button
                  className={`filter_btn2 ${
                    filters === "playlists" ? "playlists" : ""
                  }`}
                  onClick={() => filtersHandler("playlists")}
                >
                  Playlists
                </button>
              )}
            </span>
          </div>
          {!loggedIn && (
            <div className="pt-8 flex items-center justify-center">
              <LoginBtn />
            </div>
          )}
          {loggedIn && (
            <>
              {!topArtistError && topArtistLoading && (
                <div className="w-full calcHeight3  flex items-center justify-center  py-4">
                  <Loader />
                </div>
              )}
              {!topArtistError && !topArtistLoading && (
                <>
                  {filters === "artists" &&
                    (topArtistData.length > 0 ||
                      followingArtists.length > 0) && (
                      <div className="w-full calcHeight3 overflow-y-auto  pt-4">
                        <section>
                          <ul>
                            {followingArtists.length > 0 && (
                              <>
                                {followingArtists.slice(0, 5).map((art) => {
                                  const imgUrl =
                                    art.images && art.images.length > 0
                                      ? art.images[0].url
                                      : avatar;
                                  return (
                                    <li key={art.id} className="w-full">
                                      <button
                                        className="w-full rounded-md flex gap-2 min-h-[66px] outline-none focus:bg-[#1a1a1a] hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-all ease-in duration-300  items-center p-2"
                                        onClick={() =>
                                          navigate(`/artist/${art.id}`)
                                        }
                                      >
                                        <img
                                          src={imgUrl}
                                          className="rounded-full shadow-xl object-cover aspect-square  h-[50px]"
                                          loading="lazy"
                                          alt={`${art.name} image`}
                                        />
                                        <span className="flex items-start w-full ellipsis-container justify-center flex-col gap-1">
                                          <h2 className=" flex justify-start w-full ellipsis-container text-white text-sm">
                                            {art.name}
                                          </h2>

                                          <h4 className="font-[400] ">
                                            <FontAwesomeIcon
                                              icon={faThumbtack}
                                              className="rotate-45"
                                              style={{ color: "#1ed760" }}
                                            />
                                          </h4>
                                        </span>
                                      </button>
                                    </li>
                                  );
                                })}
                              </>
                            )}
                            {topArtistData.length > 0 && (
                              <>
                                {topArtistData.map((art) => {
                                  const imgUrl =
                                    art.images && art.images.length > 0
                                      ? art.images[0].url
                                      : avatar;
                                  return (
                                    <li key={art.id} className="w-full">
                                      <button
                                        className="w-full rounded-md flex gap-2 min-h-[66px] outline-none focus:bg-[#1a1a1a] hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-all ease-in duration-300  items-center p-2"
                                        onClick={() =>
                                          navigate(`/artist/${art.id}`)
                                        }
                                      >
                                        <img
                                          src={imgUrl}
                                          className="rounded-full shadow-xl object-cover aspect-square  h-[50px]"
                                          loading="lazy"
                                          alt={`${art.name} image`}
                                        />
                                        <span className="flex items-start w-full ellipsis-container justify-center flex-col gap-1">
                                          <h2 className=" flex justify-start w-full ellipsis-container text-white text-sm">
                                            {art.name}
                                          </h2>
                                          {/* <h4 className="font-[400] text-tGray text-xs">
                                      Artist
                                    </h4> */}
                                        </span>
                                      </button>
                                    </li>
                                  );
                                })}
                              </>
                            )}
                          </ul>
                        </section>
                      </div>
                    )}
                  {filters === "playlists" &&
                    authUserPlaylistData.length > 0 && (
                      <div className="w-full calcHeight3 overflow-y-auto  py-4">
                        <section>
                          <ul>
                            {authUserPlaylistData.map((art) => {
                              const imgUrl =
                                art.images && art.images.length > 0
                                  ? art.images[0].url
                                  : avatar;
                              return (
                                <li key={art.id} className="w-full">
                                  <button
                                    className="w-full rounded-md flex gap-2 min-h-[66px] outline-none focus:bg-[#1a1a1a] hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-all ease-in duration-300  items-center p-2"
                                    onClick={() =>
                                      navigate(`/playlist/${art.id}`)
                                    }
                                  >
                                    <img
                                      src={imgUrl}
                                      className="rounded-md shadow-xl object-cover aspect-square  h-[50px]"
                                      loading="lazy"
                                      alt={`${art.name} image`}
                                    />
                                    <span className="flex items-start w-full ellipsis-container justify-center flex-col gap-1">
                                      <h2 className=" flex justify-start w-full ellipsis-container text-white text-sm">
                                        {art.name}
                                      </h2>
                                      <h4 className="font-[400] text-tGray text-xs">
                                        {art.owner.display_name}
                                      </h4>
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </section>
                      </div>
                    )}
                </>
              )}
              {topArtistError && (
                <div className="w-full calcHeight3  flex items-center justify-center  py-4">
                  <h2 className="text-2xl flex font-erica items-center justify-center text-white font-[900]">
                    Details not found
                  </h2>
                </div>
              )}
            </>
          )}
        </nav>
      </aside>
      <footer
        className="flex w-full left-0 fixed bottom-0 h-[50px] z-[2000] justify-evenly bg-white blurred ipad:hidden"
        id="header_aside"
      >
        <NavLink
          className="flex gap-2 flex-col justify-center items-center text-tGray 	font-bold transition-all duration-300 hover:text-white"
          to="/"
        >
          <FontAwesomeIcon icon={faHouse} className="text-xl" />
          {/* <h2 className="text-ssm">Home</h2> */}
        </NavLink>
        <NavLink
          className="flex gap-2 flex-col justify-center items-center text-tGray 	font-bold transition-all duration-300 hover:text-white"
          to="/search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
          {/* <h2 className="text-ssm">Search</h2> */}
        </NavLink>
        <NavLink
          className="flex gap-2 flex-col justify-center items-center text-tGray 	font-bold transition-all duration-300 hover:text-white"
          to="/library"
        >
          <FontAwesomeIcon icon={faBookBookmark} className="text-xl" />
          {/* <h2 className="text-ssm">Library</h2> */}
        </NavLink>
      </footer>
    </>
  );
});

export default Navbar;
