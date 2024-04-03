import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
const LazySearch = React.lazy(() => import("./Pages/Search"));
const LazyAlbum = React.lazy(() => import("./Pages/Album"));
const LazyLibrary = React.lazy(() => import("./Pages/Library"));
const LazyPlaylist = React.lazy(() => import("./Pages/Playlist"));
const LazyArtist = React.lazy(() => import("./Pages/Artist"));
const LazyTrack = React.lazy(() => import("./Pages/Track"));
const LazyNotFound = React.lazy(() => import("./Pages/NotFound"));
const LazyUser = React.lazy(() => import("./Pages/User"));
import LoaderComp from "./components/LoaderComp";
function Routess() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<LoaderComp />}>
              <LazySearch />
            </Suspense>
          }
        />
        <Route
          path="/library"
          element={
            <Suspense fallback={<LoaderComp />}>
              <LazyLibrary />
            </Suspense>
          }
        />
        <Route
          path="/album/:id"
          element={
            <Suspense fallback={<LoaderComp />}>
              <LazyAlbum />
            </Suspense>
          }
        />
        <Route
          path="/playlist/:id"
          element={
            <Suspense fallback={<LoaderComp />}>
              <LazyPlaylist />
            </Suspense>
          }
        />
        <Route
          path="/artist/:id"
          element={
            <Suspense fallback={<LoaderComp />}>
              <LazyArtist />
            </Suspense>
          }
        />
        <Route
          path="/track/:id"
          element={
            <Suspense fallback={<LoaderComp />}>
              <LazyTrack />
            </Suspense>
          }
        />
        <Route
          path="/user/:id"
          element={
            <Suspense fallback={<LoaderComp />}>
              <LazyUser />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoaderComp />}>
              <LazyNotFound />
            </Suspense>
          }
        />
        
      </Routes>
    </>
  );
}

export default Routess;
