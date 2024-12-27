import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../App";
import CardSkeleton from "../components/PlaylistCardSkeleton";
import Card from "../components/PlaylistCard";
import logo from "../assets/logo.png";
import ParentLayouts from "../components/ParentLayouts";
import LoginBtn from "../components/LoginBtn";
import UserBtn from "../components/UserBtn";
import Skeleton from "../components/Skeleton";
import avatar from "../assets/user (1).png";
function Home() {
  const [featuredPlaylistLoading, setFeaturedPlaylistLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [featuredPlaylistData, setFeaturedPlaylistData] = useState([]);
  const [featuredPlaylistError, setFeaturedPlaylistError] = useState(false);
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [newReleasesLoading, setNewReleasesLoading] = useState(true);
  const [newReleasesError, setNewReleasesError] = useState(false);
  const {
    loggedIn,
    accessToken,

    SEARCH_PARAM,
    scrollToTop,
    setDocumentTitle,
    getTokenHandler,
    logOut,
  } = useContext(myContext);
  function getUserLocale() {
    const locale = navigator.language || navigator.languages[0];
    return locale.replace("-", "_") || "en_US";
  }
  async function getFeaturedPlaylists() {
    try {
      setFeaturedPlaylistLoading(true);
      const locale = getUserLocale();
      const SEARCH_URL = `https://api.spotify.com/v1/browse/featured-playlists?limit=20&locale=${locale}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setFeaturedPlaylistData(data.playlists.items);
        setFeaturedPlaylistError(false);
      } else {
        setFeaturedPlaylistError(true);
        setFeaturedPlaylistData([]);
      }
    } catch (error) {
      console.error(error);
      setFeaturedPlaylistError(true);
      setFeaturedPlaylistData([]);
    } finally {
      setFeaturedPlaylistLoading(false);
    }
  }

  // async function searchRandomArtistAlbum(artist) {
  //   try {
  //     setSearchLoading(true);
  //     const artistNo = await searchHandler(artist);
  //     const SEARCH_URL = `https://api.spotify.com/v1/artists/${artistNo}/albums?include_groups=album,appears_on&market=US&limit=50`;
  //     const response = await fetch(SEARCH_URL, SEARCH_PARAM);

  //     if (response.ok) {
  //       const data = await response.json();
  //       const dataArray = Array.isArray(data.items) ? data.items : [data.items];
  //       setHomeData(dataArray);
  //       setSearchError(false);
  //     } else {
  //       setHomeData([]);
  //       setSearchError(true);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setHomeData([]);
  //     setSearchError(true);
  //   } finally {
  //     setSearchLoading(false);
  //   }
  // }
  async function getNewReleases() {
    try {
      setNewReleasesLoading(true);
      const SEARCH_URL =
        "https://api.spotify.com/v1/browse/new-releases?limit=50";
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setNewReleasesData(data.albums.items);
        setNewReleasesError(false);
      } else {
        throw new Error("Failed to fetch new releases");
      }
    } catch (error) {
      setNewReleasesError(true);
      console.error(error);
    } finally {
      setNewReleasesLoading(false);
    }
  }

  const numbers = Array.from({ length: 20 }, (_, index) => index + 1);

  useEffect(() => {
    setDocumentTitle("Audiovista");

    scrollToTop();
  }, []);
  useEffect(() => {
    if (!featuredPlaylistLoading && !newReleasesLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [featuredPlaylistLoading, newReleasesLoading]);
  useEffect(() => {
    if (!featuredPlaylistError && !newReleasesError) {
      setError(false);
    } else {
      setError(true);
    }
  }, [featuredPlaylistError, newReleasesError]);

  // useEffect(() => {
  //   if (accessToken && loggedIn) {
  //     getFeaturedPlaylists();
  //     getNewReleases();
  //   }
  // }, [accessToken, loggedIn]);
  useEffect(() => {
    if (accessToken) {
      // searchRandomArtistAlbum(randomArtistName);
      // if(loggedIn) {
      // getFeaturedPlaylists();
      getNewReleases();
      // }
    } 
  }, [accessToken]);
  function refreshHandler() {
    window.location.reload();
  }
  return (
    <ParentLayouts>
      <nav
        aria-label="Home navigation"
        className="flex ipad:hidden justify-between sticky top-0 z-30 bg-primary   items-center py-4 flex-wrap px-[2.5%]	gap-2 "
      >
        <span className="flex justify-center items-center gap-2">
          <img src={logo} alt="logo" className="aspect-square w-[35px]" />
          <h2 className=" hidden miniScreen:flex font-[700] text-xl text-white font-erica ">
            Audiovista
          </h2>
        </span>

        {!loggedIn ? <LoginBtn /> : <UserBtn />}
      </nav>
      {/* {!error && !loggedIn && (
        <section className="px-[2.5%] w-full pb-4 items-center justify-start">
          <h2 className="font-[900] text-3xl text-white ellipsis-container">
            Good {timeOfDay}
          </h2>
        </section>
      )} */}

      {!isLoading && !error && newReleasesData.length > 0 && (
        <section className="px-[2.5%] flex flex-wrap flex-col pt-2  ipad:pt-4 pb-6">
          <h2 className="w-full font-[900]  sm:text-3xl text-2xl text-center font-erica ipad:text-left text-white pb-2 ">
            New Releases
          </h2>
          <div className="w-full pt-4  flex  flex-wrap justify-center gap-y-4 items-center">
            {newReleasesData.map((hdata) => {
              const releaseDate = hdata.release_date.slice(0, 4);
              return (
                <Card
                  key={hdata.id}
                  image={hdata.images[0].url}
                  title={hdata.name}
                  artists={hdata.artists[0].name}
                  artistsId={hdata.artists[0].id}
                  path={hdata.type}
                  idNo={hdata.id}
                  releaseDate={releaseDate}
                  artistDetails={hdata}
                />
              );
            })}
          </div>
        </section>
      )}
      {/* {!isLoading && !error && featuredPlaylistData.length > 0 && (
        <section className="px-[2.5%] flex flex-wrap flex-col">
          <h2 className="w-full font-[900] font-erica sm:text-3xl text-2xl text-center ipad:text-left text-white pb-2 ">
            Featured playlists
          </h2>
          <div className="w-full pt-4  flex  flex-wrap justify-center gap-y-4 items-center">
            {featuredPlaylistData.map((playlist_d) => {
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
                  // playlistCreator={newCreatorName}
                />
              );
            })}
          </div>
        </section>
      )} */}
      {isLoading && !error && (
        <section className="px-[2.5%] pt-4 w-full">
         
            <span className="w-full justify-center ipad:justify-start flex pb-4">
              <Skeleton type="home_btns" />
            </span>
       
          <div className=" flex flex-wrap justify-center gap-x-2 w-full ipad:justify-between    gap-y-[30px] ">
            {numbers.map((numb) => {
              return <CardSkeleton key={numb} />;
            })}
          </div>
        </section>
      )}
      {/* {isLoading && !error && <LoaderComp />}
      {!isLoading && !error && homeData.length >= 1 && (
        <section className="px-[2.5%] flex flex-wrap flex-col ">
          {loggedIn && (
            <h2 className="w-full font-[900] sm:text-3xl text-2xl text-center ipad:text-left text-white pb-2 ">
              Random albums
            </h2>
          )}
          <div className="w-full pt-4  flex  flex-wrap justify-center gap-y-4 items-center">
            {homeData.map((hdata) => {
              const releaseDate = hdata.release_date.slice(0, 4);
              return (
                <Card
                  key={hdata.id}
                  image={hdata.images[0].url}
                  title={hdata.name}
                  artists={hdata.artists[0].name}
                  artistsId={hdata.artists[0].id}
                  path={hdata.type}
                  idNo={hdata.id}
                  releaseDate={releaseDate}
                  artistDetails={hdata}
                />
              );
            })}

          </div>
        </section>
      )} */}
      {error && (
        <section className="flex flex-col h-[70dvh] max-h-[700px] items-center justify-center gap-4">
          <h1 className="text-2xl font-[900] font-erica text-center w-full px-[2.5%] pt-8 text-white sm:text-4xl">
            Something went wrong
          </h1>
          <span className="flex justify-center items-center">
            {" "}
            <button
              className="button2 text-base type1"
              onClick={() => {
                refreshHandler();
                getTokenHandler();
                logOut();
              }}
            >
              Click to refresh
            </button>
          </span>
        </section>
      )}
    </ParentLayouts>
  );
}

export default Home;
