import React, { useEffect, useRef, useState, useContext } from "react";
import ParentLayouts from "../components/ParentLayouts";
import { myContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import Modals from "../components/Modals";
import NotFoundView from "../components/NotFoundView";
import UserDesktopView from "../components/UserDesktopView";
import UserMobileView from "../components/UserMobileView";
import useHandleScroll from "../hooks/useHandleScroll";
import useRandomNavColor from "../hooks/useRandomNavColor";
function User() {
  const [isLoading, setIsLoading] = useState(true);
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [publicLoading, setPublicLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [usersPlaylist, setUsersPlaylist] = useState([]);
  const [usersPublicPlaylist, setUsersPublicPlaylist] = useState([]);
  const [userAuth, setUserAuth] = useState(false);
  const [isArtistFollowed, setIsArtistFollowed] = useState(false);
  const [followHandle, setFollowHandle] = useState(false);
  const [unFollowHandle, setUnFollowHandle] = useState(false);
  const [unAuthModal, setUnAuthModal] = useState(false);
  const [modalText, setModalText] = useState(null);
  const [modalTextError, setModalTextError] = useState(null);
  const [navContentsActive, setNavContentsActive] = useState(false);
     const [navContentsMobileActive, setNavContentsMobileActive] =
       useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const {
    SEARCH_PARAM,
    loggedIn,
    accessToken,
    numberWithCommas,
    scrollToTop,
    createToast,
    setDocumentTitle,
    setArtistChange,
    userData,
  } = useContext(myContext);
  const { id } = useParams();
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const childRefMobile = useRef(null);
  const navigate = useNavigate();
  
  const chosenNavColor = useRandomNavColor(id);
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
  

  async function getUserProfile() {
    setDocumentTitle("Audiovista");
    try {
      setDataLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/users/${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const jsonData = await response.json();
        setUsersData(jsonData);
        setDocumentTitle(`${jsonData.display_name} - User`);
        setDataLoading(false);
        setDataError(false);
      } else {
        setUsersData(null);
        setDataError(true);
        setDataLoading(false);
      }
    } catch (error) {
      setUsersData(null);
      setDataError(true);
      setDataLoading(false);
      console.log(error);
    }
  }
  async function getUserPlaylist() {
    try {
      setPlaylistLoading(true);
      const SEARCH_URL = `
https://api.spotify.com/v1/users/${encodeURIComponent(id)}/playlists`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const jsonData = await response.json();
        setUsersPlaylist(jsonData.items);
        setPlaylistLoading(false);
        setDataError(false);
      } else {
        setUsersPlaylist([]);
        setDataError(true);
        setPlaylistLoading(false);
      }
    } catch (error) {
      setUsersPlaylist([]);
      setDataError(true);
      setPlaylistLoading(false);
      console.log(error);
    }
  }
  async function isFollowed() {
    try {
      // setArfLoading(true);
      const SEARCH_URL = `
https://api.spotify.com/v1/me/following/contains?type=user&ids=${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setIsArtistFollowed(data[0]);
        // setDataError(false);
        // setArfLoading(false);
      } else {
        setIsArtistFollowed(false);
        // setDataError(true);
        // setArfLoading(false);
      }
    } catch (error) {
      setIsArtistFollowed(false);
      // setDataError(true);
      // setArfLoading(false);
      console.log(error);
    }
  }
  const bodyData = {
    ids: [id],
  };
  const SEARCH_PARAM_PUT = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bodyData),
  };
  const SEARCH_PARAM_DELETE = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bodyData),
  };
  async function followHandler() {
    try {
      setFollowLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/me/following?type=user&ids=${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM_PUT);
      if (response.ok) {
        setFollowHandle(true);
        setIsArtistFollowed(true);
        setFollowLoading(false);
        setModalText("Added To Your Library");
      } else {
        setFollowHandle(false);
        setFollowLoading(false);
        setModalTextError("Unable to add To Your Library");
        setIsArtistFollowed(false);
      }
    } catch (error) {
      setFollowHandle(false);
      setFollowLoading(false);
      setModalTextError("Unable to add To Your Library");
      setIsArtistFollowed(false);
    }
  }
  async function unFollowHandler() {
    try {
      setFollowLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/me/following?type=user&ids=${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM_DELETE);
      if (response.ok) {
        setUnFollowHandle(true);
        setIsArtistFollowed(false);
        setFollowLoading(false);
        setModalText("Removed from Your Library");
      } else {
        setUnFollowHandle(false);
        setFollowLoading(false);
        setModalTextError("Unable to remove from Your Library");
        //  setIsArtistFollowed(false);
      }
    } catch (error) {
      setUnFollowHandle(false);
      setFollowLoading(false);
      setModalTextError("Unable to remove from Your Library");
      //  setIsArtistFollowed(false);
    }
  }
  useEffect(() => {
    if (accessToken) {
      getUserProfile();
      getUserPlaylist();
      scrollToTop();
    } else {
      setIsLoading(true)
    }
  }, [accessToken, id]);
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
  useEffect(() => {
    if(followHandle || unFollowHandle || unAuthModal){
      if(modalText) {
        createToast(modalText, "success")
      }else if(modalTextError){
        createToast(modalTextError, "error")
      }
    }
  }, [modalTextError, modalText])
  useEffect(() => {
    if (!dataLoading && !playlistLoading && !publicLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [dataLoading, playlistLoading, publicLoading]);
  useEffect(() => {
    if (usersData && usersPlaylist.length > 0) {
      setPublicLoading(true);
      const filteredResult = usersPlaylist.filter(
        (play) => play.owner.display_name === usersData.display_name
      );

      setUsersPublicPlaylist(filteredResult);
      setPublicLoading(false);
    }
  }, [usersData, usersPlaylist]);
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
    if (loggedIn && usersData && userData) {
      const usAuth = usersData.display_name === userData.display_name;
      setUserAuth(usAuth);
    }
  }, [usersData, userData, loggedIn]);
  useEffect(() => {
    if(accessToken) {
if(loggedIn && !userAuth) {
  isFollowed();
}
    } 
   
  }, [accessToken, id, loggedIn, userAuth]);

  function unAuthModalHandler() {
    setUnAuthModal(true);
    createToast("You need to be logged in first", "warn");
  }
  function buttonFollowHandler() {
    if (isArtistFollowed) {
      unFollowHandler();
    } else {
      followHandler();
    }
  }
  const BackHandler = () => {
    navigate(-1);
  };

  return (
    <ParentLayouts ref={parentRef}>
    

      {!dataError ? (
        <>
          <section className="hidden relative h-full min-h-[400px] ipad:block w-full">
            <UserDesktopView
              ref={childRef}
              dataError={dataError}
              loggedIn={loggedIn}
              isLoading={isLoading}
              BackHandler={BackHandler}
              usersData={usersData}
              usersPublicPlaylist={usersPublicPlaylist}
              isArtistFollowed={isArtistFollowed}
              buttonFollowHandler={buttonFollowHandler}
              unAuthModalHandler={unAuthModalHandler}
              userAuth={userAuth}
              usersPlaylist={usersPlaylist}
              followLoading={followLoading}
              navContentsActive={navContentsActive}
              chosenNavColor={chosenNavColor}
            />
          </section>
          <section className="block   h-full min-h-[300px] relative  ipad:hidden w-full">
            <UserMobileView
              dataError={dataError}
              loggedIn={loggedIn}
              isLoading={isLoading}
              BackHandler={BackHandler}
              usersData={usersData}
              usersPublicPlaylist={usersPublicPlaylist}
              isArtistFollowed={isArtistFollowed}
              buttonFollowHandler={buttonFollowHandler}
              unAuthModalHandler={unAuthModalHandler}
              userAuth={userAuth}
              followLoading={followLoading}
              usersPlaylist={usersPlaylist}
                setNavContentsActive={setNavContentsMobileActive}
              ref={childRefMobile}
               navContentsActive={navContentsMobileActive}
               chosenNavColor={chosenNavColor}
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

export default User;
