import React from "react";
import Shimmer from "./Shimmer";
import SkeletonTrack from "./SkeletonTrack";
function TopResultCardSkeleton() {
  return (
    <div className=" w-full h-full flex flex-col TopResultCardSkeleton justify-center hover:bg-[#2A2A2A] transition-all ease-in duration-300 gap-2 items-start py-4 px-4 relative overflow-hidden  bg-[#1A1A1A] rounded-lg">
      <SkeletonTrack type="top_img" />
      <SkeletonTrack type="top_title" />
      <SkeletonTrack type="top_text" />

      <Shimmer />
    </div>
  );
}

export default TopResultCardSkeleton;
