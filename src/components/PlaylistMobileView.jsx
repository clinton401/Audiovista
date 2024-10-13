import React, {forwardRef} from "react";
import {
  faChevronLeft,
  faPlay,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "./Loader";
import avatar from "../assets/user (1).png";
import MobileTracksCard from "./MobileTracksCard";
import songCover from "../assets/song cover.jpg";
import { Link } from "react-router-dom";
import TrackPlayBtn from "./TrackPlayBtn";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import NavLayoutMobile from "./NavLayoutMobile";

import CopyrightsAndDate from "./CopyrightsAndDate";
const PlaylistMobileView = forwardRef((
  {
  playlistData,
  isLoading,
  loggedIn,
  dataError,
  navContentsActive,
  BackHandler,
  playlistTracks,
  durationState,
  userAuth,
  editPlaylistActiveHandler,
  getPlaylist,
  setNavContentsActive,
}, ref) => {
  return (
    <>
      {!isLoading && !dataError && (
        <>
          <NavLayoutMobile
            navContentsActive={navContentsActive}
            isLoading={isLoading}
            name={playlistData.name}
            setNavContentsActive={setNavContentsActive}
          />
          <section className="flex flex-col px-[2.5%] justify-center items-center gap-2 pt-20 pb-6 bg-[#333333]">
            <img
              src={
                Object.keys(playlistData).length > 0 &&
                playlistData.images &&
                playlistData.images.length > 0
                  ? playlistData.images[0].url
                  : avatar
              }
              alt={`${playlistData.name} image`}
              loading="lazy"
              className=" w-[40%] mb-2 shadow-xl rounded-md object-cover"
            />

            <div className="flex flex-col items-start w-full ">
              <h1 className="font-bold text-2xl text-left  text-white">
                {playlistData.name}
              </h1>
              {playlistData.type === "playlist" && (
                <>
                  {playlistData.description &&
                    playlistData.description.charAt(0) !== "<" && (
                      <p className="text-sm pt-2 text-tGray font-[500]  ">
                        {playlistData.description.slice(0, 200)}
                      </p>
                    )}
                </>
              )}{" "}
            </div>
            <div className="flex text-xs w-full font-[400] flex-wrap  gap-1">
              {playlistData.type === "playlist" && (
                <Link
                  to={`/user/${playlistData.owner.id}`}
                  className="font-[900] hover:underline focus:underline"
                >
                  {playlistData.owner.display_name}
                </Link>
              )}
              {playlistData.type === "album" && playlistData.artists && (
                <>
                  {playlistData.artists.map((pa) => {
                    return (
                      <React.Fragment key={pa.id}>
                        <Link
                          to={`/artist/${pa.id}`}
                          className="font-[900] hover:underline focus:underline"
                        >
                          {pa.name}
                        </Link>
                        |
                      </React.Fragment>
                    );
                  })}
                </>
              )}
              {playlistData.type === "album" && (
                <span> {playlistData.release_date.slice(0, 4)}</span>
              )}
              <span> | {playlistData.tracks.total} songs |</span>
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
            <div className="flex justify-start flex-wrap items-center gap-6 w-full">
              {" "}
              <TrackPlayBtn />
              {userAuth && (
                <button
                  className="w-[30px] bg-[#333333] aspect-square relative tooltip-container  rounded-md flex items-center justify-center"
                  id="tpc"
                  onClick={editPlaylistActiveHandler}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <p className="   text-sm rounded-md tooltip playlist_tooltip   ">
                    Edit playlist title
                  </p>
                </button>
              )}
            </div>
          </section>
          {playlistTracks.length > 0 ? (
            <section className="w-full pt-2 " ref={ref}>
              <div className="w-full  flex  flex-wrap justify-between  items-center ">
                {playlistData.type === "playlist" && (
                  <>
                    {playlistTracks.map((td, index) => {
                      if (td.track) {
                        const imgUrl =
                          td.track.album &&
                          td.track.album.images &&
                          td.track.album.images.length > 0
                            ? td.track.album.images[0].url
                            : avatar;

                        return (
                          <MobileTracksCard
                            key={index}
                            trackUri={td.track.uri}
                            idNo={td.track.id}
                            artists={td.track.artists}
                            image={imgUrl}
                            trackName={td.track.name}
                            type={td.track.type}
                            artistDetails={td.track}
                            getPlaylist={getPlaylist}
                            playlistOwner={userAuth}
                            mainData={playlistData}
                          />
                        );
                      }
                    })}
                  </>
                )}
                {playlistData.type === "album" && (
                  <>
                    {playlistTracks.map((td, index) => {
                      const imgUrl =
                        Object.keys(playlistData).length > 0 &&
                        playlistData.images &&
                        playlistData.images.length > 0
                          ? playlistData.images[0].url
                          : songCover;

                      return (
                        <MobileTracksCard
                          key={index}
                          idNo={td.id}
                          trackUri={td.uri}
                          artists={td.artists}
                          image={imgUrl}
                          trackName={td.name}
                          type={td.type}
                          artistDetails={td}
                          mainData={playlistData}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </section>
          ) : (
            <span className="w-full  pt-8  flex flex-col gap-2 px-[2.5%]">
              <h2 className="w-full font-[900] text-center text-2xl">
                Empty {playlistData.type}
              </h2>
            </span>
          )}
         {playlistData.type === "album" && <div className="w-full pb-[120px]">
          <CopyrightsAndDate release_date={playlistData.release_date} copyrights={playlistData.copyrights}/>
          </div>}
          

        </>
      )}
      {isLoading && !dataError && (
        <section className="w-full flex items-center px-[2.5%] justify-center h-dvh min-h-[400px] ">
          <Loader />
        </section>
      )}
    </>
  );
})

export default PlaylistMobileView;
