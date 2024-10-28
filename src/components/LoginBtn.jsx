import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { myContext } from "../App";

function LoginBtn({navBarComp = false}) {
  
  const {  isUserEmailRegistered, handlePage, authorizeUser } =
    useContext(myContext);
  


 
 
  return (
    <>
      {isUserEmailRegistered ? (
        <button className={`button border ${navBarComp ? "border-white": "border-black"}`} onClick={authorizeUser}>
          Login
          <FontAwesomeIcon icon={faSpotify} style={{ color: "#1ed760" }} />
        </button>
      ) : (
        <button className={`button border ${navBarComp ? "border-white": "border-black"}`} onClick={() => handlePage(true)}>
          Login
          <FontAwesomeIcon icon={faSpotify} style={{ color: "#1ed760" }} />
        </button>
      )}
      
    </>
  );
}

export default LoginBtn;
