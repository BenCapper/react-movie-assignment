import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import { useQuery } from "react-query";
import MovieReviews from "../movieReviews"
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { getCompany } from "../../api/tmdb-api";
import Spinner from '../../components/spinner';


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => { 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [companyId, setCompanyId] = useState(movie.production_companies[0].id)


  const { data, error, isLoading, isError } = useQuery(
    ["company", {id: companyId}],
    getCompany
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError){
    return <h1>{error.message}</h1>;
  }

  const chipHandler = ( res ) => {
    setCompanyId(res.id);
    if (res.id === data.id) chip();
  }

  const chip = ( ) => {
    if (data.homepage) window.open(data.homepage, '_blank');
  }



  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((countries) => (
          <li key={countries.name}>
            <Chip label={countries.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Companies" sx={{...chip}} color="primary" />
        </li>
        {movie.production_companies.map((company) => (
          <li key={company.name}>
            <Chip label={company.name} sx={{...chip}} onClick={() => chipHandler(company)} />
          </li>
        ))}
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;