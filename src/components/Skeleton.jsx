import React from 'react'
import Shimmer from './Shimmer';

function Skeleton({type}) {
    const classes = `skeleton ${type}`;
  return (
    <div className={classes}>
      <Shimmer/>
    </div>
  )
}

export default Skeleton
