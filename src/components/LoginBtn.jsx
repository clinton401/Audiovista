import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { myContext } from "../App";
import { generateRandomString, sha256, base64encode } from "../lib/utils";

function LoginBtn() {
  const { CLIENT_ID, CLIENT_SECRET, redirectURI } = useContext(myContext);
  const scopes = [
    "ugc-image-upload",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-follow-modify",
    "user-follow-read",
    "user-top-read",
    "user-read-recently-played",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-read-private",
  ];
   const authorizeUser = async () => {
    const codeVerifier = generateRandomString(64);
     localStorage.setItem('code_verifier', codeVerifier);
      const hashed = await sha256(codeVerifier);
       const codeChallenge = base64encode(hashed);

    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&code_challenge_method=S256&code_challenge=${codeChallenge}&response_type=code&scope=${encodeURIComponent(
      scopes.join(" ")
    )}&redirect_uri=${encodeURIComponent(redirectURI)}`;
    window.location.href = accessUrl;
  };
 

  return (
    <button className="button" onClick={authorizeUser}>
      Login
      <FontAwesomeIcon icon={faSpotify} style={{ color: "#1ed760" }} />
    </button>
  );
}

export default LoginBtn;
