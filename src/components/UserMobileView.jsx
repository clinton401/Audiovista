import {forwardRef} from "react";
import Loader from "./Loader";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../assets/user (1).png";
import MobileTracksCard from "./MobileTracksCard";
import LoaderMini from "./LoaderMini";
import NavLayoutMobile from "./NavLayoutMobile";
const UserMobileView = forwardRef(
  (
    {
      dataError,
      loggedIn,
      isLoading,
      BackHandler,
      usersData,
      usersPublicPlaylist,
      isArtistFollowed,
      buttonFollowHandler,
      unAuthModalHandler,
      userAuth,
      usersPlaylist,
      followLoading,
      navContentsActive,
      setNavContentsActive,
      chosenNavColor
    },
    ref
  ) => {
    return (
      <>
        {!isLoading && !dataError && (
          <>
            <NavLayoutMobile
              navContentsActive={navContentsActive}
              isLoading={isLoading}
              name={usersData.display_name}
              setNavContentsActive={setNavContentsActive}
              chosenNavColor={chosenNavColor}
            />
            <section className={`flex flex-col px-[2.5%] justify-center items-center gap-4 py-10 ${chosenNavColor.normal}`}>
              <img
                src={
                  usersData && usersData.images && usersData.images.length > 1
                    ? usersData.images[1].url
                    : avatar
                }
                alt="artist image"
                loading="lazy"
                className="aspect-square h-[150px] shadow-xl rounded-full object-cover"
              />
              <div className="flex flex-col items-start w-full gap-2">
                <h1 className="font-bold text-2xl text-left font-erica text-white">
                  {usersData.display_name}
                </h1>
                <p className="text-xs text-tGray font-bold">
                  {usersPublicPlaylist.length} Public Playlists
                </p>
              </div>
              <section className="flex w-full  justify-start items-center gap-6">
                {!loggedIn && (
                  <button
                    className="button2 text-base type1"
                    onClick={unAuthModalHandler}
                  >
                    <span className="btn-txt"> Follow</span>
                  </button>
                )}{" "}
                {loggedIn && (
                  <>
                    {!userAuth && (
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
                  </>
                )}
              </section>
            </section>

            <section className="w-full flex flex-col pb-[120px]" ref={ref}>
              {usersPublicPlaylist.length > 0 && (
                <section className="w-full px-[2.5%] pt-6">
                  <h2 className="w-full font-erica font-[900] text-2xl text-white pb-2">
                    Public playlists{" "}
                  </h2>
                  {usersPublicPlaylist.map((playlist_d, index) => {
                    const imgUrl =
                      playlist_d.images && playlist_d.images.length > 0
                        ? playlist_d.images[0].url
                        : avatar;

                    return (
                      <MobileTracksCard
                        key={index}
                        idNo={playlist_d.id}
                        image={imgUrl}
                        trackUri={playlist_d.uri}
                        trackName={playlist_d.name}
                        type={playlist_d.type}
                        artistDetails={playlist_d}
                      />
                    );
                  })}
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
);

export default UserMobileView;
