import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
function SocilaMedia() {
  return (
    <footer className="w-full flex mt-16 px-4 gap-4 text-base flex-wrap items-center justify-center ">
      <a className="cursor-pointer h-[40px] aspect-square rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  flex items-center justify-center">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a className="cursor-pointer h-[40px] aspect-square rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  flex items-center justify-center">
        <FontAwesomeIcon icon={faXTwitter} />
      </a>
      <a className="cursor-pointer h-[40px] aspect-square rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all ease-in duration-300  flex items-center justify-center">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
    </footer>
  );
}

export default SocilaMedia
