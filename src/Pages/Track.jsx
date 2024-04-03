import React, { useContext, useEffect, useRef, useState } from "react";
import ParentLayouts from "../components/ParentLayouts";
import { myContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundView from "../components/NotFoundView";
import TrackDestopView from "../components/TrackDestopView";
import TrackMobileView from "../components/TrackMobileView";
function Track() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

  const [trackData, setTrackData] = useState({});
  // const [trackTracks, settrackTracks] = useState([]);
  const [navContentsActive, setNavContentsActive] = useState(false);
  const [durationState, setDurationState] = useState({});

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
  async function getTracks() {
    setDocumentTitle('Audiovista')
    try {
      setIsLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/tracks/${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setTrackData(data);
        setDocumentTitle(`${data.name} | Song`);
        setDataError(false);
        setIsLoading(false);
      } else {
        setTrackData({});

        setDataError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setTrackData({});
      setDataError(true);
      setIsLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    if (accessToken) {
      getTracks();
      scrollToTop()
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
    if (Object.keys(trackData).length > 0) {
      setDurationState(msToHMS(trackData.duration_ms));
    } else {
      setDurationState(msToHMS(0));
    }
  }, [trackData]);
  // console.log({ durationState, trackData });

  return (
    <ParentLayouts ref={parentRef}>
      {!dataError ? (
        <>
          <section className="hidden relative h-full min-h-[400px] ipad:block w-full">
            <TrackDestopView
              isLoading={isLoading}
              dataError={dataError}
              loggedIn={loggedIn}
              navContentsActive={navContentsActive}
              ref={childRef}
              BackHandler={BackHandler}
              durationState={durationState}
              trackData={trackData}
            />
          </section>
          <section className="block   h-full min-h-[300px] relative  ipad:hidden w-full">
            <TrackMobileView
              isLoading={isLoading}
              dataError={dataError}
              loggedIn={loggedIn}
              BackHandler={BackHandler}
              durationState={durationState}
              trackData={trackData}
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

export default Track;
