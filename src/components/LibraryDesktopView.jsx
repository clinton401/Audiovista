import React, { forwardRef } from "react";
import Loader from "./Loader";
import NavLayout from "./NavLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import avatar from "../assets/user (1).png";
import Card from "./PlaylistCard";
import SocilaMedia from "./SocilaMedia";
import ArtisrtCard from "./ArtisrtCard";
import { useNavigate, Link } from "react-router-dom";
import DestopOptions from "./DestopOptions";
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
    },
    ref
  ) => {
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
      <>
        {!isLoading && !dataError && (
          <>
            <NavLayout
              navContentsActive={navContentsActive}
              BackHandler={BackHandler}
              isLoading={isLoading}
              name={userData.display_name}
              loggedIn={loggedIn}
            />
            <section className="w-full min-h-[250px] flex items-end  bg-[#333333] gap-4 relative pt-4 pb-8 px-[2.5%] ">
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
                <h1 className="text-5xl font-[900]">{userData.display_name}</h1>

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
                  <h2 className="w-full font-[900] text-2xl text-white pb-2">
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
                  <h2 className="w-full font-[900] text-2xl text-white pb-2">
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
                            <button
                              className=" w-full h-[61px] flex items-center rounded-md outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  cursor-pointer py-2 relative track_card   "
                              onClick={() => tracksHandler(id)}
                            >
                              <span className="   px-4 py-2 h-full flex gap-2 w-[55%] items-center ellipsis-container">
                                <span className="w-[46px] flex items-center justify-center">
                                  {index + 1}
                                </span>
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
                                                  onClick={(e) =>
                                                    e.stopPropagation()
                                                  }
                                                >
                                                  {art.name}
                                                </Link>
                                                {index < artists.length - 1 && (
                                                  <span className="text-tGray ">
                                                    |
                                                  </span>
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
                                  className="text-xs w-full text-left font-bold text-tGray z-5 hover:underline track_link ellipsis-container relative"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {" "}
                                  {albumName}
                                </Link>
                              </span>
                              <span className="  px-4 py-2 h-full  w-[15%] items-center  flex justify-start   text-lg  gap-2">
                                <p className="flex items-center">
                                  {Object.keys(durationState).length > 0 && (
                                    <>
                                      {durationState &&
                                        !durationState.hours <= 0 && (
                                          <>
                                            <span className="text-xs font-bold w-full text-tGray z-5">
                                              {durationState.hours}:
                                            </span>
                                          </>
                                        )}
                                      {durationState &&
                                        durationState.minutes && (
                                          <>
                                            <span className="text-xs font-bold w-full text-tGray z-5">
                                              {/* {durationState.minutes === 0 ? "00" : durationState.minutes} */}
                                              {durationState.minutes}:
                                            </span>
                                          </>
                                        )}
                                      {durationState &&
                                        durationState.seconds && (
                                          <>
                                            <span className="text-xs w-full font-bold text-tGray z-5">
                                              {durationState.seconds}
                                            </span>
                                          </>
                                        )}
                                    </>
                                  )}
                                </p>
                                <span className="flex text-tGray ">
                                  <DestopOptions
                                    artistsData={artists}
                                    albumId={albumId}
                                    trackUri={trackUri}
                                  />
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </section>
              )}

              {followingArtists.length > 0 && (
                <section className="w-full pt-8  flex  flex-wrap justify-center gap-y-4 items-center">
                  <h2 className="w-full font-[900] text-2xl text-white pb-2">
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
                  <h2 className="w-full font-[900] text-2xl text-white pb-2">
                    Playlists
                  </h2>
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

              <SocilaMedia />
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
