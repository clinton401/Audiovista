import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import Loader from "./Loader";
import NavLayout from "./NavLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../assets/user (1).png";
import TrackTableView from "./TrackTableView";
import { Link} from "react-router-dom";
import TrackPlayBtn from "./TrackPlayBtn";
import { myContext } from "../App";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
 import CopyrightsAndDate from "./CopyrightsAndDate";
const PlaylistDesktopView = forwardRef(
  (
    {
      playlistData,
      isLoading,
      loggedIn,
      dataError,
      navContentsActive,
      BackHandler,
      durationState,
      playlistTracks,
      userAuth,
      editPlaylistActiveHandler,
      getPlaylist,
    },
    ref
  ) => {
    const { userData } = useContext(myContext);
    const navRef = useRef(null);
    const [navHeight, setNavHeight] = useState(null);

    useEffect(() => {
      if (!dataError && !isLoading && navRef.current) {
        const height = navRef.current.getBoundingClientRect().height;

        // Update state with the height
        setNavHeight(height);
      }
    }, [isLoading, navContentsActive, playlistTracks, dataError]);

    return (
      <>
        {!isLoading && !dataError && (
          <>
            {/* <section className="w-full " ref={navRef}> */}{" "}
            <NavLayout
              navContentsActive={navContentsActive}
              BackHandler={BackHandler}
              isLoading={isLoading}
              name={playlistData.name}
              loggedIn={loggedIn}
              ref={navRef}
            />
            {/* </section> */}
            <section className="w-full min-h-[350px] flex items-end  bg-[#333333] gap-4 relative pt-4 pb-8 px-[2.5%] ">
              <div className="min-w-[230px] hover:scale-105 transition-all duration-300 ease-in   w-[23%] rounded-md">
                <img
                  src={
                    Object.keys(playlistData).length > 0 &&
                    playlistData.images &&
                    playlistData.images.length > 0
                      ? playlistData.images[0].url
                      : avatar
                  }
                  className="rounded-md shadow-xl object-cover aspect-square  w-full"
                  alt={`${playlistData.name} image`}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-end w-[73%] flex-wrap  pb-2 min-h-[242px] gap-y-3">
                <h6 className="text-base ">{playlistData.type}</h6>
                <h1 className="text-3xl font-[900]">{playlistData.name}</h1>
                {playlistData.type === "playlist" && (
                  <>
                    {playlistData.description.charAt(0) !== "<" && (
                      <p className="text-sm text-tGray font-[500]  ">
                        {playlistData.description.slice(0, 200)}
                      </p>
                    )}
                  </>
                )}{" "}
                <div className="flex text-sm w-full flex-wrap  font-[400] gap-1">
                  {playlistData.type === "playlist" && (
                    <Link
                      to={`/user/${playlistData.owner.id}`}
                      className="font-[900] hover:underline focus:underline"
                    >
                      {playlistData.owner.display_name}
                    </Link>
                  )}
                  {playlistData.type === "album" && playlistData.artists && (
                    <>
                      {playlistData.artists.map((pa) => {
                        return (
                          <React.Fragment key={pa.id}>
                            <Link
                              to={`/artist/${pa.id}`}
                              className="font-[900] hover:underline focus:underline"
                            >
                              {pa.name}
                            </Link>
                            |
                          </React.Fragment>
                        );
                      })}
                    </>
                  )}
                  {playlistData.type === "album" && (
                    <span> {playlistData.release_date.slice(0, 4)}</span>
                  )}
                  <span> | {playlistData.tracks.total} songs |</span>
                  <span className="flex items-center gap-1">
                    {Object.keys(durationState).length > 0 && (
                      <>
                        {durationState.hours > 0 && (
                          <>
                            {durationState.hours === 1 ? (
                              <p>{durationState.hours} hr</p>
                            ) : (
                              <p>{durationState.hours} hrs</p>
                            )}
                          </>
                        )}
                        {durationState.minutes > 0 && (
                          <>
                            {durationState.minutes === 1 ? (
                              <p>{durationState.minutes} min</p>
                            ) : (
                              <p>{durationState.minutes} mins</p>
                            )}
                          </>
                        )}
                        {durationState.seconds > 0 && (
                          <>
                            {durationState.seconds === 1 ? (
                              <p>{durationState.seconds} sec</p>
                            ) : (
                              <p>{durationState.seconds} secs</p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </section>
            <div className="pt-6  ipad:pb-[80px] rounded-md " ref={ref}>
              <section className="flex px-[2.5%]    items-center gap-6">
                <TrackPlayBtn />
                {userAuth && (
                  <button
                    className="w-[30px] aspect-square relative tooltip-container  rounded-md flex items-center justify-center"
                    onClick={editPlaylistActiveHandler}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <p className="   text-sm rounded-md tooltip playlist_tooltip   ">
                      Edit playlist title
                    </p>
                  </button>
                )}
              </section>
              <section className="w-full pt-6 ">
                {playlistTracks.length > 0 ? (
                  <TrackTableView
                    tracksData={playlistTracks}
                    navHeight={navHeight}
                    type={playlistData.type}
                    mainData={playlistData}
                    playlistOwner={userAuth}
                    getPlaylist={getPlaylist}
                  />
                ) : (
                  <span className="w-full flex flex-col gap-2  px-[2.5%]">
                    <h2 className="w-full font-[900] text-center text-2xl">
                      Empty {playlistData.type}
                    </h2>
                  </span>
                )}
              </section>
              {playlistData.type === "album" && <CopyrightsAndDate release_date={playlistData.release_date} copyrights={playlistData.copyrights}/>}
              
            </div>
            
          </>
        )}
        {isLoading && !dataError && (
          <section className="w-full flex items-center px-[2.5%] justify-center ipad:max-h-[900px] h-dvh min-h-[400px] ">
            <Loader />
          </section>
        )}
      </>
    );
  }
);

export default PlaylistDesktopView;
