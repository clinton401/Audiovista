import React from "react";
import Loader from "./Loader";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../assets/user (1).png";
import MobileTracksCard from "./MobileTracksCard";
import ArtisrtCard from "./ArtisrtCard";
import Card from "./PlaylistCard";
function LibraryMobileView({
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
          <section className="flex flex-col px-[2.5%] justify-center items-center gap-4 py-10 bg-[#333333]">
            <img
              src={
                userData && userData.images && userData.images.length > 1
                  ? userData.images[1].url
                  : avatar
              }
              alt="artist image"
              loading="lazy"
              className="aspect-square h-[150px] shadow-xl rounded-full object-cover"
            />
            <div className="flex flex-col items-start w-full gap-2">
              <h1 className="font-bold text-2xl text-left  text-white">
                {userData.display_name}
              </h1>
              <p className="text-xs text-tGray font-bold">
                {authUserPlaylistData.length} Playlists
              </p>
            </div>
          </section>
          <section className="w-full flex flex-col pb-[120px]">
            {topTrackByMonth.length > 0 && (
              <section className="w-full px-[2.5%] pt-6">
                <h2 className="w-full font-[900] text-2xl text-white pb-2">
                  Top tracks this month
                </h2>
                <div className="w-full flex  flex-wrap justify-between  items-center ">
                  {topTrackByMonth.slice(0, 5).map((td, index) => {
                    const imgUrl =
                      td.album && td.album.images && td.album.images.length > 0
                        ? td.album.images[0].url
                        : avatar;

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
                      />
                    );
                  })}
                </div>
              </section>
            )}
            {topArtistByMonth.length > 0 && (
              <section className="w-full px-[2.5%] pt-6">
                <h2 className="w-full font-[900] text-2xl text-white pb-2">
                  Top artists this month
                </h2>
                <span className="w-full overflow-x-auto mobile_filter justify-start flex ">
                  {topArtistByMonth.map((artists_d, index) => {
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
              <section className="w-full px-[2.5%] pt-6">
                <h2 className="w-full font-[900] text-2xl text-white pb-2">
                  Playlists{" "}
                </h2>
                <span className="w-full overflow-x-auto mobile_filter justify-start flex ">
                  {authUserPlaylistData.map((playlist_d, index) => {
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
                </span>
              </section>
            )}
            {followingArtists.length > 0 && (
              <section className="w-full px-[2.5%] pt-6">
                <h2 className="w-full font-[900] text-2xl text-white pb-2">
                  Following
                </h2>
                <span className="w-full overflow-x-auto mobile_filter justify-start flex ">
                  {followingArtists.map((artists_d, index) => {
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
          </section>
        </>
      )}
      {isLoading && !dataError && (
        <section className="w-full flex items-center px-[2.5%] justify-center  h-dvh min-h-[400px] ">
          <Loader />
        </section>
      )}
    </>
  );
}

export default LibraryMobileView;
