import React, { createRef, useContext, useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import ParentLayouts from "../components/ParentLayouts";
import { myContext } from "../App";
import DesktopView from "../components/SearchDesktopView";
import SearchMobileView from "../components/SearchMobileView";
import { useDebouncedCallback } from "use-debounce";
function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState(() => {
    try {
      // setInputFocused(true);
      const refreshedParam = searchParams.get("query");
      // const storedValue = window.localStorage.getItem("input_value");
      // const parsedValue = JSON.parse(storedValue);
      if (refreshedParam) {
        setInputFocused(true);
        return refreshedParam;
      }
      // else if (!refreshedParam && parsedValue !== null) {
      //   setInputFocused(true);
      //   return parsedValue;
      // }
      else {
        setInputFocused(false);
        return "";
      }
      //  return parsedValue !== null ? parsedValue : "";
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      setInputFocused(false);
      return "";
    }
  });

  const [filters, setFilters] = useState(
    "all"
    // () => {
    // try {
    //   const filterFromLocalStore = window.localStorage.getItem("filtered");
    //   const parsedValue = JSON.parse(filterFromLocalStore);

    //   return parsedValue !== null ? parsedValue : "all";
    // } catch (error) {
    //   console.error("Error parsing JSON from localStorage:", error);
    //   return "all";
    // }
    // }
  );
  const [albumsData, setAlbumsData] = useState([]);
  const [artistsData, setArtistsData] = useState([]);
  const [tracksData, setTracksData] = useState([]);
  const [playlistsData, setPlaylistsData] = useState([]);
  const [dataFirstItems, setDataFirstItems] = useState([]);
  const [topResultData, setTopResultData] = useState({});
  const [queryRefreshed, setQueryRefreshed] = useState("");
  const [filtersRefreshed, setFiltersRefreshed] = useState("");
  const [dataError, setDataError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    loggedIn,
    SEARCH_PARAM,
    newGenresArray,
    setRecentSearches,
    recentSearches,
    accessToken,
    scrollToTop,
    setDocumentTitle,
  } = useContext(myContext);
  const navigate = useNavigate();
  const inputRef = createRef();

  const pinkShades = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF", // Add your own colors here
    "#FF6347",
    "#2E8B57",
    "#6A5ACD",
    "#FA8072",
    "#8A2BE2",
    "#7FFFD4",
    "#8B4513",
    "#556B2F",
    "#483D8B",
    "#FFD700",
    "#DA70D6",
    "#32CD32",
    "#20B2AA",
    "#9400D3",
    "#CD5C5C",
    "#4682B4",
    "#8B008B",
    "#FF4500",
    "#00FF7F",
    "#1E90FF",
    "#8B0000",
    "#8B3A3A",
    "#5F9EA0",
    "#D2691E",
    "#B0C4DE",
    "#FF1493",
    "#7CFC00",
    "#800000",
    "#8B4513",
    "#008080",
    "#4169E1",
    "#FF6347",
    "#2E8B57",
    "#6A5ACD",
    "#FA8072",
    "#8A2BE2",
    "#7FFFD4",
    "#8B4513",
    "#556B2F",
    "#483D8B",
    "#FFD700",
    "#DA70D6",
    "#32CD32",
    "#20B2AA",
    "#9400D3",
    "#CD5C5C",
    "#4682B4",
    "#8B008B",
    "#FF4500",
    "#00FF7F",
    "#1E90FF",
    "#8B0000",
    "#8B3A3A",
    "#5F9EA0",
    "#D2691E",
    "#B0C4DE",
    "#FF1493",
    "#7CFC00",
    "#800000",
    "#8B4513",
  ];

  const backHandler = () => {
    if (inputValue.length > 0) {
      navigate("/search");
      setInputValue("");
      setSearchParams({}, { replace: true });
    } else {
      navigate(-3);
    }
  };

  function inputHandler({ target }) {
    scrollToTop();
    const value = target.value;
    setInputValue(value);
  }

  function clearInputHandler() {
    scrollToTop();
    setInputFocused(false);
    setInputValue("");
    inputRef.current.focus();
  }
  const [firstInputFocus, setFirstInputFocus] = useState(false);
  function inputFocusfunction() {
    setFirstInputFocus(true);
    inputRef.current.focus();
  }
  function clearInputHandlerMobile() {
    scrollToTop();
    setInputFocused(false);
    setInputValue("");
    inputRef.current.focus();
  }
  const backHandlerMobile = () => {
    if (inputValue.length > 0) {
      // navigate("/search");
      setInputValue("");
      setSearchParams({}, { replace: true });
    } else {
      setFirstInputFocus(false);
    }
  };
  const debouncedFetchData = useDebouncedCallback(totalSearchHandler, 500);
  function submitHandler(e) {
    e.preventDefault();
    //  if(inputValue.length > 0) {
    //   debouncedFetchData(inputValue)
    //  }
  }

  const [playlistVerify, setPlaylistVerify] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
    scrollToTop();
    setDocumentTitle("Audiovista - Search");
  }, []);
  useEffect(() => {
    if (firstInputFocus) {
      inputRef.current.focus();
    }
  }, [firstInputFocus]);
  useEffect(() => {
    if (topResultData.type === "playlist") {
      setPlaylistVerify(true);
    } else {
      setPlaylistVerify(false);
    }
  }, [topResultData]);
  const [imgLocation, setImgLocation] = useState("");
  useEffect(() => {
    if (Object.keys(topResultData).length > 0) {
      const trackVerify = topResultData.type.toLowerCase() === "track";
      if (trackVerify) {
        setImgLocation(topResultData.album.images[0].url);
      } else {
        setImgLocation(topResultData.images[0].url);
      }
    }
  }, [topResultData]);
  function genreHandler(param) {
    scrollToTop();
    clearDatas();
    setInputValue(param);
  }
  // console.log(topResultData)
  const refreshedQuery = searchParams.get("query");
  const refreshedFilters = searchParams.get("filters");
  useEffect(() => {
    if (refreshedFilters) {
      const filtersLowerCase = refreshedFilters.toLowerCase();
      const existingParams = new URLSearchParams(searchParams);

      switch (filtersLowerCase) {
        case "songs":
          existingParams.set("filters", "songs");
          setFilters("songs");
          break;
        case "playlists":
          existingParams.set("filters", "playlists");
          setFilters("playlists");
          break;
        case "albums":
          existingParams.set("filters", "albums");
          setFilters("albums");
          break;
        case "artists":
          existingParams.set("filters", "artists");
          setFilters("artists");
          break;
        default:
          existingParams.delete("filters");
          setFilters("all");
          break;
      }
    }
  }, []);
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };
  useEffect(() => {
    if (accessToken) {
      setQueryRefreshed(refreshedQuery);
    }
  }, [accessToken, refreshedQuery]);
  useEffect(() => {
    // Perform actions that need to happen when filters state changes

    // For example, you can update the URLSearchParams here
    const existingParams = new URLSearchParams(searchParams);

    switch (filters) {
      case "songs":
        existingParams.set("filters", "songs");
        break;
      case "playlists":
        existingParams.set("filters", "playlists");
        break;
      case "albums":
        existingParams.set("filters", "albums");
        break;
      case "artists":
        existingParams.set("filters", "artists");
        break;
      default:
        existingParams.delete("filters");
        break;
    }

    // Do something with existingParams if needed
  }, [filters, searchParams]);

  useEffect(() => {
    if (filters === "all") {
      setSearchParams({ query: inputValue });
    }
  }, [filters]);
  //  useEffect(() )
  const filtersHandler = (param) => {
    scrollToTop();
    const existingParams = new URLSearchParams(searchParams);

    // Update the filters parameter
    if (param !== "all") {
      existingParams.set("filters", param);

      // Set the updated search parameters
      setSearchParams(existingParams);
    } else {
      setSearchParams({ query: inputValue });
    }

    setFilters(param);
  };
  useEffect(() => {
    if (accessToken) {
      if (queryRefreshed !== null && queryRefreshed.length > 0) {
        setInputValue(queryRefreshed);
        debouncedFetchData(queryRefreshed);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    // const refreshedParam = searchParams.get("query");

    if (queryRefreshed !== null && queryRefreshed.length > 0) {
      setInputFocused(false);
      // debouncedFetchData(queryRefreshed);
    }
  }, []);
  // useEffect(() => {
  //   if (queryRefreshed !== null && queryRefreshed.length > 0) {
  //     setInputValue(queryRefreshed);
  //   }
  // }, [queryRefreshed]);
  // useEffect(() => {
  //   window.localStorage.setItem("filtered", JSON.stringify(filters));
  // }, [filters]);
  // useEffect(() => {
  //   window.localStorage.setItem("input_value", JSON.stringify(inputValue));
  // }, [inputValue]);
  useEffect(() => {
    if (
      albumsData.length > 0 &&
      tracksData.length > 0 &&
      artistsData.length > 0 &&
      playlistsData.length > 0
    ) {
      const combinedArray = [
        tracksData[0],
        artistsData[0],
        albumsData[0],
        playlistsData[0],
      ];
      setDataFirstItems(combinedArray);
    }
  }, [albumsData, artistsData, playlistsData, tracksData]);
  useEffect(() => {
    if (dataFirstItems.length > 0) {
      const filteredResult = dataFirstItems.filter((filtered) => {
        const inputLength = inputValue.length;
        const filter_name = filtered.name.slice(0, inputLength).toLowerCase();
        const filter_value = inputValue.toLowerCase();
        const isMatch = filter_name === filter_value;

        return isMatch;
      });

      setTopResultData(
        filteredResult.length > 0 ? filteredResult[0] : dataFirstItems[0]
      );
    }
  }, [inputValue, dataFirstItems]);

  useEffect(() => {
    function deleteHandler(event) {
      if (event.key === "Delete" && inputValue.length > 0) {
        clearInputHandler();
      }
    }

    window.addEventListener("keydown", deleteHandler);

    return () => window.removeEventListener("keydown", deleteHandler);
  }, [inputValue]);
  useEffect(() => {
    if (inputValue.length > 0) {
      setInputFocused(true);
      setFirstInputFocus(true);
      // debouncedFetchData(inputValue);
    } else {
      setInputFocused(false);
      // setDataError(false);
      // setFirstInputFocus(false)
    }
  }, [inputValue]);
  useEffect(() => {
    if (inputValue.length === 0) {
      setDataError(false);
    }
  }, [inputValue]);
  useEffect(() => {
    if (inputValue.length > 0) {
      // setSearchParams({query: inputValue, filter: filters})
      debouncedFetchData(inputValue);
    }
  }, [inputValue]);
  function clearDatas() {
    setAlbumsData([]);
    setArtistsData([]);
    setPlaylistsData([]);
    setTracksData([]);
    setTopResultData([]);
  }
  async function totalSearchHandler(searchQuery) {
    try {
      setIsLoading(true);
      clearDatas();
      const SEARCH_URL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchQuery
      )}&type=album,artist,playlist,track&market=ES&limit=50&include_external=audio`;
      const response = await fetch(SEARCH_URL, SEARCH_PARAM);
      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);
        if (
          data.albums.items.length > 0 &&
          data.playlists.items.length > 0 &&
          data.playlists.items.length > 0 &&
          data.tracks.items.length > 0
        ) {
          setAlbumsData(data.albums.items);
          setArtistsData(data.artists.items);
          setPlaylistsData(data.playlists.items);
          setTracksData(data.tracks.items);
          setDataError(false);
        } else {
          setDataError(true);
          clearDatas();
        }
      }
    } catch (error) {
      setIsLoading(false);
      setDataError(true);
      clearDatas();
      console.log(error);
    }
  }
  // useEffect(() => {
  //   debouncedFetchData("high school");
  // }, []);
  useEffect(() => {
    function removeFocus(event) {
      const isElementInFocus = document.activeElement === inputRef.current;

      if (event.key === "Escape" && isElementInFocus) {
        inputRef.current.blur();
      }
    }

    window.addEventListener("keydown", removeFocus);

    return () => window.removeEventListener("keydown", removeFocus);
  }, [inputRef]);

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      if (filters === "songs") {
        setSearchParams(
          { query: inputValue, filters: "songs" },
          { replace: true }
        );
      } else if (filters === "artists") {
        setSearchParams(
          { query: inputValue, filters: "artists" },
          { replace: true }
        );
      } else if (filters === "albums") {
        setSearchParams(
          { query: inputValue, filters: "albums" },
          { replace: true }
        );
      } else if (filters === "playlists") {
        setSearchParams(
          { query: inputValue, filters: "playlists" },
          { replace: true }
        );
      } else {
        setSearchParams({ query: inputValue }, { replace: true });
      }
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [inputValue, filters]);
  return (
    <ParentLayouts>
      <section className="hidden relative px-[2.5%]  ipad:block w-full">
        <DesktopView
          backHandler={backHandler}
          submitHandler={submitHandler}
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputHandler={inputHandler}
          clearInputHandler={clearInputHandler}
          loggedIn={loggedIn}
          ref={inputRef}
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
          newGenresArray={newGenresArray}
          pinkShades={pinkShades}
          inputFocused={inputFocused}
          setInputFocused={setInputFocused}
          albumsData={albumsData}
          artistsData={artistsData}
          playlistsData={playlistsData}
          tracksData={tracksData}
          topResultData={topResultData}
          dataFirstItems={dataFirstItems}
          clearDatas={clearDatas}
          setDataError={setDataError}
          dataError={dataError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          filtersHandler={filtersHandler}
          filters={filters}
          imgLocation={imgLocation}
          playlistVerify={playlistVerify}
          genreHandler={genreHandler}
        />
      </section>
      <section className="block   h-full min-h-[300px] relative  ipad:hidden w-full">
        <SearchMobileView
          inputFocused={inputFocused}
          submitHandler={submitHandler}
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputHandler={inputHandler}
          clearInputHandler={clearInputHandler}
          newGenresArray={newGenresArray}
          pinkShades={pinkShades}
          genreHandler={genreHandler}
          setInputFocused={setInputFocused}
          // backHandler={backHandler}
          firstInputFocus={firstInputFocus}
          setSearchParams={setSearchParams}
          inputFocusfunction={inputFocusfunction}
          backHandlerMobile={backHandlerMobile}
          clearInputHandlerMobile={clearInputHandlerMobile}
          ref={inputRef}
          albumsData={albumsData}
          artistsData={artistsData}
          playlistsData={playlistsData}
          tracksData={tracksData}
          topResultData={topResultData}
          dataError={dataError}
          filters={filters}
          filtersHandler={filtersHandler}
          isLoading={isLoading}
          imgLocation={imgLocation}
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
          clearRecentSearches={clearRecentSearches}
        />
      </section>
    </ParentLayouts>
  );
}

export default Search;
