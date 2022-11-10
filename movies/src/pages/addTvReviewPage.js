import React from "react";
import TvPageTemplate from "../components/templateTvPage";
import TvReviewForm from "../components/tvReviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTv } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import SiteHeader from "../components/siteHeader";


const WriteReviewPage = (props) => {
  const location = useLocation();
  const tvId = location.state.tvId;

  const { data: tv, error, isLoading, isError } = useQuery(
    ["tv", { id: tvId }],
    getTv
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
    <SiteHeader/>
    <TvPageTemplate tv={tv}>
      <TvReviewForm tv={tv} />
    </TvPageTemplate>
    </>
  );
};

export default WriteReviewPage;