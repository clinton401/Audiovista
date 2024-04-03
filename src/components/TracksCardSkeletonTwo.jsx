import React from 'react'
import SkeletonTrack from "./SkeletonTrack";
import Shimmer from "./Shimmer";
function TracksCardSkeletonTwo() {
  return (
    <div className=" w-full h-[61px] flex items-center rounded-md gap-[10%] bg-[#2A2A2A]   justify-between  p-2 relative overflow-hidden">
      <div className="h-full flex gap-3 items-center w-[55%]">
        <SkeletonTrack type="track_img" />
        <span className="w-[130px] h-full flex flex-col gap-1 justify-center items-start">
          <SkeletonTrack type="track_title" />
          <SkeletonTrack type="track_text" />
        </span>
      </div>
      <div className="h-full flex gap-3 items-center w-[30%]">
        <SkeletonTrack type="track_text" />
      </div>

      <div className="w-[15%] ">
        <SkeletonTrack type="track_btns" />
      </div>

      <Shimmer />
    </div>
  );
}

export default TracksCardSkeletonTwo
