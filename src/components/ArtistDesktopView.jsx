import React, { forwardRef } from "react";
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
              name={artistData.name}
              loggedIn={loggedIn}
            />
            <section className="w-full min-h-[250px] bg-[#333333] relative p-2">
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
                <h1 className="font-[900] text-5xl text-left  text-white">
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
                  <h2 className="w-full font-[900] text-2xl text-white pb-2">
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
                            <div
                              className=" w-full h-[61px] flex items-center  rounded-md outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  cursor-pointer py-2 relative track_card   "
                              onClick={() => tracksHandler(id)}
                            >
                              <span className="   px-4 py-2 h-full flex gap-1 w-[55%] items-center ellipsis-container">
                                <span className="w-[46px]">{index + 1}</span>
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
                                            <div className=" h-[15px] aspect-square rounded-sm flex items-center justify-center bg-[#36454F] text-primary font-[900]  text-[10px]">
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
                                                  className="text-xs w-full font-bold text-tGray z-[4] hover:underline track_link relative"
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
                                  className="text-xs w-full text-left font-bold text-tGray z-[4] hover:underline track_link ellipsis-container relative"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {" "}
                                  {albumName}
                                </Link>
                              </span>
                              <span className="  px-4 py-2 h-full  w-[15%] items-center  flex justify-start   text-base  gap-2">
                                {/* <div className=" w-[46px] aspect-square flex items-center justify-start relative tc_cont">
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="track_popup bottom-[120%] hidden right-0 absolute min-w-[150px] p-2 z-50 rounded-md  bg-[#191919] font-bold text-sm justify-center items-center">
                      Add to playlist
                    </span>
                  </div> */}
                                <p className="flex items-center">
                                  {Object.keys(durationState).length > 0 && (
                                    <>
                                      {durationState &&
                                        !durationState.hours <= 0 && (
                                          <>
                                            <span className="text-xs font-bold w-full text-tGray z-[4]">
                                              {durationState.hours}:
                                            </span>
                                          </>
                                        )}
                                      {durationState &&
                                        durationState.minutes && (
                                          <>
                                            <span className="text-xs font-bold w-full text-tGray z-[4]">
                                              {/* {durationState.minutes === 0 ? "00" : durationState.minutes} */}
                                              {durationState.minutes}:
                                            </span>
                                          </>
                                        )}
                                      {durationState &&
                                        durationState.seconds && (
                                          <>
                                            <span className="text-xs w-full font-bold text-tGray z-[4]">
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
                                <span className="flex text-tGray">
                                  <DestopOptions
                                    artistsData={artists}
                                    albumId={albumId}
                                    trackUri={trackUri}
                                  />
                                </span>
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </section>
              )}
              {artistAlbum.length > 0 && (
                <section className="w-full pt-6">
                  <h2 className="w-full font-[900] text-2xl text-white pb-2">
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
                  <h2 className="w-full font-[900] text-2xl text-white pb-2">
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
                  <h2 className="w-full font-[900] text-2xl text-white pb-2">
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

export default ArtistDesktopView;
