import React, {useEffect, useState} from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import TvPageTemplate from "../components/templateTvPage";
import TvReview from "../components/tvReview";
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";
import { getTvSeason } from "../api/tmdb-api";

const TvEpisodesPage = (props) => {
  let location = useLocation();
  const {tv, season} = location.state;
  const [user, setUser] = useState({});

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ['episodes', {id:tv.id, sid: season.season_number}],
    queryFn: () => getTvSeason(tv.id, season.season_number),
    keepPreviousData : true
  })

  const navigate = useNavigate();


  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn);
      setUser(foundUser);
    }
    else navigate("/login");
  }, []);

  return (
    <>
    <SiteHeaderTv/>
    <TvPageTemplate tv={tv}>
    </TvPageTemplate>
    </>
  );
};

export default TvEpisodesPage;