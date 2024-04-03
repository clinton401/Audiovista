import React from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import {
  faChevronLeft,
  faPlay,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileTracksCard from "./MobileTracksCard";
import avatar from "../assets/user (1).png";
import TrackPlayBtn from "./TrackPlayBtn";
function TrackMobileView({
  isLoading,
  loggedIn,
  dataError,

  BackHandler,
  durationState,
  trackData,
}) {
  return (
    <>
      {!isLoading && !dataError && (
        <>
          <nav className="fixed  px-[2.5%] py-4 z-40  top-0 left-0">
            <button
              className={` w-[45px] aspect-square bg-black
                  } relative rounded-full flex justify-center items-center go_back_btn`}
              onClick={BackHandler}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-xl  text-white"
              />
            </button>
          </nav>
          <section className="flex flex-col px-[2.5%] justify-center items-center gap-4 pt-20 pb-6 bg-[#333333]">
            <img
              src={
                Object.keys(trackData).length > 0 &&
                trackData.album.images &&
                trackData.album.images.length > 0
                  ? trackData.album.images[0].url
                  : avatar
              }
              alt={`${trackData.name} image`}
              loading="lazy"
              className=" w-[40%] shadow-xl rounded-md object-cover"
            />

            <div className="flex flex-col items-start w-full gap-2">
              <h1 className="text-2xl font-[900]">{trackData.name}</h1>

              <div className="flex text-sm w-full font-[400] flex-wrap gap-1">
                <Link
                  to={`/artist/${trackData.artists[0].id}`}
                  className="font-[900] hover:underline focus:underline"
                >
                  {trackData.artists[0].name}
                </Link>

                <Link
                  to={`/album/${trackData.album.id}`}
                  className=" hover:underline focus:underline"
                >
                  | {trackData.album.name}{" "}
                </Link>
                <span>| {trackData.album.release_date.slice(0, 4)} |</span>

                <span className="flex flex-wrap items-center gap-1">
                  {Object.keys(durationState).length > 0 && (
                    <>
                      {durationState.hours > 0 && (
                        <>
                          {durationState.hours === 1 ? (
                            <p>{durationState.hours} hr</p>
                          ) : (
                            <p>{durationState.hours} hrs</p>
                          )}
                        </>
                      )}
                      {durationState.minutes > 0 && (
                        <>
                          {durationState.minutes === 1 ? (
                            <p>{durationState.minutes} min</p>
                          ) : (
                            <p>{durationState.minutes} mins</p>
                          )}
                        </>
                      )}
                      {durationState.seconds > 0 && (
                        <>
                          {durationState.seconds === 1 ? (
                            <p>{durationState.seconds} sec</p>
                          ) : (
                            <p>{durationState.seconds} secs</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-start items-center gap-6 w-full">
              {" "}
              <TrackPlayBtn />
            </div>
          </section>
          <section className="w-full pt-8 px-[2.5%] pb-[120px]">
            <ul className="w-full ">
              {Object.keys(trackData).length > 0 &&
                trackData.artists &&
                trackData.artists.length > 0 && (
                  <>
                    {trackData.artists.map((art) => {
                      return (
                        <li key={art.id} className="w-full">
                          <button
                            className="w-full rounded-md flex overflow-x-hidden gap-4 min-h-[116px] outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  items-center p-2"
                            onClick={() => navigate(`/artist/${art.id}`)}
                          >
                            <img
                              src={avatar}
                              className="rounded-full shadow-xl object-cover aspect-square  h-[100px]"
                              alt={`${art.name} image`}
                              loading="lazy"
                            />
                            <span className="flex items-start justify-center flex-col gap-2">
                              <h4 className="font-[500] text-left text-sm">
                                Artist
                              </h4>
                              <Link
                                to={`/artist/${art.id}`}
                                className="font-[900] hover:underline text-left focus:underline text-xl"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {art.name}
                              </Link>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </>
                )}
            </ul>
          </section>
        </>
      )}
      {isLoading && !dataError && (
        <section className="w-full flex items-center px-[2.5%] justify-center h-dvh min-h-[400px] ">
          <Loader />
        </section>
      )}
    </>
  );
}

export default TrackMobileView;
