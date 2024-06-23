import React, { useContext, useEffect, useRef, useState } from "react";
import ParentLayouts from "../components/ParentLayouts";
import { myContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundView from "../components/NotFoundView";
import TrackDestopView from "../components/TrackDestopView";
import TrackMobileView from "../components/TrackMobileView";
import { msToHMS } from "../lib/utils";
import useHandleScroll from "../hooks/useHandleScroll";
function Track() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

  const [trackData, setTrackData] = useState({});
  const [trackDataLoading, setTrackDataLoading] = useState(true);
  const [trackDataError, setTrackDataError] = useState(false);
  // const [trackTracks, settrackTracks] = useState([]);
  const [navContentsActive, setNavContentsActive] = useState(false);
  const [durationState, setDurationState] = useState({});
  const [artistsId, setArtistsId] = useState([]);
  const [artistsData, setArtistsData] = useState([])
  const [artistsLoading, setArtistLoading] = useState(true);
  const [artistsError, setArtistsError] = useState(false);


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
      setTrackDataLoading(true);
      const SEARCH_URL = `https://api.spotify.com/v1/tracks/${encodeURIComponent(
        id
      )}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setTrackData(data);
        setDocumentTitle(`${data.name} | Song`);
        setTrackDataError(false);
        setTrackDataLoading(false);
      } else {
        setTrackData({});

        setTrackDataError(true);
        setTrackDataLoading(false);
      }
    } catch (error) {
      setTrackData({});
      setTrackDataError(true);
      setTrackDataLoading(false);
      console.log(error);
    }
  };
  async function getArtistsData() {
    try {
      setArtistLoading(true)
      const SEARCH_URL = `https://api.spotify.com/v1/artists?ids=${artistsId.join(",")}`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if(response.ok) {
        const data = await response.json();
        setArtistsData(data.artists);
        setArtistsError(false)
      }
      else {
        throw new Error("Failed to fetch artists")
       }
    } catch (error) {
      setArtistsError(true);
      setArtistsData([]);
      console.error(error)
    } finally {
      setArtistLoading(false)
    }
  }
  useEffect(() => {
    if (accessToken) {
      getTracks();
      scrollToTop()
    }
  }, [accessToken, id]);
  useEffect(() => {
    if (!trackDataLoading && !artistsLoading) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [artistsLoading, trackDataLoading]);
  useEffect(() => {
    if (!artistsError && !trackDataError) {
      setDataError(false)
    } else {
      setDataError(true)
    }
  }, [artistsError, trackDataError])
 useHandleScroll(
   isLoading,
   dataError,
   childRef,
   setNavContentsActive,
   parentRef
 );
  const BackHandler = () => {
    navigate(-1);
  };
 
  function getArtistsId() {
    const ids = trackData.artists.map(artist => artist.id);
    setArtistsId(ids);
  }

  useEffect(() => {
    if (Object.keys(trackData).length > 0) {
      setDurationState(msToHMS(trackData.duration_ms));
      getArtistsId();

    } else {
      setDurationState(msToHMS(0));
    }
  }, [trackData]);
  useEffect(() => {
    if (artistsId.length > 0) {
      getArtistsData();
    }
  }, [artistsId])
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
              artistsData={artistsData}
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
              artistsData={artistsData}
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
