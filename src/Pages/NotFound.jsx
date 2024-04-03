import React, { useContext, useEffect } from "react";
import ParentLayouts from "../components/ParentLayouts";
import NotFoundView from "../components/NotFoundView";
import { myContext } from "../App";

function NotFound() {
  const { scrollToTop, setDocumentTitle } = useContext(myContext)
  useEffect(() => {
    scrollToTop()
    setDocumentTitle('Page not available');
  }, [])
  return (
    <ParentLayouts>
      <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 justify-center ipad:max-h-[900px] h-dvh min-h-[400px] ">
        <NotFoundView />
      </section>
    </ParentLayouts>
  );
}

export default NotFound;
