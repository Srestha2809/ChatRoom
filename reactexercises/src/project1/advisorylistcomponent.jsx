import React, { useState, useReducer, useEffect, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Avatar,
    Autocomplete,
    Card,
    CardHeader,
    CardContent,
    Snackbar,
    TextField, RadioGroup, FormControlLabel, Radio, Paper, Grid, Table,
    TableContainer,
    TableRow,
    TableBody,
    TableCell,
    Typography,
} from "@mui/material";
import theme from "./theme";
import logo from "./images/worldwidelogo.png"
const ListAdvisoryGui = (props) => {
    const initialState = {
        showMsg: false,
        snackbarMsg: "",
        name: '',
        country: "",
        advisory: [],
        contactServer: false,
        travel: [],
        regions: [],
        subregios: [],
        alerts: [],
        alertssubregion: [],
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchTravelers();
    }, []);

    const fetchTravelers = async () => {
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load users from server...",
            });
            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "{travel}" }),
            });
            let json = await response.json();
            setState({
                travel: json.data.travel,
            });
            props.setSnackbarMessage(`${json.data.travel.length} travelers loaded successfully!`);
        } catch (error) {
            console.log(error);

            props.setSnackbarMessage(`Problem loading server data - ${error.message}`);
        }
    };

    const fetchRegion = async () => {
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load users from server...",
            });
            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: `query{regions}` }),
            });
            let json = await response.json();
            setState({
                regions: json.data.regions
            });
            props.setSnackbarMessage(`${json.data.regions.length} regions loaded successfully!`);
        } catch (error) {
            console.log(error);
            props.setSnackbarMessage(`Problem loading server data - ${error.message}`);;
        }
    };

    const fetchSubregion = async () => {
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load users from server...",
            });
            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: `query{subregions}` }),
            });
            let json = await response.json();
            setState({
                subregions: json.data.subregions
            });
            props.setSnackbarMessage(`${json.data.subregions.length} subregions loaded successfully!`);
        } catch (error) {
            console.log(error);
            props.setSnackbarMessage(`Problem loading server data - ${error.message}`);
        }
    };

    const handleTravelerSelection = async (traveller) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {


            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: `query {alertsfortravel(name: "${traveller}") {country,date,text}}`,

                }),

            });

            let json = await response.json();

            setState({
                alerts: json.data.alertsfortravel,
            });
            props.setSnackbarMessage(`${json.data.alertsfortravel.length} alerts loaded for ${traveller}.`);
        } catch (error) {
            props.setSnackbarMessage(`name not added - ${error.message}`);
        }
    }

    const handleRegionSelection = async (region) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {


            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: `query {alertsforregion(region: "${region}") {name,text,date}}`,

                }),

            });

            let json = await response.json();

            setState({
                contactServer: true,
                alerts: json.data.alertsforregion,
                snackBarMsg: `${json.data.alertsforregion.length} region loaded.`
            });
            props.setSnackbarMessage(`${json.data.alertsforregion.length} alerts loaded for ${region}.`);
        } catch (error) {
            props.setSnackbarMessage(`region not added - ${error.message}`);
        }
    }

    const handleSubregionSelection = async (subregion) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {


            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: `query {alertsforsubregion(subregion: "${subregion}") {name,text,date}}`,

                }),

            });

            let json = await response.json();

            setState({
                contactServer: true,
                alerts: json.data.alertsforsubregion,
                snackBarMsg: `${json.data.alertsforsubregion.length} subregion loaded.`
            });
            props.setSnackbarMessage(`${json.data.alertsforsubregion.length} alerts loaded for ${subregion}.`);
        } catch (error) {
            props.setSnackbarMessage(`subregion not added - ${error.message}`);
        }
    }
    const [radioValue, setRadioValue] = useState("traveler");


    return (
        <ThemeProvider theme={theme}>
            <Card className="card">
                <CardContent sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                    <Avatar src={logo} alt="logo" sx={{ width: 100, height: 100 }} />
                </CardContent>
                <CardHeader
                    title="World Wide Travel Alerts"
                    sx={{ textAlign: "center", fontVariant: "h6" }}
                />
                <CardContent>
                    <RadioGroup
                        aria-label="search-type"
                        name="search-type"
                        value={radioValue}
                        onChange={(event) => setRadioValue(event.target.value)}

                    >
                        <FormControlLabel value="traveler" control={<Radio />} label="Traveler" onChange={fetchTravelers} />
                        <FormControlLabel value="region" control={<Radio />} label="Region" onChange={fetchRegion} />
                        <FormControlLabel value="subregion" control={<Radio />} label="Subregion" onChange={fetchSubregion} />
                    </RadioGroup>
                    {radioValue === "traveler" && (
                        <Autocomplete
                            disablePortal
                            id="traveler-select"
                            options={state.travel}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            onChange={(e, selectedOption) => handleTravelerSelection(selectedOption)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Traveler"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    )}
                    {radioValue === "region" && (
                        <Autocomplete
                            disablePortal
                            id="traveler-select"
                            options={state.regions}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            onChange={(e, selectedOption) => handleRegionSelection(selectedOption)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Regions"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    )}
                    {radioValue === "subregion" && (
                        <Autocomplete
                            disablePortal
                            id="traveler-select"
                            options={state.subregions}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            onChange={(e, selectedOption) => handleSubregionSelection(selectedOption)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Subregions"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    )}

                    <Grid
                        container
                        alignItems="center"
                        justify="space-between"
                        style={{ paddingTop: "3vh", paddingBottom: "2vh" }}
                    >

                        <Typography
                            color="primary"
                            style={{ fontWeight: "bold", marginLeft: 20 }}
                        >
                            Country
                        </Typography>
                        <Typography
                            color="primary"
                            style={{ fontWeight: "bold", marginLeft: 60 }}
                        >
                            Alert Information
                        </Typography>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {state.alerts.map((row) => (
                                    <TableRow key={Math.random().toString()}>
                                        <TableCell style={{ color: '#78909c' }}
                                        >
                                            {row.country || row.name}
                                        </TableCell>
                                        <TableCell style={{ color: '#78909c' }}
                                        >
                                            {row.text} <br /> {row.date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </CardContent>
            </Card>
        </ThemeProvider>
    );
};
export default ListAdvisoryGui;