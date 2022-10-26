import React from "react";
import * as ReactDOM from "react-dom/client";
import MoviesContextProvider from "./contexts/moviesContext";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingMoviesPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TvContextProvider from "./contexts/tvContext";
import TvHomePage from "./pages/tvHomePage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <TvContextProvider>
            <Routes>
              <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/upcoming" element={<UpcomingPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
              <Route path="/tv" element={ <TvHomePage /> } />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
          </TvContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = ReactDOM.createRoot(  document.getElementById("root") )
rootElement.render(<App />);