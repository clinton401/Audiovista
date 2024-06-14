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
import Modals from "./Modals";
import { myContext } from "../App";
import LoaderMini from "./LoaderMini";
function TrackTableAlbumBtn({
  id,
  imgUrl,
  trackName,
  trackUri,
  explicit,
  artists,
  durationState,
  tracksHandler,
  index,
  mainDataVerify,
}) {
     const [isLiked, setIsLiked] = useState(false);
     const [isLikedError, setIsLikedError] = useState(false);
     const [likedLoading, setLikedLoading] = useState(false);
     const [buttonClickNotLoggedIn, setButtonClickNotLoggedIn] =
       useState(false);
       
    const [isHovered, setIsHovered] = useState(false);
     const { loggedIn, SEARCH_PARAM, accessToken } = useContext(myContext);
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
       if ((buttonClickNotLoggedIn || isLikedError || successMessage)) {
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
  return (
    <>
      {buttonClickNotLoggedIn && (
        <Modals text="You need to be logged in first" />
      )}
      {isLikedError && (
        <Modals text="Something went wrong. Please try again later" />
      )}
      {successMessage && <Modals text={successMessage} />}

      <button
        className=" w-full h-[61px] flex items-center rounded-md outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  cursor-pointer  relative track_card   "
        onClick={() => tracksHandler(id)}
         onMouseEnter ={ () => setIsHovered(true)}
      >
        <div className="   px-4 py-2 h-full flex gap-3 w-[85%] justify-between items-center ellipsis-container">
          <div className="flex gap-1 items-center h-full ellipsis-container">
            <span className="w-[46px] ">{index + 1}</span>
            <span className="flex gap-x-3 items-center w-full ellipsis-container h-fulll ">
              {!mainDataVerify && (
                <img
                  src={imgUrl}
                  alt={`${trackName} image`}
                  loading="lazy"
                  className="rounded-md h-[45px] aspect-square"
                />
              )}
              <div className="flex flex-col gap-[1px] w-full justify-center items-start ellipsis-container">
                <h3 className="font-[700] text-white text-base text-left ellipsis-container w-full">
                  {trackName}
                </h3>
                <span className="flex gap-1 items-center relative w-auto ellipsis-container">
                  {explicit !== null && (
                    <>
                      {explicit === true && (
                        <div className=" h-[15px] aspect-square rounded-sm flex items-center justify-center bg-[#36454F] text-primary font-[900]  text-[10px]">
                          E
                        </div>
                      )}
                    </>
                  )}
                  {artists && (
                    <>
                      {artists.map((art, index) => (
                        <React.Fragment key={art.id}>
                          <div className="w-full flex gap-1 items-center ">
                            <Link
                              to={`/artist/${art.id}`}
                              className="text-xs w-full font-bold text-tGray z-[4] hover:underline track_link relative"
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
          </div>
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
        </div>

        <span className="  px-4 py-2 h-full  w-[15%] items-center  flex justify-start   text-base  gap-2">
          <p className="flex items-center">
            {Object.keys(durationState).length > 0 && (
              <>
                {durationState && !durationState.hours <= 0 && (
                  <>
                    <span className="text-xs font-bold w-full text-tGray z-[4]">
                      {durationState.hours}:
                    </span>
                  </>
                )}
                {durationState && durationState.minutes && (
                  <>
                    <span className="text-xs font-bold w-full text-tGray z-[4]">
                      {durationState.minutes}:
                    </span>
                  </>
                )}
                {durationState && durationState.seconds && (
                  <>
                    <span className="text-xs w-full font-bold text-tGray z-[4]">
                      {durationState.seconds}
                    </span>
                  </>
                )}
              </>
            )}
          </p>
          <span className="flex">
            <DestopOptions artistsData={artists} trackUri={trackUri} />
          </span>
        </span>
      </button>
    </>
  );
}

export default TrackTableAlbumBtn;
