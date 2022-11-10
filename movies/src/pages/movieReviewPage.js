import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import SiteHeader from "../components/siteHeader";

const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;

  return (
    <>
    <SiteHeader/>
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
    </>
  );
};

export default MovieReviewPage;