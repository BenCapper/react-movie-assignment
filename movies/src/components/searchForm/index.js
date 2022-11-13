import React, {useState,useEffect} from "react";
import { Card, Typography } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MovieList from "../movieList";
import { searchCompany } from "../../api/tmdb-api";
import { useQuery } from "react-query";


const styles = {
    root: {
      marginLeft: 2,
      marginTop: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    togg: {
        display: "flex",
        flexDirection: "row",
        justify: "center",
    },
    form: {
      width: "100%",
      "& > * ": {
        marginTop: 2,
      },
    },
    textField: {
      width: "40ch",
    },
    submit: {
      marginRight: 2,
    },
    snack: {
      width: "50%",
      "& > * ": {
        width: "100%",
      },
    },
  };

const SearchForm = () => {
    const [alignment, setAlignment] = React.useState('companies');
    const [companies, setCompanies] = useState("");
    
    const [values, setValues] = React.useState({
        name: 'new',
        password: '',
        showPassword: false,
      });
    
    const { data , error, isLoading, isError } = useQuery(
      ["search", { query: values.name }],
      searchCompany(values.name)
    );

    
    const handleToggleChange = (event, newAlignment) => {
        console.log(newAlignment)
        setAlignment(newAlignment);
      };

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const search = () => {
        if (alignment === "people") {

        }
        if (alignment === "companies") {
            
            setCompanies(data)
            console.log(data)
        }
    }



    return (
        <>
        <Typography sx={styles.root} component="h3" variant="h4">
            Search
        </Typography>
        <Card sx={styles.root}>
        <ToggleButtonGroup
            sx={styles.togg}
            color="primary"
            value={alignment}
            exclusive
            onChange={handleToggleChange}
            aria-label="Platform"
        >
            <ToggleButton value="companies">Companies</ToggleButton>
            <ToggleButton value="people">People</ToggleButton>
        </ToggleButtonGroup>

        <FormControl sx={{mt: 2, width: '25ch'}} variant="outlined">
            <TextField
              required
              id="outlined-required"
              label="Name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange('name')}
            />
        </FormControl><br/>
        <FormControl sx={{mt: 2, mb: 2, width: '25ch' }} variant="outlined">
            <Button variant="contained" onClick={search}>Search</Button>
        </FormControl>
        </Card>
        </>
  );
};

export default SearchForm;