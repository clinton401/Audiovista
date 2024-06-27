import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "../App";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ArtisrtCard({
  artistName,
  image,
  idNo,
  artistDetails,
  setRecentSearches,
  recentSearches,
  searchPage
}) {
  const { recentSearchesHandler } = useContext(myContext);
  const navigate = useNavigate();

  const routeHandler = () => {
    if (searchPage && artistDetails) {
      recentSearchesHandler(artistDetails);
    }
   
    navigate(`/artist/${idNo}`);
  };
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
          alt={`${artistName} image`}
          className="w-full aspect-[1] mb-2  rounded-full shadow-2xl object-cover"
          loading="lazy"
        />
        <h3 className="text-white font-[500] text-left text-lg  ellipsis-container">
          {artistName}
        </h3>
        <p className="text-tGray text-left text-xs font-bold ">Artist</p>
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

export default ArtisrtCard;
