import React from "react";
import Skeleton from "./Skeleton";

function ArtistCardSkeleton() {
  return (
    <button className="skeleton-wrapper  p-2 ">
      <Skeleton type="img_2" />
      <Skeleton type="title" />
      <Skeleton type="text" />
    </button>
  );
}

export default ArtistCardSkeleton;
