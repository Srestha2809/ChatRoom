import React, { useReducer, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Avatar,
    Autocomplete,
    Card,
    CardHeader,
    CardContent,
    TextField,
    CardActions, Button
} from "@mui/material";
import theme from "./theme";
import logo from "./images/worldwidelogo.png"
const AdvisoryGui = (props) => {
    const initialState = {
        showMsg: false,
        name: '',
        country: "",
        alerts: [],
        contactServer: false,
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchCountry();
    }, []);

    const fetchCountry = async () => {
        try {

            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "query { alerts{name} }" }),
            });
            let json = await response.json();
            props.setSnackbarMessage(`found ${json.data.alerts.length} countries`);
            setState({
                alerts: json.data.alerts,
                countries: json.data.alerts.map((a) => a.name)
            });
        } catch (error) {
            console.log(error);

        }
    };

    const onAddClicked = async () => {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {


            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: `mutation {addaddvisory(name: "${state.name}", country: "${state.country.name}") {name,country,date,text}}`,

                }),

            });
            const torontoTime = new Date().toLocaleString("en-US", {
                timeZone: "America/Toronto",
            });
            const time = new Date(torontoTime);
            time.setHours(time.getHours() - 5); // Convert to UTC
            time.setHours(time.getHours() - 4); // Convert to Toronto time (UTC-4)
            const options = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "America/Toronto",
            };
            const formattedTime = time.toLocaleString("en-US", options);
            const formattedDate = time.toISOString().slice(0, 10);
            const currentDate = formattedDate.replace(/-/g, "/");
            let json = await response.json();
            setState({
                name: "",
                country: "",
            });
            props.setSnackbarMessage(`added advisory on ${currentDate} ${formattedTime}`);
        } catch (error) {

            props.setSnackbarMessage(`${error.message} - user not added`);
        }
    };
    const onChange = (e, selectedOption) => {
        selectedOption
            ? setState({ country: selectedOption })
            : setState({ country: '' });
    };

    const handleNameInput = (e) => {
        setState({ name: e.target.value });
    };

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.name.toLowerCase().startsWith(inputValue.toLowerCase()) // filter options by name starting with input value
        );
    };

    const emptyorundefined =
        state.name === undefined ||
        state.name === "" ||
        state.country === undefined ||
        state.country === "";
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
                    <TextField
                        onChange={handleNameInput}
                        placeholder="Enter user's name here"
                        value={state.name}
                    />
                    <p></p>
                    <Autocomplete
                        id="user"
                        options={state.alerts}
                        getOptionLabel={(option) => option.name}
                        onChange={onChange}
                        filterOptions={filterOptions}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Countries"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    <p></p>

                    <CardActions style={{ justifyContent: "center" }}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onAddClicked}
                            disabled={emptyorundefined}
                        >
                            ADD ADVISORY
                        </Button>
                    </CardActions>

                </CardContent>
            </Card>
        </ThemeProvider>
    );
};
export default AdvisoryGui;