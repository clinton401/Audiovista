import React, { useEffect, useState, useRef, useContext } from "react";
import {
  faEllipsis,
  faPlus,
  faCaretRight,
  faCompactDisc,
  faUserTie,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../App";
import LoginBtn from "./LoginBtn";
import Modals from "./Modals";
import LoaderMini from "./LoaderMini";
function DestopOptions({
  artistsData,
  albumId,
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
  const [bottomHeight, setBottomHeight] = useState(250);
  const [createPlaylistActive, setCreatePlaylistActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createPlaylistLoading, setCreatePlaylistLoading] = useState(false);
  const [createPlaylistError, setCreatePlaylistError] = useState(false);
  const [createPlaylistData, setCreatePlaylistData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputValueTwo, setInputValueTwo] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);
  const [showHidden, setShowHidden] = useState({
    playlist: false,
    artist: false,
  });
  const [newPlaylistData, setNewPlaylistData] = useState([]);
  const {
    authUserPlaylistData,
    accessToken,
    loggedIn,
    userData,
    setCpModalText,

    artistChange,
    setArtistChange,
  } = useContext(myContext);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef();
  const navigate = useNavigate();
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

  const handleScroll = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const distanceFromBottom = window.innerHeight - rect.bottom;
      if (distanceFromBottom <= 205) {
        setIsNearBottom(true);
        setBottomHeight(90 + distanceFromBottom);
      } else {
        setIsNearBottom(false);
        setBottomHeight(250);
      }
    }
  };

  useEffect(() => {
    if (loggedIn && userData && showOptions) {
      const owned = authUserPlaylistData.filter((apd) => {
        return apd.owner.display_name === userData.display_name;
      });
      setPlaylistData(owned);
      setNewPlaylistData(owned);
    }
  }, [loggedIn, userData, showOptions]);

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
  function handleHover(param) {
    if (param === "artist") {
      setShowHidden({ artist: true, playlist: false });
    } else if (param === "playlist") {
      setShowHidden({ artist: false, playlist: true });
    }
  }
  function onBlurHandler(param) {
    setShowHidden({
      ...showHidden,
      [param]: false,
    });
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

  // console.log(showHidden);
  const { playlist, artist } = showHidden;
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
          getPlaylist()
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
        setShowHidden(false);
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
  // console.log(isNearBottom);
  // console.log({ authUserPlaylistData, newPlaylistData });
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
    <div className="relative">
      {showOptions && (
        <span
          className="w-full fixed z-[500] blurred2 top-0 left-0  h-full"
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(!showOptions);
          }}
        ></span>
      )}
      <span
        ref={ref}
        className="w-[40px]  flex items-center t_card_play justify-center "
        onClick={(e) => {
          e.stopPropagation();

          setShowOptions(!showOptions);
          handleScroll();
        }}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </span>
      {showOptions && (
        <ul
          className={`min-w-[275px] rounded-md font-bold py-1 px-1 bg-[#333333] absolute ${
            isNearBottom ? "bottom-[100%]" : "top-0"
          } right-[-10px] z-[1000]`}
          onClick={(e) => e.stopPropagation()}
        >
          <li
            className="w-full li_parent relative rounded-sm py-2 px-[5%] text-base flex justify-between items-center hover:bg-[#2A2A2A] active:bg-[#2a2a2a] transition-all ease-in duration-300"
            onMouseEnter={() => handleHover("playlist")}
            onMouseLeave={() => onBlurHandler("playlist")}
          >
            {" "}
            <span>
              <FontAwesomeIcon icon={faPlus} className="mr-4" />
              Add to playlist
            </span>
            <FontAwesomeIcon icon={faCaretRight} />
            {!loggedIn && playlist && (
              <ul
                className={`w-[250px]  flex flex-col overflow-y-auto items-center justify-center gap-y-4 rounded-md font-bold py-2 px-1 bg-[#333333] text-sm absolute top-0 right-[100%] z-[7] `}
                style={{
                  height: `${bottomHeight >= 250 ? "150" : bottomHeight}px`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {" "}
                <li className="w-3/4 text-center">
                  {" "}
                  You need to be logged in to add to playlist
                </li>
                <li>
                  <LoginBtn />
                </li>
              </ul>
            )}{" "}
            {loggedIn && playlist && (
              <div
                className={`w-[250px] overflow-y-auto  overflow-x-hidden flex flex-col items-center   rounded-md font-bold py-2 px-1 bg-[#333333] absolute top-0 right-[100%] z-[7]  `}
                onClick={(e) => e.stopPropagation()}
                style={{ height: `${bottomHeight}px` }}
              >
                {/* <form
                  className="flex w-full justify-between "
                  // onSubmit={submitHandler}
                > */}
                <span className="border-b border-tGray flex flex-col items-center gap-1 w-full ">
                  {!createPlaylistActive && (
                    <input
                      type="text"
                      value={inputValue}
                      // ref={inputRef}
                      className="w-[95%]  bg-primary rounded outline-none	  text-white font-normal border p-4 h-[20px] text-sm  placeholder:italic placeholder:text-sm placeholder:font-normal "
                      placeholder="Find a playlist"
                      onChange={inputChangeHandler}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  )}

                  <span
                    className="w-full text-sm gap-2 relative rounded-sm py-2 px-[5%]
                   flex items-center hover:bg-[#2A2A2A]
                  active:bg-[#2a2a2a] transition-all ease-in duration-300"
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
                        className="w-[85%] bg-primary rounded-tl outline-none	 rounded-bl text-white font-normal border p-4 h-[20px] text-sm  placeholder:italic placeholder:text-sm placeholder:font-normal "
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
                          className="  w-full text-sm relative rounded-sm py-2 px-[5%]
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

                {/* <button className="w-[15%] outline-none border focus:bg-[#333333] focus:text-white bg-white text-xl text-primary rounded-tr rounded-br">
                    <FontAwesomeIcon icon={faCheck} />
                  </button> */}
                {/* </form> */}
              </div>
            )}
          </li>
          {playlistOwner && (
            <li className="w-full">
              <button
                className="w-full  rounded-sm py-2 px-[5%] text-base flex justify-between items-center hover:bg-[#2A2A2A] active:bg-[#2a2a2a] transition-all ease-in duration-300"
                onClick={removeTracks}
              >
                <span className="flex items-center ">
                  <FontAwesomeIcon icon={faXmark} className="mr-4" />
                  Remove from playlist {removeLoading && <LoaderMini />}
                </span>
              </button>
            </li>
          )}
          {artistsData && artistsData.length > 0 && (
            <li
              className="w-full li_parent relative rounded-sm py-2 px-[5%] text-base flex justify-between items-center hover:bg-[#2A2A2A] active:bg-[#2a2a2a] transition-all ease-in duration-300"
              onMouseEnter={() => handleHover("artist")}
              onMouseLeave={() => onBlurHandler("artist")}
            >
              {" "}
              {artistsData.length === 1 ? (
                <Link
                  to={`/artist/${artistsData[0].id}`}
                  className="w-full   text-base flex justify-between items-center hover:bg-[#2A2A2A] active:bg-[#2a2a2a] transition-all ease-in duration-300"
                >
                  <span>
                    <FontAwesomeIcon icon={faUserTie} className="mr-4" />
                    Go to artist
                  </span>
                </Link>
              ) : (
                <>
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faUserTie} className="mr-4" />
                    Go to artist
                  </span>
                  <FontAwesomeIcon icon={faCaretRight} />
                  {artist && (
                    <ul
                      className="w-[180px] overflow-x-hidden overflow-y-auto flex flex-col rounded-md font-bold py-1 px-1 bg-[#333333] absolute top-0 right-[100%] z-[7] "
                      style={{ maxHeight: `${bottomHeight}px` }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {artistsData.map((ad) => {
                        return (
                          <li className="w-full" key={ad.id}>
                            <Link
                              to={`/artist/${ad.id}`}
                              className="w-full ellipsis-container rounded-sm py-2 px-[5%] text-sm flex justify-between items-center hover:bg-[#2A2A2A] active:bg-[#2a2a2a] transition-all ease-in duration-300 "
                            >
                              {ad.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}
            </li>
          )}
          {albumId && (
            <li className="w-full">
              <Link
                to={`/album/${albumId}`}
                className="w-full  rounded-sm py-2 px-[5%] text-base flex justify-between items-center hover:bg-[#2A2A2A] active:bg-[#2a2a2a] transition-all ease-in duration-300"
              >
                <span>
                  <FontAwesomeIcon icon={faCompactDisc} className="mr-4" />
                  Go to album
                </span>
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default DestopOptions;
