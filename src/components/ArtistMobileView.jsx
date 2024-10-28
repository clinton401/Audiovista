import {forwardRef} from "react";
import {
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import MobileTracksCard from "./MobileTracksCard";
import Loader from "./Loader";
import avatar from "../assets/user (1).png";
import Card from "./PlaylistCard";
import ArtisrtCard from "./ArtisrtCard";
import TrackPlayBtn from "./TrackPlayBtn";
import LoaderMini from "./LoaderMini";
import UserBtn from "./UserBtn";
import LoginBtn from "./LoginBtn";
import NavLayoutMobile from "./NavLayoutMobile";
const ArtistMobileView = forwardRef(({
  artistData,
  isLoading,
  loggedIn,
  dataError,
  BackHandler,
  artistTracks,
  artistAlbum,
  artistAppearsOn,
  relatedArtists,
  followersWithComma,
  isArtistFollowed,
  buttonFollowHandler,
  followLoading,
  unAuthModalHandler,
  navContentsActive,
  setNavContentsActive,
  chosenNavColor
}, ref) => {
  return (
    <>
      {!isLoading && !dataError && (
        <>
          <NavLayoutMobile
            navContentsActive={navContentsActive}
            isLoading={isLoading}
            name={artistData.name}
            setNavContentsActive={setNavContentsActive}
            
            chosenNavColor={chosenNavColor}
          />

          <section className={`flex flex-col px-[2.5%] ${chosenNavColor.normal} justify-center items-center gap-4 py-10 bg-[#333333]`}>
            <img
              src={
                artistData && artistData.images && artistData.images.length > 0
                  ? artistData.images[0].url
                  : avatar
              }
              alt="artist image"
              loading="lazy"
              className="aspect-square h-[150px] shadow-xl rounded-full object-cover"
            />

            <div className="flex flex-col items-start w-full gap-2">
              <h1 className="font-bold text-2xl text-left font-erica  text-white">
                {artistData.name}
              </h1>
              {Object.keys(artistData).length > 0 && (
                <p className="text-xs text-tGray font-bold">
                  {followersWithComma} Followers
                </p>
              )}
            </div>
            <div className="flex justify-start items-center gap-6 w-full">
              {" "}
              {!loggedIn ? (
                <button
                  className="button2 text-base type1"
                  onClick={unAuthModalHandler}
                >
                  <span className="btn-txt"> Follow</span>
                </button>
              ) : (
                <button
                  className="button2 text-base type1"
                  onClick={buttonFollowHandler}
                >
                  <span className="btn-txt flex gap-1 items-center">
                    {" "}
                    {isArtistFollowed ? "Following" : "Follow"}
                    {followLoading && <LoaderMini />}
                  </span>
                </button>
              )}
              <TrackPlayBtn />
            </div>
          </section>
          <section className="pb-[120px]" ref={ref}>
            {artistTracks.length > 0 && (
              <section className="w-full px-[2.5%] pt-6">
                <h2 className="w-full font-[900] font-erica text-2xl text-white pb-2">
                  Popular
                </h2>
                <div className="w-full pt-4  flex  flex-wrap justify-between  items-center ">
                  {artistTracks.slice(0, 5).map((td, index) => {
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
            {artistAlbum.length > 0 && (
              <section className="w-full px-[2.5%] pt-6 ">
                <h2 className="w-full font-[900] font-erica text-2xl text-white pb-2">
                  Albums
                </h2>
                <section className="w-full  overflow-x-auto mobile_filter  ">
                  <span className="w-full  justify-start flex ">
                    {artistAlbum.slice(0, 8).map((albums_d, index) => {
                      const releaseDate = albums_d.release_date.slice(0, 4);
                      const imgUrl =
                        albums_d &&
                        albums_d.images &&
                        albums_d.images.length > 0
                          ? albums_d.images[0].url
                          : avatar;
                      return (
                        <Card
                          key={index}
                          image={imgUrl}
                          artistDetails={albums_d}
                          title={albums_d.name}
                          alb="Album"
                          path={albums_d.type}
                          idNo={albums_d.id}
                          releaseDate={releaseDate}
                        />
                      );
                    })}
                  </span>
                </section>
              </section>
            )}
            {relatedArtists.length > 0 && (
              <section className="w-full px-[2.5%] pt-6 ">
                <h2 className="w-full font-[900] text-2xl font-erica text-white pb-2">
                  Fans also like
                </h2>
                <section className="w-full  overflow-x-auto mobile_filter  ">
                  <span className="w-full  justify-start flex ">
                    {relatedArtists.slice(0, 8).map((artists_d, index) => {
                      const imgUrl =
                        artists_d &&
                        artists_d.images &&
                        artists_d.images.length > 0
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
              </section>
            )}
            {artistAppearsOn.length > 0 && (
              <section className="w-full px-[2.5%] pt-6">
                <h2 className="w-full font-[900] text-2xl font-erica text-white pb-2">
                  Appears on
                </h2>
                <section className="w-full  overflow-x-auto mobile_filter  ">
                  <span className="w-full  justify-start flex ">
                    {artistAppearsOn.slice(0, 8).map((albums_d, index) => {
                      const releaseDate = albums_d.release_date.slice(0, 4);
                      const imgUrl =
                        albums_d &&
                        albums_d.images &&
                        albums_d.images.length > 0
                          ? albums_d.images[0].url
                          : avatar;

                      return (
                        <Card
                          key={index}
                          image={imgUrl}
                          artistDetails={albums_d}
                          title={albums_d.name}
                          alb="Album"
                          path={albums_d.type}
                          idNo={albums_d.id}
                          releaseDate={releaseDate}
                        />
                      );
                    })}
                  </span>
                </section>
              </section>
            )}
            {artistData &&
              artistData.external_urls &&
              artistData.external_urls.spotify && (
                <section className="w-full pt-12 flex items-center justify-center">
                  <a
                    href={artistData.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button2 flex items-center justify-center text-base type1"
                    // onClick={clearRecentSearches}
                  >
                    <span className="btn-txt text-center ">
                      View more on spotify{" "}
                      <FontAwesomeIcon
                        icon={faSpotify}
                        style={{ color: "#1ed760" }}
                      />
                    </span>
                  </a>
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
})

export default ArtistMobileView;
