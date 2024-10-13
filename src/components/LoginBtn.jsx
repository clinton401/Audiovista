import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { myContext } from "../App";

function LoginBtn() {
  
  const {  isUserEmailRegistered, handlePage, authorizeUser } =
    useContext(myContext);
  


 
 
  return (
    <>
      {isUserEmailRegistered ? (
        <button className="button" onClick={authorizeUser}>
          Login
          <FontAwesomeIcon icon={faSpotify} style={{ color: "#1ed760" }} />
        </button>
      ) : (
        <button className="button" onClick={() => handlePage(true)}>
          Login
          <FontAwesomeIcon icon={faSpotify} style={{ color: "#1ed760" }} />
        </button>
      )}
      
    </>
  );
}

export default LoginBtn;
