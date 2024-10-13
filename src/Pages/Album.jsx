import React, { useContext, useEffect, useRef, useState } from "react";
import ParentLayouts from "../components/ParentLayouts";
import { myContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import PlaylistDesktopView from "../components/PlaylistDesktopView";
import NotFoundView from "../components/NotFoundView";
import PlaylistMobileView from "../components/PlaylistMobileView";
import { msToHMS } from "../lib/utils";
import useHandleScroll from "../hooks/useHandleScroll";
function Album() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [albumData, setAlbumData] = useState({});
  const [albumTracks, setalbumTracks] = useState([]);
  const [navContentsActive, setNavContentsActive] = useState(false);
  const [navContentsMobileActive, setNavContentsMobileActive] = useState(false);
  const [durationState, setDurationState] = useState({});
  const [duration, setDuration] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);

  const {
    SEARCH_PARAM,
    loggedIn,
    accessToken,
    numberWithCommas,
    scrollToTop,
    setDocumentTitle,
  } = useContext(myContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const childRefMobile = useRef(null);
  async function getAlbum() {
    setDocumentTitle("Audiovista");
    try {
      setIsLoading(true);
      const SEARCH_URL = `
https://api.spotify.com/v1/albums/${encodeURIComponent(id)}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setAlbumData(data);
        setalbumTracks(data.tracks.items);
        setDocumentTitle(`${data.name} - By ${data.artists[0].name}`);
        setDataError(false);
        setIsLoading(false);
      } else {
        setAlbumData({});
        setalbumTracks([]);
        setDataError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setAlbumData({});
      setalbumTracks([]);
      setDataError(true);
      setIsLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    if (accessToken) {
      getAlbum();
    } else {
      setIsLoading(true)
    }
  }, [accessToken, id]);
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
    if (albumTracks.length > 0) {
      const durations = albumTracks.map((track) => track.duration_ms);
      setDuration(durations);
    }
  }, [albumTracks]);
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
  // console.log(albumData)
  return (
    <ParentLayouts ref={parentRef}>
      {!dataError ? (
        <>
          <section className="hidden relative h-full min-h-[400px] ipad:block w-full">
            <PlaylistDesktopView
              isLoading={isLoading}
              playlistData={albumData}
              playlistTracks={albumTracks}
              dataError={dataError}
              loggedIn={loggedIn}
              navContentsActive={navContentsActive}
              ref={childRef}
              BackHandler={BackHandler}
              durationState={durationState}
            />
          </section>
          <section className="block    h-full min-h-[300px] relative  ipad:hidden w-full">
            <PlaylistMobileView
              isLoading={isLoading}
              playlistData={albumData}
              playlistTracks={albumTracks}
              dataError={dataError}
              loggedIn={loggedIn}
              navContentsActive={navContentsMobileActive}
              durationState={durationState}
              BackHandler={BackHandler}
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

export default Album;
