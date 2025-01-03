import React, { useState, useEffect, useContext } from "react";
import {
  faPlay,
  faPlus,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import DestopOptions from "./DestopOptions";
import { myContext } from "../App";
import LoaderMini from "./LoaderMini";
function TrackTableBtns({
  id,
  albumId,
  albumName,
  imgUrl,
  trackName,
  trackUri,
  explicit,
  artists,
  durationState,
  tracksHandler,
  index,
  playlistOwner,
  playlistId,
  getPlaylist,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedError, setIsLikedError] = useState(false);
  const [likedLoading, setLikedLoading] = useState(false);
  const [buttonClickNotLoggedIn, setButtonClickNotLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { loggedIn, SEARCH_PARAM, accessToken, createToast } = useContext(myContext);
  const [successMessage, setSuccessMessage] = useState(null);
  async function checkifAddedToLiked() {
    try {
      setLikedLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`;
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
    ids: [id],
  };
  async function addToORemoveFromLike(methodType) {
    try {
      setLikedLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/me/tracks?ids=${id}`;
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
      setSuccessMessage(null);
      setIsLikedError(true);
    } finally {
      setLikedLoading(false);
    }
  }
  useEffect(() => {
    if (loggedIn && isHovered) {
      checkifAddedToLiked();
    }
  }, [loggedIn, isHovered]);
  useEffect(() => {
    let timeoutId;
    if (buttonClickNotLoggedIn || isLikedError || successMessage) {
      timeoutId = setTimeout(() => {
        setButtonClickNotLoggedIn(false);
        setIsLikedError(false);
        setSuccessMessage(null);
      }, 3000);
    }
    () => clearTimeout(timeoutId);
  }, [buttonClickNotLoggedIn, isLikedError, successMessage]);
  useEffect(() => {
    if ((buttonClickNotLoggedIn )) {
      createToast("You need to be logged in first", "warn")
    } else if (isLikedError) {
      createToast("Something went wrong. Please try again later", "error")
    } else if(successMessage) {
      createToast(successMessage, "success")
    }
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
  return (
    <>
      
      <button
        className=" w-full h-[61px] flex  items-center rounded-md outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  cursor-pointer  relative track_card"
        onClick={() => tracksHandler(id)}
        onMouseEnter={() => setIsHovered(true)}
      >
        <span className="px-4 py-2 h-full flex gap-1 w-[55%] items-center ellipsis-container">
          <span className="w-[46px]  flex items-center justify-left">{index + 1}</span>
          <span className="flex gap-x-3 items-center w-full ellipsis-container h-full">
            <img
              src={imgUrl}
              alt={`${trackName} image`}
              loading="lazy"
              className="rounded-md h-[45px] aspect-square"
            />
            <div className="flex flex-col gap-[1px] w-full justify-center items-start ellipsis-container">
              <h3 className="font-[700] text-white text-base text-left ellipsis-container w-full">
                {trackName}
              </h3>
              <span className="flex gap-1 items-center relative w-auto ellipsis-container">
                {explicit !== null && explicit === true && (
                  <div className="h-[15px] aspect-square rounded-sm flex items-center justify-center bg-[#36454F] text-primary font-[900] text-[10px]">
                    E
                  </div>
                )}
                {artists && (
                  <>
                    {artists.map((art, index) => (
                      <React.Fragment key={art.id}>
                        <div className="w-full flex gap-1 items-center">
                          <Link
                            to={`/artist/${art.id}`}
                            className="text-xs w-full font-bold text-tGray z-[4] hover:underline track_link relative"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {art.name}
                          </Link>
                          {index < artists.length - 1 && (
                            <span className="text-tGray">|</span>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </span>
            </div>
          </span>
        </span>
        <span className="px-4 py-2 h-full flex gap-3 w-[30%] items-center ellipsis-container justify-between  text-xs font-bold text-tGray">
          <Link
            to={`/album/${albumId}`}
            className="text-xs w-full text-left font-bold text-tGray z-[4] hover:underline track_link ellipsis-container relative"
            onClick={(e) => e.stopPropagation()}
          >
            {albumName}
          </Link>
          <span
            className={`flex items-center mr-1 justify-center  w-[30px] aspect-square track ${
              !likedLoading ? "tooltip-container" : ""
            }  text-sm`}
          >
            {likedLoading ? (
              <LoaderMini />
            ) : (
              <FontAwesomeIcon
                icon={isLiked ? fasHeart : farHeart}
                onClick={(e) => {
                  e.stopPropagation();
                  addToOrRemoveFromLikedSongs();
                }}
                className={`${isLiked ? "text-spotify " : "t_card_play"}`}
              />
            )}
          </span>
        </span>
        <span className="px-4 py-2 h-full w-[15%] items-center flex justify-start text-base gap-2">
          <p className="flex items-center">
            {Object.keys(durationState).length > 0 && (
              <>
                {durationState.hours > 0 && (
                  <span className="text-xs font-bold w-full text-tGray z-[4]">
                    {durationState.hours}:
                  </span>
                )}
                <span className="text-xs font-bold w-full text-tGray z-[4]">
                  {durationState.minutes}:
                </span>
                <span className="text-xs w-full font-bold text-tGray z-[4]">
                  {durationState.seconds}
                </span>
              </>
            )}
          </p>
          <span className="flex">
            <DestopOptions
              artistsData={artists}
              albumId={albumId}
              trackUri={trackUri}
              playlistOwner={playlistOwner}
              playlistId={playlistId}
              getPlaylist={getPlaylist}
            />
          </span>
        </span>
      </button>
    </>
  );
}

export default TrackTableBtns;
