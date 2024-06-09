import React from 'react'

function LoaderMini({playlistPage}) {
  return (
    <div
      className={`mini_loader border-2 ${
        playlistPage ? "border-black" : "border-white"
      } ml-1`}
    ></div>
  );
}

export default LoaderMini
