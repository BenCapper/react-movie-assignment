import React from "react";
import { getAllTv } from "../api/tmdb-api";
import TvListPageTemplate from '../components/templateTvListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavoritesTv'

const TvHomePage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('discoverTv', getAllTv)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const allTv = data.results;
  console.log(allTv)

  // Redundant, but necessary to avoid app crashing.
  const favorites = allTv.filter(m => m.favorite)
  localStorage.setItem('favoritesTv', JSON.stringify(favorites))

  return (
    <TvListPageTemplate
      name="Discover TV"
      tv={allTv}
      action={(tv) => {
        return <AddToFavoritesIcon tv={tv} />
      }}
    />
);
};
export default TvHomePage;