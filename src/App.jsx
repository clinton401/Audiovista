import { createContext, useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import ExpiredSession from "./Layout/ExpiredSession";
import Routess from "./Routess";
import Modals from "./components/Modals";
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
    const [elapsedTime, setElapsedTime] = useState(0);
  const CLIENT_ID = import.meta.env.VITE_REACT_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_REACT_CLIENT_SECRET;

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

    if (showPlayModal || cpModalText !== null) {
      timeoutId = setTimeout(() => {
        setShowPlayModal(false);
        setCpModalText(null);
      }, 3000);
    }

    // Clean up the timeout to avoid memory leaks
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showPlayModal, cpModalText]);
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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && !authAccessToken) {
      const hashedToken = hash.substring(1).split("&")[0].split("=")[1];
      //   .substring(1)
      //   .split("&")
      //   .find((elem) => elem.startsWith("access_token"))
      //   .split("=")[1];
      // // console.log(hashedToken);
      window.location.hash = "";
      setAuthAccessToken(hashedToken);
    }
  }, []);
  // const SEARCH_PARAM_DELETE = {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify(bodyData),
  // };
  const expireTime = 3600;
  useEffect(() => {
    let intervalId;
    if (accessToken) {
      setElapsedTime(0)
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => {
          if (prevTime >= expireTime) {
            // Stop at 300 seconds (5 minutes)
            clearInterval(intervalId);
            return prevTime;
          }
          return prevTime + 1;
        });
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [accessToken]);
  useEffect(() => {
    if (elapsedTime === expireTime) {
      setExpiredToken(true);
    } else {
      setExpiredToken(false);
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

      setLoggedIn(false);
    } else {
      setAccessToken(authAccessToken);
      getRandomArtistName();
      setLoggedIn(true);
    }
  }, [authAccessToken]);
  useEffect(() => {
    if (loggedIn) {
      getTopArtists();
      getAuthUserPlaylist();
      getFollowingArtists();
    } else {
      setTopArtistData([]);
      setFollowingArtists([]);
      setAuthUserPlaylistData([]);
    }
  }, [loggedIn, artistChange]);

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
        setUserData(null);
        setAuthAccessToken(null);
        setUserDataError(true);
        setUserDataLoading(false);
        //  setExpiredToken(true)
        console.error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      setUserData(null);
      setUserDataLoading(false);
      setUserDataError(true);
      setAuthAccessToken(null);
      //  setExpiredToken(true);
      console.error("Error fetching user data:", error);
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
  // console.log(isOnline);
  // console.log({  unAuthAccessToken });

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
        {expiredToken && (
          <ExpiredSession setExpiredToken={setExpiredToken} getTokenHandler={getTokenHandler} />
        )}
        {!isOnline && <Modals text="No internet connection" />}
        {showPlayModal && <Modals text="Feature currently unavailable" />}
        {cpModalText !== null && <Modals text={cpModalText} />}
        <Routess />
      </myContext.Provider>
    </div>
  );
}

export default App;
