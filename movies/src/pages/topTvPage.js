import React from "react";
import { getTopTv } from "../api/tmdb-api";
import TvPageTemplate from '../components/templateTvListPage'
import Spinner from '../components/spinner';
import PlaylistAddIcon from '../components/cardIcons/addToMustWatchTv';
import { useQuery } from 'react-query';

const TvTopPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('topTv', getTopTv)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const tv = data.results;
  console.log(tv)

  // Redundant, but necessary to avoid app crashing.
  const mustWatch = tv.filter(m => m.mustWatch)
  localStorage.setItem('mustWatchTv', JSON.stringify(mustWatch))

  return (
    <TvPageTemplate
      title="Top Rated"
      tv={tv}
      action={(tv) => {
        return <PlaylistAddIcon tv={tv} />
      }}
    />
);
};
export default TvTopPage;