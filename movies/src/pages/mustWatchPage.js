import React, { useContext } from "react";
import TvPageTemplate from "../components/templateTvListPage";
import { TvContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTv } from "../api/tmdb-api";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';


const MustWatchPage = () => {
  const {mustWatch: tmwIds } = useContext(TvContext);
  const {mustWatch: mmwIds } = useContext(TvContext);


  const mustWatchTvQueries = useQueries(
    tmwIds.map((tvId) => {
      return {
        queryKey: ["tv", { id: tvId }],
        queryFn: getTv,
      };
    })
  );

  const mustWatchMovieQueries = useQueries(
    mmwIds.map((movId) => {
      return {
        queryKey: ["movie", { id: movId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoadingTv = mustWatchTvQueries.find((t) => t.isLoading === true);
  const isLoadingMovie = mustWatchMovieQueries.find((t) => t.isLoading === true);

  if (isLoadingTv) {
    return <Spinner />;
  }

  if (isLoadingMovie) {
    return <Spinner />;
  }

  const tv = mustWatchTvQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const movie = mustWatchMovieQueries.map((m) => {
    m.data.genre_ids = m.data.genres.map(n => n.id)
    console.log(m.data)
    return m.data
  });


  return (
    <>
    <TvPageTemplate
      name="Must Watch TV"
      tv={tv}
      action={(tv) => {
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