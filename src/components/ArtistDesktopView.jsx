import React, { forwardRef, useContext } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/user (1).png";
import Loader from "./Loader";
import Card from "./PlaylistCard";
import ArtisrtCard from "./ArtisrtCard";
import SocilaMedia from "./SocilaMedia";
import NavLayout from "./NavLayout";
import DestopOptions from "./DestopOptions";
import TrackPlayBtn from "./TrackPlayBtn";
import LoaderMini from "./LoaderMini";
import { msToHMS } from "../lib/utils";
import TrackTableBtns from "./TrackTableBtns";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { myContext } from "../App";
const ArtistDesktopView = forwardRef(
  (
    {
      artistData,
      isLoading,
      loggedIn,
      dataError,
      navContentsActive,
      BackHandler,
      artistTracks,
      artistAlbum,
      artistAppearsOn,
      relatedArtists,
      followersWithComma,
      isArtistFollowed,
      buttonFollowHandler,
      unAuthModalHandler,
      followLoading,
      chosenNavColor
    },
    ref
  ) => {
    // const [followersWithComma, setFollowersWithComma] = useState("");
    // useEffect(() => {
    //   if (Object.keys(artistData).length > 0) {
    //     const totalFollowers = numberWithCommas(artistData.followers.total);
    //     setFollowersWithComma(totalFollowers);
    //   }
    // }, [artistData]);
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
              name={artistData.name}
              loggedIn={loggedIn}
              chosenNavColor={chosenNavColor}
            />
            <section className={`w-full min-h-[250px] ${chosenNavColor.normal} relative p-2`}>
              <span className=" absolute z-[1] top-0 rounded-full  overflow-hidden  right-[10%] w-auto h-full ">
                <img
                  src={
                    artistData &&
                    artistData.images &&
                    artistData.images.length > 0
                      ? artistData.images[0].url
                      : avatar
                  }
                  alt="artist image"
                  loading="lazy"
                  className="aspect-square h-[80%] shadow-xl my-[10%] rounded-full object-cover"
                />

                {/* <div className="dark-overlay"></div> */}
              </span>

              <span className="absolute flex-col flex  px-[2.5%]  justify-center gap-1 left-0 top-0 w-[65%] h-full z-10">
                <p className="text-base font-bold">
                  {" "}
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: "#4169e1" }}
                    className="mr-1 "
                  />{" "}
                  Verified Artist
                </p>
                <h1 className="font-[900] font-erica text-5xl text-left  text-white">
                  {artistData.name}
                </h1>
                {Object.keys(artistData).length > 0 && (
                  <p className="text-base font-bold">
                    {followersWithComma} Followers
                  </p>
                )}
                {/* <p></p> */}
              </span>
            </section>
            <div
              className="px-[2.5%] pt-6 ipad:pb-[80px]  rounded-md "
              ref={ref}
            >
              <section className="flex justify-start items-center gap-6">
                <TrackPlayBtn />
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
              </section>
              {artistTracks.length > 0 && (
                <section className="w-full pt-6">
                  <h2 className="w-full font-[900] font-erica text-2xl text-white pb-2">
                    Popular
                  </h2>
                  <div className="w-full pt-4  flex  flex-wrap justify-between gap-y-4 items-center ">
                    <ul className="w-full">
                      {artistTracks.slice(0, 5).map((tracks_d, index) => {
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
              {artistAlbum.length > 0 && (
                <section className="w-full pt-6">
                  <h2 className="w-full font-[900] text-2xl font-erica text-white pb-2">
                    Albums
                  </h2>
                  <span className="w-full justify-start flex ">
                    {artistAlbum.slice(0, 5).map((albums_d, index) => {
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
              )}
              {relatedArtists.length > 0 && (
                <section className="w-full pt-6">
                  <h2 className="w-full font-[900] font-erica text-2xl text-white pb-2">
                    Fans also like
                  </h2>
                  <span className="w-full justify-start flex ">
                    {relatedArtists.slice(0, 5).map((artists_d, index) => {
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
              )}
              {artistAppearsOn.length > 0 && (
                <section className="w-full pt-6">
                  <h2 className="w-full font-[900] font-erica text-2xl text-white pb-2">
                    Appears on
                  </h2>
                  <span className="w-full justify-start flex ">
                    {artistAppearsOn.slice(0, 5).map((albums_d, index) => {
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

export default ArtistDesktopView;
