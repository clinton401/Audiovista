import React, { forwardRef } from "react";
import Loader from "./Loader";
import NavLayout from "./NavLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import avatar from "../assets/user (1).png";
import Card from "./PlaylistCard";
import SocilaMedia from "./SocilaMedia";
import ArtisrtCard from "./ArtisrtCard";
import { useNavigate, Link } from "react-router-dom";
import DestopOptions from "./DestopOptions";
import { msToHMS } from "../lib/utils";
import TrackTableBtns from "./TrackTableBtns";
const LibraryDesktopView = forwardRef(
  (
    {
      dataError,
      loggedIn,
      isLoading,
      BackHandler,
      userData,
      navContentsActive,
      followingArtists,
      authUserPlaylistData,
      topArtistByMonth,
      topTrackByMonth,
      chosenNavColor
    },
    ref
  ) => {
    const navigate = useNavigate();
    function tracksHandler(idNo) {
      navigate(`/track/${idNo}`);
    }

    return (
      <>
        {!isLoading && !dataError && (
          <>
            <NavLayout
              navContentsActive={navContentsActive}
              BackHandler={BackHandler}
              isLoading={isLoading}
              name={userData.display_name}
              loggedIn={loggedIn}
              
              chosenNavColor={chosenNavColor}
            />
            <section className={`w-full min-h-[250px] flex items-end ${chosenNavColor.normal} gap-4 relative pt-4 pb-8 px-[2.5%] `}>
              <div className="min-w-[130px] hover:scale-105 transition-all duration-300 ease-in   w-[15%] rounded-md">
                <img
                  src={
                    userData && userData.images && userData.images.length > 1
                      ? userData.images[1].url
                      : avatar
                  }
                  className="rounded-full shadow-xl object-cover aspect-square  w-full"
                  loading="lazy"
                  alt={`${userData.display_name} image`}
                />
              </div>
              <div className="flex flex-col justify-end w-[85%] flex-wrap  pb-2 min-h-[242px] gap-y-3">
                <h6 className="text-base  flex items-center">
                  {" "}
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="mr-1"
                    style={{ color: "#4169e1" }}
                  />
                  Profile
                </h6>
                <h1 className="text-5xl font-[900] font-erica">{userData.display_name}</h1>

                <div className="flex text-base w-full flex-wrap  font-[400] gap-1">
                  <p>{authUserPlaylistData.length} Playlists</p>
                </div>
              </div>
            </section>
            <div
              className="px-[2.5%] pt-6 ipad:pb-[80px]  rounded-md "
              ref={ref}
            >
              {topArtistByMonth.length > 0 && (
                <section className="w-full pt-8  flex  flex-wrap justify-center gap-y-4 items-center">
                  <h2 className=" font-erica w-full font-[900] text-2xl text-white pb-2">
                    Top artists this month
                  </h2>
                  <span className="w-full justify-start flex ">
                    {topArtistByMonth.slice(0, 5).map((artists_d, index) => {
                      const imgUrl =
                        artists_d.images && artists_d.images.length > 0
                          ? artists_d.images[0].url
                          : avatar;
                      return (
                        <ArtisrtCard
                          artistDetails={artists_d}
                          key={index}
                          artistName={artists_d.name}
                          image={imgUrl}
                          idNo={artists_d.id}
                        />
                      );
                    })}
                  </span>
                </section>
              )}

              {topTrackByMonth.length > 0 && (
                <section className="w-full pt-8  flex  flex-wrap justify-center gap-y-4 items-center">
                  <h2 className=" font-erica w-full font-[900] text-2xl text-white pb-2">
                    Top tracks this month
                  </h2>
                  <div className="w-full   flex  flex-wrap justify-between gap-y-4 items-center ">
                    <ul className="w-full">
                      {topTrackByMonth.slice(0, 5).map((tracks_d, index) => {
                        const id = tracks_d.id;
                        const albumId = tracks_d.album.id;
                        const albumName = tracks_d.album.name;
                        const imgUrl =
                          tracks_d.album.images &&
                          tracks_d.album.images.length > 0
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
                    </ul>
                  </div>
                </section>
              )}

              {followingArtists.length > 0 && (
                <section className="w-full pt-8  flex  flex-wrap justify-center gap-y-4 items-center">
                  <h2 className=" font-erica w-full font-[900] text-2xl text-white pb-2">
                    Following
                  </h2>
                  <span className="w-full justify-start flex ">
                    {followingArtists.slice(0, 5).map((artists_d, index) => {
                      const imgUrl =
                        artists_d.images && artists_d.images.length > 0
                          ? artists_d.images[0].url
                          : avatar;
                      return (
                        <ArtisrtCard
                          artistDetails={artists_d}
                          key={index}
                          artistName={artists_d.name}
                          image={imgUrl}
                          idNo={artists_d.id}
                        />
                      );
                    })}
                  </span>
                </section>
              )}

              {authUserPlaylistData.length > 0 && (
                <section className="w-full pt-8  flex  flex-wrap justify-center gap-y-4 items-center">
                  <h2 className=" font-erica w-full font-[900] text-2xl text-white pb-2">
                    Playlists
                  </h2>
                  {/* <span className="home-wrapper   border ellipsis-container ">
                    <button className="skeleton-wrapper-btn aspect-[1/1.18] p-2  max-h-[285px] skw">
                       
                <FontAwesomeIcon icon={faPen} className="text-4xl" />
                      <p className="text-base text-center w-full ">New playlist </p>
             
                    </button>
                  </span> */}
                  {authUserPlaylistData.map((playlist_d) => {
                    const imgUrl =
                      playlist_d.images && playlist_d.images.length > 0
                        ? playlist_d.images[0].url
                        : avatar;

                    return (
                      <Card
                        key={playlist_d.id}
                        artistDetails={playlist_d}
                        image={imgUrl}
                        title={playlist_d.name}
                        path={playlist_d.type}
                        idNo={playlist_d.id}
                      />
                    );
                  })}
                </section>
              )}

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

export default LibraryDesktopView;
