import React from "react";
import DiscoverHeader from "../components/DiscoverHeader";
import DiscoverGenres from "../components/DiscoverGenres";

const DiscoverPage = ({ onView, onFav, shelfRef, favorites }) => {
  return (
    <>
      <DiscoverHeader />
      <DiscoverGenres
        onView={onView}
        onFav={onFav}
        shelfRef={shelfRef}
        favorites={favorites} // pass favorites for proper heart sync
      />
    </>
  );
};

export default DiscoverPage;
