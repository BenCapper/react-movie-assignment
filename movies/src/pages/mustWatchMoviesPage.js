import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import SiteHeader from "../components/siteHeader";


const MustWatchPage = () => {
  const {mustWatch: mwIds } = useContext(MoviesContext);


  const mustWatchMovieQueries = useQueries(
    mwIds.map((movId) => {
      return {
        queryKey: ["movie", { id: movId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoadingMovie = mustWatchMovieQueries.find((t) => t.isLoading === true);

  if (isLoadingMovie) {
    return <Spinner />;
  }

  const movie = mustWatchMovieQueries.map((m) => {
    m.data.genre_ids = m.data.genres.map(n => n.id)
    console.log(m.data)
    return m.data
  });


  return (
    <>
    <SiteHeader/>
    <PageTemplate
      title="Must Watch Movies"
      movies={movie}
      action={(movie) => {
        return (
          <>

          </>
        );
      }}
    />
    </>
  );
};

export default MustWatchPage;