import React from "react";
import Skeleton from "./Skeleton";

function CardSkeleton() {
  return (
    <button className="skeleton-wrapper  p-2">
      <Skeleton type="img" />
      <Skeleton type="title" />
      <Skeleton type="text" />
    </button>
  );
}

export default CardSkeleton;
