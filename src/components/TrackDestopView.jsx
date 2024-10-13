import React, { forwardRef } from "react";
import Loader from "./Loader";
import NavLayout from "./NavLayout";
import avatar from "../assets/user (1).png";
import { Link, useNavigate } from "react-router-dom";
import TrackPlayBtn from "./TrackPlayBtn";
const TrackDestopView = forwardRef(
  (
    {
      isLoading,
      loggedIn,
      dataError,
      navContentsActive,
      BackHandler,
      durationState,
      trackData,
      artistsData,
    },
    ref
  ) => {
    const navigate = useNavigate();
    return (
      <>
        {!isLoading && !dataError && (
          <>
            <NavLayout
              navContentsActive={navContentsActive}
              BackHandler={BackHandler}
              isLoading={isLoading}
              name={trackData.name}
              loggedIn={loggedIn}
            />
            <section className="w-full min-h-[300px] flex items-end  bg-[#333333] gap-4 relative pt-4 pb-8 px-[2.5%] ">
              <div className="min-w-[180px] max-w-[200px] hover:scale-105 transition-all duration-300 ease-in   w-[20%] rounded-md">
                <img
                  src={
                    Object.keys(trackData).length > 0 &&
                    trackData.album.images &&
                    trackData.album.images.length > 0
                      ? trackData.album.images[0].url
                      : avatar
                  }
                  loading="lazy"
                  className="rounded-md shadow-xl object-cover aspect-square  w-full"
                  alt={`${trackData.name} image`}
                />
              </div>
              <div className="flex flex-col justify-end w-[80%] pb-2 flex-wrap min-h-[242px] gap-y-3">
                <h6 className="text-base ">{trackData.type}</h6>
                <h1 className="text-3xl font-[900]">{trackData.name}</h1>

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

                  <span className="flex items-center gap-1">
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
            </section>
            <div
              className="pt-6 px-[2.5%] flex flex-col gap-6 ipad:pb-[80px] rounded-md "
              ref={ref}
            >
              <section className="flex   justify-start items-center gap-6">
                <TrackPlayBtn />
              </section>
              <ul className="w-full ">
                {artistsData.length > 0 && (
                  <>
                    {artistsData.map((art) => {
                      return (
                        <li key={art.id} className="w-full">
                          <button
                            className="w-full rounded-md flex gap-4 min-h-[96px] outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  items-center p-2"
                            onClick={() => navigate(`/artist/${art.id}`)}
                          >
                            <img
                              src={
                                art.images &&
                                art.images.length > 0
                                  ? art.images[0].url
                                  : avatar
                              }
                              className="rounded-full shadow-xl object-cover aspect-square  h-[80px]"
                              alt={`${art.name} image`}
                              loading="lazy"
                            />
                            <span className="flex items-start justify-center flex-col gap-2">
                              <h4 className="font-[500] text-sm">Artist</h4>
                              <Link
                                to={`/artist/${art.id}`}
                                className="font-[900] hover:underline focus:underline text-xl"
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
              <CopyrightsAndDate release_date={trackData.album.release_date} copyrights={[]}/>
            </div>
          </>
        )}
        {isLoading && !dataError && (
          <section className="w-full flex items-center px-[2.5%] justify-center ipad:max-h-[900px] h-dvh min-h-[400px] ">
            <Loader />
          </section>
        )}
      </>
    );
  }
);

export default TrackDestopView;
