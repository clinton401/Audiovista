import { createContext, useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import { ToastContainer, toast, Bounce } from "react-toastify";
import CheckEmailReg from "./components/CheckEmailReg";
import "react-toastify/dist/ReactToastify.css";
import Routess from "./Routess";
import Modals from "./components/Modals";
import { generateRandomString, sha256, base64encode } from "./lib/utils";
export const myContext = createContext();
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [newGenresArray, setNewGenresArray] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const recent_searches = JSON.parse(
        window.localStorage.getItem("recent_searches")
      );

      if (
        recent_searches !== null &&
        Array.isArray(recent_searches) &&
        recent_searches.length > 0
      ) {
        return recent_searches;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return [];
    }
  });
  const [documentTitle, setDocumentTitle] = useState("Audiovista");
  const [authAccessToken, setAuthAccessToken] = useState(() => {
    const authak = JSON.parse(window.localStorage.getItem("authAccessToken"));
    // Checking for the existence of an access
    if (authak) {
      return authak;
    } else {
      return null;
    }
  });
  const [unAuthAccessToken, setUnAuthAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(() => {
    const authRefresh = window.localStorage.getItem("refresh_token");
    return authRefresh ? authRefresh : null;
  });
  const [expiredToken, setExpiredToken] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);

  const [userDataError, setUserDataError] = useState(false);
  const [topArtistData, setTopArtistData] = useState([]);
  const [authUserPlaylistData, setAuthUserPlaylistData] = useState([]);
  const [topArtistLoading, setTopArtistLoading] = useState(true);
  const [Loading1, setLoading1] = useState(true);
  const [Loading2, setLoading2] = useState(true);
  const [Loading3, setLoading3] = useState(true);
  const [topArtistError, setTopArtistError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPlayModal, setShowPlayModal] = useState(false);
  const [artistChange, setArtistChange] = useState(false);
  const [followingArtists, setFollowingArtists] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [randomArtistName, setRandomArtistName] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cpModalText, setCpModalText] = useState(null);
  const [cpModalTextError, setCpModalTextError] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const CLIENT_ID = import.meta.env.VITE_REACT_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_REACT_CLIENT_SECRET;
  const [isUserEmailRegistered, setIsUserEmailRegistered] = useState(() => {
    const isRegistered = window.localStorage.getItem("isEmailRegistered");

    return isRegistered === "true";
  });
  const [isHandleClicked, setIsHandleClicked] = useState(false);
  // const redirectURI = "https://audiovista.netlify.app/";

  const redirectURI = import.meta.env.VITE_REACT_REDIRECT_URI;
  function getRandomArtistName() {
    const randomNumber = Math.floor(Math.random() * artists.length);
    setRandomArtistName(artists[randomNumber]);
  }
  // console.log({ CLIENT_ID, CLIENT_SECRET });
  // function to get spotify token
  async function getTokenHandler() {
    const TOKEN_URL = "https://accounts.spotify.com/api/token";
    const TOKEN_PARAMS = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
    try {
      const response = await fetch(TOKEN_URL, TOKEN_PARAMS);
      const data = await response.json();
      setUnAuthAccessToken(data.access_token);
      // setAccessToken(data.access_token);
    } catch (error) {
      window.location.reload();
      console.error("Error fetching token:", error);
    }
  }
  const SEARCH_PARAM = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  async function searchHandler(searchInput) {
    try {
      const SEARCH_URL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchInput
      )}&type=artist`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        return data.artists.items[0].id;
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
  useEffect(() => {
    let timeoutId;

    if (showPlayModal || cpModalText !== null || cpModalTextError !== null) {
      timeoutId = setTimeout(() => {
        setShowPlayModal(false);
        setCpModalText(null);
        setCpModalTextError(null);
      }, 3000);
    }

    // Clean up the timeout to avoid memory leaks
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showPlayModal, cpModalText, cpModalTextError]);
  async function getFollowingArtists() {
    try {
      setLoading1(true);
      const SEARCH_URL = "https://api.spotify.com/v1/me/following?type=artist";
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setFollowingArtists(data.artists.items);
        setLoading1(false);
        setTopArtistError(false);
      } else {
        setLoading1(false);
        setFollowingArtists([]);
        setTopArtistError(true);
      }
    } catch (error) {
      setLoading1(false);
      setFollowingArtists([]);
      setTopArtistError(true);
      console.log(error);
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  let authError = urlParams.get("error");
  const getAuthToken = async (code) => {
    const codeVerifier = localStorage.getItem("code_verifier");

    if (!codeVerifier) {
      console.error("Code verifier not found in localStorage");
      return;
    }

    try {
      const authUrl = "https://accounts.spotify.com/api/token";
      const authBody = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectURI,
        code_verifier: codeVerifier,
      });

      const authPayload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: authBody,
      };

      const response = await fetch(authUrl, authPayload);

      if (response.ok) {
        const data = await response.json();

        setRefreshToken(data.refresh_token);
        setAuthAccessToken(data.access_token);
        window.history.replaceState({}, document.title, "/");
      } else {
        console.error("Failed to fetch access token", response.statusText);
      }
    } catch (error) {
      setCpModalTextError("Login Unsuccessful ");
      setAuthAccessToken(null);
      setRefreshToken(null);
      console.error("Error fetching access token:", error);
    }
  };
  let startTime;
  const getRefreshTokenHandler = async () => {
    try {
      setAccessToken(null);
      const refreshUrl = "https://accounts.spotify.com/api/token";
      const refreshPayload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: CLIENT_ID,
        }),
      };
      const response = await fetch(refreshUrl, refreshPayload);
      if (response.ok) {
        const data = await response.json();
        startTime = Date.now();
        localStorage.setItem("startTime", startTime);
        setElapsedTime(1);
        setRefreshToken(data.refresh_token);
        setAuthAccessToken(data.access_token);
      } else {
        console.error("Failed to fetch refresh token", response.statusText);
      }
    } catch (error) {
      setAuthAccessToken(null);
      setRefreshToken(null);
      console.error("Error fetching refresh token:", error);
    }
  };

  useEffect(() => {
    window.localStorage.setItem("refresh_token", refreshToken);
  }, [refreshToken]);
  // console.log({ accessToken, unAuthAccessToken, authAccessToken, refreshToken, elapsedTime });
  useEffect(() => {
    if (authError) {
      setCpModalTextError("Login Unsuccessful ");
      window.history.replaceState({}, document.title, "/");
    }
  }, [authError]);
  useEffect(() => {
    if (code) {
      getAuthToken(code);
    }
  }, [code]);
  const expireTime = 3600;
  useEffect(() => {
    let intervalId;

    if (accessToken) {
      if (!loggedIn) {
        localStorage.removeItem("startTime");

        // Set start time to now on every mount (reset on refresh)
        const startTime = Date.now();
        intervalId = setInterval(() => {
          const currentTime = Date.now();
          const elapsed = Math.floor((currentTime - startTime) / 1000);

          if (elapsed >= expireTime) {
            clearInterval(intervalId);
            setElapsedTime(expireTime);
          } else {
            setElapsedTime(elapsed);
          }
        }, 1000);
      } else {
        startTime = localStorage.getItem("startTime");

        if (!startTime) {
          // If there's no start time in localStorage, set it to the current time
          startTime = Date.now();
          localStorage.setItem("startTime", startTime);
        }

        intervalId = setInterval(() => {
          // Calculate elapsed time
          const currentTime = Date.now();
          const timeElapsed = Math.floor((currentTime - startTime) / 1000);

          if (timeElapsed >= expireTime) {
            clearInterval(intervalId);
            setElapsedTime(expireTime);
            // localStorage.removeItem("startTime");
            // setAuthAccessToken(null);
          } else {
            setElapsedTime(timeElapsed);
          }
        }, 1000);
      }
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [accessToken, expireTime, loggedIn, startTime]);
  // useEffect(() => {
  //   if (loggedIn && expiredToken) {
  //     setAuthAccessToken(null);
  //   } else if (!loggedIn && expiredToken) {
  //     getTokenHandler();
  //   }
  // }, [loggedIn, expiredToken]);
  useEffect(() => {
    if (loggedIn && elapsedTime === expireTime) {
      getRefreshTokenHandler();
    } else if (!loggedIn && elapsedTime === expireTime) {
      getTokenHandler();
    }
  }, [elapsedTime]);

  useEffect(() => {
    window.localStorage.setItem(
      "recent_searches",
      JSON.stringify(recentSearches)
    );
  }, [recentSearches]);
  useEffect(() => {
    window.localStorage.setItem(
      "authAccessToken",
      JSON.stringify(authAccessToken)
    );
  }, [authAccessToken]);

  const genresArray = [
    "Kendrick Lamar",
    "Beyoncé",
    "The Beatles",
    "Jay-Z",
    "Eminem",
    "Taylor Swift",
    "Drake",
    "Bob Marley",
    "Michael Jackson",
    "Ariana Grande",
    "Ed Sheeran",
    "Kanye West",
    "Lady Gaga",
    "Nirvana",
    "Snoop Dogg",
    "Madonna",
    "Queen",
    "Travis Scott",
    "Rihanna",
    "Johnny Cash",
    "Elvis Presley",
    "Coldplay",
    "Justin Bieber",
    "Frank Sinatra",
    "Metallica",
    "Pink Floyd",
    "Nicki Minaj",
    "U2",
    "Bruno Mars",
    "Bob Dylan",
    "Miley Cyrus",
    "Bruno Mars",
    "Prince",
    "Whitney Houston",
    "The Weeknd",
    "Lil Wayne",
    "David Bowie",
    "Cardi B",
    "Frank Ocean",
    "A$AP Rocky",
    "Alicia Keys",
    "John Legend",
    "Imagine Dragons",
    "Billie Eilish",
    "Ella Fitzgerald",
    "Lil Nas X",
    "Beethoven",
    "Eagles",
    "Post Malone",
    "Meghan Trainor",
    "Sam Smith",
    "Akon",
    "Fleetwood Mac",
    "Shawn Mendes",
    "Alessia Cara",
    "Guns N' Roses",
    "Maroon 5",
    "Lana Del Rey",
    "The Rolling Stones",
    "Kid Cudi",
    "Lizzo",
    "N.W.A.",
    "Gorillaz",
    "Oasis",
    "ZZ Top",
    "Twenty One Pilots",
    "Stevie Wonder",
    "Janet Jackson",
    "Ella Mai",
    "Dua Lipa",
    "Billy Joel",
    "Jimi Hendrix",
    "Pearl Jam",
    "Red Hot Chili Peppers",
    "Katy Perry",
    "Backstreet Boys",
    "Tupac Shakur",
    "The Notorious B.I.G.",
    "2 Chainz",
    "Logic",
    "Tracy Chapman",
    "R.E.M.",
    "George Michael",
    "Enya",
    "Lorde",
    "Florence + The Machine",
    "Chance the Rapper",
    "Hozier",
    "Bob Seger",
    "Alanis Morissette",
    "Sting",
    "Nat King Cole",
    "Ray Charles",
    "Justin Timberlake",
    "George Strait",
    "Earth, Wind & Fire",
    "Shakira",
    "Bon Jovi",
    "Green Day",
    "A-ha",
  ];
  const artists = genresArray;

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 1000);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function filterRecentSearches(param, paramId) {
    setRecentSearches((prevState) => {
      const index = prevState.findIndex((item) => item.id === paramId);

      if (index !== -1) {
        // If found, remove it from the array
        const updatedArray = prevState.filter((item) => item.id !== paramId);

        // Add the removed item to the beginning of the array
        updatedArray.unshift(prevState[index]);

        return updatedArray;
      } else {
        return [param, ...prevState];
      }
    });
  }
  async function getTopArtists() {
    try {
      setLoading2(true);
      const SEARCH_URL = "https://api.spotify.com/v1/me/top/artists?limit=50";
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);

      if (response.ok) {
        const data = await response.json();
        setTopArtistData(data.items);
        setLoading2(false);
        setTopArtistError(false);
      } else {
        setTopArtistData([]);
        setLoading2(false);
        setTopArtistError(true);
      }
    } catch (error) {
      setTopArtistData([]);
      setLoading2(false);
      setTopArtistError(true);

      console.log(error);
    }
  }
  async function getAuthUserPlaylist() {
    try {
      setLoading3(true);
      const SEARCH_URL = "https://api.spotify.com/v1/me/playlists";
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);

      if (response.ok) {
        const data = await response.json();
        setAuthUserPlaylistData(data.items);
        setLoading3(false);
        setTopArtistError(false);
      } else {
        setAuthUserPlaylistData([]);
        setLoading3(false);
        setTopArtistError(true);
      }
    } catch (error) {
      setAuthUserPlaylistData([]);
      setLoading3(false);
      setTopArtistError(true);

      console.log(error);
    }
  }
  // console.log(authUserPlaylistData);
  function recentSearchesHandler(param) {
    const objId = param.id;
    filterRecentSearches(param, objId);
    // setRecentSearches((prevState) => {
    //   const newState = [...prevState, param];
    //   return newState;
    // });
  }

  // useEffect(() =>, [accessToken])
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling behavior
    });
  };
  useEffect(() => {
    getTokenHandler();
  }, []);
  useEffect(() => {
    if (!authAccessToken && unAuthAccessToken) {
      setAccessToken(unAuthAccessToken);
    }
  }, [authAccessToken, unAuthAccessToken]);
  useEffect(() => {
    if (!authAccessToken) {
      getRandomArtistName();
      setRefreshToken(null);
      setLoggedIn(false);
    } else {
      setAccessToken(authAccessToken);
      //  localStorage.removeItem("startTime");
      getRandomArtistName();
      setLoggedIn(true);
    }
  }, [authAccessToken]);
  useEffect(() => {
    if (loggedIn) {
      if (accessToken) {
        getTopArtists();
        getAuthUserPlaylist();
        getFollowingArtists();
      } else {
        setTopArtistLoading(true);
      }
    } else {
      setTopArtistData([]);
      setFollowingArtists([]);
      setAuthUserPlaylistData([]);
    }
  }, [loggedIn, artistChange, accessToken]);
  const createToast = (text, type) => {
    if (type) {
      toast[type](text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    toast(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  useEffect(() => {
    if (showPlayModal) {
      createToast("Feature currently unavailable", "warn");
    } else if (cpModalText) {
      createToast(cpModalText, "success");
    } else if (cpModalTextError) {
      createToast(cpModalTextError, "error");
    }
  }, [showPlayModal, cpModalText, cpModalTextError]);
  async function getCurrentUser() {
    try {
      setUserDataLoading(true);
      const SEARCH_URL = "https://api.spotify.com/v1/me";
      const response = await fetch(SEARCH_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authAccessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setUserDataLoading(false);
        setUserDataError(false);
        //  setExpiredToken(false)
      } else {
        throw new Error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      setUserData(null);
      setUserDataLoading(false);
      setUserDataError(true);
      console.error("Error fetching user data:", error);
      // if(refreshToken) {
      //   getRefreshTokenHandler()
      // }
      // setAuthAccessToken(null);
      //  setExpiredToken(true);
    }
  }
  useEffect(() => {
    if (!Loading1 && !Loading2 && !Loading3) {
      setTopArtistLoading(false);
    } else {
      setTopArtistLoading(true);
    }
  }, [Loading1, Loading2, Loading3]);
  useEffect(() => {
    if (authAccessToken) {
      getCurrentUser();
      // setExpiredToken(false);
    }
  }, [authAccessToken]);

  const logOut = () => {
    setAuthAccessToken(null);
  };
  const containerVariant = {
    hidden: {
      // opacity: 0,
      x: "100vw",
    },
    visible: {
      // opacity: 1,
      x: `${isMobile ? 0 : "-50%"}`,
      transition: {
        duration: 0.5,
        // delay: 0.5,
        // mass: 0.4,
        // damping: 8,
        // when: "beforeChildren"
        ease: "easeInOut",
      },
    },
    exit: {
      // opacity: 0,
      x: "100vw",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
  const handlePage = (param) => {
    setIsHandleClicked(param);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape" || event.keyCode === 27) {
      handlePage(false);
    }
  };

  useEffect(() => {
    window.localStorage.setItem(
      "isEmailRegistered",
      isUserEmailRegistered.toString()
    );
  }, [isUserEmailRegistered]);
  useEffect(() => {
    if (isHandleClicked) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isHandleClicked]);
  useEffect(() => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Shuffle the genres array
    const shuffledGenres = shuffleArray([...genresArray]);

    // Select the first 60 items
    const selectedGenres = shuffledGenres.slice(0, 65);
    setNewGenresArray(selectedGenres);
  }, []);
  const numberWithCommas = (number) => {
    return Number(number).toLocaleString();
  };
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
    localStorage.setItem("code_verifier", codeVerifier);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&code_challenge_method=S256&code_challenge=${codeChallenge}&response_type=code&scope=${encodeURIComponent(
      scopes.join(" ")
    )}&redirect_uri=${encodeURIComponent(redirectURI)}`;
    window.location.href = accessUrl;
  };
  // console.log(isOnline);
  // console.log({  unAuthAccessToken, accessToken, authAccessToken, refreshToken, elapsedTime });

  const values = {
    loggedIn,
    setLoggedIn,
    accessToken,
    randomArtistName,
    searchHandler,
    SEARCH_PARAM,
    newGenresArray,
    recentSearchesHandler,
    setRecentSearches,
    recentSearches,
    numberWithCommas,
    scrollToTop,
    setDocumentTitle,
    CLIENT_ID,
    CLIENT_SECRET,
    logOut,
    userData,
    topArtistData,
    topArtistLoading,
    topArtistError,
    containerVariant,
    // setTopArtistData,
    setTopArtistError,
    setTopArtistLoading,
    authUserPlaylistData,
    setShowPlayModal,
    followingArtists,
    setArtistChange,
    artistChange,
    userDataLoading,
    userDataError,
    setCpModalText,
    cpModalText,
    setCpModalTextError,
    cpModalTextError,
    getTokenHandler,
    redirectURI,
    createToast,
    handlePage,
    isUserEmailRegistered,
    setIsUserEmailRegistered,
    isHandleClicked,
    setIsHandleClicked,
    authorizeUser,
    // createPlaylist,
    // createPlaylistData,
    // createPlaylistError,
    // createPlaylistLoading,
    // SEARCH_PARAM_PUT,
  };

  return (
    <div
      className=" min-h-dvh w-full max-w-[1800px]  bg-black flex  justify-between font-nunito"
      id="app"
    >
      <myContext.Provider value={values}>
        <Navbar />
        {/* {expiredToken && (
          <ExpiredSession
            setExpiredToken={setExpiredToken}
            getTokenHandler={getTokenHandler}
            logOut={logOut}
          />
        )} */}
        {!isOnline && (
          <Modals
            text="No internet connection"
            playlistPage={expiredToken ? true : false}
          />
        )}

        {isHandleClicked && <CheckEmailReg />}
        <Routess />
      </myContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
