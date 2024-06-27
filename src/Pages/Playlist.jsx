import React, { useContext, useEffect, useRef, useState } from "react";
import ParentLayouts from "../components/ParentLayouts";
import { myContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import PlaylistDesktopView from "../components/PlaylistDesktopView";
import NotFoundView from "../components/NotFoundView";
import PlaylistMobileView from "../components/PlaylistMobileView";
import EditPlaylistDetails from "../components/EditPlaylistDetails";
import Modals from "../components/Modals";
import { msToHMS } from "../lib/utils";
import useHandleScroll from "../hooks/useHandleScroll";
function Playlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [playlistData, setPlaylistData] = useState({});
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [navContentsActive, setNavContentsActive] = useState(false);
  const [navContentsMobileActive, setNavContentsMobileActive] = useState(false);
  const [durationState, setDurationState] = useState({});
  const [duration, setDuration] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [editPlaylistActive, setEditPlaylistActive] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
const [editSuccessOrFail,  setEditSuccessOrFail] = useState(null)
  const {
    SEARCH_PARAM,
    loggedIn,
    accessToken,
    numberWithCommas,
    scrollToTop,
    userData,
    setDocumentTitle,
  } = useContext(myContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const  parentRef = useRef(null);
  const childRef = useRef(null);
  const childRefMobile = useRef(null);
  async function getPlaylist() {
    setDocumentTitle("Audiovista");
    try {
      setIsLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/playlists/${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setPlaylistData(data);
        setPlaylistTracks(data.tracks.items);
        setDocumentTitle(
          `${data.name} - Playlist by ${data.owner.display_name}`
        );
        // console.log(data);
        setDataError(false);
        setIsLoading(false);
      } else {
        setPlaylistData({});
        setPlaylistTracks([]);
        setDataError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setPlaylistData({});
      setPlaylistTracks([]);
      setDataError(true);
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (accessToken) {
      getPlaylist();
      scrollToTop();
    }
  }, [accessToken, id]);
  useEffect(() => {
    if (editSuccessOrFail) {
      setTimeout(() => {
        setEditSuccessOrFail(null)
      }, 6000)
    }
  }, [editSuccessOrFail]);
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
  const BackHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (loggedIn && Object.entries(playlistData).length > 0 && userData) {
      const usAuth = playlistData.owner.display_name === userData.display_name;
      setUserAuth(usAuth);
    }
  }, [playlistData, userData, loggedIn]);
  useEffect(() => {
    if (playlistTracks.length > 0) {
      const durations = playlistTracks.map((track) => {
        if (track.track) {
          return track.track.duration_ms;
        }
      });
      setDuration(durations);
    }
  }, [playlistTracks]);
  useEffect(() => {
    if (duration.length > 0) {
      const sum = duration.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      setTotalDuration(sum);
    }
  }, [duration]);
  useEffect(() => {
    if (totalDuration > 0) {
      setDurationState(msToHMS(totalDuration));
    } else {
      setDurationState(msToHMS(totalDuration));
    }
  }, [totalDuration]);
  function editPlaylistActiveHandler() {
    setEditPlaylistActive(!editPlaylistActive)
  }
  // console.log(navContentsActive);
  // console.log(playlistTracks)
  // console.log({
  //   totalDuration,
  //   duration,
  //   playlistData,
  //   playlistTracks,
  //   userAuth,
  // });
  return (
    <ParentLayouts ref={parentRef}>
      {!dataError ? (
        <>
          {editSuccessOrFail && <Modals text={editSuccessOrFail} />}
          {editPlaylistActive && Object.entries(playlistData).length > 0 && (
            <EditPlaylistDetails
              editPlaylistActiveHandler={editPlaylistActiveHandler}
              imgUrl={
                playlistData.images && playlistData.images.length > 0
                  ? playlistData.images[0].url
                  : null
              }
              name={playlistData.name}
              playlistId={playlistData.id}
              getPlaylist={getPlaylist}
              setEditSuccessOrFail={setEditSuccessOrFail}
              editPlaylistActive={editPlaylistActive}
            />
          )}
          {/* <EditPlaylistDetails editPlaylistActiveHandler={editPlaylistActiveHandler} /> */}
          <section className="hidden relative h-full min-h-[400px] ipad:block w-full">
            <PlaylistDesktopView
              isLoading={isLoading}
              playlistData={playlistData}
              playlistTracks={playlistTracks}
              dataError={dataError}
              loggedIn={loggedIn}
              navContentsActive={navContentsActive}
              ref={childRef}
              BackHandler={BackHandler}
              durationState={durationState}
              userAuth={userAuth}
              editPlaylistActiveHandler={editPlaylistActiveHandler}
              editPlaylistActive={editPlaylistActive}
              getPlaylist={getPlaylist}
            />
          </section>
          <section className="block    h-full min-h-[300px] relative  ipad:hidden w-full">
            <PlaylistMobileView
              isLoading={isLoading}
              playlistData={playlistData}
              playlistTracks={playlistTracks}
              dataError={dataError}
              loggedIn={loggedIn}
              navContentsActive={navContentsMobileActive}
              durationState={durationState}
              BackHandler={BackHandler}
              userAuth={userAuth}
              editPlaylistActiveHandler={editPlaylistActiveHandler}
              editPlaylistActive={editPlaylistActive}
              getPlaylist={getPlaylist}
              setNavContentsActive={setNavContentsMobileActive}
              ref={childRefMobile}
            />
          </section>
        </>
      ) : (
        <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 justify-center ipad:max-h-[900px] h-dvh min-h-[400px] ">
          <NotFoundView />
        </section>
      )}
    </ParentLayouts>
  );
}

export default Playlist;
