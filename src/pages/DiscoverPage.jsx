import React from "react";
import DiscoverHeader from "../components/DiscoverHeader";
import DiscoverGenres from "../components/DiscoverGenres";
import Footer from "../components/Footer"; 

const DiscoverPage = ({ onView, onFav, shelfRef, favorites }) => {
  return (
    <>
      <DiscoverHeader />
      <DiscoverGenres
        onView={onView}
        onFav={onFav}
        shelfRef={shelfRef}
        favorites={favorites} 
      />
      <Footer /> 
    </>
  );
};

export default DiscoverPage;
