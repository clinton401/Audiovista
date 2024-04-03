import React, { useContext, useEffect, useState, useRef } from "react";
import { myContext } from "../App";
import ParentLayouts from "../components/ParentLayouts";
import { useParams } from "react-router-dom";
import ArtistDesktopView from "../components/ArtistDesktopView";
import NotFoundView from "../components/NotFoundView";
import { useNavigate } from "react-router-dom";
import ArtistMobileView from "../components/ArtistMobileView";
import Modals from "../components/Modals";
function Artist() {
  const [isLoading, setIsLoading] = useState(true);
  const [artistLoading, setArtistLoading] = useState(true);
  const [tracksLoading, setTracksLoading] = useState(true);
  const [arfLoading, setArfLoading] = useState(true);
  const [albumLoading, setAlbumLoading] = useState(true);
  const [relatedArtistsLoading, setRelatedArtistLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [followersWithComma, setFollowersWithComma] = useState("");
  const [artistData, setArtistData] = useState({});
  const [artistTracks, setArtistTracks] = useState([]);
  const [artistAlbum, setArtistAlbum] = useState([]);
  const [artistAppearsOn, setArtistAppearsOn] = useState([]);
  const [relatedArtists, setRelatedArtist] = useState([]);
  const [isArtistFollowed, setIsArtistFollowed] = useState(false);
  const [followHandle, setFollowHandle] = useState(false);
  const [unFollowHandle, setUnFollowHandle] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [unAuthModal, setUnAuthModal] = useState(false);
  const [searchParamPut, setSearchParamPut] = useState({});
  const [searchParamDelete, setSearchParamDelete] = useState({});
  const [searchParamGet, setSearchParamGet] = useState({});
  const [navContentsActive, setNavContentsActive] = useState(false);
  const [modalText, setModalText] = useState(null);
  const navigate = useNavigate();
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const {
    SEARCH_PARAM,
    loggedIn,
    accessToken,
    numberWithCommas,
    scrollToTop,
    setDocumentTitle,
    setArtistChange,
    // SEARCH_PARAM_PUT,
  } = useContext(myContext);
  const { id } = useParams();
  // console.log({ dataError, isLoading, artistData });

  async function getRelatedArtists() {
    try {
      setRelatedArtistLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/artists/${encodeURIComponent(
        id
      )}/related-artists`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setRelatedArtist(data.artists);
        setDataError(false);
        setRelatedArtistLoading(false);
      } else {
        setRelatedArtist([]);
        setDataError(true);
        setRelatedArtistLoading(false);
      }
    } catch (error) {
      setRelatedArtist([]);
      setDataError(true);
      setRelatedArtistLoading(false);
      console.log(error);
    }
  }
  async function getArtistAppearsOnAlbum() {
    try {
      setAlbumLoading(true);
      const SEARCH_URL = `
https://api.spotify.com/v1/artists/${encodeURIComponent(
        id
      )}/albums?include_groups=appears_on`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setArtistAppearsOn(data.items);
        setDataError(false);
        setAlbumLoading(false);
      } else {
        setArtistAppearsOn([]);
        setDataError(true);
        setAlbumLoading(false);
      }
    } catch (error) {
      setArtistAppearsOn([]);
      setDataError(true);
      setAlbumLoading(false);
      console.log(error);
    }
  }
  async function getArtistAlbum() {
    try {
      setAlbumLoading(true);
      const SEARCH_URL = `
https://api.spotify.com/v1/artists/${encodeURIComponent(
        id
      )}/albums?include_groups=album`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setArtistAlbum(data.items);
        setDataError(false);
        setAlbumLoading(false);
      } else {
        setArtistAlbum([]);
        setDataError(true);
        setAlbumLoading(false);
      }
    } catch (error) {
      setArtistAlbum([]);
      setDataError(true);
      setAlbumLoading(false);
      console.log(error);
    }
  }
  async function getArtistTracks() {
    try {
      setTracksLoading(true);
      const SEARCH_URL = `
https://api.spotify.com/v1/artists/${encodeURIComponent(id)}/top-tracks`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setArtistTracks(data.tracks);
        setDataError(false);
        setTracksLoading(false);
      } else {
        setArtistTracks([]);
        setDataError(true);
        setTracksLoading(false);
      }
    } catch (error) {
      setArtistTracks([]);
      setDataError(true);
      setTracksLoading(false);
      console.log(error);
    }
  }
  async function isFollowed() {
    try {
      setArfLoading(true);
      const SEARCH_URL = `
https://api.spotify.com/v1/me/following/contains?type=artist&ids=${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setIsArtistFollowed(data[0]);
        // setDataError(false);
        setArfLoading(false);
      } else {
        setIsArtistFollowed(false);
        // setDataError(true);
        setArfLoading(false);
      }
    } catch (error) {
      setIsArtistFollowed(false);
      // setDataError(true);
      setArfLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    let timeoutId;

    if (followHandle || unFollowHandle || unAuthModal) {
      timeoutId = setTimeout(() => {
        setUnFollowHandle(false);
        setFollowHandle(false);
        setUnAuthModal(false);
      }, 3000);
    }

    // Clean up the timeout to avoid memory leaks
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [followHandle, unFollowHandle, unAuthModal]);
  useEffect(() => {
    if (followHandle) {
      setUnFollowHandle(false);
      setUnAuthModal(false);
    } else if (unFollowHandle) {
      setFollowHandle(false);
      setUnAuthModal(false);
    } else if (setUnAuthModal) {
      setFollowHandle(false);
      setUnFollowHandle(false);
    }
  }, [followHandle, unFollowHandle, unAuthModal]);
  function unAuthModalHandler() {
    setUnAuthModal(true);
    setModalText("You need to be logged in first");
  }

  async function getArtist() {
    setDocumentTitle("Audiovista");
    try {
      setArtistLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/artists/${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setArtistData(data);
        setDocumentTitle(data.name);
        setDataError(false);
        setArtistLoading(false);
      } else {
        setArtistData({});
        setDataError(true);
        setArtistLoading(false);
      }
    } catch (error) {
      setArtistData({});
      setDataError(true);
      setArtistLoading(false);
      console.log(error);
    }
  }
  const bodyData = {
    ids: [id],
  };
  // const SEARCH_PARAM_PUT = {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify(bodyData),
  // };
  // const SEARCH_PARAM_DELETE = {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify(bodyData),
  // };
  async function followHandler() {
    try {
      setFollowLoading(true)
      const SEARCH_URL = `https://api.spotify.com/v1/me/following?type=artist&ids=${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, searchParamPut);
      if (response.ok) {
        setFollowHandle(true);
        setIsArtistFollowed(true);
        setFollowLoading(false);
        setModalText("Added To Your Library");
      } else {
        setFollowHandle(false);
          setFollowLoading(false);
        setModalText("Unable to add To Your Library");
        setIsArtistFollowed(false);
      }
    } catch (error) {
        setFollowLoading(false);
      setFollowHandle(false);
      setModalText("Unable to add To Your Library");
      setIsArtistFollowed(false);
    }
  }
  async function unFollowHandler() {
    try {
        setFollowLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/me/following?type=artist&ids=${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, searchParamDelete);
      if (response.ok) {
        setUnFollowHandle(true);
        setIsArtistFollowed(false);
          setFollowLoading(false);
        setModalText("Removed from Your Library");
      } else {
        setUnFollowHandle(false);
          setFollowLoading(false);
        setModalText("Unable to remove from Your Library");
        //  setIsArtistFollowed(false);
      }
    } catch (error) {
      setUnFollowHandle(false);
        setFollowLoading(false);
      setModalText("Unable to remove from Your Library");
      //  setIsArtistFollowed(false);
    }
  }
  useEffect(() => {
    if (accessToken) {
      scrollToTop();
      getArtist();
      getArtistTracks();
      getArtistAlbum();
      getArtistAppearsOnAlbum();
      getRelatedArtists();
      setSearchParamPut({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodyData),
      });
      setSearchParamDelete({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodyData),
      });
      setSearchParamGet({
        
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  
      })
    }
    
  }, [accessToken, id]);
  useEffect(() => {
    if (accessToken && loggedIn) {
      isFollowed();
    }
  }, [accessToken, id, loggedIn]);
  useEffect(() => {
    if (
      artistLoading &&
      tracksLoading &&
      albumLoading &&
      relatedArtistsLoading
      // arfLoading
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [
    artistLoading,
    tracksLoading,
    albumLoading,
    relatedArtistsLoading,
    // arfLoading,
  ]);
  useEffect(() => {
    if (Object.keys(artistData).length > 0) {
      const totalFollowers = numberWithCommas(artistData.followers.total);
      setFollowersWithComma(totalFollowers);
    }
  }, [artistData]);
  useEffect(() => {
    const handleScroll = () => {
      if (!isLoading && !dataError) {
        const { top } = childRef.current.getBoundingClientRect();
        setNavContentsActive(top <= 20);
      }
    };

    const element = parentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoading, dataError]);
  useEffect(() => {
    setArtistChange(isArtistFollowed);
  }, [isArtistFollowed]);
  const BackHandler = () => {
    navigate(-1);
  };
  function buttonFollowHandler() {
    if (isArtistFollowed) {
      unFollowHandler();
    } else {
      followHandler();
    }
  }

  return (
    <ParentLayouts ref={parentRef}>
      {(followHandle || unFollowHandle || unAuthModal) && (
        <Modals text={modalText} />
      )}
      {/* {unFollowHandle && <Modals text={modalText} />}
      {unAuthModal && <Modals text={modalText} />} */}
      {!dataError ? (
        <>
          <section className="hidden relative h-full min-h-[400px] ipad:block w-full">
            <ArtistDesktopView
              isLoading={isLoading}
              artistData={artistData}
              dataError={dataError}
              loggedIn={loggedIn}
              numberWithCommas={numberWithCommas}
              navContentsActive={navContentsActive}
              ref={childRef}
              BackHandler={BackHandler}
              artistTracks={artistTracks}
              artistAlbum={artistAlbum}
              artistAppearsOn={artistAppearsOn}
              relatedArtists={relatedArtists}
              followersWithComma={followersWithComma}
              isArtistFollowed={isArtistFollowed}
              buttonFollowHandler={buttonFollowHandler}
              unAuthModalHandler={unAuthModalHandler}
              followLoading={followLoading}
            />
          </section>
          <section className="block   h-full min-h-[300px] relative  ipad:hidden w-full">
            <ArtistMobileView
              isLoading={isLoading}
              artistData={artistData}
              dataError={dataError}
              loggedIn={loggedIn}
              numberWithCommas={numberWithCommas}
              navContentsActive={navContentsActive}
              BackHandler={BackHandler}
              artistTracks={artistTracks}
              artistAlbum={artistAlbum}
              artistAppearsOn={artistAppearsOn}
              relatedArtists={relatedArtists}
              followersWithComma={followersWithComma}
              isArtistFollowed={isArtistFollowed}
              buttonFollowHandler={buttonFollowHandler}
              unAuthModalHandler={unAuthModalHandler}
              followLoading={followLoading}
            />
          </section>
        </>
      ) : (
        <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 ipad:max-h-[900px] justify-center h-dvh min-h-[400px] ">
          <NotFoundView />
        </section>
      )}
    </ParentLayouts>
  );
}

export default Artist;
