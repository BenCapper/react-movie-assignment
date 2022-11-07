import React, { useContext } from "react";
import TvPageTemplate from "../components/templateTvListPage";
import { TvContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTv } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavoriteTv from "../components/cardIcons/removeFromFavoriteTv";
import WriteReviewTv from "../components/cardIcons/writeReviewTv"

const MustWatchPage = () => {
  const {favorites: tvIds } = useContext(TvContext);
  console.log(tvIds)
  // Create an array of queries and run in parallel.
  const favoriteTvQueries = useQueries(
    tvIds.map((tvId) => {
      return {
        queryKey: ["tv", { id: tvId }],
        queryFn: getTv,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteTvQueries.find((t) => t.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const tv = favoriteTvQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });


  return (
    <TvPageTemplate
      name="Must Watch"
      tv={tv}
      action={(tv) => {
        return (
          <>
            <RemoveFromFavoriteTv tv={tv} />
            <WriteReviewTv tv={tv} />
          </>
        );
      }}
    />
  );
};

export default MustWatchPage;