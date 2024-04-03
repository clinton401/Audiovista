import {
  faPlay,
  faPlus,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DestopOptions from "./DestopOptions";
function TrackCard({
  image,
  artists,
  trackName,
  idNo,
  duration,
  explicit,
  albumId, trackUri
}) {
  const [durationState, setDurationState] = useState({});
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
 
  function tracksHandler() {
    navigate(`/track/${idNo}`);
  }
  function getNumberLength(number) {
    // Convert the number to a string
    const numberString = Math.abs(number).toString();

    // Return the length of the string
    return numberString.length;
  }
  function msToHMS(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const calculatedMinutes = Math.floor(totalSeconds / 60);
    const calculatedSeconds = totalSeconds % 60;
    const minutes =
      calculatedMinutes === 0 ? `0${calculatedMinutes}` : calculatedMinutes;
    const seconds =
      calculatedSeconds < 10 ? `0${calculatedSeconds}` : calculatedSeconds;

    return { hours, minutes, seconds };
  }
  useEffect(() => {
    if (duration) {
      setDurationState(msToHMS(duration));
    }
  }, [duration]);

  return (
    <div
      className=" w-full h-[61px] flex items-center rounded-md gap-[5%] cursor-pointer outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  p-2 relative track_card "
      onClick={tracksHandler}
    >
      {/* <div
        className="w-full h-[45px] flex items-center  gap-[10%]  justify-between"
      > */}
      <span className=" h-full flex gap-3 items-center ellipsis-container">
        <img
          src={image}
          alt={`${trackName} image`}
          loading="lazy"
          className="rounded-md h-full aspect-square"
        />
        <div className="flex flex-col gap-[1px] justify-center items-start ellipsis-container">
          <h3 className="font-[700] text-lg">{trackName}</h3>
          <span className="flex gap-1 items-center relative w-auto">
            {explicit !== null && (
              <>
                {explicit === true && (
                  <div className=" h-[15px] rounded-sm aspect-square flex items-center justify-center bg-[#36454F] text-primary font-[900]  text-[10px]">
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
      <span className="flex justify-start  min-w-[70px] items-center text-lg  gap-1">
        {/* <a className="w-[30px] aspect-square flex items-center justify-center relative tc_cont">
          <FontAwesomeIcon icon={farHeart} />
          <span className="track_popup bottom-[120%] hidden right-0 absolute min-w-[150px] p-2 z-50 rounded-lg  bg-[#191919] font-bold text-sm justify-center items-center">
            {liked ? "Unlike" : "Like"} the song
          </span>
        </a> */}

        {/* <div className=" w-[30px] aspect-square flex items-center justify-center relative tc_cont">
          <FontAwesomeIcon icon={faPlus} />
          <span className="track_popup bottom-[120%] hidden right-0 absolute min-w-[150px] p-2 z-50 rounded-md  bg-[#191919] font-bold text-sm justify-center items-center">
            Add to playlist
          </span>
        </div> */}
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
                    {/* {durationState.minutes === 0 ? "00" : durationState.minutes} */}
                    {durationState.minutes}:
                  </span>
                </>
              )}
              {durationState && durationState.seconds && (
                <>
                  <span className="text-xs w-full font-bold text-tGray z-5">
                    {durationState.seconds}
                    {/* {durationState.seconds < 10
                      ? `0${durationState.seconds}`
                      : durationState.seconds} */}
                    {/* {durationState.seconds === 0 ? (
                      "00"
                    ) : (
                      <>
                        {getNumberLength(durationState.seconds) === 1
                          ? `0${durationState.seconds}`
                          : durationState.seconds}
                      </>
                    )} */}
                    {/* {getNumberLength(durationState.seconds) === 1
                      ? `0${durationState.seconds}`
                      : durationState.seconds} */}
                  </span>
                </>
              )}
            </>
          )}
        </p>
        <span className="flex text-tGray">
          <DestopOptions artistsData={artists} albumId={albumId} trackUri={trackUri}/>
        </span>
      </span>
      {/* </div> */}
    </div>
  );
}

export default TrackCard;
