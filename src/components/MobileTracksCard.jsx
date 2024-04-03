import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEllipsisVertical,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { myContext } from "../App";
import MobileOptions from "./MobileOptions";
import { AnimatePresence, motion } from "framer-motion";
const containerVariant = {
  hidden: {
    // opacity: 0,
    y: "100dvh",
  },
  visible: {
    // opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      // delay: 0.5,
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
    },
  },
  exit: {
    // opacity: 0,
    y: "100dvh",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

function MobileTracksCard({
  image,
  type,
  trackName,
  idNo,
  artists,
  artistDetails,
  recentSearches,
  setRecentSearches,
  mainData,
  trackUri,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const { recentSearchesHandler } = useContext(myContext);
  const navigate = useNavigate();
  const trackVerify = type.toLowerCase() === "track";
  const albumVerify = type.toLowerCase() === "album";
  const artistVerify = type.toLowerCase() === "artist";
  const playlistVerify = type.toLowerCase() === "playlist";
  const mainTypeVerify = mainData && mainData.type.toLowerCase() === "album";
  const newType = type.charAt(0).toUpperCase() + type.slice(1);
  function removeRecentHandler() {
    const newArr = recentSearches.filter((recent) => {
      return recent.id !== idNo;
    });
    setRecentSearches(newArr);
    // setRecentSearches((prevState) => [
    //   ...prevState.filter((recent) => idNo !== recent.id),
    // ]);
  }

  function showOptionsHandler() {
    setShowOptions(true);
  }
  function hideOptionsHandler() {
    setShowOptions(false);
  }
  function routeHandler() {
    if (!trackVerify) {
      recentSearchesHandler(artistDetails);
    }
    navigate(`/${type}/${idNo}`);
  }
  useEffect(() => {
    if (showOptions) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [showOptions]);
  //
  // console.log(artistDetails);
  return (
    <>
      <button
        className=" w-full min-h-[61px] flex items-center  gap-[10%] outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  justify-between  py-2 pl-2 pr-[49px] relative track_card "
        onClick={routeHandler}
      >
        <div className=" h-full flex gap-3 w-full  items-center ellipsis-container">
          {artistVerify ? (
            <>
              {!mainTypeVerify && (
                <img
                  src={image}
                  alt={`${trackName} image`}
                  loading="lazy"
                  className="rounded-full  h-[45px] aspect-square"
                />
              )}
            </>
          ) : (
            <>
              {!mainTypeVerify && (
                <img
                  src={image}
                  alt={`${trackName} image`}
                  loading="lazy"
                  className="rounded-md h-[45px] aspect-square"
                />
              )}
            </>
          )}
          <span className="flex flex-col gap-1 justify-center ellipsis- w-full  items-start ">
            <h3 className="font-[700] text-white text-sm ellipsis-container pr-[52px] text-left w-full">
              {trackName}{" "}
              {artistVerify && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ color: "#4169e1" }}
                />
              )}
            </h3>
            <div className="flex text-xs text-tGray font-[400] ellipsis-container ">
              {trackVerify && !mainTypeVerify && <>Song - </>}
              {albumVerify && <>{`${newType} - `} </>}
              {artistVerify && <>{newType}</>}
              {playlistVerify && <>{newType}</>}
              {trackVerify && artists.length > 0 && (
                <span
                  className={`flex ${
                    !mainTypeVerify && "ml-1"
                  } gap-1 ellipsis-container   relative   w-full`}
                >
                  {artists.map((art, index) => (
                    <div key={art.id}>
                      <div className="w-full flex gap-1 items-center ">
                        <strong className=" w-full font-[400] text-tGray">
                          {art.name}
                        </strong>
                        {index !== artists.length - 1 && (
                          <span className="text-tGray "> | </span>
                        )}
                      </div>
                    </div>
                  ))}
                </span>
              )}
              {albumVerify && artists.length > 0 && (
                <span className="flex ml-1 gap-1 ellipsis-container  relative w-auto">
                  {artists.map((art, index) => (
                    <React.Fragment key={art.id}>
                      <div className="w-full flex gap-1 items-center ">
                        <strong className=" w-full font-[400] text-tGray">
                          {art.name}
                        </strong>
                        {index !== artists.length - 1 && (
                          <span className="text-tGray "> | </span>
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </span>
              )}
            </div>
          </span>
        </div>
        {trackVerify && !recentSearches && (
          <div
            className=" w-3    absolute right-8 z-20  flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              showOptionsHandler();
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
        )}
        {recentSearches && (
          <div
            className="   absolute right-8 z-20  flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              removeRecentHandler();
            }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="text-tGray text-xl transition-all ease-in duration-300 hover:scale-[1.2]  hover:text-white"
            />
          </div>
        )}
      </button>
      <AnimatePresence>
        {showOptions && (
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="modal"
            className="py-[10%] overflow-y-auto   fixed h-dvh min-h-[550px] options_background z-[200] top-0 left-0 w-full"
          >
            <MobileOptions
              albumId={!mainTypeVerify && artistDetails.album.id}
              artistId={artistDetails.artists[0].id}
              image={image}
              trackName={trackName}
              artists={artists}
              idNo={idNo}
              trackUri={trackUri && trackUri}
              hideOptionsHandler={hideOptionsHandler}
              mainTypeVerify={mainTypeVerify && mainTypeVerify}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileTracksCard;
