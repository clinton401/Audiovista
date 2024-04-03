import React, { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import avatar from "../assets/user (1).png";
import songCover from "../assets/song cover.jpg";
import { Link, useNavigate } from "react-router-dom";
import DestopOptions from "./DestopOptions";
function TrackTableView({ tracksData, navHeight, type, mainData }) {
  const trackVerify = type.toLowerCase() === "track";
  const playlistVerify = type.toLowerCase() === "playlist";
  const albumVerify = type.toLowerCase() === "album";
  const mainDataVerify = mainData && mainData.type.toLowerCase() === "album";
  const heightToPx = `${navHeight}px`;
  const navigate = useNavigate();
  function tracksHandler(idNo) {
    navigate(`/track/${idNo}`);
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
  return (
    <div className="w-full text-tGray">
      <div
        className={`w-full flex justify-between bg-[#1A1A1A] sticky ${
          !trackVerify && "top-[60px] px-[2.5%] "
        } ${trackVerify && "top-[128px]"}
         z-[10] flex left-[-2px]`}
      >
        <h2
          className={` flex ${
            albumVerify ? " w-[85%]" : "w-[55%]"
          }  text-left px-4 py-2`}
        >
          <span className="w-[46px] justify-center  flex">#</span>Title
        </h2>
        {!albumVerify && (
          <h2 className="  w-[30%] text-left px-4 py-2">Album</h2>
        )}

        <h2
          className={` ${
            albumVerify ? " w-[15%]" : "w-[15%]"
          }  text-left px-4 py-2`}
        >
          <FontAwesomeIcon icon={faClock} />
        </h2>
      </div>
      <ul className={`w-full ${!trackVerify && "px-[2.5%]"}`}>
        {trackVerify && (
          <>
            {tracksData.map((tracks_d, index) => {
              const id = tracks_d.id;
              const albumId = tracks_d.album.id;
              const albumName = tracks_d.album.name;
              const imgUrl =
                tracks_d.album.images && tracks_d.album.images.length > 0
                  ? tracks_d.album.images[0].url
                  : avatar;
              const trackName = tracks_d.name;
              const trackUri = tracks_d.uri;
              const explicit = tracks_d.explicit;
              const artists = tracks_d.artists;
              const durationState = tracks_d.duration_ms
                ? msToHMS(tracks_d.duration_ms)
                : msToHMS(0);
              return (
                <li key={index} className="w-full list-none">
                  <div
                    className=" w-full h-[61px] flex items-center rounded-md outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  cursor-pointer py-2 relative track_card   "
                    onClick={() => tracksHandler(id)}
                  >
                    <span className="   px-4 py-2 h-full flex gap-1 w-[55%] items-center ellipsis-container">
                      <span className="w-[46px]">{index + 1}</span>
                      <span className="flex gap-x-3 items-center w-full ellipsis-container h-fulll ">
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
                    </span>
                    <span className="  px-4  py-2 h-full flex gap-3 w-[30%] items-center ellipsis-container text-xs  font-bold text-tGray">
                      <Link
                        to={`/album/${albumId}`}
                        className="text-xs w-full text-left font-bold text-tGray z-[4] hover:underline track_link ellipsis-container relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {" "}
                        {albumName}
                      </Link>
                    </span>
                    <span className="  px-4 py-2 h-full  w-[15%] items-center  flex justify-start   text-base  gap-2">
                      {/* <div className=" w-[46px] aspect-square flex items-center justify-start relative tc_cont">
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
                                <span className="text-xs font-bold w-full text-tGray z-[4]">
                                  {durationState.hours}:
                                </span>
                              </>
                            )}
                            {durationState && durationState.minutes && (
                              <>
                                <span className="text-xs font-bold w-full text-tGray z-[4]">
                                  {/* {durationState.minutes === 0 ? "00" : durationState.minutes} */}
                                  {durationState.minutes}:
                                </span>
                              </>
                            )}
                            {durationState && durationState.seconds && (
                              <>
                                <span className="text-xs w-full font-bold text-tGray z-[4]">
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
                      <span className="flex">
                        <DestopOptions
                          artistsData={artists}
                          albumId={albumId}
                          trackUri={trackUri}
                        />
                      </span>
                    </span>
                  </div>
                </li>
              );
            })}
          </>
        )}
        {albumVerify && (
          <>
            {tracksData.map((tracks_d, index) => {
              const id = tracks_d.id;

              const imgUrl =
                Object.keys(mainData).length > 0 &&
                mainData.images &&
                mainData.images.length > 0
                  ? mainData.images[0].url
                  : songCover;
              const trackName = tracks_d.name;
              const trackUri = tracks_d.uri;
              const explicit = tracks_d.explicit;
              const artists = tracks_d.artists;
              const durationState = tracks_d.duration_ms
                ? msToHMS(tracks_d.duration_ms)
                : msToHMS(0);
              return (
                <li key={index} className="w-full list-none">
                  <div
                    className=" w-full h-[61px] flex items-center rounded-md outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  cursor-pointer py-2 relative track_card   "
                    onClick={() => tracksHandler(id)}
                  >
                    <span className="   px-4 py-2 h-full flex gap-1 w-[85%] items-center ellipsis-container">
                      <span className="w-[46px]">{index + 1}</span>
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
                    </span>

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
                                  {/* {durationState.minutes === 0 ? "00" : durationState.minutes} */}
                                  {durationState.minutes}:
                                </span>
                              </>
                            )}
                            {durationState && durationState.seconds && (
                              <>
                                <span className="text-xs w-full font-bold text-tGray z-[4]">
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
                      <span className="flex">
                        <DestopOptions artistsData={artists} trackUri={trackUri} />
                      </span>
                    </span>
                  </div>
                </li>
              );
            })}
          </>
        )}
        {playlistVerify && (
          <>
            {tracksData.map((tracks_d, index) => {
              if (tracks_d.track) {
                const id = tracks_d.track.id;
                const albumId = tracks_d.track.album.id;
                const albumName = tracks_d.track.album.name;
                const imgUrl =
                  tracks_d.track.album.images &&
                  tracks_d.track.album.images.length > 0
                    ? tracks_d.track.album.images[0].url
                    : avatar;
                const trackName = tracks_d.track.name;
                const trackUri = tracks_d.track.uri;
                const explicit = tracks_d.track.explicit;
                const artists = tracks_d.track.artists;
                const durationState = tracks_d.track.duration_ms
                  ? msToHMS(tracks_d.track.duration_ms)
                  : msToHMS(0);
                return (
                  <li key={index} className="w-full list-none">
                    <div
                      className=" w-full h-[61px] flex items-center rounded-md outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  cursor-pointer py-2 relative track_card   "
                      onClick={() => tracksHandler(id)}
                    >
                      <span className="   px-4 py-2 h-full flex gap-1 w-[55%] items-center ellipsis-container">
                        <span className="w-[46px]">{index + 1}</span>
                        <span className="flex gap-x-3 items-center w-full ellipsis-container h-fulll ">
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
                      </span>
                      <span className="  px-4  py-2 h-full flex gap-3 w-[30%] items-center ellipsis-container text-xs  font-bold text-tGray">
                        <Link
                          to={`/album/${albumId}`}
                          className="text-xs w-full text-left font-bold text-tGray z-[4] hover:underline track_link ellipsis-container relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {" "}
                          {albumName}
                        </Link>
                      </span>
                      <span className="  px-4 py-2 h-full  w-[15%] items-center  flex justify-start   text-base  gap-2">
                        {/* <div className=" w-[46px] aspect-square flex items-center justify-start relative tc_cont">
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
                                  <span className="text-xs font-bold w-full text-tGray z-[4]">
                                    {durationState.hours}:
                                  </span>
                                </>
                              )}
                              {durationState && durationState.minutes && (
                                <>
                                  <span className="text-xs font-bold w-full text-tGray z-[4]">
                                    {/* {durationState.minutes === 0 ? "00" : durationState.minutes} */}
                                    {durationState.minutes}:
                                  </span>
                                </>
                              )}
                              {durationState && durationState.seconds && (
                                <>
                                  <span className="text-xs w-full font-bold text-tGray z-[4]">
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
                        <span className="flex">
                          <DestopOptions
                            artistsData={artists}
                            albumId={albumId}
                            trackUri={trackUri}
                          />
                        </span>
                      </span>
                    </div>
                  </li>
                );
              }
            })}
          </>
        )}
      </ul>
    </div>
  );
}

export default TrackTableView;
