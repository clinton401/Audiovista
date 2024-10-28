import React, { useState, useEffect, useContext } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import avatar from "../assets/user (1).png";
import songCover from "../assets/song cover.jpg";
import { Link, useNavigate } from "react-router-dom";
import DestopOptions from "./DestopOptions";
import { msToHMS } from "../lib/utils";

import TrackTableBtns from "./TrackTableBtns";
import TrackTableAlbumBtn from "./TrackTableAlbumBtn";
function TrackTableView({
  tracksData,
  navHeight,
  type,
  mainData,
  playlistOwner,
  getPlaylist
}) {
  const trackVerify = type.toLowerCase() === "track";
  const playlistVerify = type.toLowerCase() === "playlist";
  const albumVerify = type.toLowerCase() === "album";
  const mainDataVerify = mainData && mainData.type.toLowerCase() === "album";
  const heightToPx = `${navHeight}px`;
  const navigate = useNavigate();
  function tracksHandler(idNo) {
    navigate(`/track/${idNo}`);
  }

  return (
    <div className="w-full text-tGray">
      <div
        className={`w-full flex justify-between bg-[#1A1A1A] sticky ${
          !trackVerify && "top-[58px] px-[2.5%] "
        } ${trackVerify && "top-[67px]"}
         z-[10] flex left-[-2px]`}
      >
        <h2
          className={` flex ${
            albumVerify ? " w-[85%]" : "w-[55%]"
          }  text-left px-4 py-2`}
        >
          <span className="w-[46px] items-center justify-start  flex">#</span>Title
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
                  <TrackTableBtns
                    id={id}
                    albumId={albumId}
                    albumName={albumName}
                    imgUrl={imgUrl}
                    trackName={trackName}
                    trackUri={trackUri}
                    explicit={explicit}
                    artists={artists}
                    durationState={durationState}
                    tracksHandler={tracksHandler}
                    index={index}
                  />
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
                  <TrackTableAlbumBtn
                    id={id}
                    imgUrl={imgUrl}
                    trackName={trackName}
                    trackUri={trackUri}
                    explicit={explicit}
                    artists={artists}
                    durationState={durationState}
                    tracksHandler={tracksHandler}
                    index={index}
                    mainDataVerify={mainDataVerify}
                  />
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
                    <TrackTableBtns
                      id={id}
                      albumId={albumId}
                      albumName={albumName}
                      imgUrl={imgUrl}
                      trackName={trackName}
                      trackUri={trackUri}
                      explicit={explicit}
                      artists={artists}
                      durationState={durationState}
                      tracksHandler={tracksHandler}
                      index={index}
                      playlistOwner={playlistOwner}
                      playlistId={mainData.id}
                      getPlaylist={getPlaylist}
                    />
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
