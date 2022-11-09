import React from "react";
import { useLocation } from "react-router-dom";
import TvPageTemplate from "../components/templateTvPage";
import TvReview from "../components/tvReview";

const TvReviewPage = (props) => {
  let location = useLocation();
  const {tv, review} = location.state;

  return (
    <TvPageTemplate tv={tv}>
      <TvReview review={review} />
    </TvPageTemplate>
  );
};

export default TvReviewPage;