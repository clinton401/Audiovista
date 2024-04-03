import React, { useContext, useEffect, useRef, useState } from "react";
import ParentLayouts from "../components/ParentLayouts";
import { myContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import PlaylistDesktopView from "../components/PlaylistDesktopView";
import NotFoundView from "../components/NotFoundView";
import PlaylistMobileView from "../components/PlaylistMobileView";

function Playlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [playlistData, setPlaylistData] = useState({});
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [navContentsActive, setNavContentsActive] = useState(false);
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
  const BackHandler = () => {
    navigate(-1);
  };
  function msToHMS(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // const minutes =
    //   calculatedMinutes === 0 ? `0${calculatedMinutes}` : calculatedMinutes;
    // const seconds =
    //   calculatedSeconds < 10 ? `0${calculatedSeconds}` : calculatedSeconds;

    return { hours, minutes, seconds };
  }
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
  // console.log(playlistTracks)
  // console.log({totalDuration,  duration, playlistData, playlistTracks });
  return (
    <ParentLayouts ref={parentRef}>
      {!dataError ? (
        <>
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
            />
          </section>
          <section className="block    h-full min-h-[300px] relative  ipad:hidden w-full">
            <PlaylistMobileView
              isLoading={isLoading}
              playlistData={playlistData}
              playlistTracks={playlistTracks}
              dataError={dataError}
              loggedIn={loggedIn}
              navContentsActive={navContentsActive}
              durationState={durationState}
              BackHandler={BackHandler}
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
