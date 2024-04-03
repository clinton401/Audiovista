import React from 'react';
import SkeletonTrack from './SkeletonTrack';
import Shimmer from './Shimmer';

function TracksCardSkeleton() {
  return (
    <div className=" w-full h-[58px] flex items-center rounded-md gap-[10%] bg-[#2A2A2A]   justify-between  p-2 relative overflow-hidden">
      <div className="h-full flex gap-3 items-center">
        <SkeletonTrack type="track_img" />
        <span className="w-[130px] h-full flex flex-col gap-1 justify-center items-start">
          <SkeletonTrack type="track_title" />
          <SkeletonTrack type="track_text" />
        </span>
      </div>

      <SkeletonTrack type="track_btns" />

      <Shimmer />
    </div>
  );
}

export default TracksCardSkeleton
