import React, {useState, useEffect} from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { Stack } from "@mui/material";
import { Pagination } from "@mui/material";
import SiteHeader from "../components/siteHeader";
import { useNavigate } from "react-router-dom";
import SearchForm from "../components/searchForm";



const SearchPage = (props) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn);
      setUser(foundUser);
    }
    else navigate("/login");
  }, []);

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ['movies'],
    queryFn: () => getMovies(),
  })


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <>
    <SiteHeader/>
    <SearchForm/>
    </>
);
};
export default SearchPage;