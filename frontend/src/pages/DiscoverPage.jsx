import React, { useState } from "react";
import DiscoverHeader from "../components/DiscoverHeader";
import DiscoverGenres from "../components/DiscoverGenres";
import Footer from "../components/Footer"; 

const DiscoverPage = ({ onView, onFav, shelfRef, favorites }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <DiscoverHeader onSearch={setSearchQuery} />
      <DiscoverGenres
        onView={onView}
        onFav={onFav}
        shelfRef={shelfRef}
        favorites={favorites} 
        searchQuery={searchQuery}
      />
      <Footer /> 
    </>
  );
};

export default DiscoverPage;
