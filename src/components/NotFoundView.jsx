import React from "react";

import { useNavigate } from "react-router-dom";
function NotFoundView() {
  const navigate = useNavigate();
  return (
    <>
      {/* <img
        src={logo}
        alt="logo"
        className="w-1/4 min-w-40 max-w-[400px] aspect-square "
      /> */}
      <h2 className="font-[900] text-2xl text-center w-full">
        404 - PAGE NOT FOUND
      </h2>
      <p className="w-full ipad:w-3/4 text-center">
        The page you are looking for might have been removed had its name
        changes or is temporary unavailable{" "}
      </p>
      <button
        className="button2 text-base type1"
        onClick={() => {
          navigate(`/`);
        }}
      >
        GO TO HOMEPAGE
      </button>
    </>
  );
}

export default NotFoundView;
