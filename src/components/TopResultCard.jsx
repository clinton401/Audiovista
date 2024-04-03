import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../App";
function TopResultCard({
  image,
  type,
  resultName,
  artists,
  playlistCreator,
  userId,
  idNo,
  artistDetails,
  explicit,
}) {
  const { recentSearchesHandler } = useContext(myContext);
  const navigate = useNavigate();
  const routeHandler = () => {
    if (artistDetails) {
      recentSearchesHandler(artistDetails);
    }
    navigate(`/${type}/${idNo}`);
  };
  const trackVerify = type === "playlist";
  return (
    <button
      className="w-full h-full flex flex-col justify-center outline-none focus:bg-[#2A2A2A] hover:bg-[#2A2A2A] transition-all ease-in duration-300 gap-2 items-start py-4 px-4 ellipsis-container bg-[#1A1A1A] rounded-lg"
      onClick={routeHandler}
    >
      {type === "artist" && (
        <img
          src={image}
          alt={`${resultName} name`}
          className="shadow-2xl w-[100px] aspect-square rounded-full"
          loading="lazy"
        />
      )}
      {type !== "artist" && (
        <img
          src={image}
          alt={`${resultName} name`}
          loading="lazy"
          className="shadow-xl w-[100px] aspect-square rounded-lg"
        />
      )}
      <h2 className="text-2xl w-full font-bold text-start  ellipsis-container">
        {resultName}
      </h2>
      {type === "track" && artists !== undefined && (
        <h6 className=" w-full flex items-center text-[14px] ellipsis-container text-tGray">
          {explicit !== null && (
            <>
              {explicit === true && (
                <div className=" h-[15px] aspect-square rounded-sm flex items-center justify-center bg-[#36454F] text-primary font-[900] mr-1  text-[10px]">
                  E
                </div>
              )}
            </>
          )}
          Song -
          <strong className="flex items-center font-[800] ellipsis-container gap-2 ml-1 relative">
            {artists.map((art) => {
              return (
                <Link
                  to={`/artist/${art.id}`}
                  key={art.id}
                  className="text-[14px] text-white z-10 hover:underline track_link relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {art.name},
                </Link>
              );
            })}
          </strong>
        </h6>
      )}
      {type === "artist" && <h6 className="text-xs text-tGray">Artist</h6>}

      {type === "album" && (
        <h6 className=" flex items-center text-xs ellipsis-container text-tGray">
          Album -{" "}
          <strong className="flex items-center font-[800] ellipsis-container gap-2 ml-1 relative">
            {artists.map((art) => {
              return (
                <Link
                  to={`/artist/${art.id}`}
                  key={art.id}
                  className="text-[14px] text-white z-10 hover:underline track_link relative" // Add relative positioning
                  onClick={(e) => e.stopPropagation()}
                >
                  {art.name},
                </Link>
              );
            })}
          </strong>
        </h6>
      )}
      {trackVerify && (
        <h6 className="text-left flex items-center text-xs ellipsis-container w-full text-tGray font-bold  pr-2">
          Playist -{" "}
          <strong className="text-[14px] font-[800] gap-2 ml-1 text-white ">
            {playlistCreator}
          </strong>
          
        </h6>
      )}
    </button>
  );
}

export default TopResultCard;
