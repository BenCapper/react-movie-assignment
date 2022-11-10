import React, { useState } from "react";
import { getTopTv } from "../api/tmdb-api";
import TvPageTemplate from '../components/templateTvListPage'
import Spinner from '../components/spinner';
import PlaylistAddIcon from '../components/cardIcons/addToMustWatchTv';
import { useQuery } from 'react-query';
import { Stack } from "@mui/material";
import { Pagination } from "@mui/material";
import SiteHeader from "../components/siteHeader";


const TvTopPage = (props) => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ['topTv', pageNumber],
    queryFn: () => getTopTv(pageNumber),
    keepPreviousData : true
  })

  const handleChange = (event, value) => {
    setPageNumber(value);
  }

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
    <>
    <SiteHeader/>
    <TvPageTemplate
      name="Top Rated TV"
      tv={tv}
      action={(tv) => {
        return <PlaylistAddIcon tv={tv} />
      }}
    />
    <Stack alignItems="center">
      <Pagination color='primary' count={10} page={pageNumber} onChange={handleChange} />
    </Stack>
    </>
);
};
export default TvTopPage;