import React, { forwardRef, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import MobileTracksCard from "./MobileTracksCard";
import avatar from "../assets/user (1).png";
import Loader from "./Loader";
import { myContext } from "../App";
import MobileOptions from "./MobileOptions";
const SearchMobileView = forwardRef(
  (
    {
      inputFocused,
      submitHandler,
      inputValue,
      inputHandler,
      clearInputHandler,
      newGenresArray,
      pinkShades,
      genreHandler,
      //   backHandler,
      setInputFocused,
      setInputValue,
      setSearchParams,
      inputFocusfunction,
      firstInputFocus,
      backHandlerMobile,
      clearInputHandlerMobile,
      albumsData,
      artistsData,
      playlistsData,
      tracksData,
      topResultData,
      filtersHandler,
      filters,
      dataError,
      isLoading,
      imgLocation,
      setRecentSearches,
      recentSearches,
      clearRecentSearches,
    },
    ref
  ) => {
    // const [firstInputFocus, setFirstInputFocus] = useState("false");
    // function inputFocusfunction() {
    //     setFirstInputFocus(true);
    //     ref.current.focus();
    // }
    // function clearInputHandler() {
    //   setInputFocused(false);
    //   setInputValue("");
    //   ref.current.focus();
    // }
    // const backHandler = () => {
    //   if (inputValue.length > 0) {
    //     // navigate("/search");
    //     setInputValue("");
    //     setSearchParams({}, { replace: true });
    //   } else {
    //     setFirstInputFocus(false);
    //   }
    // };

    return (
      <>
        {!firstInputFocus && (
          <div className=" w-full px-[2.5%] py-8 min-h-dvh">
            <section className="w-full flex flex-col gap-y-3 pb-4">
              <h2 className="font-erica w-full font-[900] text-2xl text-white ">Search</h2>
              <form className="relative" onSubmit={submitHandler}>
                <input
                  type="text"
                  className="bg-[#fff] text-[#333333] font-medium placeholder:italic placeholder:text-sm placeholder:font-normal  rounded-md outline-transparent w-full py-3 px-[37px] text-sm  mobile_input focus:outline-1 focus:outline-[#000000] focus:outline focus:outline-offset-[-1]"
                  onClick={inputFocusfunction}
                  //   ref={ref}
                  spellCheck="false"
                  placeholder="What do you want to play?"
                />
                <button className="absolute h-full w-[35px] text-[#333333]  left-0 top-0 rounded-tl-md rounded-bl-md flex items-center justify-center focus:outline-1 focus:outline-[#000000] focus:outline focus:outline-offset-0 ">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                {/* {inputValue.length > 0 && (
                <button
                  className="absolute h-full w-[30px] text-[#333333] right-0 top-0 rounded-tr-md rounded-br-md  items-center justify-center focus:outline-1 focus:outline-[#000000] focus:outline focus:outline-offset-0"
                  onClick={clearInputHandlerMobile}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )} */}
              </form>
            </section>
            {newGenresArray.length > 0 && (
              <section className="w-full pb-[120px] ">
                <h2 className="font-erica w-full font-[900] text-lg text-white ">
                  Browse all
                </h2>
                <div className="w-full flex flex-wrap justify-between   gap-4  ">
                  {newGenresArray.map((new_genre, index) => {
                    const newWord =
                      new_genre.charAt(0).toUpperCase() + new_genre.slice(1);
                    return (
                      <button
                        onClick={() => genreHandler(new_genre)}
                        className={` genre_width_mobile aspect-[1/0.65] min-w-[130px] max-h-[150px] rounded-md font-[900] text-xl text-center p-2 text-white flex justify-center items-center`}
                        style={{ backgroundColor: pinkShades[index] }}
                        key={index}
                      >
                        {newWord}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
        {firstInputFocus && (
          <div className="pb-[120px]">
            <nav className="flex flex-col gap-y-4 shadow-md px-[2.5%] bg-[#333333] py-4 ">
              <div className="flex justify-between items-center w-full">
                <button
                  className=" w-[40px] aspect-square  relative rounded-full flex justify-center items-center go_back_btn"
                  onClick={backHandlerMobile}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-2xl  text-white"
                  />
                </button>
                <form className="relative mobile_form" onSubmit={submitHandler}>
                  <input
                    type="text"
                    className="bg-[#fff] text-[#333333] rounded-md outline-transparent w-full py-3 px-[37px] text-sm font-medium mobile_input focus:outline-1 focus:outline-[#000000] focus:outline focus:outline-offset-[-1] placeholder:italic placeholder:text-sm placeholder:font-normal"
                    ref={ref}
                    value={inputValue}
                    onChange={inputHandler}
                    spellCheck="false"
                    placeholder="What do you want to play?"
                  />
                  <button className="absolute h-full w-[35px] text-[#333333]  left-0 top-0 rounded-tl-md rounded-bl-md flex items-center justify-center focus:outline-1 focus:outline-[#000000] focus:outline focus:outline-offset-0 ">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  {inputValue.length > 0 && (
                    <button
                      className="absolute h-full w-[30px] text-[#333333] right-0 top-0 rounded-tr-md rounded-br-md  items-center justify-center focus:outline-1 focus:outline-[#000000] focus:outline focus:outline-offset-0"
                      onClick={clearInputHandlerMobile}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  )}
                </form>
              </div>
              {inputValue.length > 0 && (
                  <div className=" flex items-center gap-2 px-4 mobile_filter text-sm w-full overflow-x-auto justify-start">
                    <button
                      className={`filter_btn ${
                        filters !== "artists" &&
                        filters !== "playlists" &&
                        filters !== "albums" &&
                        filters !== "songs"
                          ? "all"
                          : ""
                      }`}
                      onClick={() => filtersHandler("all")}
                    >
                      All
                    </button>
                    {tracksData.length > 0 && (
                      <button
                        className={`filter_btn ${
                          filters === "songs" ? "songs" : ""
                        }`}
                        onClick={() => filtersHandler("songs")}
                      >
                        Songs
                      </button>
                    )}
                    {artistsData.length > 0 && (
                      <button
                        className={`filter_btn ${
                          filters === "artists" ? "artists" : ""
                        }`}
                        onClick={() => filtersHandler("artists")}
                      >
                        Artists
                      </button>
                    )}
                    {albumsData.length > 0 && (
                      <button
                        className={`filter_btn ${
                          filters === "albums" ? "albums" : ""
                        }`}
                        onClick={() => filtersHandler("albums")}
                      >
                        Albums
                      </button>
                    )}
                    {playlistsData.length > 0 && (
                      <button
                        className={`filter_btn ${
                          filters === "playlists" ? "playlists" : ""
                        }`}
                        onClick={() => filtersHandler("playlists")}
                      >
                        Playlists
                      </button>
                    )}
                  </div>
                )}
            </nav>
            {!inputFocused && (
              <>
                {recentSearches.length > 0 ? (
                  <div className="pt-6 px-[2.5%]">
                    <h2 className="font-erica w-full font-[900] text-xl text-white pb-2">
                      {" "}
                      Recent Searches{" "}
                    </h2>
                    <span className="w-full  ">
                      {recentSearches.slice(0, 20).map((recent, index) => {
                        const artistVerify = recent.type === "artist";
                        const playlistVerify = recent.type === "playlist";
                        const albumVerify = recent.type === "album";

                        const imgUrl =
                          recent.images && recent.images.length > 0
                            ? recent.images[0].url
                            : avatar;

                        if (artistVerify) {
                          return (
                            <MobileTracksCard
                              key={index}
                              image={imgUrl}
                              trackName={recent.name}
                              type={recent.type}
                              idNo={recent.id}
                              setRecentSearches={setRecentSearches}
                              recentSearches={recentSearches}
                              artistDetails={recent}
                            />
                          );
                        } else if (playlistVerify) {
                          return (
                            <MobileTracksCard
                              key={index}
                              idNo={recent.id}
                              image={imgUrl}
                              trackName={recent.name}
                              type={recent.type}
                              setRecentSearches={setRecentSearches}
                              recentSearches={recentSearches}
                              artistDetails={recent}
                            />
                          );
                        } else {
                          return (
                            <MobileTracksCard
                              key={index}
                              idNo={recent.id}
                              artists={recent.artists}
                              image={imgUrl}
                              trackName={recent.name}
                              type={recent.type}
                              artistDetails={recent}
                              setRecentSearches={setRecentSearches}
                              recentSearches={recentSearches}
                            />
                          );
                        }
                      })}
                    </span>
                    <span className="w-full flex pt-4 justify-center items-center">
                      <button
                        className="button2 text-base type1"
                        onClick={clearRecentSearches}
                      >
                        <span className="btn-txt"> Clear recent searches</span>
                      </button>
                    </span>
                  </div>
                ) : (
                  <div className="pt-6 px-[2.5%]">
                    <h2 className="font-erica w-full font-[900] text-xl text-white pb-2">
                      {" "}
                      Play what you love
                    </h2>
                    <p className="w-full font-[700] text-base ">
                      Search for artists, songs, podcasts and more.
                    </p>
                  </div>
                )}
              </>
            )}
            {inputFocused && !dataError && (
              <>
                {filters === "songs" && (
                  <>
                    {!isLoading && (
                      <section className="w-full flex flex-col ">
                        {tracksData.length > 0 && (
                          <>
                            {tracksData.map((td, index) => {
                              const imgUrl =
                                td.album.images && td.album.images.length > 0
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
                          </>
                        )}
                      </section>
                    )}

                    {isLoading && (
                      <section className="relative h-[90dvh] flex min-h-[300px] top-0 left-0 w-full justify-center items-center ">
                        <Loader />
                      </section>
                    )}
                  </>
                )}
                {filters === "artists" && (
                  <>
                    {!isLoading && (
                      <section className="w-full flex flex-col ">
                        {artistsData.map((artists_d, index) => {
                          const imgUrl =
                            artists_d.images && artists_d.images.length > 0
                              ? artists_d.images[0].url
                              : avatar;

                          return (
                            <MobileTracksCard
                              key={index}
                              image={imgUrl}
                              trackUri={artists_d.uri}
                              trackName={artists_d.name}
                              type={artists_d.type}
                              idNo={artists_d.id}
                              artistDetails={artists_d}
                            />
                          );
                        })}
                      </section>
                    )}

                    {isLoading && (
                      <section className="relative h-[90dvh]  min-h-[300px] to flex p-0 left-0 w-full justify-center items-center ">
                        <Loader />
                      </section>
                    )}
                  </>
                )}
                {filters === "albums" && (
                  <>
                    {!isLoading && (
                      <section className="w-full flex flex-col ">
                        {albumsData.map((albums_d, index) => {
                          const imgUrl =
                            albums_d.images && albums_d.images.length > 0
                              ? albums_d.images[0].url
                              : avatar;

                          return (
                            <MobileTracksCard
                              key={index}
                              idNo={albums_d.id}
                              trackUri={albums_d.uri}
                              artists={albums_d.artists}
                              image={imgUrl}
                              trackName={albums_d.name}
                              type={albums_d.type}
                              artistDetails={albums_d}
                            />
                          );
                        })}
                      </section>
                    )}

                    {isLoading && (
                      <section className="relative h-[90dvh] flex min-h-[300px] top-0 left-0 w-full justify-center items-center ">
                        <Loader />
                      </section>
                    )}
                  </>
                )}
                {filters === "playlists" && (
                  <>
                    {!isLoading && (
                      <section className="w-full flex flex-col ">
                        {playlistsData.map((playlist_d, index) => {
                          if(!playlist_d) return;
                          const imgUrl =
                            playlist_d.images && playlist_d.images.length > 0
                              ? playlist_d.images[0].url
                              : avatar;

                          return (
                            <MobileTracksCard
                              key={index}
                              idNo={playlist_d.id}
                              trackUri={playlist_d.uri}
                              image={imgUrl}
                              trackName={playlist_d.name}
                              type={playlist_d.type}
                              artistDetails={playlist_d}
                            />
                          );
                        })}
                      </section>
                    )}

                    {isLoading && (
                      <section className="relative h-[90dvh] flex min-h-[300px] top-0 left-0 w-full justify-center items-center ">
                        <Loader />
                      </section>
                    )}
                  </>
                )}
                {filters !== "artists" &&
                  filters !== "playlists" &&
                  filters !== "albums" &&
                  filters !== "songs" && (
                    <>
                      {!isLoading && (
                        <section className="w-full flex flex-col ">
                          {Object.keys(topResultData).length > 0 && (
                            <MobileTracksCard
                              artists={topResultData.artists}
                              type={topResultData.type}
                              trackName={topResultData.name}
                              image={imgLocation}
                              idNo={topResultData.id}
                              trackUri={topResultData.uri}
                              artistDetails={topResultData}
                            />
                          )}
                          {tracksData.length > 0 && (
                            <>
                              {tracksData.slice(0, 5).map((tracks_d, index) => {
                                const imgUrl =
                                  tracks_d.album.images &&
                                  tracks_d.album.images.length > 0
                                    ? tracks_d.album.images[0].url
                                    : avatar;
                                if (tracks_d.name !== topResultData.name) {
                                  return (
                                    <MobileTracksCard
                                      key={index}
                                      idNo={tracks_d.id}
                                      artists={tracks_d.artists}
                                      image={imgUrl}
                                      trackUri={tracks_d.uri}
                                      trackName={tracks_d.name}
                                      type={tracks_d.type}
                                      artistDetails={tracks_d}
                                    />
                                  );
                                } else {
                                  return;
                                }
                              })}
                              {artistsData
                                .slice(0, 5)
                                .map((artists_d, index) => {
                                  const imgUrl =
                                    artists_d.images &&
                                    artists_d.images.length > 0
                                      ? artists_d.images[0].url
                                      : avatar;
                                  if (artists_d.name !== topResultData.name) {
                                    return (
                                      <MobileTracksCard
                                        key={index}
                                        image={imgUrl}
                                        trackUri={artists_d.uri}
                                        trackName={artists_d.name}
                                        type={artists_d.type}
                                        idNo={artists_d.id}
                                        artistDetails={artists_d}
                                      />
                                    );
                                  } else {
                                    return;
                                  }
                                })}
                              {albumsData.slice(0, 5).map((albums_d, index) => {
                                const imgUrl =
                                  albums_d.images && albums_d.images.length > 0
                                    ? albums_d.images[0].url
                                    : avatar;
                                if (albums_d.name !== topResultData.name) {
                                  return (
                                    <MobileTracksCard
                                      key={index}
                                      idNo={albums_d.id}
                                      artists={albums_d.artists}
                                      image={imgUrl}
                                      trackUri={albums_d.uri}
                                      trackName={albums_d.name}
                                      type={albums_d.type}
                                      artistDetails={albums_d}
                                    />
                                  );
                                } else {
                                  return;
                                }
                              })}
                              {playlistsData
                                .slice(0, 5)
                                .map((playlist_d, index) => {
                                  if(!playlist_d) return;
                                  const imgUrl =
                                    playlist_d.images &&
                                    playlist_d.images.length > 0
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
                            </>
                          )}
                        </section>
                      )}

                      {isLoading && (
                        <section className="relative h-[90dvh] flex min-h-[300px] top-0 left-0 w-full justify-center items-center ">
                          <Loader />
                        </section>
                      )}
                    </>
                  )}
              </>
            )}
            {inputFocused && dataError && (
              <section className=" px-[2.5%] relative h-[80dvh] min-h-[300px] top-0 left-0 w-full  flex flex-col items-center justify-center">
                <h3 className="w-full font-[700] text-lg text-center text-white pb-3">
                  No results found for {`"${inputValue}"`}
                </h3>
                <p className="w-full font-[600] text-base text-center text-white ">
                  Please make sure your words are spelled correctly, or use
                  fewer or different keywords.
                </p>
              </section>
            )}
            {/* <MobileOptions /> */}
          </div>
        )}
      </>
    );
  }
);
export default SearchMobileView;
