import React, { forwardRef } from "react";

const ParentLayouts = forwardRef(({ children }, ref) => {
  return (
    <div className=" flex flex-col overflow-hidden   ipad:items-end text-white w-full ipad:max-h-[900px]  h-dvh	ipad:py-2 ipad:px-4 ">
      <aside
        className=" w-full ipad:w-[76%] bg-primary relative calcHeight pb-[120px]  ipad:pb-[80px] ipad:rounded-md overflow-y-auto overflow-x-hidden"
        ref={ref && ref}
      >
        {children}
      </aside>
    </div>
  );
});

export default ParentLayouts;
