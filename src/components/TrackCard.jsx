import {
  faPlay,
  faPlus,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DestopOptions from "./DestopOptions";
import { msToHMS } from "../lib/utils";
import { myContext } from "../App";
import LoaderMini from "./LoaderMini";
function TrackCard({
  image,
  artists,
  trackName,
  idNo,
  duration,
  explicit,
  albumId,
  trackUri,
  playlistOwner,
}) {
  const [durationState, setDurationState] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedError, setIsLikedError] = useState(false);
  const [likedLoading, setLikedLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);
  const [buttonClickNotLoggedIn, setButtonClickNotLoggedIn] = useState(false);
  const { loggedIn, SEARCH_PARAM, accessToken, createToast } = useContext(myContext);
  const navigate = useNavigate();

  function tracksHandler() {
    navigate(`/track/${idNo}`);
  }
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

  useEffect(() => {
    if (duration) {
      setDurationState(msToHMS(duration));
    }
  }, [duration]);
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
      
      <div
        className=" w-full h-[61px] flex items-center rounded-md gap-[5%] cursor-pointer outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  p-2 relative track_card "
        onClick={tracksHandler}
      >
        <span className=" h-full flex gap-3 items-center ellipsis-container">
          <img
            src={image}
            alt={`${trackName} image`}
            loading="lazy"
            className="rounded-md h-full aspect-square"
          />
          <div className="flex flex-col gap-[1px] justify-center flex-grow ellipsis-container items-start ">
            <h3 className="font-[700] text-lg truncate w-full ">{trackName}</h3>
            <span className="flex gap-1 w-full  items-center  relative ">
              {explicit !== null && (
                <>
                  {explicit === true && (
                    <div className=" h-[15px] rounded-sm aspect-square  flex items-center justify-center bg-[#36454F] text-primary font-[900]  text-[10px]">
                      E
                    </div>
                  )}
                </>
              )}
              {artists && (
                <>
                  {artists.map((art, index) => (
                    <React.Fragment key={art.id}>
                      <div className=" flex gap-1   items-center ">
                        <Link
                          to={`/artist/${art.id}`}
                          className="text-xs w-full font-bold text-tGray z-5 hover:underline track_link relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {art.name}
                        </Link>
                        {index < artists.length - 1 && (
                          <span className="text-tGray ">|</span>
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </>
              )}
            </span>
          </div>
        </span>
        <div className="flex justify-start  min-w-[110px] items-center text-lg  gap-1">
          <span
            className={`flex items-center mr-1 justify-center  w-[30px] aspect-square track ${
              !likedLoading ? "tooltip-container" : ""
            }  text-sm`}
          >
            <span className="tooltip  text-sm font-[500]">
              {isLiked ? "Remove from" : "Add to"} library
            </span>{" "}
            {likedLoading ? (
              <LoaderMini />
            ) : (
              <FontAwesomeIcon
                icon={isLiked ? fasHeart : farHeart}
                onClick={(e) => {
                  e.stopPropagation();
                  addToOrRemoveFromLikedSongs();
                }}
                className={`${isLiked ? "text-spotify" : ""}`}
              />
            )}
          </span>
          <p className="flex items-center">
            {Object.keys(durationState).length > 0 && (
              <>
                {durationState && !durationState.hours <= 0 && (
                  <>
                    <span className="text-xs font-bold w-full text-tGray z-5">
                      {durationState.hours}:
                    </span>
                  </>
                )}
                {durationState && durationState.minutes && (
                  <>
                    <span className="text-xs font-bold w-full text-tGray z-5">
                      {durationState.minutes}:
                    </span>
                  </>
                )}
                {durationState && durationState.seconds && (
                  <>
                    <span className="text-xs w-full font-bold text-tGray z-5">
                      {durationState.seconds}
                    </span>
                  </>
                )}
              </>
            )}
          </p>
          <span className="flex text-tGray">
            <DestopOptions
              artistsData={artists}
              albumId={albumId}
              trackUri={trackUri}
              playlistOwner={playlistOwner}
            />
          </span>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default TrackCard;
