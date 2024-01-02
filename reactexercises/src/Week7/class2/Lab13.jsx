import React, { useState, useReducer, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {

    Autocomplete,
    Card,
    CardHeader,
    CardContent,
    Snackbar,
    Typography,
    TextField,

} from "@mui/material";
import theme from "../../project1/theme";
import "../../App.css";
const LabUi13 = () => {
    // When you attempt to update state, whatever is passed into setState
    // (which is typically called dispatch) is passed on to the reducer as
    // the second argument. We called this newState. Instead of doing some
    // elaborate switch statement (as in Redux), we just return a new state object
    // that overrides the previous state with the new values passed in
    // kind of how setState works, i.e., by updating state properties
    // using rest/spread operators.
    const initialState = {
        msg: "",
        snackBarMsg: "",
        contactServer: false,
        users: [],
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [message, setMessage] = useState('');

    const onChange = (e, selectedOption) => {
        selectedOption
            ? setMessage(`You selected ${selectedOption.name}. This user can be contacted at ${selectedOption.email} `)
            : setMessage("");
        setState({ msg: "" });
    };
    const [state, setState] = useReducer(reducer, initialState);
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load users from server...",
            });
            let response = await fetch("http://localhost:5000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "query { users{name,age,email} }" }),
            });
            let json = await response.json();
            setState({
                snackBarMsg: `users loaded`,
                users: json.data.users,
                contactServer: true,
                names: json.data.users.map((a) => a.name),

            });
        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }
    };
    const snackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setState({
            msg: `${state.users.length} users loaded`,
            contactServer: false,
        });
    };
    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.name.toLowerCase().startsWith(inputValue.toLowerCase()) // filter options by name starting with input value
        );
    };
    return (
        <ThemeProvider theme={theme}>
            <Card className="card">
                <CardHeader
                    title="Lab 13- Search For User"
                    style={{ color: theme.palette.primary.main, textAlign: "center" }}
                />
                <CardContent>
                    <Autocomplete
                        id="user"
                        options={state.users}
                        getOptionLabel={(option) => option.name}
                        onChange={onChange}
                        filterOptions={filterOptions}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Available users"
                                variant="outlined"
                                fullWidth
                                key={params.id}
                            />
                        )}
                    />

                    <div>
                        <Typography variant="body2" style={{ marginTop: "1vh", marginBottom: "1vh" }}>
                            {message}
                        </Typography>
                        <Typography color="error">{state.msg}</Typography>
                    </div>
                </CardContent>
            </Card>
            <Snackbar
                open={state.contactServer}
                message={state.snackBarMsg}
                autoHideDuration={3000}
                onClose={snackbarClose}
            />
        </ThemeProvider>
    );
};
export default LabUi13;