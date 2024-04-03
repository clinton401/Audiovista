import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../App";

function Card({
  image,
  title,
  artists,
  path,
  idNo,
  artistsId,
  releaseDate,
  setRecentSearches,
  recentSearches,
  playlistCreator,
  artistDetails,
  alb,
}) {
  const { recentSearchesHandler } = useContext(myContext);
  const navigate = useNavigate();
  const artistVerify = artists === "Various Artists";
  // console.log(artistDetails);
  const trackVerify = path === "playlist";
  function routeHandler() {
    if (artistDetails) {
      recentSearchesHandler(artistDetails);
    }
    navigate(`/${path}/${idNo}`);
  }
  function removeRecentHandler() {
    const newArr = recentSearches.filter((recent) => {
      return recent.id !== idNo;
    });
    setRecentSearches(newArr);
    // setRecentSearches((prevState) => [
    //   ...prevState.filter((recent) => idNo !== recent.id),
    // ]);
  }
  return (
    <span className="home-wrapper  ellipsis-container">
      <button className="skeleton-wrapper-btn skw " onClick={routeHandler}>
        <img
          src={image}
          alt={`${title} image`}
          className="w-full aspect-[1] mb-2  rounded-md object-cover"
          loading="lazy"
        />
        <h3 className="text-white font-[500] text-left text-base pr-2 ellipsis-container">
          {title}
        </h3>
        {!trackVerify && (
          <span className=" flex justify-start items-center gap-1 ellipsis-container w-full">
            {releaseDate && (
              <p className="text-tGray text-left text-xs font-bold ">
                {releaseDate} -
              </p>
            )}
            {/* {artistVerify && (
              <p
                className={` text-tGray font-bold ellipsis-container cursor-pointer  text-sm `}
                onClick={routeHandler}
              >
                {artists}
              </p>
            )} */}
            {artists && (
              <Link
                to={`/artist/${artistsId}`}
                className={` text-tGray font-bold  border-none ellipsis-container focus:underline hover:underline outline-none cursor-pointer ${
                  !artistVerify ? "hover:underline" : ""
                }   text-sm `}
                onClick={(e) => e.stopPropagation()}
              >
                {artists}
              </Link>
            )}
            {alb && (
              <p className="text-tGray text-left text-xs font-bold "> {alb}</p>
            )}
          </span>
        )}
        {trackVerify && playlistCreator && (
          <h6 className="text-left  ellipsis-container w-full text-tGray font-bold  text-sm pr-2">
            By {playlistCreator}
          </h6>
        )}
      </button>

      {recentSearches && (
        <button
          className="absolute right-1 top-1 bg-[#0000004D] z-10 w-[30px] flex items-center justify-center rounded-full aspect-square"
          onClick={removeRecentHandler}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
    </span>
  );
}

export default Card;
