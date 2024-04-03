import React from "react";
import Loader from "./Loader";
import ParentLayouts from "./ParentLayouts";

function LoaderComp() {
  return (
    <ParentLayouts>
      <section
        className="w-full flex items-center px-[2.5%]  justify-center 
    bg-primary ipad:max-h-[900px] h-dvh min-h-[400px] "
      >
        <Loader />
      </section>
    </ParentLayouts>
  );
}

export default LoaderComp;
