import React, {useEffect, useState} from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import TvPageTemplate from "../components/templateTvPage";
import TvReview from "../components/tvReview";
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";
import { getTvSeason } from "../api/tmdb-api";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";

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
    queryKey: ['episodes'],
    queryFn: () => getTvSeason(tv.id, season.season_number),
    keepPreviousData : true
  })

  console.log(data)
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
    <Paper>
      <TableContainer component={Paper}>
      <Table sx={{minWidth: 550}} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Season</TableCell>
            <TableCell align="center">Episode</TableCell>
            <TableCell align="right">Overview</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tv.seasons.map((s) => (
            <TableRow key={s.season_number}>
              <TableCell component="th" scope="row">
                {s.season_number}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {s.name}
              </TableCell>
              <TableCell align="right" >
              <Link
                  to={`/tv/${tv.id}/season/${s.season_number}`}
                  state={{
                      season: s,
                      tv: tv,
                  }}
                >
                 ({s.episode_count}) Episodes
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </TvPageTemplate>
    
    </>
  );
};

export default TvEpisodesPage;