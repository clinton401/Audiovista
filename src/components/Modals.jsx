import { motion } from "framer-motion";
import React from "react";
import { CiWifiOff } from "react-icons/ci";
function Modals({ text, playlistPage }) {
  const containerVariant = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.1,
        // delay: 0.5,
        // mass: 0.4,
        // damping: 8,
        // when: "beforeChildren",
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      x: "100vw",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
  // const textVerify = text === "You need to be logged in first";
  const onlineVerify = text === "No internet connection";
  
  // console.log(textVerify)
  return (
    <>
      {onlineVerify ? (
        <motion.div
          variants={containerVariant}
          animate="visible"
          initial="hidden"
          className="flex items-center transition-all ease-in duration-300  ipad:right-5 justify-center px-[2%] z-[1200]  top-[7%]   fixed w-full   artist_fixed_width"
        >
          <span className="w-full ipad:w-[40%] max-w-[350px] flex-col gap-2  shadow-lg rounded-md bg-white flex items-center justify-center font-bold p-3">
            <h2 className="text-sm ipad:text-base text-primary ">{text}</h2>
            {/* {textVerify && <LoginBtn />} */}
          </span>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariant}
          animate="visible"
          initial="hidden"
          className={`flex items-center transition-all ease-in duration-300  ipad:right-5 justify-center px-[2%] z-[1000]  top-[7%]   fixed w-full  ${!playlistPage ? "artist_fixed_width" : ""} `}
        >
          <span className="w-full ipad:w-[40%] max-w-[350px] flex-col gap-2  shadow-lg rounded-md bg-white flex items-center justify-center font-bold p-3">
            <h2 className="text-sm ipad:text-base flex items-center justify-center  text-primary "><CiWifiOff className="mr-2 text-primary"/> {text}</h2>
            
          </span>
        </motion.div>
      )}
    </>
  );
}

export default Modals;
