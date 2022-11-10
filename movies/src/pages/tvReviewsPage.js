import React from "react";
import { useLocation } from "react-router-dom";
import TvPageTemplate from "../components/templateTvPage";
import TvReview from "../components/tvReview";
import SiteHeader from "../components/siteHeader";

const TvReviewPage = (props) => {
  let location = useLocation();
  const {tv, review} = location.state;

  return (
    <>
    <SiteHeader/>
    <TvPageTemplate tv={tv}>
      <TvReview review={review} />
    </TvPageTemplate>
    </>
  );
};

export default TvReviewPage;