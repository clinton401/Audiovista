import React, { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import avatar from "../assets/user (1).png";

import { Link, useNavigate } from "react-router-dom";
function TableView({ tracksData, navHeight }) {
  //   const [durationState, setDurationState] = useState({});
  //   const [duration, setDuration] = useState();
  //   const [liked, setLiked] = useState(false);
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
  //   useEffect(() => {
  //     const updatedTracksData = tracksData.map((td) => {
  //       return {
  //         ...td,
  //         duration_formatted: msToHMS(td.duration_ms),
  //       };
  //     });
  //     setDurationState(updatedTracksData);
  //   }, [tracksData]);

  //   useEffect(() => {
  //     if (duration) {
  //       setDurationState(msToHMS(duration));
  //     }
  //   }, [duration]);

  return (
    <div className="w-full ">
      <table className="w-full    text-tGray" style={{ tableLayout: "fixed" }}>
        <thead
          className={`w-full bg-[#1A1A1A] border-b sticky top-[${heightToPx}] z-50  left-[-2px]`}
        >
          <tr className="w-full">
            <th className="border border-gray-400 w-[40%] text-left px-4 py-2">
              <span className="pr-4">#</span>Title
            </th>
            <th className="border border-gray-400 w-[30%] text-left px-4 py-2">
              Album
            </th>
            <th className="border border-gray-400 w-[30%]  text-left px-4 py-2">
              <FontAwesomeIcon icon={faClock} />
            </th>
          </tr>
        </thead>

        <tbody className="w-full  border border-black  flex flex-col">
          {tracksData.map((tracks_d, index) => {
            const id = tracks_d.id;
            const albumId = tracks_d.album.id;
            const albumName = tracks_d.album.name;
            const imgUrl =
              tracks_d.album.images && tracks_d.album.images.length > 0
                ? tracks_d.album.images[0].url
                : avatar;
            const trackName = tracks_d.name;
            const explicit = tracks_d.explicit;
            const artists = tracks_d.artists;
            const durationState = tracks_d.duration_ms
              ? msToHMS(tracks_d.duration_ms)
              : msToHMS(0);
            return (
              <tr
                className=" w-[300%] h-[61px] flex items-center rounded-md gap-[10%] outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  cursor-pointer py-2 relative track_card border border-red-900 "
                onClick={() => tracksHandler(id)}
                key={index}
              >
                <td className="border border-gray-400  px-4 py-2 h-full flex gap-4  items-center ellipsis-container">
                  <span>{index + 1}</span>
                  <span className="flex gap-x-3 items-center w-full ellipsis-container h-fulll ">
                    <img
                      src={imgUrl}
                      alt={`${trackName} image`}
                      loading="lazy"
                      className="rounded-md h-[45px] aspect-square"
                    />
                    <div className="flex flex-col gap-[1px] w-full justify-center items-start ellipsis-container">
                      <h3 className="font-[700] text-white text-lg ellipsis-container w-full">
                        {trackName}
                      </h3>
                      <span className="flex gap-1 items-center relative w-auto ellipsis-container">
                        {explicit !== null && (
                          <>
                            {explicit === true && (
                              <div className=" h-[15px] aspect-square flex items-center justify-center bg-[#36454F] text-primary font-[900]  text-[10px]">
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
                                    className="text-xs w-full font-bold text-gray-300 z-10 hover:underline track_link relative"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {art.name}
                                  </Link>
                                  {index < artists.length - 1 && (
                                    <span className="text-gray-300 ">|</span>
                                  )}
                                </div>
                              </React.Fragment>
                            ))}
                          </>
                        )}
                      </span>
                    </div>
                  </span>
                </td>
                <td className="border border-gray-400 px-4  py-2 h-full flex gap-3 items-center ellipsis-container text-xs  font-bold text-gray-300">
                  <Link
                    to={`/album/${albumId}`}
                    className="text-xs w-full font-bold text-gray-300 z-10 hover:underline track_link ellipsis-container relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {" "}
                    {albumName}
                  </Link>
                </td>
                <td className="border border-gray-400 px-4 py-2 h-full   items-center ellipsis-container flex justify-center   text-lg  gap-2">
                  <div className=" w-[30px] aspect-square flex items-center justify-center relative tc_cont">
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="track_popup bottom-[120%] hidden right-0 absolute min-w-[150px] p-2 z-50 rounded-md  bg-[#191919] font-bold text-sm justify-center items-center">
                      Add to playlist
                    </span>
                  </div>
                  <p className="flex items-center">
                    {Object.keys(durationState).length > 0 && (
                      <>
                        {durationState && !durationState.hours <= 0 && (
                          <>
                            <span className="text-xs font-bold w-full text-gray-300 z-10">
                              {durationState.hours}:
                            </span>
                          </>
                        )}
                        {durationState && durationState.minutes && (
                          <>
                            <span className="text-xs font-bold w-full text-gray-300 z-10">
                              {/* {durationState.minutes === 0 ? "00" : durationState.minutes} */}
                              {durationState.minutes}:
                            </span>
                          </>
                        )}
                        {durationState && durationState.seconds && (
                          <>
                            <span className="text-xs w-full font-bold text-gray-300 z-10">
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
