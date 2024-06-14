import React from "react";
import LoginBtn from "../components/LoginBtn";
function ExpiredSession({ setExpiredToken, getTokenHandler, logOut }) {
  return (
    <div className="flex items-center transition-all ease-in duration-300 overflow-x-hidden  ipad:right-5 justify-center px-[2%] z-[300]  top-0   fixed w-full h-full blurred ipad:max-h-[900px]  ">
      <span className="flex flex-col gap-y-4 bg-white rounded-md  p-4">
        <section className="w-auto flex flex-col gap-y-2">
          <p className="text-2xl text-center font-[900]">
            Your session has expired. Please login to continue
          </p>
          <LoginBtn />
        </section>

        <p className="w-full text-center font-bold">OR</p>
        <button
          className="w-full p-2 button font-bold"
          onClick={() => {
            logOut();
            setExpiredToken();
            getTokenHandler();
          }}
        >
          Continue as guest
        </button>
      </span>
    </div>
  );
}

export default ExpiredSession;
