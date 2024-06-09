import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { myContext } from "../App";
function LoginBtn() {
  const { CLIENT_ID, CLIENT_SECRET } = useContext(myContext);
  const redirectURI = "http://localhost:5173/";
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
  const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${scopes.join(
    " "
  )}&redirect_uri=${redirectURI}&show_daialog=true`;
  return (
    <a className="button" href={accessUrl}>
      Login
      <FontAwesomeIcon icon={faSpotify} style={{ color: "#1ed760" }} />
    </a>
  );
}

export default LoginBtn;
