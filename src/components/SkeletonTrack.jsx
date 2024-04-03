import React from 'react'

function SkeletonTrack({ type }) {
     const classes = `skeletontrack ${type}`;
  return <div className={classes}></div>;
}

export default SkeletonTrack
