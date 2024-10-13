import React, { forwardRef } from "react";
import Loader from "./Loader";
import NavLayout from "./NavLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import avatar from "../assets/user (1).png";
import Card from "./PlaylistCard";
import SocilaMedia from "./SocilaMedia";
import LoaderMini from "./LoaderMini";
import { useNavigate } from "react-router-dom";
const UserDesktopView = forwardRef(
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
      navContentsActive,
      followLoading,
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
              name={usersData.display_name}
              loggedIn={loggedIn}
            />
            <section className="w-full min-h-[250px] flex items-end  bg-[#333333] gap-4 relative pt-4 pb-8 px-[2.5%] ">
              <div className="min-w-[130px] hover:scale-105 transition-all duration-300 ease-in   w-[15%] rounded-md">
                <img
                  src={
                    usersData && usersData.images && usersData.images.length > 1
                      ? usersData.images[1].url
                      : avatar
                  }
                  className="rounded-full shadow-xl object-cover aspect-square  w-full"
                  loading="lazy"
                  alt={`${usersData.display_name} image`}
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
                <h1 className="text-5xl font-[900]">
                  {usersData.display_name}
                </h1>

                {usersPublicPlaylist.length > 0 && (
                  <div className="flex text-base w-full flex-wrap  font-[400] gap-1">
                    <p>{usersPublicPlaylist.length} Public Playlists</p>
                  </div>
                )}
              </div>
            </section>
            <div
              className="px-[2.5%] pt-6 ipad:pb-[80px]  rounded-md "
              ref={ref}
            >
              <section className="flex justify-start items-center gap-6">
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
                    {!userAuth ? (
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
                    ) : (
                      <button
                        className="button2 text-base type1"
                        onClick={() => navigate("/library")}
                      >
                        <span className="btn-txt"> More details</span>
                      </button>
                    )}
                  </>
                )}
              </section>
              {usersPublicPlaylist.length > 0 && (
                <section className="w-full pt-4  flex  flex-wrap justify-center gap-y-4 items-center">
                  <h2 className="w-full font-[900] text-2xl text-white pb-2">
                    Playlists
                  </h2>
                  {usersPublicPlaylist.slice(0, 20).map((playlist_d) => {
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

export default UserDesktopView;
