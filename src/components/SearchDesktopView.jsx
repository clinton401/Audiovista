import React, { useRef, useState, useEffect, forwardRef } from "react";

import Card from "./PlaylistCard";
import avatar from "../assets/user (1).png";
import TrackCard from "./TrackCard";
import TopResultCard from "./TopResultCard";
import TracksCardSkeleton from "./TracksCardSkeleton";
import TopResultCardSkeleton from "./TopResultCardSkeleton";
import Skeleton from "./Skeleton";
import ArtistCardSkeleton from "./ArtistCardSkeleton";
import ArtisrtCard from "./ArtisrtCard";
import CardSkeleton from "./PlaylistCardSkeleton";
import SocilaMedia from "./SocilaMedia";
import TrackTableView from "./TrackTableView";
import TracksCardSkeletonTwo from "./TracksCardSkeletonTwo";
import LoginBtn from "./LoginBtn";
import UserBtn from "./UserBtn";
const DesktopView = forwardRef(
  (
    {
      backHandler,
      submitHandler,
      inputValue,
      setInputValue,
      inputHandler,
      clearInputHandler,
      loggedIn,
      newGenresArray,
      pinkShades,
      inputFocused,
      setInputFocused,
      albumsData,

      artistsData,
      playlistsData,
      tracksData,
      topResultData,
      dataFirstItems,
      clearDatas,
      dataError,
      setDataError,
      isLoading,
      setIsLoading,
      setRecentSearches,
      recentSearches,
      filtersHandler,
      filters,
      playlistVerify,
      imgLocation,
      genreHandler,
      
    },
    ref
  ) => {
    const navRef = useRef(null);
    const tableHeadRef = useRef(null);
    const [navHeight, setNavHeight] = useState(null);

    useEffect(() => {
      if (navRef.current) {
        const height = navRef.current.getBoundingClientRect().height;

        // Update state with the height
        setNavHeight(height);
      }
    }, [inputValue, topResultData]);
    return (
      <>
       
          {/* <div className="flex justify-between w-full gap-2  items-center ">
            <span className=" flex items-center justify-start gap-3">
              <button
                className=" w-[35px] aspect-square bg-black relative rounded-full flex justify-center items-center go_back_btn"
                onClick={backHandler}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-lg  text-white"
                />
              
              </button>

              <form className="relative" onSubmit={submitHandler}>
                <input
                  type="text"
                  className="bg-[#333333] placeholder:italic placeholder:text-sm placeholder:font-normal rounded-full font-medium  outline-transparent w-96 py-3 px-[42px] text-sm "
                  value={inputValue}
                  onChange={inputHandler}
                  ref={ref}
                  spellCheck="false"
                  placeholder="What do you want to play?"
                />
                <button className="absolute h-full w-[40px]  left-0 top-0 rounded-tl-full rounded-bl-full flex items-center justify-center outline-transparent">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                {inputValue.length > 0 && (
                  <button
                    className="absolute h-full w-[40px]  right-0 top-0 rounded-tr-full rounded-br-full flex items-center justify-center outline-transparent"
                    onClick={clearInputHandler}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </form>
            </span>
            <span>{!loggedIn ? <LoginBtn /> : <UserBtn />}</span>
          </div> */}
          {inputFocused &&
            inputValue.length > 0 &&
            // Object.keys(topResultData).length > 0 &&
             (
              <nav
              className="flex items-center flex-wrap sticky top-0 z-30   bg-primary gap-3   py-4"
              ref={navRef}
            >
              <div className=" flex items-center gap-4 w-full justify-start">
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
              </nav>
            )}
       
        {!inputFocused && (
          <>
            {recentSearches.length > 0 && (
              <section aria-label="Recent searches" className="w-full py-4">
                <h2 className="font-erica w-full font-[900] text-2xl text-white pb-2">
                  Recent Searches
                </h2>
                <div className="w-full flex flex-wrap justify-start   gap-y-[30px]  ">
                  {recentSearches.slice(0, 5).map((recent) => {
                    const artistVerify = recent.type === "artist";
                    const playlistVerify = recent.type === "playlist";
                    const albumVerify = recent.type === "album";
                    const releaseDate = albumVerify
                      ? recent.release_date.slice(0, 4)
                      : "";
                    const imgUrl =
                      recent.images && recent.images.length > 0
                        ? recent.images[0].url
                        : avatar;
                    const creatorName = playlistVerify
                      ? recent.owner?.display_name
                      : "";
                    const newCreatorName = playlistVerify
                      ? creatorName.charAt(0).toUpperCase() +
                        creatorName.slice(1)
                      : "";
                    if (recent.type === "artist") {
                      return (
                        <ArtisrtCard
                          artistDetails={recent}
                          key={recent.id}
                          artistName={recent.name}
                          image={imgUrl}
                          idNo={recent.id}
                          setRecentSearches={setRecentSearches}
                          recentSearches={recentSearches}
                          searchPage={true}
                        />
                      );
                    } else if (recent.type === "playlist") {
                      return (
                        <Card
                          key={recent.id}
                          image={imgUrl}
                          title={recent.name}
                          path={recent.type}
                          idNo={recent.id}
                          playlistCreator={newCreatorName}
                          artistDetails={recent}
                          setRecentSearches={setRecentSearches}
                          recentSearches={recentSearches}
                          searchPage={true}
                        />
                      );
                    } else {
                      return (
                        <Card
                          key={recent.id}
                          image={recent.images[0].url}
                          title={recent.name}
                          artists={recent.artists[0].name}
                          artistsId={recent.artists[0].id}
                          path={recent.type}
                          idNo={recent.id}
                          releaseDate={releaseDate}
                          setRecentSearches={setRecentSearches}
                          recentSearches={recentSearches}
                          artistDetails={recent}
                          searchPage={true}
                        />
                      );
                    }
                  })}
                </div>
              </section>
            )}

            {newGenresArray.length > 0 && (
              <section className="w-full ">
                <h2 className="font-erica w-full font-[900] text-2xl text-white pb-3">
                  Browse all
                </h2>
                <div className="w-full flex flex-wrap justify-between   gap-y-4  ">
                  {newGenresArray.map((new_genre, index) => {
                    const newWord =
                      new_genre.charAt(0).toUpperCase() + new_genre.slice(1);
                    return (
                      <button
                        onClick={() => genreHandler(new_genre)}
                        className={` genre_width aspect-square rounded-md font-[900] text-2xl text-center p-2 text-white flex justify-center items-center`}
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
          </>
        )}
        {inputFocused && !dataError && (
          <>
            {filters !== "artists" &&
              filters !== "playlists" &&
              filters !== "albums" &&
              filters !== "songs" && (
                <div>
                  <section className="w-full flex mb-8 flex-wrap justify-between">
                    {/* <div className="w-full flex  flex-wrap justify-between"> */}
                    {inputFocused && !dataError && !isLoading && (
                      <>
                        <section className="w-[48%] h-[244px]">
                          <h2 className="font-erica w-full font-[900] text-2xl text-white pb-2">
                            Top result
                          </h2>
                          {Object.keys(topResultData).length > 0 && (
                            <TopResultCard
                              artists={topResultData.artists}
                              artistDetails={
                                topResultData.type !== "track"
                                  ? topResultData
                                  : null
                              }
                              type={topResultData.type}
                              resultName={topResultData.name}
                              image={imgLocation}
                              playlistCreator={
                                playlistVerify
                                  ? topResultData.owner?.display_name
                                  : null
                              }
                              userId={
                                playlistVerify ? topResultData.owner.id : ""
                              }
                              idNo={topResultData.id}
                              explicit={
                                topResultData.type === "track"
                                  ? topResultData.explicit
                                  : null
                              }
                            />
                          )}
                        </section>
                        <section className="w-2/4 h-[286px] ">
                          <h2 className="font-erica w-full font-[900] text-2xl text-white pb-2">
                            Songs
                          </h2>
                          {tracksData.length > 0 && (
                            <>
                              {tracksData.slice(0, 4).map((tracks_d, index) => {
                                const imgUrl =
                                  tracks_d.album.images &&
                                  tracks_d.album.images.length > 0
                                    ? tracks_d.album.images[0].url
                                    : avatar;
                                return (
                                  <TrackCard
                                    key={index}
                                    idNo={tracks_d.id}
                                    artists={tracks_d.artists}
                                    image={imgUrl}
                                    trackUri={tracks_d.uri}
                                    duration={tracks_d.duration_ms}
                                    trackName={tracks_d.name}
                                    explicit={tracks_d.explicit}
                                    albumId={tracks_d.album.id}
                                  />
                                );
                              })}
                            </>
                          )}
                        </section>
                      </>
                    )}
                    {inputFocused && !dataError && isLoading && (
                      <>
                        <section className="w-[48%] h-[244px] ">
                          <span className="w-2/4 ">
                            <Skeleton type="track_btns" />
                          </span>
                          <TopResultCardSkeleton />
                        </section>
                        <section className="w-2/4 h-[286px] flex flex-col gap-2">
                          <span className="w-2/4 ">
                            <Skeleton type="track_btns" />
                          </span>
                          <TracksCardSkeleton />
                          <TracksCardSkeleton />
                          <TracksCardSkeleton />
                          <TracksCardSkeleton />
                        </section>
                      </>
                    )}
                    {/* </div> */}
                  </section>
                  <section className="w-full flex  flex-wrap justify-between mb-8">
                    {inputFocused &&
                      !dataError &&
                      !isLoading &&
                      artistsData.length > 0 && (
                        <>
                          <h2 className="font-erica w-full font-[900] text-2xl text-white pb-2">
                            Artists
                          </h2>
                          <span className="w-full justify-start flex ">
                            {artistsData.slice(0, 5).map((artists_d, index) => {
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
                                     searchPage={true}
                                />
                              );
                            })}
                          </span>
                        </>
                      )}
                    {inputFocused && !dataError && isLoading && (
                      <>
                        <span className="w-full overflow-x-hidden mb-2">
                          <Skeleton type="track_btns" />
                        </span>
                        <span className="w-full justify-between flex ">
                          <ArtistCardSkeleton />
                          <ArtistCardSkeleton />
                          <ArtistCardSkeleton />
                          <ArtistCardSkeleton />
                          <ArtistCardSkeleton />
                        </span>
                      </>
                    )}
                  </section>
                  <section className="w-full flex  flex-wrap justify-between mb-8">
                    {inputFocused &&
                      !dataError &&
                      !isLoading &&
                      albumsData.length > 0 && (
                        <>
                          <h2 className="font-erica w-full font-[900] text-2xl text-white pb-2">
                            Albums
                          </h2>
                          <span className="w-full justify-start flex ">
                            {albumsData.slice(0, 5).map((albums_d, index) => {
                              const releaseDate = albums_d.release_date.slice(
                                0,
                                4
                              );
                              const imgUrl =
                                albums_d.images && albums_d.images.length > 0
                                  ? albums_d.images[0].url
                                  : avatar;

                              return (
                                <Card
                                  key={index}
                                  image={imgUrl}
                                  artistDetails={albums_d}
                                  title={albums_d.name}
                                  artists={albums_d.artists[0].name}
                                  artistsId={albums_d.artists[0].id}
                                  path={albums_d.type}
                                  idNo={albums_d.id}
                                  releaseDate={releaseDate}
                                  searchPage={true}
                                />
                              );
                            })}
                          </span>
                        </>
                      )}
                    {inputFocused && !dataError && isLoading && (
                      <>
                        <span className="w-full overflow-x-hidden mb-2">
                          <Skeleton type="track_btns" />
                        </span>
                        <span className="w-full justify-between flex ">
                          <CardSkeleton />
                          <CardSkeleton />
                          <CardSkeleton />
                          <CardSkeleton />
                          <CardSkeleton />
                        </span>
                      </>
                    )}
                  </section>
                  <section className="w-full flex  flex-wrap justify-between ">
                    {inputFocused &&
                      !dataError &&
                      !isLoading &&
                      playlistsData.length > 0 && (
                        <>
                          <h2 className="font-erica w-full font-[900] text-2xl text-white pb-2">
                            Playlist
                          </h2>
                          <span className="w-full justify-start flex ">
                            {playlistsData.slice(0, 5).map((playlist_d) => {
                              if(!playlist_d) return;
                              const imgUrl =
                                playlist_d?.images &&
                                playlist_d?.images.length > 0
                                  ? playlist_d?.images[0].url
                                  : avatar;
                              const creatorName =
                                playlist_d?.owner?.display_name || "Unknown";
                              const newCreatorName =
                                creatorName.charAt(0).toUpperCase() +
                                creatorName.slice(1);
                              return (
                                <Card
                                  key={playlist_d.id}
                                  artistDetails={playlist_d}
                                  image={imgUrl}
                                  title={playlist_d?.name || "Unknown"}
                                  path={playlist_d.type}
                                  idNo={playlist_d.id}
                                  playlistCreator={newCreatorName}
                                  searchPage={true}
                                />
                              );
                            })}
                          </span>
                        </>
                      )}
                    {inputFocused && !dataError && isLoading && (
                      <>
                        <span className="w-full overflow-x-hidden mb-2">
                          <Skeleton type="track_btns" />
                        </span>
                        <span className="w-full justify-between flex ">
                          <CardSkeleton />
                          <CardSkeleton />
                          <CardSkeleton />
                          <CardSkeleton />
                          <CardSkeleton />
                        </span>
                      </>
                    )}
                  </section>
                </div>
              )}
            {filters === "songs" && (
              <div className="w-full pt-4  flex  flex-wrap justify-center gap-y-4 items-center">
                {inputFocused && !dataError && isLoading && (
                  <>
                    {newGenresArray.map((genre, index) => {
                      return (
                        // <span className="w-[48%] ">
                        <TracksCardSkeletonTwo key={index} />
                        // </span>
                      );
                    })}
                  </>
                )}
                {inputFocused &&
                  !dataError &&
                  !isLoading &&
                  tracksData.length > 0 && (
                    <>
                      <TrackTableView
                        tracksData={tracksData}
                        navHeight={navHeight}
                        type="track"
                      />
                    </>
                  )}
              </div>
            )}
            {filters === "artists" && (
              <div className="w-full pt-4  flex  flex-wrap justify-center gap-y-4 items-center">
                {inputFocused && !dataError && isLoading && (
                  <>
                    {newGenresArray.map((genre, index) => {
                      return <ArtistCardSkeleton key={index} />;
                    })}
                  </>
                )}
                {inputFocused &&
                  !dataError &&
                  !isLoading &&
                  artistsData.length > 0 && (
                    <>
                      {artistsData.map((artists_d, index) => {
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
                            searchPage={true}
                          />
                        );
                      })}
                    </>
                  )}
              </div>
            )}
            {filters === "albums" && (
             <>
                {inputFocused &&
                  !dataError &&
                  !isLoading &&
                  albumsData.length > 0 && (
                    <div className="w-full pt-4  flex  flex-wrap justify-center  gap-y-4 items-center">
                      {albumsData.map((albums_d, index) => {
                        const releaseDate = albums_d.release_date.slice(0, 4);
                        const imgUrl =
                          albums_d.images && albums_d.images.length > 0
                            ? albums_d.images[0].url
                            : avatar;

                        return (
                          <Card
                            key={albums_d.id}
                            image={imgUrl}
                            artistDetails={albums_d}
                            title={albums_d.name}
                            artists={albums_d.artists[0].name}
                            artistsId={albums_d.artists[0].id}
                            path={albums_d.type}
                            idNo={albums_d.id}
                            releaseDate={releaseDate}
                            searchPage={true}
                          />
                        );
                      })}
                    </div>
                  )}
                {inputFocused && !dataError && isLoading && (
                  <div className="w-full pt-4  flex  flex-wrap justify- gap-x-4 gap-y-4 items-center">
                  {newGenresArray.map((genre, index) => {
                    return <CardSkeleton key={index} />;
                  })}
                </div>
                )}
              </>
            )}
            {filters === "playlists" && (
              <>
                {inputFocused &&
                  !dataError &&
                  !isLoading &&
                  playlistsData.length > 0 && (
                    <div className="w-full pt-4  flex  flex-wrap justify-center  gap-y-4 items-center">
                      {playlistsData.map((playlist_d) => {
                        if(!playlist_d) return;
                        const imgUrl =
                          playlist_d.images && playlist_d.images.length > 0
                            ? playlist_d.images[0].url
                            : avatar;
                        const creatorName =
                          playlist_d?.owner?.display_name || "Unknown";
                        const newCreatorName =
                          creatorName.charAt(0).toUpperCase() +
                          creatorName.slice(1);
                        return (
                          <Card
                            key={playlist_d.id}
                            artistDetails={playlist_d}
                            image={imgUrl}
                            title={playlist_d.name}
                            path={playlist_d.type}
                            idNo={playlist_d.id}
                            playlistCreator={newCreatorName}
                            searchPage={true}
                          />
                        );
                      })}
                    </div>
                  )}
                {inputFocused && !dataError && isLoading && (
                  <div className="w-full pt-4  flex  flex-wrap justify- gap-x-4 gap-y-4 items-center">
                    {newGenresArray.map((genre, index) => {
                      return <CardSkeleton key={index} />;
                    })}
                  </div>
                )}
            </>
            )}
          </>
        )}
        {dataError && (
          <section className="h-[50%] min-h-[400px] flex flex-col items-center justify-center">
            <h3 className="w-full font-[700] text-xl text-center text-white pb-3">
              No results found for {`"${inputValue}"`}
            </h3>
            <p className="w-full font-[600] text-base text-center text-white ">
              Please make sure your words are spelled correctly, or use fewer or
              different keywords.
            </p>
          </section>
        )}
      </>
    );
  }
);

export default DesktopView;
