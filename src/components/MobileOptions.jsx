import React, { useContext, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faCompactDisc,
  faPlus,
  faMusic,
  faXmark,
  faCheck,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { myContext } from "../App";
import LoginBtn from "./LoginBtn";
import LoaderMini from "./LoaderMini";
import Modals from "./Modals";
const containerVariant = {
  hidden: {
    opacity: 0,
    // y: "100dvh",
  },
  visible: {
    opacity: 1,
    // y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    // y: "100dvh",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
const containerVariant2 = {
  hidden: {
    opacity: 0,
    // y: "100dvh",
  },
  visible: {
    opacity: 1,
    // y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      delay: 0.8,
    },
  },
  exit: {
    opacity: 0,
    // y: "100dvh",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
const containerVariant3 = {
  hidden: {
    opacity: 0,
    // y: "100dvh",
  },
  visible: {
    opacity: 1,
    // y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      delay: 1.1,
    },
  },
  exit: {
    opacity: 0,
    // y: "100dvh",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
const containerVariant4 = {
  hidden: {
    opacity: 0,
    // y: "100dvh",
  },
  visible: {
    opacity: 1,
    // y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      delay: 1.4,
    },
  },
  exit: {
    opacity: 0,
    // y: "100dvh",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
const containerVariant7 = {
  hidden: {
    opacity: 0,
    // y: "100dvh",
  },
  visible: {
    opacity: 1,
    // y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      delay: 1.7,
    },
  },
  exit: {
    opacity: 0,
    // y: "100dvh",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
const containerVariant6 = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      mass: 0.4,
      damping: 8,
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
const containerVariant5 = {
  hidden: {
    // opacity: 0,
    x: "-100vw",
  },
  visible: {
    // opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      delay: 1,
      mass: 0.4,
      damping: 8,
    },
  },
  exit: {
    // opacity: 0,
    x: "-100vw",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

function MobileOptions({
  artistId,
  image,
  trackName,
  artists,
  albumId,
  hideOptionsHandler,
  mainTypeVerify,
  idNo,
  trackUri,
  playlistOwner,
  playlistId,
  getPlaylist,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [addTracksData, setAddTracksData] = useState(null);
  const [addTracksLoading, setAddTracksLoading] = useState(false);
  const [addTracksError, setAddTracksError] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const [createPlaylistActive, setCreatePlaylistActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createPlaylistLoading, setCreatePlaylistLoading] = useState(false);
  const [createPlaylistError, setCreatePlaylistError] = useState(false);
  const [createPlaylistData, setCreatePlaylistData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputValueTwo, setInputValueTwo] = useState("");
  const [newPlaylistData, setNewPlaylistData] = useState([]);
  const [durationState, setDurationState] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedError, setIsLikedError] = useState(false);
  const [likedLoading, setLikedLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);
  const [buttonClickNotLoggedIn, setButtonClickNotLoggedIn] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);
  const {
    authUserPlaylistData,
    accessToken,
    loggedIn,
    userData,
    setCpModalText,
    SEARCH_PARAM,
    artistChange,
    setArtistChange,
  } = useContext(myContext);

  const inputRef = useRef();
  const navigate = useNavigate();
  async function checkifAddedToLiked() {
    try {
      setLikedLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/me/tracks/contains?ids=${idNo}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setIsLiked(data[0]);
        setIsLikedError(false);
      } else {
        throw new Error("Failed to check if song is added to library");
      }
    } catch (error) {
      setIsLiked(false);

      console.error(error);
    } finally {
      setLikedLoading(false);
    }
  }
  const addToORemoveFromLikeBody = {
    ids: [idNo],
  };
  async function addToORemoveFromLike(methodType) {
    try {
      setLikedLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/me/tracks?ids=${idNo}`;
      const response = await fetch(SEARCH_URL, {
        method: methodType,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addToORemoveFromLikeBody),
      });
      if (response.ok) {
        setIsLiked(!isLiked);
        setIsLikedError(false);
        setSuccessMessage(
          isLiked ? "Removed from library" : "Added to library"
        );
      } else {
        throw new Error(
          `Failed to ${isLiked ? "remove from" : "add to"} library`
        );
      }
    } catch (error) {
      console.error(error);
      setIsLikedError(true);
    } finally {
      setLikedLoading(false);
    }
  }

  const bodyObject = {
    name: inputValueTwo,
    public: true,
  };
  async function createPlaylist(bodyObject) {
    let returnedData;
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
        returnedData = data;
        setCreatePlaylistData(data);
        setCreatePlaylistError(false);
      } else {
        setCreatePlaylistData(null);
        setCreatePlaylistError(true);
        setCpModalText("Something went wrong");
      }
    } catch (error) {
      setCreatePlaylistData(null);
      setCreatePlaylistError(true);
      setCpModalText("Something went wrong");
      console.log(error);
    } finally {
      setArtistChange(!artistChange);
      setCreatePlaylistLoading(false); // Corrected function call
    }
    return returnedData;
  }

const removeTracksBody = {
  tracks: [
    {
      uri: trackUri,
    },
  ],
};
const SEARCH_PARAM_DELETE2 = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify(removeTracksBody),
};
async function removeTracks() {
  if (accessToken) {
    try {
      setRemoveLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM_DELETE2);
      if (response.ok) {
        setCpModalText("Song removed successfully");
        getPlaylist();
      } else {
        throw new Error("Failed to delete song");
      }
    } catch (error) {
      console.error(error);
      setCpModalText("Failed to delete song");
    } finally {
      setRemoveLoading(false);
      setShowOptions(false);
    }
  }
}

  useEffect(() => {
    if (loggedIn) {
      checkifAddedToLiked();
    }
  }, [loggedIn]);
  useEffect(() => {
    let timeoutId;
    if ((buttonClickNotLoggedIn || isLikedError, successMessage)) {
      timeoutId = setTimeout(() => {
        setButtonClickNotLoggedIn(false);
        setIsLikedError(false);
        setSuccessMessage(null);
      }, 3000);
    }
    () => clearTimeout(timeoutId);
  }, [buttonClickNotLoggedIn, isLikedError, successMessage]);
  function addToOrRemoveFromLikedSongs() {
    if (!loggedIn) {
      setButtonClickNotLoggedIn(true);
    } else {
      setButtonClickNotLoggedIn(false);
      const methodType = isLiked ? "DELETE" : "PUT";
      addToORemoveFromLike(methodType);
    }
  }
  useEffect(() => {
    if (loggedIn && userData) {
      const owned = authUserPlaylistData.filter((apd) => {
        return apd.owner.display_name === userData.display_name;
      });
      setPlaylistData(owned);
      setNewPlaylistData(owned);
    }
  }, [loggedIn, userData]);
  useEffect(() => {
    if (showOptions) {
      setInputValue("");
      setInputValueTwo("");
    }
  }, [showOptions]);
  function inputChangeHandler({ target }) {
    const value = target.value.toLowerCase();
    setInputValue(value);
    const filteredResult = playlistData.filter((apd) => {
      const playlistName = apd.name.toLowerCase();
      return playlistName.startsWith(value);
    });
    setNewPlaylistData(filteredResult);
  }
  async function submitHandler(e) {
    e.preventDefault();
    let newPlaylistObject;
    if (inputValueTwo.length > 0) {
      newPlaylistObject = await createPlaylist(bodyObject);
      if (newPlaylistObject) {
        await addTracks(newPlaylistObject.id, newPlaylistObject.name);
      }
      setInputValueTwo("");
    }
  }
  useEffect(() => {
    if (createPlaylistActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [createPlaylistActive]);
  const bodyData = {
    uris: [trackUri],
  };
  const SEARCH_PARAM_POST = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bodyData),
  };
  async function addTracks(playlist_id, name) {
    if (trackUri) {
      try {
        setAddTracksLoading(true);
        const SEARCH_URL = `
https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
        const response = await fetch(SEARCH_URL, SEARCH_PARAM_POST);
        if (response.ok) {
          const data = await response.json();
          setAddTracksData(data);
          setAddTracksError(false);
          if (name) {
            setCpModalText(`Track added to the ${name}`);
          } else {
            setCpModalText(`Track added to the library!`);
          }
        } else {
          setAddTracksData(null);
          setAddTracksError(true);
          setCpModalText("Something went wrong");
        }
      } catch (error) {
        setAddTracksData(null);
        setAddTracksError(true);
        setCpModalText("Something went wrong");
      } finally {
        setAddTracksLoading(false);
        setShowOptions(false);
      }
    }
  }
  useEffect(() => {
    if (!createPlaylistLoading && !addTracksLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [createPlaylistLoading, addTracksLoading]);
  function artistRouteHandler() {
    navigate(`/artist/${artistId}`);
  }
  function albumRouteHandler() {
    navigate(`/album/${albumId}`);
  }
  function trackRouteHandler() {
    navigate(`/track/${idNo}`);
  }
  //   console.log({ artistId, image, trackName, artists, albumId });
  return (
    <>
      {buttonClickNotLoggedIn && (
        <Modals text="You need to be logged in first" />
      )}
      {isLikedError && (
        <Modals text="Something went wrong. Please try again later" />
      )}
      {successMessage && <Modals text={successMessage} />}
      <div className="relative  h-full w-full">
        <motion.section
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="w-full flex px-[2.5%] mb-8 h-[55px] justify-start gap-3 items-center ellipsis-container"
        >
          <img
            src={image}
            alt={`${trackName} image`}
            loading="lazy"
            className="rounded-md h-full aspect-square"
          />
          <span className="flex flex-col gap-1 justify-center items-start ellipsis-container w-auto">
            <h3 className="font-[700] text-white text-sm ellipsis-container text-left w-full">
              {trackName}
            </h3>
            {artists.length > 0 && (
              <span className="flex  gap-1 ellipsis-container  relative w-auto">
                {artists.map((art, index) => (
                  <React.Fragment key={art.id}>
                    <div className="w-full flex gap-1 items-center ">
                      <strong className=" w-full font-[400] text-tGray">
                        {art.name}
                      </strong>
                      {index !== artists.length - 1 && (
                        <span className="text-tGray "> | </span>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </span>
            )}
          </span>

          {/* <FontAwesomeIcon icon={faXmark} /> */}
        </motion.section>
        <ul className="w-full list-none px-[2.5%] flex flex-col gap-4">
          <motion.li
            variants={containerVariant2}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <button
              className="transition-all ease-in duration-300 w-full py-2  flex gap-3 items-center text-lg hover:scale-[1.01] "
              onClick={(e) => {
                e.stopPropagation();
                addToOrRemoveFromLikedSongs();
              }}
            >
              {likedLoading ? (
                <LoaderMini />
              ) : (
                <FontAwesomeIcon
                  icon={isLiked ? fasHeart : farHeart}
                  className={`${isLiked ? "text-spotify" : ""} text-sm`}
                />
              )}
              {/* </span> */}
              <h3 className="text-lg font-[800]">
                {" "}
                {isLiked ? "Remove from" : "Add to"} library
              </h3>
            </button>
          </motion.li>

          <motion.li
            variants={containerVariant2}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <button
              className="transition-all ease-in duration-300 w-full py-2  flex gap-3 items-center text-lg hover:scale-[1.01] "
              onClick={artistRouteHandler}
            >
              <FontAwesomeIcon icon={faUserTie} />
              <h3 className="text-lg font-[800]">View artist</h3>
            </button>
          </motion.li>

          {!mainTypeVerify ? (
            <motion.li
              variants={containerVariant3}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <button
                className="transition-all ease-in duration-300 w-full py-2  flex gap-3 items-center text-lg hover:scale-[1.01] "
                onClick={albumRouteHandler}
              >
                <FontAwesomeIcon icon={faCompactDisc} />

                <h3 className="text-lg font-[800]">View album</h3>
              </button>
            </motion.li>
          ) : (
            <motion.li
              variants={containerVariant3}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <button
                className="transition-all ease-in duration-300 w-full py-2  flex gap-3 items-center text-lg hover:scale-[1.01] "
                onClick={trackRouteHandler}
              >
                <FontAwesomeIcon icon={faMusic} />

                <h3 className="text-lg font-[800]">View track</h3>
              </button>
            </motion.li>
          )}
          <motion.li
            variants={containerVariant4}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <button
              className="transition-all ease-in duration-300 w-full py-2  flex gap-3 items-center text-lg hover:scale-[1.01] "
              onClick={() => {
                setShowOptions(!showOptions);
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={`${
                  showOptions ? "rotate-45" : ""
                }   transition-all duration-300`}
              />
              <h3 className="text-lg font-[800]">Add to playlist</h3>
            </button>
          </motion.li>
          {playlistOwner && (
            <motion.li
              className="w-full"
              variants={containerVariant7}
              initial="hidden"
              animate="visible"
            >
              <button
                className="transition-all ease-in duration-300 w-full py-2  flex gap-3 items-center text-lg hover:scale-[1.01]"
                onClick={removeTracks}
              >
                <FontAwesomeIcon icon={faXmark} className="" />
                <h3 className="text-lg font-[800]">
                  Remove from playlist
                </h3>{" "}
                {removeLoading && <LoaderMini />}
              </button>
            </motion.li>
          )}
        </ul>
        <AnimatePresence>
          {showOptions && (
            <motion.div
              variants={containerVariant6}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`w-full h-[350px] flex flex-col   px-[2.5%]  mt-4 `}
            >
              {!loggedIn ? (
                <ul className=" bg-primary py-4 h-full text-base rounded-md items-center justify-center gap-y-3 flex flex-col">
                  <li className="w-3/4 text-center">
                    {" "}
                    You need to be logged in to add to playlist
                  </li>
                  <li>
                    <LoginBtn />
                  </li>
                </ul>
              ) : (
                <div className="overflow-y-auto  bg-primary text-tGray h-full overflow-x-hidden flex flex-col items-center   rounded-md font-bold py-2 px-1">
                  <span className="border-b border-tGray flex flex-col items-center gap-1 w-full ">
                    {!createPlaylistActive && (
                      <input
                        type="text"
                        value={inputValue}
                        // ref={inputRef}
                        className="w-[95%]  bg-primary rounded outline-none	  text-white font-normal border p-4 h-[20px]   placeholder:italic placeholder:text-base placeholder:font-normal "
                        placeholder="Find a playlist"
                        onChange={inputChangeHandler}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    )}

                    <span
                      className="w-full  gap-2 relative rounded-base py-2 px-[5%]
                   flex items-center hover:bg-[#333333]
                  active:bg-[#333333] transition-all ease-in duration-300"
                      onClick={() =>
                        setCreatePlaylistActive(!createPlaylistActive)
                      }
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faPlus}
                        className={`${
                          createPlaylistActive ? "rotate-45" : ""
                        }   transition-all duration-300`}
                      />
                      New playlist
                    </span>
                  </span>
                  {createPlaylistActive && (
                    <div className="w-full flex flex-col pt-2 gap-3 items-center  h-full ">
                      <form
                        className="flex w-full justify-between "
                        onSubmit={submitHandler}
                      >
                        <input
                          type="text"
                          value={inputValueTwo}
                          ref={inputRef}
                          className="w-[85%] bg-primary rounded-tl outline-none	 rounded-bl text-white font-normal border p-4 h-[20px] text-base  placeholder:italic placeholder:text-base placeholder:font-normal "
                          placeholder="Playlist name"
                          required
                          onChange={(e) => setInputValueTwo(e.target.value)}
                        />
                        <button className="w-[15%] outline-none border focus:bg-[#333333] focus:text-white bg-white text-xl text-primary rounded-tr rounded-br">
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      </form>
                      {isLoading && <LoaderMini />}
                    </div>
                  )}
                  {!createPlaylistActive && newPlaylistData.length > 0 && (
                    <div className="w-full flex flex-col  ">
                      {addTracksLoading && (
                        <div className="p-2 w-full flex justify-center items-center">
                          <LoaderMini />
                        </div>
                      )}{" "}
                      {newPlaylistData.map((npd, index) => {
                        return (
                          <span
                            className="  w-full text-base relative rounded-base py-2 px-[5%]
                  flex gap-2 items-center hover:bg-[#2A2A2A]
                  active:bg-[#2a2a2a] transition-all ease-in duration-300"
                            key={index}
                            onClick={() => addTracks(npd.id)}
                          >
                            {" "}
                            <p className=" text-left ellipsis-container">
                              {npd.name}
                            </p>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              {/* {loggedIn } */}
            </motion.div>
          )}
        </AnimatePresence>
        <section className=" px-[2.5%] pt-10 flex justify-center items-center  ">
          <motion.button
            variants={containerVariant5}
            className="button2 text-base type1"
            onClick={hideOptionsHandler}
            initial="hidden"
            animate="visible"
          >
            <span className="btn-txt"> Close</span>
          </motion.button>
        </section>
      </div>
    </>
  );
}

export default MobileOptions;
