import React, { useContext, useRef, useEffect, useState } from "react";
import ParentLayouts from "../components/ParentLayouts";
import { myContext } from "../App";
import { useNavigate } from "react-router-dom";
import LoginBtn from "../components/LoginBtn";
import NotFoundView from "../components/NotFoundView";
import LibraryDesktopView from "../components/LibraryDesktopView";
import LibraryMobileView from "../components/LibraryMobileView";
import useHandleScroll from "../hooks/useHandleScroll";
function Library() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [topArtistByMonthLoading, setTopArtistByMonthLoading] = useState(true);
  const [topArtistByMonthError, setTopArtistByMonthError] = useState(false);
  const [topArtistByMonth, setTopArtistByMonth] = useState([]);
  const [topTrackByMonthLoading, setTopTrackByMonthLoading] = useState(true);
  const [topTrackByMonthError, setTopTrackByMonthError] = useState(false);
  const [topTrackByMonth, setTopTrackByMonth] = useState([]);
    const [navContentsActive, setNavContentsActive] = useState(false);
     const [navContentsMobileActive, setNavContentsMobileActive] = useState(false);
  const {
    SEARCH_PARAM,
    loggedIn,
    accessToken,
    numberWithCommas,
    scrollToTop,
    setDocumentTitle,
    setArtistChange,
    userData,
    topArtistLoading,
    topArtistError,
    authUserPlaylistData,
    followingArtists,
    userDataLoading,
    userDataError,
  } = useContext(myContext);
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const childRefMobile = useRef(null);
  const navigate = useNavigate();
  async function getTopArtistsByMonth() {
    try {
      setTopArtistByMonthLoading(true);
      const SEARCH_URL =
        "https://api.spotify.com/v1/me/top/artists?time_range=short_term";
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setTopArtistByMonth(data.items);
        setTopArtistByMonthLoading(false);
        setTopArtistByMonthError(false);
      } else {
        setTopArtistByMonth([]);
        setTopArtistByMonthLoading(false);
        setTopArtistByMonthError(true);
      }
    } catch (error) {
      setTopArtistByMonth([]);
      setTopArtistByMonthLoading(false);
      setTopArtistByMonthError(true);
      console.log(error);
    }
  }
  async function getTopTracksByMonth() {
    try {
      setTopTrackByMonthLoading(true);
      const SEARCH_URL =
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term";
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setTopTrackByMonth(data.items);
        setTopTrackByMonthLoading(false);
        setTopTrackByMonthError(false);
      } else {
        setTopTrackByMonth([]);
        setTopTrackByMonthLoading(false);
        setTopTrackByMonthError(true);
      }
    } catch (error) {
      setTopTrackByMonth([]);
      setTopTrackByMonthLoading(false);
      setTopTrackByMonthError(true);
      console.log(error);
    }
  }
 useHandleScroll(
   isLoading,
   dataError,
   childRef,
   setNavContentsActive,
   parentRef
 );
 useHandleScroll(
   isLoading,
   dataError,
   childRefMobile,
   setNavContentsMobileActive,
   parentRef
 );
  useEffect(() => {
    setDocumentTitle('Audiovista') 
    if (loggedIn && userData) {
           setDocumentTitle(`${userData.display_name} - Library`);
    }
  }, [loggedIn, userData])
  useEffect(() => {
    if (loggedIn && accessToken) {
      getTopArtistsByMonth();
      getTopTracksByMonth();
    } else {
      setIsLoading(true)
    }
  }, [loggedIn, accessToken]);
  useEffect(() => {
    if (
      !topArtistLoading &&
      !userDataLoading &&
      !topArtistByMonthLoading &&
      !topTrackByMonthLoading
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [
    topArtistLoading,
    userDataLoading,
    topArtistByMonthLoading,
    topTrackByMonthLoading,
  ]);
  useEffect(() => {
    if (
      !topArtistError &&
      !userDataError &&
      !topArtistByMonthError &&
      !topTrackByMonthError
    ) {
      setDataError(false);
    } else {
      setDataError(true);
    }
  }, [
    topArtistError,
    userDataError,
    topArtistByMonthError,
    topTrackByMonthError,
  ]);
   const BackHandler = () => {
     navigate(-1);
   };
  
  return (
    <ParentLayouts ref={parentRef}>
      {loggedIn ? (
        <>
          {!dataError ? (
            <>
              <section className="hidden relative h-full min-h-[400px] ipad:block w-full">
                <LibraryDesktopView
                  ref={childRef}
                  dataError={dataError}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  BackHandler={BackHandler}
                  userData={userData}
                  followingArtists={followingArtists}
                  authUserPlaylistData={authUserPlaylistData}
                  topArtistByMonth={topArtistByMonth}
                  topTrackByMonth={topTrackByMonth}
                  navContentsActive={navContentsActive}
                />
              </section>
              <section className="block   h-full min-h-[300px] relative  ipad:hidden w-full">
                <LibraryMobileView
                  dataError={dataError}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  BackHandler={BackHandler}
                  userData={userData}
                  followingArtists={followingArtists}
                  authUserPlaylistData={authUserPlaylistData}
                  topArtistByMonth={topArtistByMonth}
                  topTrackByMonth={topTrackByMonth}
                   navContentsActive={navContentsMobileActive}
                   setNavContentsActive={setNavContentsMobileActive}
                    ref={childRefMobile}
                />
              </section>
            </>
          ) : (
            <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 ipad:max-h-[900px] justify-center h-dvh min-h-[400px] ">
              <NotFoundView />
            </section>
          )}
        </>
      ) : (
        <section className="w-full h-dvh min-h-[400px] max-h-[900px] flex flex-col px-[2.5%] py-4 items-center justify-center gap-4 ">
          <h2 className="text-2xl text-center font-[900]  ">
            {" "}
            You need to be logged in to view your library
          </h2>
          <LoginBtn />
        </section>
      )}
    </ParentLayouts>
  );
}

export default Library;
